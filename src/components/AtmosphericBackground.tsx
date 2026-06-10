import { useEffect, useRef } from 'react';

interface Blob {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  baseOpacity: number;
  phase: number;
  phaseSpeed: number;
  r: number; g: number; b: number;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
  life: number;
  maxLife: number;
  gold: boolean;
}

export default function AtmosphericBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let W = window.innerWidth;
    let H = window.innerHeight;

    const resize = () => {
      W = window.innerWidth;
      H = window.innerHeight;
      canvas.width = W;
      canvas.height = H;
    };
    resize();

    // ── Blobs de névoa ──────────────────────────────────────────────
    // Grandes manchas de cor que flutuam devagar como nuvens do shader.se
    const blobs: Blob[] = [
      // Glow verde principal (canto inferior esquerdo, como iluminação do solo)
      { x: W * 0.15, y: H * 0.8,  vx: 0.08, vy: -0.04, radius: H * 0.7,  baseOpacity: 0.12, phase: 0,    phaseSpeed: 0.004, r: 0,   g: 210, b: 106 },
      // Glow dourado suave (centro-direita, vem de cima)
      { x: W * 0.75, y: H * 0.3,  vx:-0.06, vy:  0.05, radius: H * 0.55, baseOpacity: 0.07, phase: 1.5,  phaseSpeed: 0.003, r: 250, g: 200, b: 21  },
      // Névoa escura esverdeada (meio)
      { x: W * 0.5,  y: H * 0.5,  vx: 0.04, vy:  0.02, radius: H * 0.9,  baseOpacity: 0.05, phase: 3.0,  phaseSpeed: 0.002, r: 0,   g: 80,  b: 40  },
      // Manchão verde lateral direito
      { x: W * 0.85, y: H * 0.65, vx:-0.05, vy: -0.03, radius: H * 0.5,  baseOpacity: 0.09, phase: 0.8,  phaseSpeed: 0.005, r: 0,   g: 180, b: 80  },
      // Segundo blob dourado suave
      { x: W * 0.3,  y: H * 0.2,  vx: 0.07, vy:  0.04, radius: H * 0.45, baseOpacity: 0.06, phase: 2.2,  phaseSpeed: 0.004, r: 240, g: 160, b: 0   },
    ];

    // ── Partículas de energia ────────────────────────────────────────
    // Pequenas faíscas que sobem como as moedas/linhas da imagem
    const makeParticle = (): Particle => ({
      x: Math.random() * W,
      y: H + 10,
      vx: (Math.random() - 0.5) * 0.8,
      vy: -(0.4 + Math.random() * 0.8),
      size: 0.8 + Math.random() * 1.8,
      opacity: 0,
      life: 0,
      maxLife: 120 + Math.random() * 180,
      gold: Math.random() > 0.6,
    });

    const particles: Particle[] = Array.from({ length: 40 }, makeParticle);
    // Espalhar posições iniciais em altura aleatória
    particles.forEach((p) => { p.y = Math.random() * H; p.life = Math.random() * p.maxLife; });

    const drawFrame = () => {
      // Limpar com fade muito lento para criar trilha de movimento
      ctx.fillStyle = 'rgba(1, 4, 9, 0.2)';
      ctx.fillRect(0, 0, W, H);

      // ── Blobs de névoa ──────────────────────────────────────────
      blobs.forEach((b) => {
        b.x += b.vx;
        b.y += b.vy;
        b.phase += b.phaseSpeed;

        // Wrap suave
        if (b.x < -b.radius) b.x = W + b.radius;
        if (b.x > W + b.radius) b.x = -b.radius;
        if (b.y < -b.radius) b.y = H + b.radius;
        if (b.y > H + b.radius) b.y = -b.radius;

        const alpha = b.baseOpacity * (0.6 + 0.4 * Math.sin(b.phase));

        const g = ctx.createRadialGradient(b.x, b.y, 0, b.x, b.y, b.radius);
        g.addColorStop(0,   `rgba(${b.r}, ${b.g}, ${b.b}, ${alpha})`);
        g.addColorStop(0.4, `rgba(${b.r}, ${b.g}, ${b.b}, ${alpha * 0.4})`);
        g.addColorStop(1,   `rgba(${b.r}, ${b.g}, ${b.b}, 0)`);

        ctx.beginPath();
        ctx.arc(b.x, b.y, b.radius, 0, Math.PI * 2);
        ctx.fillStyle = g;
        ctx.fill();
      });

      // ── Partículas ──────────────────────────────────────────────
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        p.life++;

        const lifeRatio = p.life / p.maxLife;
        // Fade in rápido, fade out nos últimos 30%
        if (lifeRatio < 0.1) {
          p.opacity = lifeRatio / 0.1 * 0.6;
        } else if (lifeRatio > 0.7) {
          p.opacity = ((1 - lifeRatio) / 0.3) * 0.6;
        } else {
          p.opacity = 0.6;
        }

        if (p.life >= p.maxLife || p.y < -10) {
          Object.assign(p, makeParticle());
        }

        const [r, g, bC] = p.gold ? [250, 204, 21] : [0, 210, 106];
        const pg = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size * 3);
        pg.addColorStop(0, `rgba(${r}, ${g}, ${bC}, ${p.opacity})`);
        pg.addColorStop(1, `rgba(${r}, ${g}, ${bC}, 0)`);

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * 3, 0, Math.PI * 2);
        ctx.fillStyle = pg;
        ctx.fill();

        // Núcleo brilhante da partícula
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${r}, ${g}, ${bC}, ${p.opacity})`;
        ctx.fill();
      });

      animId = requestAnimationFrame(drawFrame);
    };

    drawFrame();

    window.addEventListener('resize', resize);
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none z-[1]"
      style={{ mixBlendMode: 'screen' }}
    />
  );
}
