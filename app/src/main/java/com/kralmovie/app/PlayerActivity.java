package com.kralmovie.app;

import android.app.Activity;
import android.graphics.Color;
import android.graphics.Typeface;
import android.os.Bundle;
import android.os.Handler;
import android.os.Looper;
import android.util.TypedValue;
import android.view.Gravity;
import android.view.SurfaceView;
import android.view.View;
import android.view.WindowManager;
import android.widget.Button;
import android.widget.FrameLayout;
import android.widget.LinearLayout;
import android.widget.ProgressBar;
import android.widget.SeekBar;
import android.widget.TextView;

import androidx.media3.common.MediaItem;
import androidx.media3.common.PlaybackException;
import androidx.media3.common.Player;
import androidx.media3.datasource.DefaultDataSource;
import androidx.media3.datasource.DefaultHttpDataSource;
import androidx.media3.exoplayer.ExoPlayer;
import androidx.media3.exoplayer.source.DefaultMediaSourceFactory;

import java.util.Locale;

public class PlayerActivity extends Activity {
    private ExoPlayer player;
    private SurfaceView surfaceView;
    private LinearLayout controlsOverlay;
    private ProgressBar loadingSpinner;
    private SeekBar seekBar;
    private TextView timeText;
    private TextView titleText;
    private Button playPauseBtn;
    private Button speedBtn;
    private TextView errorText;

    private String streamUrl = "";
    private String videoTitle = "";
    private String metaJson = "{}";

    private final Handler handler = new Handler(Looper.getMainLooper());
    private boolean isSeeking = false;
    private boolean controlsVisible = true;
    private int speedIdx = 0;
    private final float[] speeds = new float[]{1.0f, 1.25f, 1.5f, 2.0f, 0.75f};

    private final Runnable tickRunnable = new Runnable() {
        @Override
        public void run() {
            updatePlaybackUi();
            handler.postDelayed(this, 500);
        }
    };

    private final Runnable hideRunnable = () -> setControlsVisible(false);

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        getWindow().addFlags(WindowManager.LayoutParams.FLAG_KEEP_SCREEN_ON);
        hideSystemUi();

        streamUrl = getIntent().getStringExtra("url");
        videoTitle = getIntent().getStringExtra("title");
        metaJson = getIntent().getStringExtra("meta");
        if (streamUrl == null) streamUrl = "";
        if (videoTitle == null) videoTitle = "TOOSH MOVIE";
        if (metaJson == null) metaJson = "{}";

        buildUi();
        initPlayer();
    }

    private void buildUi() {
        FrameLayout root = new FrameLayout(this);
        root.setBackgroundColor(Color.BLACK);

        surfaceView = new SurfaceView(this);
        root.addView(surfaceView, new FrameLayout.LayoutParams(
                FrameLayout.LayoutParams.MATCH_PARENT,
                FrameLayout.LayoutParams.MATCH_PARENT,
                Gravity.CENTER
        ));

        loadingSpinner = new ProgressBar(this);
        FrameLayout.LayoutParams spinLp = new FrameLayout.LayoutParams(
                dp(48), dp(48), Gravity.CENTER
        );
        root.addView(loadingSpinner, spinLp);

        errorText = new TextView(this);
        errorText.setTextColor(Color.parseColor("#FFD60A"));
        errorText.setTextSize(TypedValue.COMPLEX_UNIT_SP, 15);
        errorText.setGravity(Gravity.CENTER);
        errorText.setPadding(dp(24), dp(24), dp(24), dp(24));
        errorText.setVisibility(View.GONE);
        root.addView(errorText, new FrameLayout.LayoutParams(
                FrameLayout.LayoutParams.WRAP_CONTENT,
                FrameLayout.LayoutParams.WRAP_CONTENT,
                Gravity.CENTER
        ));

        controlsOverlay = new LinearLayout(this);
        controlsOverlay.setOrientation(LinearLayout.VERTICAL);
        controlsOverlay.setLayoutDirection(View.LAYOUT_DIRECTION_LTR);

        // Top Bar
        LinearLayout topBar = new LinearLayout(this);
        topBar.setOrientation(LinearLayout.HORIZONTAL);
        topBar.setGravity(Gravity.CENTER_VERTICAL);
        topBar.setBackgroundColor(Color.parseColor("#B3100E0C"));
        topBar.setPadding(dp(12), dp(10), dp(12), dp(10));

        Button backBtn = makeChipButton("بازگشت", "#EE3B17", Color.WHITE);
        backBtn.setOnClickListener(v -> finish());
        topBar.addView(backBtn);

        titleText = new TextView(this);
        titleText.setText(videoTitle);
        titleText.setTextColor(Color.parseColor("#F6EFDC"));
        titleText.setTextSize(TypedValue.COMPLEX_UNIT_SP, 15);
        titleText.setTypeface(null, Typeface.BOLD);
        titleText.setPadding(dp(14), 0, dp(14), 0);
        titleText.setSingleLine(true);
        LinearLayout.LayoutParams titleLp = new LinearLayout.LayoutParams(0, LinearLayout.LayoutParams.WRAP_CONTENT, 1f);
        topBar.addView(titleText, titleLp);

        speedBtn = makeChipButton("1.0x", "#26221C", Color.parseColor("#F6EFDC"));
        speedBtn.setOnClickListener(v -> {
            speedIdx = (speedIdx + 1) % speeds.length;
            float s = speeds[speedIdx];
            if (player != null) player.setPlaybackSpeed(s);
            speedBtn.setText(String.format(Locale.US, "%.2gx", s));
            scheduleAutoHide();
        });
        topBar.addView(speedBtn);

        controlsOverlay.addView(topBar, new LinearLayout.LayoutParams(
                LinearLayout.LayoutParams.MATCH_PARENT,
                LinearLayout.LayoutParams.WRAP_CONTENT
        ));

        // Center spacer
        View spacer = new View(this);
        controlsOverlay.addView(spacer, new LinearLayout.LayoutParams(
                LinearLayout.LayoutParams.MATCH_PARENT, 0, 1f
        ));

        // Bottom Bar
        LinearLayout bottomBar = new LinearLayout(this);
        bottomBar.setOrientation(LinearLayout.VERTICAL);
        bottomBar.setBackgroundColor(Color.parseColor("#CC100E0C"));
        bottomBar.setPadding(dp(14), dp(8), dp(14), dp(12));

        seekBar = new SeekBar(this);
        seekBar.setMax(1000);
        seekBar.setOnSeekBarChangeListener(new SeekBar.OnSeekBarChangeListener() {
            @Override
            public void onProgressChanged(SeekBar bar, int progress, boolean fromUser) {
                if (fromUser && player != null && player.getDuration() > 0) {
                    long target = (player.getDuration() * progress) / 1000L;
                    timeText.setText(formatMs(target) + " / " + formatMs(player.getDuration()));
                }
            }

            @Override
            public void onStartTrackingTouch(SeekBar bar) {
                isSeeking = true;
                handler.removeCallbacks(hideRunnable);
            }

            @Override
            public void onStopTrackingTouch(SeekBar bar) {
                isSeeking = false;
                if (player != null && player.getDuration() > 0) {
                    long target = (player.getDuration() * bar.getProgress()) / 1000L;
                    player.seekTo(target);
                }
                scheduleAutoHide();
            }
        });
        bottomBar.addView(seekBar, new LinearLayout.LayoutParams(
                LinearLayout.LayoutParams.MATCH_PARENT,
                LinearLayout.LayoutParams.WRAP_CONTENT
        ));

        LinearLayout row = new LinearLayout(this);
        row.setOrientation(LinearLayout.HORIZONTAL);
        row.setGravity(Gravity.CENTER_VERTICAL);
        row.setPadding(0, dp(6), 0, 0);

        Button rewBtn = makeChipButton("-10s", "#26221C", Color.parseColor("#F6EFDC"));
        rewBtn.setOnClickListener(v -> seekRelative(-10000));
        row.addView(rewBtn);

        playPauseBtn = makeChipButton("توقف", "#EE3B17", Color.WHITE);
        LinearLayout.LayoutParams ppLp = new LinearLayout.LayoutParams(
                LinearLayout.LayoutParams.WRAP_CONTENT, LinearLayout.LayoutParams.WRAP_CONTENT
        );
        ppLp.setMargins(dp(8), 0, dp(8), 0);
        playPauseBtn.setLayoutParams(ppLp);
        playPauseBtn.setOnClickListener(v -> {
            if (player == null) return;
            if (player.isPlaying()) player.pause();
            else player.play();
            updatePlayButton();
            scheduleAutoHide();
        });
        row.addView(playPauseBtn);

        Button fwdBtn = makeChipButton("+10s", "#26221C", Color.parseColor("#F6EFDC"));
        fwdBtn.setOnClickListener(v -> seekRelative(10000));
        row.addView(fwdBtn);

        timeText = new TextView(this);
        timeText.setText("00:00 / 00:00");
        timeText.setTextColor(Color.parseColor("#F6EFDC"));
        timeText.setTextSize(TypedValue.COMPLEX_UNIT_SP, 13);
        timeText.setGravity(Gravity.END);
        row.addView(timeText, new LinearLayout.LayoutParams(0, LinearLayout.LayoutParams.WRAP_CONTENT, 1f));

        bottomBar.addView(row);
        controlsOverlay.addView(bottomBar);

        root.addView(controlsOverlay, new FrameLayout.LayoutParams(
                FrameLayout.LayoutParams.MATCH_PARENT,
                FrameLayout.LayoutParams.MATCH_PARENT
        ));

        root.setOnClickListener(v -> {
            setControlsVisible(!controlsVisible);
            if (controlsVisible) scheduleAutoHide();
        });

        setContentView(root);
    }

    private Button makeChipButton(String label, String bgHex, int fgColor) {
        Button b = new Button(this);
        b.setText(label);
        b.setAllCaps(false);
        b.setTextColor(fgColor);
        b.setBackgroundColor(Color.parseColor(bgHex));
        b.setPadding(dp(14), dp(6), dp(14), dp(6));
        b.setTextSize(TypedValue.COMPLEX_UNIT_SP, 12);
        return b;
    }

    private void initPlayer() {
        if (streamUrl.isEmpty()) {
            loadingSpinner.setVisibility(View.GONE);
            errorText.setText("آدرس ویدئو معتبر نیست.");
            errorText.setVisibility(View.VISIBLE);
            return;
        }

        DefaultHttpDataSource.Factory httpFactory = new DefaultHttpDataSource.Factory()
                .setAllowCrossProtocolRedirects(true)
                .setConnectTimeoutMs(15000)
                .setReadTimeoutMs(15000)
                .setUserAgent("TOOSH-MOVIE/2.4 Android");
        DefaultDataSource.Factory dataSourceFactory = new DefaultDataSource.Factory(this, httpFactory);

        player = new ExoPlayer.Builder(this)
                .setMediaSourceFactory(new DefaultMediaSourceFactory(dataSourceFactory))
                .build();
        player.setVideoSurfaceView(surfaceView);
        player.addListener(new Player.Listener() {
            @Override
            public void onPlaybackStateChanged(int state) {
                loadingSpinner.setVisibility(state == Player.STATE_BUFFERING ? View.VISIBLE : View.GONE);
                if (state == Player.STATE_ENDED) {
                    setControlsVisible(true);
                }
                updatePlayButton();
            }

            @Override
            public void onIsPlayingChanged(boolean isPlaying) {
                updatePlayButton();
            }

            @Override
            public void onPlayerError(PlaybackException error) {
                loadingSpinner.setVisibility(View.GONE);
                errorText.setText("خطا در پخش ویدئو: " + error.getMessage());
                errorText.setVisibility(View.VISIBLE);
            }
        });

        MediaItem item = MediaItem.fromUri(streamUrl);
        player.setMediaItem(item);

        String pKey = Progress.makeKey(streamUrl, metaJson);
        long savedPos = Progress.getSavedPosition(this, pKey);
        if (savedPos > 3000) {
            player.seekTo(savedPos);
        }

        player.prepare();
        player.setPlayWhenReady(true);

        handler.post(tickRunnable);
        scheduleAutoHide();
    }

    private void seekRelative(long deltaMs) {
        if (player == null) return;
        long next = Math.max(0, player.getCurrentPosition() + deltaMs);
        if (player.getDuration() > 0) {
            next = Math.min(player.getDuration(), next);
        }
        player.seekTo(next);
        updatePlaybackUi();
        scheduleAutoHide();
    }

    private void updatePlayButton() {
        if (playPauseBtn == null || player == null) return;
        playPauseBtn.setText(player.isPlaying() ? "توقف" : "پخش");
    }

    private void updatePlaybackUi() {
        if (player == null || isSeeking) return;
        long dur = player.getDuration();
        long pos = player.getCurrentPosition();
        if (dur > 0) {
            seekBar.setProgress((int) ((pos * 1000L) / dur));
            timeText.setText(formatMs(pos) + " / " + formatMs(dur));
            if (pos > 2000) {
                Progress.save(this, streamUrl, videoTitle, metaJson, pos, dur);
            }
        }
    }

    private void setControlsVisible(boolean visible) {
        controlsVisible = visible;
        controlsOverlay.setVisibility(visible ? View.VISIBLE : View.GONE);
        if (!visible) hideSystemUi();
    }

    private void scheduleAutoHide() {
        handler.removeCallbacks(hideRunnable);
        handler.postDelayed(hideRunnable, 3500);
    }

    private void hideSystemUi() {
        getWindow().getDecorView().setSystemUiVisibility(
                View.SYSTEM_UI_FLAG_IMMERSIVE_STICKY
                        | View.SYSTEM_UI_FLAG_FULLSCREEN
                        | View.SYSTEM_UI_FLAG_HIDE_NAVIGATION
                        | View.SYSTEM_UI_FLAG_LAYOUT_FULLSCREEN
                        | View.SYSTEM_UI_FLAG_LAYOUT_HIDE_NAVIGATION
        );
    }

    private String formatMs(long ms) {
        if (ms <= 0) return "00:00";
        long totalSec = ms / 1000L;
        long h = totalSec / 3600L;
        long m = (totalSec % 3600L) / 60L;
        long s = totalSec % 60L;
        if (h > 0) return String.format(Locale.US, "%d:%02d:%02d", h, m, s);
        return String.format(Locale.US, "%02d:%02d", m, s);
    }

    private int dp(int v) {
        return Math.round(v * getResources().getDisplayMetrics().density);
    }

    @Override
    public void onWindowFocusChanged(boolean hasFocus) {
        super.onWindowFocusChanged(hasFocus);
        if (hasFocus && !controlsVisible) {
            hideSystemUi();
        }
    }

    @Override
    protected void onPause() {
        super.onPause();
        if (player != null) {
            long dur = player.getDuration();
            long pos = player.getCurrentPosition();
            if (dur > 0 && pos > 2000) {
                Progress.save(this, streamUrl, videoTitle, metaJson, pos, dur);
            }
            player.pause();
        }
    }

    @Override
    protected void onDestroy() {
        super.onDestroy();
        handler.removeCallbacksAndMessages(null);
        if (player != null) {
            player.release();
            player = null;
        }
    }
}
