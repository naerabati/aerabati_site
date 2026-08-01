import { useEffect, useRef } from "react";

/**
 * 2D Noise for individual dot staggered clumping
 */
function noise2D(x, y) {
  const sin1 = Math.sin(x * 12.9898 + y * 78.233);
  const sin2 = Math.sin(x * 27.123 + y * 45.678);
  return (Math.sin(sin1 * 43758.5453) + Math.cos(sin2 * 23421.123)) * 0.5;
}

export default function WaveEffect() {
  const canvasRef = useRef(null);
  const rootRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const root = rootRef.current;
    if (!canvas || !root) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let raf = 0;
    let w = 0;
    let h = 0;
    let dpr = 1;
    let waveField = [];
    const started = performance.now();

    // -------------------------------------------------------------
    // Seed Horizontal Wave Field (Extended height coverage)
    // -------------------------------------------------------------
    const seedWaveField = () => {
      waveField = [];
      const ROWS = 52; // Increased row count for full coverage
      const DOTS_PER_ROW = 140;

      for (let r = 0; r < ROWS; r++) {
        // Normalizes slightly past 1.0 (1.08) so waves overflow bottom margin safely
        const rowNormY = (r / (ROWS - 1)) * 1.08;

        for (let i = 0; i < DOTS_PER_ROW; i++) {
          const baseNormX = i / (DOTS_PER_ROW - 1);
          const clumpWeight = (noise2D(i * 0.11, r * 0.15) + 1) * 0.5;

          waveField.push({
            normX: baseNormX,
            normY: rowNormY,
            row: r,
            col: i,
            clumpWeight,
            size: 0.95 + Math.abs(Math.sin(i * 9 + r * 11)) * 0.65,
            baseOpacity: 0.22 + Math.abs(Math.sin(i * 4 + r * 7)) * 0.22,
          });
        }
      }
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
    };

    const draw = (now) => {
      const t = (now - started) / 1000;
      ctx.clearRect(0, 0, w, h);

      const sweepSpeed = 0.18;
      const waveAmplitude = 22;

      for (let i = 0; i < waveField.length; i++) {
        const dot = waveField[i];
        const screenX = dot.normX * w;
        const baseY = dot.normY * h;

        const waveY =
          baseY +
          Math.sin(dot.normX * Math.PI * 3.8 + t * 0.8 + dot.row * 0.22) *
            waveAmplitude;

        const currentFront = (t * sweepSpeed) % 2.2 - 0.4;
        const distToPulseFront = Math.abs(dot.normX - currentFront);

        let pulseGlow = 0;
        const pulseWidth = 0.32;
        if (distToPulseFront < pulseWidth) {
          pulseGlow = Math.cos((distToPulseFront / pulseWidth) * (Math.PI / 2));
          pulseGlow = Math.pow(pulseGlow, 2);
        }

        const finalGlow = pulseGlow * (0.12 + dot.clumpWeight * 0.88);

        const brightness = Math.floor(160 + finalGlow * 95);
        const alpha = Math.min(1, dot.baseOpacity + finalGlow * 0.78);

        ctx.fillStyle = `rgba(${brightness}, ${brightness}, ${Math.min(
          255,
          brightness + 8
        )}, ${alpha})`;

        const currentSize = dot.size + finalGlow * 1.55;
        ctx.fillRect(screenX, waveY, currentSize, currentSize);
      }

      raf = requestAnimationFrame(draw);
    };

    seedWaveField();
    resize();
    raf = requestAnimationFrame(draw);

    const ro = new ResizeObserver(resize);
    ro.observe(root);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
    };
  }, []);

  return (
    <div
      ref={rootRef}
      className="relative h-full w-full pointer-events-none select-none bg-[#071712]"
    >
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />
    </div>
  );
}