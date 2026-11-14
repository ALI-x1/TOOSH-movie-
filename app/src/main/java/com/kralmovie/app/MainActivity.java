package com.kralmovie.app;

import android.Manifest;
import android.annotation.SuppressLint;
import android.app.Activity;
import android.content.Intent;
import android.content.pm.PackageManager;
import android.content.res.Configuration;
import android.graphics.Color;
import android.net.ConnectivityManager;
import android.net.Network;
import android.net.NetworkCapabilities;
import android.net.Uri;
import android.os.Build;
import android.os.Bundle;
import android.os.PowerManager;
import android.provider.Settings;
import android.view.View;
import android.view.Window;
import android.view.WindowManager;
import android.webkit.JavascriptInterface;
import android.webkit.ValueCallback;
import android.webkit.WebChromeClient;
import android.webkit.WebResourceRequest;
import android.webkit.WebResourceResponse;
import android.webkit.WebSettings;
import android.webkit.WebView;
import android.webkit.WebViewClient;

import java.io.InputStream;
import java.util.HashMap;
import java.util.Map;

public class MainActivity extends Activity {
    private static final String LOCAL_HOST = "toosh.local";
    private static final int FILE_CHOOSER_REQ = 4101;
    private static final int NOTIF_PERM_REQ = 4102;

    private WebView webView;
    private ValueCallback<Uri[]> filePathCallback;

    @SuppressLint("SetJavaScriptEnabled")
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        webView = new WebView(this);
        webView.setBackgroundColor(Color.parseColor("#100E0C"));

        WebSettings ws = webView.getSettings();
        ws.setJavaScriptEnabled(true);
        ws.setDomStorageEnabled(true);
        ws.setDatabaseEnabled(true);
        ws.setMediaPlaybackRequiresUserGesture(false);
        ws.setAllowFileAccess(true);
        ws.setAllowContentAccess(true);
        ws.setMixedContentMode(WebSettings.MIXED_CONTENT_ALWAYS_ALLOW);
        ws.setUseWideViewPort(true);
        ws.setLoadWithOverviewMode(true);

        webView.addJavascriptInterface(new AndroidPlayerBridge(), "AndroidPlayer");

        webView.setWebViewClient(new WebViewClient() {
            @Override
            public WebResourceResponse shouldInterceptRequest(WebView view, WebResourceRequest request) {
                Uri uri = request.getUrl();
                if (uri != null && LOCAL_HOST.equals(uri.getHost())) {
                    String path = uri.getPath();
                    if (path == null || path.isEmpty() || "/".equals(path)) {
                        path = "index.html";
                    } else if (path.startsWith("/")) {
                        path = path.substring(1);
                    }
                    try {
                        InputStream is = getAssets().open(path);
                        String mime = guessMime(path);
                        Map<String, String> headers = new HashMap<>();
                        headers.put("Access-Control-Allow-Origin", "*");
                        return new WebResourceResponse(mime, "UTF-8", 200, "OK", headers, is);
                    } catch (Exception ignored) {
                    }
                }
                return super.shouldInterceptRequest(view, request);
            }

            @Override
            public boolean shouldOverrideUrlLoading(WebView view, WebResourceRequest request) {
                Uri uri = request.getUrl();
                if (uri == null) return false;
                String host = uri.getHost();
                if (LOCAL_HOST.equals(host)) return false;
                try {
                    startActivity(new Intent(Intent.ACTION_VIEW, uri));
                    return true;
                } catch (Exception ignored) {
                    return false;
                }
            }
        });

        webView.setWebChromeClient(new WebChromeClient() {
            @Override
            public boolean onShowFileChooser(
                    WebView view,
                    ValueCallback<Uri[]> filePathCb,
                    FileChooserParams fileChooserParams
            ) {
                if (filePathCallback != null) {
                    filePathCallback.onReceiveValue(null);
                }
                filePathCallback = filePathCb;
                try {
                    Intent intent = fileChooserParams.createIntent();
                    startActivityForResult(intent, FILE_CHOOSER_REQ);
                    return true;
                } catch (Exception e) {
                    filePathCallback = null;
                    return false;
                }
            }
        });

        setContentView(webView);
        webView.loadUrl("https://" + LOCAL_HOST + "/index.html");
    }

    private String guessMime(String path) {
        String lower = path.toLowerCase();
        if (lower.endsWith(".html")) return "text/html";
        if (lower.endsWith(".js") || lower.endsWith(".mjs")) return "application/javascript";
        if (lower.endsWith(".css")) return "text/css";
        if (lower.endsWith(".json")) return "application/json";
        if (lower.endsWith(".svg")) return "image/svg+xml";
        if (lower.endsWith(".png")) return "image/png";
        if (lower.endsWith(".jpg") || lower.endsWith(".jpeg")) return "image/jpeg";
        if (lower.endsWith(".webp")) return "image/webp";
        if (lower.endsWith(".woff2")) return "font/woff2";
        return "application/octet-stream";
    }

    @Override
    protected void onActivityResult(int requestCode, int resultCode, Intent data) {
        super.onActivityResult(requestCode, resultCode, data);
        if (requestCode == FILE_CHOOSER_REQ && filePathCallback != null) {
            Uri[] result = WebChromeClient.FileChooserParams.parseResult(resultCode, data);
            filePathCallback.onReceiveValue(result);
            filePathCallback = null;
        }
    }

    @Override
    public void onBackPressed() {
        if (webView != null) {
            webView.evaluateJavascript(
                    "(function(){return typeof window.__tmBack==='function'?Boolean(window.__tmBack()):false;})()",
                    value -> {
                        if ("true".equals(value)) {
                            return;
                        }
                        if (webView != null && webView.canGoBack()) {
                            webView.goBack();
                        } else {
                            MainActivity.super.onBackPressed();
                        }
                    }
            );
            return;
        }
        super.onBackPressed();
    }

    @Override
    protected void onDestroy() {
        if (webView != null) {
            webView.destroy();
            webView = null;
        }
        super.onDestroy();
    }

    private class AndroidPlayerBridge {
        @JavascriptInterface
        public boolean isVpnActive() {
            try {
                ConnectivityManager cm = (ConnectivityManager) getSystemService(CONNECTIVITY_SERVICE);
                if (cm == null) return false;
                Network active = cm.getActiveNetwork();
                if (active == null) return false;
                NetworkCapabilities caps = cm.getNetworkCapabilities(active);
                return caps != null && caps.hasTransport(NetworkCapabilities.TRANSPORT_VPN);
            } catch (Exception ignored) {
                return false;
            }
        }

        @JavascriptInterface
        public void setFullscreen(boolean enter) {
            runOnUiThread(() -> {
                Window w = getWindow();
                if (enter) {
                    w.addFlags(WindowManager.LayoutParams.FLAG_FULLSCREEN);
                } else {
                    w.clearFlags(WindowManager.LayoutParams.FLAG_FULLSCREEN);
                }
            });
        }

        @JavascriptInterface
        public void openTelegram() {
            try {
                startActivity(new Intent(Intent.ACTION_VIEW, Uri.parse("https://t.me/TOOSH_MOVIE")));
            } catch (Exception ignored) {
            }
        }

        @JavascriptInterface
        public void exitApp() {
            runOnUiThread(() -> finishAffinity());
        }

        @JavascriptInterface
        public void playNative(String url, String title) {
            playNativeEx(url, title, "{}");
        }

        @JavascriptInterface
        public void playNativeEx(String url, String title, String meta) {
            Intent intent = new Intent(MainActivity.this, PlayerActivity.class);
            intent.putExtra("url", url);
            intent.putExtra("title", title);
            intent.putExtra("meta", meta);
            startActivity(intent);
        }

        @JavascriptInterface
        public void setBars(String statusHex, String navHex, boolean lightTheme) {
            runOnUiThread(() -> {
                try {
                    Window w = getWindow();
                    w.setStatusBarColor(Color.parseColor(statusHex));
                    w.setNavigationBarColor(Color.parseColor(navHex));
                    if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
                        View decor = w.getDecorView();
                        int flags = decor.getSystemUiVisibility();
                        if (lightTheme) {
                            flags |= View.SYSTEM_UI_FLAG_LIGHT_STATUS_BAR | View.SYSTEM_UI_FLAG_LIGHT_NAVIGATION_BAR;
                        } else {
                            flags &= ~(View.SYSTEM_UI_FLAG_LIGHT_STATUS_BAR | View.SYSTEM_UI_FLAG_LIGHT_NAVIGATION_BAR);
                        }
                        decor.setSystemUiVisibility(flags);
                    }
                } catch (Exception ignored) {
                }
            });
        }

        @JavascriptInterface
        public boolean isNightMode() {
            int uiMode = getResources().getConfiguration().uiMode & Configuration.UI_MODE_NIGHT_MASK;
            return uiMode == Configuration.UI_MODE_NIGHT_YES;
        }

        @JavascriptInterface
        public String getProgress() {
            return Progress.getAllJson(MainActivity.this);
        }

        @JavascriptInterface
        public void removeProgress(String key) {
            Progress.remove(MainActivity.this, key);
        }

        @JavascriptInterface
        public void openExternal(String url, String pkg) {
            try {
                Intent i = new Intent(Intent.ACTION_VIEW);
                i.setDataAndType(Uri.parse(url), "video/*");
                if (pkg != null && !pkg.isEmpty()) {
                    i.setPackage(pkg);
                }
                startActivity(i);
            } catch (Exception ignored) {
                try {
                    Intent fallback = new Intent(Intent.ACTION_VIEW);
                    fallback.setDataAndType(Uri.parse(url), "video/*");
                    startActivity(fallback);
                } catch (Exception ignored2) {
                }
            }
        }

        @JavascriptInterface
        public long startDownload(String json) {
            return DownloadService.startDownload(MainActivity.this, json);
        }

        @JavascriptInterface
        public String listDownloads() {
            return DownloadService.listDownloadsJson(MainActivity.this);
        }

        @JavascriptInterface
        public boolean deleteDownload(long dmId) {
            return DownloadService.deleteDownload(MainActivity.this, dmId);
        }

        @JavascriptInterface
        public boolean resumeDownload(long dmId) {
            return DownloadService.resumeDownload(MainActivity.this, dmId);
        }

        @JavascriptInterface
        public boolean playDownloaded(long dmId) {
            return DownloadService.playDownloaded(MainActivity.this, dmId);
        }

        @JavascriptInterface
        public void setDownloadManagerVisible(boolean visible) {
            // No-op hook for native lifecycle sync
        }

        @JavascriptInterface
        public boolean requestNotificationPermissionJs() {
            if (Build.VERSION.SDK_INT >= 33) {
                if (checkSelfPermission(Manifest.permission.POST_NOTIFICATIONS) != PackageManager.PERMISSION_GRANTED) {
                    runOnUiThread(() -> requestPermissions(new String[]{Manifest.permission.POST_NOTIFICATIONS}, NOTIF_PERM_REQ));
                    return false;
                }
            }
            return true;
        }

        @JavascriptInterface
        public boolean isBatteryOptimizationExempt() {
            try {
                PowerManager pm = (PowerManager) getSystemService(POWER_SERVICE);
                return pm != null && pm.isIgnoringBatteryOptimizations(getPackageName());
            } catch (Exception ignored) {
                return false;
            }
        }

        @JavascriptInterface
        public boolean requestBatteryOptimizationExemption() {
            try {
                Intent intent = new Intent(Settings.ACTION_REQUEST_IGNORE_BATTERY_OPTIMIZATIONS);
                intent.setData(Uri.parse("package:" + getPackageName()));
                startActivity(intent);
                return true;
            } catch (Exception ignored) {
                return false;
            }
        }
    }
}
