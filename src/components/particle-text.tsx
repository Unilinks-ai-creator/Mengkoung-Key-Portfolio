"use client";

import { useEffect, useRef } from "react";

type Particle = {
  hx: number;
  hy: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
};

/**
 * Inline text that renders as clean solid type at rest and crossfades into
 * dispersing particles on hover. Occupies the same layout box as an invisible
 * text twin so it flows inline with surrounding type.
 */
export function ParticleText({
  children,
  className = "",
  always = false,
}: {
  children: string;
  className?: string;
  always?: boolean;
}) {
  const wrapRef = useRef<HTMLSpanElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const rafRef = useRef<number>(0);
  const mouseRef = useRef({ x: -9999, y: -9999, active: false });
  const progressRef = useRef(always ? 1 : 0);

  useEffect(() => {
    const wrap = wrapRef.current;
    const canvas = canvasRef.current;
    if (!wrap || !canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = Math.max(1, Math.min(2, Math.round(window.devicePixelRatio || 1)));
    let colorCache = getComputedStyle(wrap).color;
    let fontCache = "";
    let boxW = 0;
    let boxH = 0;
    let cssH = 0;
    let textOffsetX = 0;
    let textOffsetY = 0;

    const setup = () => {
      const rect = wrap.getBoundingClientRect();
      const cs = getComputedStyle(wrap);
      const fontSize = parseFloat(cs.fontSize);
      const fontWeight = cs.fontWeight;
      const fontFamily = cs.fontFamily;
      colorCache = cs.color;
      fontCache = `${fontWeight} ${fontSize}px ${fontFamily}`;

      const meas = document.createElement("canvas").getContext("2d")!;
      meas.font = fontCache;
      const m = meas.measureText(children);
      const glyphLeft = m.actualBoundingBoxLeft ?? 0;
      const glyphRight = m.actualBoundingBoxRight ?? m.width;
      const glyphWidth = Math.ceil(glyphLeft + glyphRight);

      const cssW = Math.max(1, Math.ceil(rect.width));
      cssH = Math.max(1, Math.ceil(rect.height));

      // Generous buffer for dispersing particles + safe glyph fit
      const bufferX = Math.ceil(fontSize * 0.18);
      const bufferY = Math.ceil(fontSize * 0.12);
      boxW = Math.max(cssW, glyphWidth) + bufferX;
      boxH = cssH + bufferY;

      if (!Number.isFinite(boxW) || !Number.isFinite(boxH) || boxW < 1 || boxH < 1) {
        return;
      }

      canvas.width = boxW * dpr;
      canvas.height = boxH * dpr;
      canvas.style.width = `${boxW}px`;
      canvas.style.height = `${boxH}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      textOffsetX = glyphLeft > 0 ? glyphLeft : 0;
      textOffsetY = Math.max(0, (cssH - fontSize) / 2 - fontSize * 0.05);

      const off = document.createElement("canvas");
      off.width = boxW * dpr;
      off.height = boxH * dpr;
      const octx = off.getContext("2d");
      if (!octx) return;
      octx.setTransform(dpr, 0, 0, dpr, 0, 0);
      octx.font = fontCache;
      octx.textBaseline = "top";
      octx.fillStyle = "#000";
      octx.fillText(children, textOffsetX, textOffsetY);

      const img = octx.getImageData(0, 0, boxW * dpr, boxH * dpr).data;
      // Wider spacing = cleaner, less pixelated look
      const density = Math.max(3, Math.round(fontSize / 42));
      const particles: Particle[] = [];
      for (let y = 0; y < boxH; y += density) {
        for (let x = 0; x < boxW; x += density) {
          const idx = (y * dpr * (boxW * dpr) + x * dpr) * 4;
          if (img[idx + 3] > 128) {
            particles.push({ hx: x, hy: y, x, y, vx: 0, vy: 0 });
          }
        }
      }
      particlesRef.current = particles;
    };

    const paintFrame = () => {
      const progress = progressRef.current;
      ctx.clearRect(0, 0, boxW, boxH);

      // Solid text fades out as hover progresses
      if (progress < 0.995) {
        ctx.globalAlpha = 1 - progress;
        ctx.fillStyle = colorCache;
        ctx.font = fontCache;
        ctx.textBaseline = "top";
        ctx.fillText(children, textOffsetX, textOffsetY);
      }

      // Particles fade in
      if (progress > 0.005) {
        ctx.globalAlpha = progress;
        ctx.fillStyle = colorCache;
        const particles = particlesRef.current;
        for (let i = 0; i < particles.length; i++) {
          const p = particles[i];
          ctx.beginPath();
          ctx.arc(p.x, p.y, 1.15, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      ctx.globalAlpha = 1;
    };

    const animate = () => {
      const m = mouseRef.current;
      const particles = particlesRef.current;

      // Ease crossfade toward hover state (or stay pinned at particles if `always`)
      const target = always || m.active ? 1 : 0;
      progressRef.current += (target - progressRef.current) * 0.12;
      if (Math.abs(target - progressRef.current) < 0.002) {
        progressRef.current = target;
      }

      const R = Math.min(boxW, boxH) * 0.32 + 30;
      const R2 = R * R;

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        if (m.active) {
          const dx = p.x - m.x;
          const dy = p.y - m.y;
          const d2 = dx * dx + dy * dy;
          if (d2 < R2 && d2 > 0.1) {
            const d = Math.sqrt(d2);
            const f = (1 - d / R) * 3.6;
            p.vx += (dx / d) * f;
            p.vy += (dy / d) * f;
          }
        }
        p.vx += (p.hx - p.x) * 0.08;
        p.vy += (p.hy - p.y) * 0.08;
        p.vx *= 0.82;
        p.vy *= 0.82;
        p.x += p.vx;
        p.y += p.vy;
      }

      paintFrame();

      // Idle once ease is done, mouse is inactive, and particles are settled
      const easeDone = progressRef.current === target;
      if (easeDone && !m.active) {
        let atRest = true;
        for (let i = 0; i < particles.length; i++) {
          const p = particles[i];
          if (
            Math.abs(p.x - p.hx) > 0.4 ||
            Math.abs(p.y - p.hy) > 0.4 ||
            Math.abs(p.vx) > 0.4 ||
            Math.abs(p.vy) > 0.4
          ) {
            atRest = false;
            break;
          }
        }
        if (atRest) return;
      }

      rafRef.current = requestAnimationFrame(animate);
    };

    const kick = () => {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(animate);
    };

    let started = false;
    const start = () => {
      if (started) return;
      started = true;
      setup();
      paintFrame();
      if (always) kick();
    };

    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(start);
    } else {
      start();
    }

    const ro = new ResizeObserver(() => {
      if (!started) return;
      setup();
      paintFrame();
    });
    ro.observe(wrap);

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const onMove = (e: PointerEvent) => {
      if (reduce) return;
      const rect = wrap.getBoundingClientRect();
      mouseRef.current.x = e.clientX - rect.left;
      mouseRef.current.y = e.clientY - rect.top;
      mouseRef.current.active = true;
      kick();
    };
    const onLeave = () => {
      mouseRef.current.active = false;
      kick();
    };
    wrap.addEventListener("pointermove", onMove);
    wrap.addEventListener("pointerleave", onLeave);

    return () => {
      cancelAnimationFrame(rafRef.current);
      ro.disconnect();
      wrap.removeEventListener("pointermove", onMove);
      wrap.removeEventListener("pointerleave", onLeave);
    };
  }, [children]);

  return (
    <span
      ref={wrapRef}
      className={`relative inline-block align-baseline ${className}`}
      aria-label={children}
    >
      <span aria-hidden className="invisible whitespace-pre">
        {children}
      </span>
      <canvas
        ref={canvasRef}
        aria-hidden
        className="absolute left-0 top-0 pointer-events-none"
      />
    </span>
  );
}
