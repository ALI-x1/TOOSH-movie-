package com.kralmovie.app;

import android.app.DownloadManager;
import android.content.Context;
import android.content.Intent;
import android.content.SharedPreferences;
import android.database.Cursor;
import android.net.Uri;
import android.os.Environment;

import org.json.JSONArray;
import org.json.JSONObject;

public class DownloadService {
    private static final String PREF = "toosh_downloads_prefs";
    private static final String KEY = "records";

    public static synchronized long startDownload(Context ctx, String jsonPayload) {
        try {
            JSONObject obj = new JSONObject(jsonPayload);
            String url = obj.optString("url", "").trim();
            String title = obj.optString("title", "TOOSH_Video");
            String quality = obj.optString("quality", "");
            String type = obj.optString("type", "movie");
            if (url.isEmpty()) return -1;

            String safeName = title.replaceAll("[\\\\/:*?\"<>|]", "_").trim();
            if (safeName.isEmpty()) safeName = "TOOSH_Video";
            String ext = ".mp4";
            String cleanPath = url.split("\\?")[0].toLowerCase();
            if (cleanPath.endsWith(".mkv")) ext = ".mkv";
            else if (cleanPath.endsWith(".webm")) ext = ".webm";
            String fileName = safeName + (quality.isEmpty() ? "" : "_" + quality.replaceAll("[^a-zA-Z0-9p]", "")) + ext;

            DownloadManager dm = (DownloadManager) ctx.getSystemService(Context.DOWNLOAD_SERVICE);
            if (dm == null) return -1;

            DownloadManager.Request req = new DownloadManager.Request(Uri.parse(url));
            req.setTitle(title);
            req.setDescription("TOOSH MOVIE" + (quality.isEmpty() ? "" : " • " + quality));
            req.setNotificationVisibility(DownloadManager.Request.VISIBILITY_VISIBLE_NOTIFY_COMPLETED);
            req.setDestinationInExternalPublicDir(Environment.DIRECTORY_DOWNLOADS, "TOOSH/" + fileName);
            req.allowScanningByMediaScanner();

            long dmId = dm.enqueue(req);
            saveRecord(ctx, dmId, url, title, quality, type, fileName);
            return dmId;
        } catch (Exception ignored) {
            return -1;
        }
    }

    private static void saveRecord(Context ctx, long dmId, String url, String title, String quality, String type, String fileName) {
        try {
            SharedPreferences sp = ctx.getSharedPreferences(PREF, Context.MODE_PRIVATE);
            JSONArray arr = new JSONArray(sp.getString(KEY, "[]"));
            JSONObject rec = new JSONObject();
            rec.put("dmId", dmId);
            rec.put("url", url);
            rec.put("title", title);
            rec.put("label", title);
            rec.put("quality", quality);
            rec.put("type", type);
            rec.put("fileName", fileName);
            rec.put("folder", "Download/TOOSH");
            rec.put("createdAt", System.currentTimeMillis());

            JSONArray next = new JSONArray();
            next.put(rec);
            for (int i = 0; i < arr.length(); i++) {
                next.put(arr.opt(i));
            }
            sp.edit().putString(KEY, next.toString()).apply();
        } catch (Exception ignored) {
        }
    }

    public static synchronized String listDownloadsJson(Context ctx) {
        try {
            SharedPreferences sp = ctx.getSharedPreferences(PREF, Context.MODE_PRIVATE);
            JSONArray arr = new JSONArray(sp.getString(KEY, "[]"));
            DownloadManager dm = (DownloadManager) ctx.getSystemService(Context.DOWNLOAD_SERVICE);

            for (int i = 0; i < arr.length(); i++) {
                JSONObject rec = arr.optJSONObject(i);
                if (rec == null || dm == null) continue;
                long dmId = rec.optLong("dmId", -1);
                if (dmId <= 0) continue;

                DownloadManager.Query q = new DownloadManager.Query().setFilterById(dmId);
                try (Cursor c = dm.query(q)) {
                    if (c != null && c.moveToFirst()) {
                        int st = c.getInt(c.getColumnIndexOrThrow(DownloadManager.COLUMN_STATUS));
                        long downloaded = c.getLong(c.getColumnIndexOrThrow(DownloadManager.COLUMN_BYTES_DOWNLOADED_SO_FAR));
                        long total = c.getLong(c.getColumnIndexOrThrow(DownloadManager.COLUMN_TOTAL_SIZE_BYTES));
                        int reason = c.getInt(c.getColumnIndexOrThrow(DownloadManager.COLUMN_REASON));
                        String statusStr = "running";
                        if (st == DownloadManager.STATUS_SUCCESSFUL) statusStr = "successful";
                        else if (st == DownloadManager.STATUS_FAILED) statusStr = "failed";
                        else if (st == DownloadManager.STATUS_PAUSED) statusStr = "paused";
                        else if (st == DownloadManager.STATUS_PENDING) statusStr = "pending";

                        rec.put("status", statusStr);
                        rec.put("downloaded", downloaded);
                        rec.put("total", total);
                        rec.put("reason", reason);
                        rec.put("percent", total > 0 ? (int) Math.min(100, (downloaded * 100L) / total) : 0);
                    }
                } catch (Exception ignored) {
                }
            }
            return arr.toString();
        } catch (Exception ignored) {
            return "[]";
        }
    }

    public static synchronized boolean deleteDownload(Context ctx, long dmId) {
        try {
            DownloadManager dm = (DownloadManager) ctx.getSystemService(Context.DOWNLOAD_SERVICE);
            if (dm != null && dmId > 0) {
                dm.remove(dmId);
            }
            SharedPreferences sp = ctx.getSharedPreferences(PREF, Context.MODE_PRIVATE);
            JSONArray arr = new JSONArray(sp.getString(KEY, "[]"));
            JSONArray next = new JSONArray();
            for (int i = 0; i < arr.length(); i++) {
                JSONObject rec = arr.optJSONObject(i);
                if (rec != null && rec.optLong("dmId", -1) != dmId) {
                    next.put(rec);
                }
            }
            sp.edit().putString(KEY, next.toString()).apply();
            return true;
        } catch (Exception ignored) {
            return false;
        }
    }

    public static synchronized boolean resumeDownload(Context ctx, long dmId) {
        try {
            SharedPreferences sp = ctx.getSharedPreferences(PREF, Context.MODE_PRIVATE);
            JSONArray arr = new JSONArray(sp.getString(KEY, "[]"));
            for (int i = 0; i < arr.length(); i++) {
                JSONObject rec = arr.optJSONObject(i);
                if (rec != null && rec.optLong("dmId", -1) == dmId) {
                    deleteDownload(ctx, dmId);
                    return startDownload(ctx, rec.toString()) > 0;
                }
            }
        } catch (Exception ignored) {
        }
        return false;
    }

    public static synchronized boolean playDownloaded(Context ctx, long dmId) {
        try {
            DownloadManager dm = (DownloadManager) ctx.getSystemService(Context.DOWNLOAD_SERVICE);
            if (dm == null) return false;
            Uri uri = dm.getUriForDownloadedFile(dmId);
            if (uri == null) return false;

            String title = "پخش فایل دانلودشده";
            try {
                SharedPreferences sp = ctx.getSharedPreferences(PREF, Context.MODE_PRIVATE);
                JSONArray arr = new JSONArray(sp.getString(KEY, "[]"));
                for (int i = 0; i < arr.length(); i++) {
                    JSONObject rec = arr.optJSONObject(i);
                    if (rec != null && rec.optLong("dmId", -1) == dmId) {
                        String t = rec.optString("title", "");
                        if (!t.isEmpty()) title = t;
                        break;
                    }
                }
            } catch (Exception ignored) {
            }

            Intent intent = new Intent(ctx, PlayerActivity.class);
            intent.putExtra("url", uri.toString());
            intent.putExtra("title", title);
            intent.putExtra("meta", "{}");
            intent.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK | Intent.FLAG_GRANT_READ_URI_PERMISSION);
            ctx.startActivity(intent);
            return true;
        } catch (Exception ignored) {
            return false;
        }
    }
}
