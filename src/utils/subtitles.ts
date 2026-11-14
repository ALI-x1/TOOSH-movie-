import { SubtitleCue } from '../types/movie';

export function cleanSubtitleText(raw: string): string {
  return String(raw || '')
    .replace(/<[^>]*>/g, '')
    .replace(/\{\\[^}]*\}/g, '')
    .replace(/\\N/g, '\n')
    .replace(/\u200f/g, '')
    .trim();
}

function parseTimestamp(str: string): number {
  const m = String(str || '')
    .trim()
    .match(/(\d+):(\d{2}):(\d{2})[.,](\d{2,3})/);
  if (!m) {
    const s = String(str || '')
      .trim()
      .match(/(\d{2}):(\d{2})[.,](\d{2,3})/);
    if (!s) return 0;
    return parseInt(s[1], 10) * 60 + parseInt(s[2], 10) + parseInt(s[3].padEnd(3, '0'), 10) / 1000;
  }
  return (
    parseInt(m[1], 10) * 3600 +
    parseInt(m[2], 10) * 60 +
    parseInt(m[3], 10) +
    parseInt(m[4].padEnd(3, '0'), 10) / 1000
  );
}

export function srtToVtt(text: string): string {
  const normalized = String(text || '').replace(/\r/g, '');
  if (/^\s*WEBVTT/i.test(normalized)) {
    return normalized;
  }
  const lines = normalized.split('\n');
  const out = ['WEBVTT\n'];
  for (const line of lines) {
    out.push(
      line.replace(/(\d{2}:\d{2}:\d{2}),(\d{3})/g, '$1.$2')
    );
  }
  return out.join('\n');
}

export function parseVttToCues(vttText: string): SubtitleCue[] {
  const cues: SubtitleCue[] = [];
  const blocks = String(vttText || '')
    .replace(/\r/g, '')
    .split(/\n{2,}/);

  for (const block of blocks) {
    const lines = block.split('\n').filter((l) => l.trim().length > 0);
    if (!lines.length) continue;
    const timingLineIdx = lines.findIndex((l) => l.includes('-->'));
    if (timingLineIdx < 0) continue;
    const [startStr, endStr] = lines[timingLineIdx].split('-->').map((s) => s.trim().split(/\s+/)[0]);
    const text = cleanSubtitleText(lines.slice(timingLineIdx + 1).join('\n'));
    if (!text) continue;
    const start = parseTimestamp(startStr);
    const end = parseTimestamp(endStr);
    if (end > start) {
      cues.push({ start, end, text });
    }
  }
  return cues;
}

export interface MkvTrack {
  num: number;
  name: string;
  lang: string;
  codec: string;
}

export interface MkvExtractResult {
  tracks: MkvTrack[];
  cues: Record<number, SubtitleCue[]>;
  error?: string;
}

function ebmlId(u8: Uint8Array, pos: number): { id: number; len: number } | null {
  if (pos >= u8.length) return null;
  const first = u8[pos];
  if (!first) return null;
  let mask = 0x80;
  let len = 1;
  while (len <= 4 && (first & mask) === 0) {
    mask >>= 1;
    len++;
  }
  if (pos + len > u8.length) return null;
  let id = 0;
  for (let i = 0; i < len; i++) id = id * 256 + u8[pos + i];
  return { id, len };
}

function ebmlSz(u8: Uint8Array, pos: number): { val: number; len: number; unkn: boolean } | null {
  if (pos >= u8.length) return null;
  const first = u8[pos];
  if (!first) return null;
  let mask = 0x80;
  let len = 1;
  while (len <= 8 && (first & mask) === 0) {
    mask >>= 1;
    len++;
  }
  if (pos + len > u8.length) return null;
  let val = first & (mask - 1);
  let allOnes = val === mask - 1;
  for (let i = 1; i < len; i++) {
    const b = u8[pos + i];
    if (b !== 0xff) allOnes = false;
    val = val * 256 + b;
  }
  return { val, len, unkn: allOnes };
}

function ebmlUint(u8: Uint8Array, s: number, l: number): number {
  let n = 0;
  for (let i = 0; i < l; i++) n = n * 256 + u8[s + i];
  return n;
}

function ebmlInt(u8: Uint8Array, s: number, l: number): number {
  let n = ebmlUint(u8, s, l);
  const top = Math.pow(2, 8 * l);
  return n >= top / 2 ? n - top : n;
}

function ebmlStr(u8: Uint8Array, s: number, l: number): string {
  return new TextDecoder('utf-8', { fatal: false }).decode(u8.subarray(s, s + l)).replace(/\0+$/, '');
}

function vint(u8: Uint8Array, pos: number): { val: number; len: number } {
  const first = u8[pos];
  let mask = 0x80;
  let len = 1;
  while (len <= 4 && (first & mask) === 0) {
    mask >>= 1;
    len++;
  }
  let val = first & (mask - 1);
  for (let i = 1; i < len; i++) val = val * 256 + u8[pos + i];
  return { val, len };
}

async function fetchByteRange(
  url: string,
  from: number,
  to: number,
  signal?: AbortSignal
): Promise<{ buf: ArrayBuffer; ok: boolean; status: number }> {
  const r = await fetch(url, {
    headers: { Range: `bytes=${from}-${to}` },
    mode: 'cors',
    credentials: 'omit',
    signal,
  });
  return { buf: await r.arrayBuffer(), ok: r.ok || r.status === 206, status: r.status };
}

export async function extractMkvSubtitles(
  url: string,
  onProgress?: (
    status: string,
    tracks: MkvTrack[],
    cues: Record<number, SubtitleCue[]>
  ) => void,
  signal?: AbortSignal
): Promise<MkvExtractResult> {
  const head = await fetchByteRange(url, 0, 2097151, signal);
  if (!head.ok) throw new Error(`HTTP ${head.status}`);

  const u8 = new Uint8Array(head.buf);
  let pos = 0;
  let segData = 0;
  let segEnd = Infinity;
  let tracksOffset = -1;
  let cuesOffset = -1;
  let timeScale = 1000000;
  const tracks: MkvTrack[] = [];

  const scanSeekHead = (s: number, e: number) => {
    let p = s;
    let sid = 0;
    let spos = -1;
    while (p < e) {
      const id = ebmlId(u8, p);
      if (!id) break;
      p += id.len;
      const sz = ebmlSz(u8, p);
      if (!sz) break;
      p += sz.len;
      if (id.id === 0x4dbb) {
        sid = 0;
        spos = -1;
        scanSeekHead(p, p + sz.val);
        if (sid === 0x1654ae6b && spos >= 0) tracksOffset = segData + spos;
        if (sid === 0x1c53bb6b && spos >= 0) cuesOffset = segData + spos;
      } else if (id.id === 0x53ab) {
        sid = ebmlUint(u8, p, sz.val);
      } else if (id.id === 0x53ac) {
        spos = ebmlUint(u8, p, sz.val);
      }
      p += sz.val;
    }
  };

  const scanTracks = (buf: Uint8Array, s: number, e: number) => {
    let p = s;
    while (p < e) {
      const id = ebmlId(buf, p);
      if (!id) break;
      p += id.len;
      const sz = ebmlSz(buf, p);
      if (!sz) break;
      p += sz.len;
      if (id.id === 0xae) {
        let ep = p;
        const ee = p + sz.val;
        const t: MkvTrack & { type: number } = { num: 0, type: 0, name: '', lang: '', codec: '' };
        while (ep < ee) {
          const eid = ebmlId(buf, ep);
          if (!eid) break;
          ep += eid.len;
          const esz = ebmlSz(buf, ep);
          if (!esz) break;
          ep += esz.len;
          if (eid.id === 0xd7) t.num = ebmlUint(buf, ep, esz.val);
          else if (eid.id === 0x83) t.type = ebmlUint(buf, ep, esz.val);
          else if (eid.id === 0x536e) t.name = ebmlStr(buf, ep, esz.val);
          else if (eid.id === 0x22b59c) t.lang = ebmlStr(buf, ep, esz.val);
          else if (eid.id === 0x86) t.codec = ebmlStr(buf, ep, esz.val);
          ep += esz.val;
        }
        if (t.type === 17 && !tracks.find((x) => x.num === t.num)) {
          tracks.push({ num: t.num, name: t.name, lang: t.lang, codec: t.codec });
        }
      }
      p += sz.val;
    }
  };

  while (pos < u8.length) {
    const id = ebmlId(u8, pos);
    if (!id) break;
    pos += id.len;
    const sz = ebmlSz(u8, pos);
    if (!sz) break;
    pos += sz.len;

    if (id.id === 0x18538067) {
      segData = pos;
      segEnd = sz.unkn ? Infinity : pos + sz.val;
      continue;
    }
    if (id.id === 0x114d9b74 && pos + sz.val <= u8.length) scanSeekHead(pos, pos + sz.val);
    if (id.id === 0x1549a966 && pos + sz.val <= u8.length) {
      let ip = pos;
      const ie = pos + sz.val;
      while (ip < ie) {
        const iid = ebmlId(u8, ip);
        if (!iid) break;
        ip += iid.len;
        const isz = ebmlSz(u8, ip);
        if (!isz) break;
        ip += isz.len;
        if (iid.id === 0x2ad7b1) timeScale = ebmlUint(u8, ip, isz.val);
        ip += isz.val;
      }
    }
    if (id.id === 0x1654ae6b && pos + sz.val <= u8.length) scanTracks(u8, pos, pos + sz.val);
    if (id.id === 0x1f43b675) break;
    pos += sz.val;
  }

  if (!tracks.length && tracksOffset > 0 && tracksOffset < segEnd) {
    try {
      const tr = await fetchByteRange(url, tracksOffset, tracksOffset + 65535, signal);
      if (tr.ok) {
        const tu8 = new Uint8Array(tr.buf);
        const tid = ebmlId(tu8, 0);
        const tsz = tid ? ebmlSz(tu8, tid.len) : null;
        if (tid && tsz && tid.id === 0x1654ae6b) {
          scanTracks(tu8, tid.len + tsz.len, Math.min(tu8.length, tid.len + tsz.len + tsz.val));
        }
      }
    } catch {
      // ignore
    }
  }

  if (!tracks.length) {
    return { tracks: [], cues: {}, error: 'هیچ زیرنویس داخلی در این فایل پیدا نشد' };
  }

  const subSet = new Set(tracks.map((t) => t.num));
  const cues: Record<number, SubtitleCue[]> = {};
  tracks.forEach((t) => {
    cues[t.num] = [];
  });
  const sPerTick = timeScale / 1e9;
  const clusterOffsets: number[] = [];

  if (cuesOffset > 0) {
    try {
      const cr = await fetchByteRange(url, cuesOffset, cuesOffset + 262143, signal);
      if (cr.ok) {
        const cu8 = new Uint8Array(cr.buf);
        let cp = 0;
        const cid = ebmlId(cu8, 0);
        const csz = cid ? ebmlSz(cu8, cid.len) : null;
        if (cid && csz && cid.id === 0x1c53bb6b) {
          cp = cid.len + csz.len;
          const ce = Math.min(cu8.length, cp + csz.val);
          while (cp < ce) {
            const pid = ebmlId(cu8, cp);
            if (!pid) break;
            cp += pid.len;
            const psz = ebmlSz(cu8, cp);
            if (!psz) break;
            cp += psz.len;
            if (pid.id === 0xbb) {
              let pp = cp;
              const pe = cp + psz.val;
              while (pp < pe) {
                const qid = ebmlId(cu8, pp);
                if (!qid) break;
                pp += qid.len;
                const qsz = ebmlSz(cu8, pp);
                if (!qsz) break;
                pp += qsz.len;
                if (qid.id === 0xb7) {
                  let tp = pp;
                  const te = pp + qsz.val;
                  while (tp < te) {
                    const tid2 = ebmlId(cu8, tp);
                    if (!tid2) break;
                    tp += tid2.len;
                    const tsz2 = ebmlSz(cu8, tp);
                    if (!tsz2) break;
                    tp += tsz2.len;
                    if (tid2.id === 0xf1) {
                      const co = segData + ebmlUint(cu8, tp, tsz2.val);
                      if (clusterOffsets[clusterOffsets.length - 1] !== co) {
                        clusterOffsets.push(co);
                      }
                    }
                    tp += tsz2.val;
                  }
                }
                pp += qsz.val;
              }
            }
            cp += psz.val;
          }
        }
      }
    } catch {
      // ignore
    }
  }

  const parseSubBlock = (
    buf: Uint8Array,
    start: number,
    end: number,
    clusterTs: number,
    durTicks: number
  ) => {
    const tr = vint(buf, start);
    if (!subSet.has(tr.val)) return;
    const rel = ebmlInt(buf, start + tr.len, 2);
    const dataStart = start + tr.len + 3;
    const raw = ebmlStr(buf, dataStart, end - dataStart);
    const parts = raw.split(',');
    const txt = cleanSubtitleText(parts.length >= 9 ? parts.slice(8).join(',') : raw);
    if (!txt) return;
    const startSec = Math.max(0, (clusterTs + rel) * sPerTick);
    const durSec = durTicks ? durTicks * sPerTick : Math.min(7, Math.max(2, 1.5 + 0.06 * txt.length));
    cues[tr.val].push({ start: startSec, end: startSec + durSec, text: txt });
  };

  if (clusterOffsets.length) {
    onProgress?.(
      `در حال استخراج زیرنویس (۰/${clusterOffsets.length})...`,
      tracks,
      cues
    );
    for (let i = 0; i < clusterOffsets.length; i++) {
      if (signal?.aborted) break;
      const startOff = clusterOffsets[i];
      let chunkPos = startOff;
      let clusterTs = 0;

      const firstChunk = await fetchByteRange(url, startOff, startOff + 131071, signal);
      if (!firstChunk.ok) continue;
      const fu8 = new Uint8Array(firstChunk.buf);
      const fid = ebmlId(fu8, 0);
      const fsz = fid ? ebmlSz(fu8, fid.len) : null;
      if (!fid || !fsz || fid.id !== 0x1f43b675) continue;

      const clusterEnd = startOff + fid.len + fsz.len + (fsz.unkn ? 4194304 : fsz.val);
      let cursor = fid.len + fsz.len;
      let curBuf = fu8;
      let bufBase = startOff;

      while (chunkPos + cursor < clusterEnd) {
        if (cursor + 16 > curBuf.length && bufBase + curBuf.length < clusterEnd) {
          bufBase += cursor;
          const nextTo = Math.min(clusterEnd - 1, bufBase + 131071);
          const nextChunk = await fetchByteRange(url, bufBase, nextTo, signal);
          if (!nextChunk.ok) break;
          curBuf = new Uint8Array(nextChunk.buf);
          chunkPos = bufBase;
          cursor = 0;
        }
        const eid = ebmlId(curBuf, cursor);
        if (!eid) break;
        const esz = ebmlSz(curBuf, cursor + eid.len);
        if (!esz) break;
        const hdr = eid.len + esz.len;

        if (eid.id === 0xe7) {
          clusterTs = ebmlUint(curBuf, cursor + hdr, esz.val);
        } else if (eid.id === 0xa3 && cursor + hdr + esz.val <= curBuf.length) {
          parseSubBlock(curBuf, cursor + hdr, cursor + hdr + esz.val, clusterTs, 0);
        } else if (eid.id === 0xa0 && cursor + hdr + esz.val <= curBuf.length) {
          let gp = cursor + hdr;
          const ge = gp + esz.val;
          let blkStart = 0;
          let blkEnd = 0;
          let dur = 0;
          while (gp < ge) {
            const gid = ebmlId(curBuf, gp);
            if (!gid) break;
            gp += gid.len;
            const gsz = ebmlSz(curBuf, gp);
            if (!gsz) break;
            gp += gsz.len;
            if (gid.id === 0xa1) {
              blkStart = gp;
              blkEnd = gp + gsz.val;
            } else if (gid.id === 0x9b) {
              dur = ebmlUint(curBuf, gp, gsz.val);
            }
            gp += gsz.val;
          }
          if (blkEnd > blkStart) parseSubBlock(curBuf, blkStart, blkEnd, clusterTs, dur);
        } else if (eid.id !== 0xa3 && eid.id !== 0xa0 && eid.id !== 0xe7) {
          if (eid.id === 0x1f43b675) break;
        }

        if (esz.val > 131072 && cursor + hdr + esz.val > curBuf.length) {
          bufBase += cursor + hdr + esz.val;
          const jumpTo = Math.min(clusterEnd - 1, bufBase + 131071);
          if (bufBase >= clusterEnd) break;
          const jc = await fetchByteRange(url, bufBase, jumpTo, signal);
          if (!jc.ok) break;
          curBuf = new Uint8Array(jc.buf);
          chunkPos = bufBase;
          cursor = 0;
          continue;
        }
        cursor += hdr + esz.val;
      }

      if (i % 3 === 0 || i === clusterOffsets.length - 1) {
        onProgress?.(
          `زیرنویس استخراج شد (${i + 1}/${clusterOffsets.length})`,
          tracks,
          cues
        );
      }
    }
  }

  return { tracks, cues };
}
