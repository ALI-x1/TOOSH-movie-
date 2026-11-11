package com.kralmovie.app;

import android.content.Context;
import android.graphics.Canvas;
import android.graphics.Color;
import android.graphics.Paint;
import android.graphics.Path;
import android.graphics.RectF;
import android.util.AttributeSet;
import android.view.View;

/**
 * Loading animation for the native player, drawn in code
 * (no emoji, no image asset): three rotating arcs in yellow,
 * cream and orange around a pulsing play mark (TOOSH MOVIE).
 * Animates itself with postInvalidateOnAnimation() while it is
 * visible; when it is GONE, onDraw is not called, so it costs
 * nothing.
 */
public class LoadingView extends View {

    private float angle1 = 0f;
    private float angle2 = 0f;
    private float angle3 = 0f;
    private long startTime = 0L;

    private final Paint arcPaint = new Paint(Paint.ANTI_ALIAS_FLAG);
    private final Paint crownPaint = new Paint(Paint.ANTI_ALIAS_FLAG);
    private final Paint dotPaint = new Paint(Paint.ANTI_ALIAS_FLAG);

    public LoadingView(Context context) {
        super(context);
        init();
    }

    public LoadingView(Context context, AttributeSet attrs) {
        super(context, attrs);
        init();
    }

    private void init() {
        arcPaint.setStyle(Paint.Style.STROKE);
        arcPaint.setStrokeCap(Paint.Cap.BUTT);
        crownPaint.setStyle(Paint.Style.FILL);
        crownPaint.setColor(Color.parseColor("#EE3B17"));
        dotPaint.setStyle(Paint.Style.STROKE);
        dotPaint.setStrokeJoin(Paint.Join.ROUND);
        dotPaint.setColor(Color.parseColor("#F6EFDC"));
        startTime = System.currentTimeMillis();
    }

    @Override
    protected void onDraw(Canvas canvas) {
        super.onDraw(canvas);
        float w = getWidth();
        float h = getHeight();
        if (w <= 0 || h <= 0) return;
        float cx = w / 2f;
        float cy = h / 2f;
        float r = Math.min(w, h) / 2f;

        // Outer ring: yellow, rotating clockwise, with a gap.
        arcPaint.setColor(Color.parseColor("#FFD60A"));
        arcPaint.setStrokeWidth(r * 0.09f);
        canvas.drawArc(new RectF(cx - r * 0.96f, cy - r * 0.96f,
                cx + r * 0.96f, cy + r * 0.96f), angle1, 250f, false, arcPaint);

        // Middle ring: cream, rotating counter-clockwise.
        arcPaint.setColor(Color.parseColor("#F6EFDC"));
        arcPaint.setStrokeWidth(r * 0.08f);
        canvas.drawArc(new RectF(cx - r * 0.78f, cy - r * 0.78f,
                cx + r * 0.78f, cy + r * 0.78f), -angle2, 190f, false, arcPaint);

        // Inner ring: orange, rotating fast clockwise.
        arcPaint.setColor(Color.parseColor("#EE3B17"));
        arcPaint.setStrokeWidth(r * 0.07f);
        canvas.drawArc(new RectF(cx - r * 0.60f, cy - r * 0.60f,
                cx + r * 0.60f, cy + r * 0.60f), angle3, 120f, false, arcPaint);

        // Pulsing play mark in the centre (orange fill, cream outline).
        float elapsed = (System.currentTimeMillis() - startTime) / 1000f;
        float pulse = 1f + 0.10f * (float) Math.sin(elapsed * 4.0);
        float s = r * 0.42f * pulse;
        Path tri = new Path();
        tri.moveTo(cx - s * 0.55f, cy - s * 0.85f);
        tri.lineTo(cx - s * 0.55f, cy + s * 0.85f);
        tri.lineTo(cx + s * 0.95f, cy);
        tri.close();
        canvas.drawPath(tri, crownPaint);
        dotPaint.setStrokeWidth(Math.max(3f, s * 0.14f));
        canvas.drawPath(tri, dotPaint);

        angle1 = (angle1 + 3.0f) % 360f;
        angle2 = (angle2 + 2.2f) % 360f;
        angle3 = (angle3 + 5.0f) % 360f;
        if (getVisibility() == VISIBLE) {
            postInvalidateOnAnimation();
        }
    }
}
