package com.kralmovie.app;

import android.content.Context;
import android.content.SharedPreferences;

import org.json.JSONArray;
import org.json.JSONObject;

public class Progress {
    private static final String PREF = "toosh_progress_prefs";
    private static final String KEY = "items";
    private static final int MAX_ITEMS = 30;

    public static String makeKey(String url, String metaJson) {
        try {
            if (metaJson != null && !metaJson.isEmpty()) {
                JSONObject meta = new JSONObject(metaJson);
                String id = meta.optString("id", "");
                if (!id.isEmpty()) {
                    if (meta.has("s") && meta.has("e")) {
                        return id + "_s" + meta.optInt("s") + "_e" + meta.optInt("e");
                    }
                    return id + "_movie";
                }
            }
        } catch (Exception ignored) {
        }
        return String.valueOf((url != null ? url : "").hashCode());
    }

    public static synchronized void save(Context ctx, String url, String title, String meta, long posMs, long durMs) {
        if (ctx == null || url == null || durMs <= 0) return;
        try {
            String k = makeKey(url, meta);
            SharedPreferences sp = ctx.getSharedPreferences(PREF, Context.MODE_PRIVATE);
            JSONArray arr = new JSONArray(sp.getString(KEY, "[]"));
            JSONArray next = new JSONArray();

            JSONObject entry = new JSONObject();
            entry.put("k", k);
            entry.put("url", url);
            entry.put("title", title != null ? title : "");
            entry.put("pos", posMs);
            entry.put("dur", durMs);
            entry.put("ts", System.currentTimeMillis());
            entry.put("meta", meta != null ? meta : "{}");
            next.put(entry);

            for (int i = 0; i < arr.length() && next.length() < MAX_ITEMS; i++) {
                JSONObject obj = arr.optJSONObject(i);
                if (obj != null && !k.equals(obj.optString("k"))) {
                    next.put(obj);
                }
            }
            sp.edit().putString(KEY, next.toString()).apply();
        } catch (Exception ignored) {
        }
    }

    public static synchronized long getSavedPosition(Context ctx, String key) {
        if (ctx == null || key == null) return 0;
        try {
            SharedPreferences sp = ctx.getSharedPreferences(PREF, Context.MODE_PRIVATE);
            JSONArray arr = new JSONArray(sp.getString(KEY, "[]"));
            for (int i = 0; i < arr.length(); i++) {
                JSONObject obj = arr.optJSONObject(i);
                if (obj != null && key.equals(obj.optString("k"))) {
                    return obj.optLong("pos", 0);
                }
            }
        } catch (Exception ignored) {
        }
        return 0;
    }

    public static synchronized String getAllJson(Context ctx) {
        if (ctx == null) return "[]";
        try {
            SharedPreferences sp = ctx.getSharedPreferences(PREF, Context.MODE_PRIVATE);
            return sp.getString(KEY, "[]");
        } catch (Exception ignored) {
            return "[]";
        }
    }

    public static synchronized void remove(Context ctx, String key) {
        if (ctx == null || key == null) return;
        try {
            SharedPreferences sp = ctx.getSharedPreferences(PREF, Context.MODE_PRIVATE);
            JSONArray arr = new JSONArray(sp.getString(KEY, "[]"));
            JSONArray next = new JSONArray();
            for (int i = 0; i < arr.length(); i++) {
                JSONObject obj = arr.optJSONObject(i);
                if (obj != null && !key.equals(obj.optString("k"))) {
                    next.put(obj);
                }
            }
            sp.edit().putString(KEY, next.toString()).apply();
        } catch (Exception ignored) {
        }
    }
}
