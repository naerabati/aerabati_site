import { useEffect, useRef } from "react";
import { WORLD_MAP_COUNT, forEachWorldMap } from "./worldmap";

const MIN_ZOOM = 1;
const MAX_ZOOM = 5.5;
/** Crop extreme poles so continents read larger in-frame. */
const LAT_CROP = 0.05;
const BASE_MAP_PAD = 0;

/**
 * 2D Noise for individual dot staggered clumping
 */
function noise2D(x, y) {
  const sin1 = Math.sin(x * 12.9898 + y * 78.233);
  const sin2 = Math.sin(x * 27.123 + y * 45.678);
  return (Math.sin(sin1 * 43758.5453) + Math.cos(sin2 * 23421.123)) * 0.5;
}

/**
 * Interactive Particle World Map overlaid with a smooth horizontal wave sweep.
 */
export default function ParticleWorldMap() {
  const canvasRef = useRef(null);
  const rootRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const root = rootRef.current;
    if (!canvas || !root) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    let raf = 0;
    let w = 0;
    let h = 0;
    let dpr = 1;
    let particles = [];
    let waveField = [];
    const started = performance.now();

    let zoom = MIN_ZOOM;
    let panX = 0;
    let panY = 0;
    let dragging = false;
    let lastPointerX = 0;
    let lastPointerY = 0;
    let activePointers = new Map();
    let pinchStartDist = 0;
    let pinchStartZoom = 1;

    // 1. Seed original world map particles
    const seed = () => {
      particles = [];
      forEachWorldMap((x, y, i) => {
        particles.push({
          x,
          y,
          shade: 0.42 + ((i * 17) % 40) / 100,
          size: i % 11 === 0 ? 1.45 : i % 5 === 0 ? 1.2 : 1,
          phase: (i * 0.37) % (Math.PI * 2),
          speed: 0.35 + ((i * 13) % 70) / 100,
        });
      });
    };

    // 2. Seed horizontal wave field with 2D noise-based clumping
    const seedWaveField = () => {
      waveField = [];
      const ROWS = 48;
      const DOTS_PER_ROW = 140;

      for (let r = 0; r < ROWS; r++) {
        const rowNormY = r / (ROWS - 1);

        for (let i = 0; i < DOTS_PER_ROW; i++) {
          const baseNormX = i / (DOTS_PER_ROW - 1);
          const clumpWeight = (noise2D(i * 0.11, r * 0.15) + 1) * 0.5;

          waveField.push({
            normX: baseNormX,
            normY: rowNormY,
            row: r,
            col: i,
            clumpWeight,
            size: 0.75 + Math.abs(Math.sin(i * 9 + r * 11)) * 0.5,
            baseOpacity: 0.1 + Math.abs(Math.sin(i * 4 + r * 7)) * 0.16,
          });
        }
      }
    };

    const mapLayout = () => {
      const availW = w * (1 - BASE_MAP_PAD * 2);
      const mapW = availW;
      const mapH = mapW * 0.5;
      return {
        mapW,
        mapH,
        originX: (w - mapW) / 2,
        originY: (h - mapH) / 2,
      };
    };

    const clampPan = () => {
      const { mapW, mapH } = mapLayout();
      const scaledW = mapW * zoom;
      const scaledH = mapH * zoom;
      const maxX = Math.max(0, (scaledW - w) / 2 + mapW * 0.08);
      const maxY = Math.max(0, (scaledH - h) / 2 + mapH * 0.08);
      panX = Math.max(-maxX, Math.min(maxX, panX));
      panY = Math.max(-maxY, Math.min(maxY, panY));
    };

    const project = (nx, ny) => {
      const { mapW, mapH, originX, originY } = mapLayout();
      const cx = w * 0.5;
      const cy = h * 0.5;
      const yN = (ny - LAT_CROP) / (1 - LAT_CROP * 2);
      const localX = originX + nx * mapW - cx;
      const localY = originY + yN * mapH - cy;
      return {
        x: cx + localX * zoom + panX,
        y: cy + localY * zoom + panY,
      };
    };

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      const rect = root.getBoundingClientRect();
      w = Math.max(1, Math.floor(rect.width));
      h = Math.max(1, Math.floor(rect.height));
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      clampPan();
    };

    const draw = (now) => {
      const t = (now - started) / 1000;
      ctx.clearRect(0, 0, w, h);

      const sizeMul = Math.max(0.9, Math.min(1.85, zoom * 1.05));

      // Layer 1: Render World Map Dots (Base layer)
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        const { x, y } = project(p.x, p.y);
        if (x < -4 || y < -4 || x > w + 4 || y > h + 4) continue;

        const twinkle = reduceMotion
          ? 1
          : 0.78 + 0.22 * Math.sin(t * p.speed + p.phase);
        const base = 215 + p.shade * 40;
        const alpha = (0.62 + p.shade * 0.35) * twinkle;

        ctx.fillStyle = `rgba(${Math.floor(base)},${Math.floor(base)},${Math.min(
          255,
          Math.floor(base + 8)
        )},${alpha})`;
        const s = p.size * sizeMul;
        ctx.fillRect(x, y, s, s);
      }

      // Layer 2: Render Wave Field
      const sweepSpeed = 0.18;
      const waveAmplitude = 22;

      for (let i = 0; i < waveField.length; i++) {
        const dot = waveField[i];
        const screenX = dot.normX * w;

        // Wave oscillation along vertical Y
        const baseY = dot.normY * h;
        const waveY =
          baseY +
          Math.sin(dot.normX * Math.PI * 3.8 + t * 0.8 + dot.row * 0.22) *
            waveAmplitude;

        // Linear sweep across X
        const currentFront = (t * sweepSpeed) % 2.2 - 0.4;
        const distToPulseFront = Math.abs(dot.normX - currentFront);

        let pulseGlow = 0;
        const pulseWidth = 0.32;
        if (distToPulseFront < pulseWidth) {
          pulseGlow = Math.cos((distToPulseFront / pulseWidth) * (Math.PI / 2));
          pulseGlow = Math.pow(pulseGlow, 2);
        }

        const finalGlow = pulseGlow * (0.12 + dot.clumpWeight * 0.88);

        const brightness = Math.floor(125 + finalGlow * 130);
        const alpha = Math.min(1, dot.baseOpacity + finalGlow * 0.85);

        ctx.fillStyle = `rgba(${brightness}, ${brightness}, ${Math.min(
          255,
          brightness + 8
        )}, ${alpha})`;

        const currentSize = dot.size + finalGlow * 1.55;
        ctx.fillRect(screenX, waveY, currentSize, currentSize);
      }

      raf = requestAnimationFrame(draw);
    };

    const zoomAt = (clientX, clientY, nextZoom) => {
      const rect = canvas.getBoundingClientRect();
      const px = clientX - rect.left;
      const py = clientY - rect.top;
      const prev = zoom;
      zoom = Math.max(MIN_ZOOM, Math.min(MAX_ZOOM, nextZoom));
      const wx = (px - w * 0.5 - panX) / prev;
      const wy = (py - h * 0.5 - panY) / prev;
      panX = px - w * 0.5 - wx * zoom;
      panY = py - h * 0.5 - wy * zoom;
      clampPan();
    };

    const onWheel = (event) => {
      event.preventDefault();
      if (event.deltaY > 0 && zoom <= MIN_ZOOM) return;
      const factor = event.deltaY > 0 ? 0.92 : 1.08;
      zoomAt(event.clientX, event.clientY, zoom * factor);
    };

    const onPointerDown = (event) => {
      root.setPointerCapture(event.pointerId);
      activePointers.set(event.pointerId, {
        x: event.clientX,
        y: event.clientY,
      });
      if (activePointers.size === 1) {
        dragging = true;
        lastPointerX = event.clientX;
        lastPointerY = event.clientY;
        root.style.cursor = "grabbing";
      } else if (activePointers.size === 2) {
        dragging = false;
        const pts = [...activePointers.values()];
        pinchStartDist = Math.hypot(pts[0].x - pts[1].x, pts[0].y - pts[1].y);
        pinchStartZoom = zoom;
      }
    };

    const onPointerMove = (event) => {
      if (!activePointers.has(event.pointerId)) return;
      activePointers.set(event.pointerId, {
        x: event.clientX,
        y: event.clientY,
      });

      if (activePointers.size === 2) {
        const pts = [...activePointers.values()];
        const dist = Math.hypot(pts[0].x - pts[1].x, pts[0].y - pts[1].y);
        if (pinchStartDist > 0) {
          const midX = (pts[0].x + pts[1].x) / 2;
          const midY = (pts[0].y + pts[1].y) / 2;
          zoomAt(midX, midY, pinchStartZoom * (dist / pinchStartDist));
        }
        return;
      }

      if (!dragging) return;
      panX += event.clientX - lastPointerX;
      panY += event.clientY - lastPointerY;
      lastPointerX = event.clientX;
      lastPointerY = event.clientY;
      clampPan();
    };

    const endPointer = (event) => {
      activePointers.delete(event.pointerId);
      if (activePointers.size === 0) {
        dragging = false;
        root.style.cursor = "grab";
      } else if (activePointers.size === 1) {
        const remaining = [...activePointers.values()][0];
        dragging = true;
        lastPointerX = remaining.x;
        lastPointerY = remaining.y;
        root.style.cursor = "grabbing";
      }
    };

    seed();
    seedWaveField();
    resize();
    raf = requestAnimationFrame(draw);

    const ro = new ResizeObserver(resize);
    ro.observe(root);

    root.addEventListener("wheel", onWheel, { passive: false });
    root.addEventListener("pointerdown", onPointerDown);
    root.addEventListener("pointermove", onPointerMove);
    root.addEventListener("pointerup", endPointer);
    root.addEventListener("pointercancel", endPointer);
    root.addEventListener("lostpointercapture", endPointer);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      root.removeEventListener("wheel", onWheel);
      root.removeEventListener("pointerdown", onPointerDown);
      root.removeEventListener("pointermove", onPointerMove);
      root.removeEventListener("pointerup", endPointer);
      root.removeEventListener("pointercancel", endPointer);
      root.removeEventListener("lostpointercapture", endPointer);
    };
  }, []);

  return (
    <div
      ref={rootRef}
      className="relative h-full min-h-72 w-full cursor-grab touch-none select-none active:cursor-grabbing"
      role="img"
      aria-label={`Interactive particle world map with ${WORLD_MAP_COUNT.toLocaleString()} points. Drag to pan, scroll or pinch to zoom.`}
    >
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />
    </div>
  );
}