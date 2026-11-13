package com.kralmovie.app;

import android.content.Context;
import android.content.SharedPreferences;
import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
import java.util.List;
import java.util.Map;
import org.json.JSONArray;
import org.json.JSONObject;

/** Remembers where the user stopped in each film/episode ("continue watching"). */
public final class Progress {
    private static final String PREFS = "toosh_progress";
    private static final int MAX = 40;

    private Progress() {}

    private static SharedPreferences p(Context c) {
        return c.getSharedPreferences(PREFS, Context.MODE_PRIVATE);
    }

    public static String keyFor(String url) {
        String u = url == null ? "" : url;
        int q = u.indexOf('?');
        if (q > 0) u = u.substring(0, q);
        return "u:" + Integer.toHexString(u.hashCode());
    }

    public static void save(Context c, String key, String url, String title, long pos, long dur, String meta) {
        try {
            if (key == null || dur <= 0) return;
            // Finished (last 4% or last minute): drop the entry, nothing to continue.
            if (pos > dur * 0.96 || dur - pos < 45000) { remove(c, key); return; }
            // Too early to matter.
            if (pos < 15000) return;
            JSONObject o = new JSONObject();
            o.put("k", key);
            o.put("url", url == null ? "" : url);
            o.put("title", title == null ? "" : title);
            o.put("pos", pos);
            o.put("dur", dur);
            o.put("ts", System.currentTimeMillis());
            o.put("meta", meta == null ? "" : meta);
            SharedPreferences.Editor e = p(c).edit();
            e.putString(key, o.toString());
            e.apply();
            prune(c);
        } catch (Throwable ignored) {
        }
    }

    public static long get(Context c, String key) {
        try {
            String s = p(c).getString(key, null);
            if (s == null) return 0;
            return new JSONObject(s).optLong("pos", 0);
        } catch (Throwable t) {
            return 0;
        }
    }

    public static void remove(Context c, String key) {
        try { p(c).edit().remove(key).apply(); } catch (Throwable ignored) { }
    }

    private static void prune(Context c) {
        try {
            Map<String, ?> all = p(c).getAll();
            if (all.size() <= MAX) return;
            List<JSONObject> l = load(c);
            for (int i = MAX; i < l.size(); i++) remove(c, l.get(i).optString("k"));
        } catch (Throwable ignored) {
        }
    }

    private static List<JSONObject> load(Context c) {
        List<JSONObject> l = new ArrayList<>();
        try {
            for (Object v : p(c).getAll().values()) {
                try { l.add(new JSONObject(String.valueOf(v))); } catch (Throwable ignored) { }
            }
            Collections.sort(l, new Comparator<JSONObject>() {
                @Override public int compare(JSONObject a, JSONObject b) {
                    return Long.compare(b.optLong("ts"), a.optLong("ts"));
                }
            });
        } catch (Throwable ignored) {
        }
        return l;
    }

    public static String listJson(Context c) {
        JSONArray a = new JSONArray();
        for (JSONObject o : load(c)) a.put(o);
        return a.toString();
    }
}
