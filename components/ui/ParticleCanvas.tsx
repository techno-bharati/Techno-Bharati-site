"use client";

import { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  baseX: number;
  baseY: number;
  angle: number;
  speed: number;
}

export function ParticleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseRef = useRef({ x: 0, y: 0, active: false });
  const particlesRef = useRef<Particle[]>([]);
  const animationFrameRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resizeCanvas = () => {
      const rect = container.getBoundingClientRect();
      canvas.width = rect.width;
      canvas.height = rect.height;
    };

    const createParticles = () => {
      particlesRef.current = [];
      const numberOfParticles = Math.floor(canvas.width / 15);

      for (let i = 0; i < numberOfParticles; i++) {
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        particlesRef.current.push({
          x,
          y,
          baseX: x,
          baseY: y,
          vx: (Math.random() - 0.5) * 0.5,
          vy: (Math.random() - 0.5) * 0.5,
          radius: Math.random() * 2 + 1,
          angle: Math.random() * 360,
          speed: 0.2 + Math.random() * 0.3,
        });
      }
    };

    const drawParticles = () => {
      if (!ctx || !canvas) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = "#8b5cf6";
      ctx.strokeStyle = "rgba(139, 92, 246, 0.15)";

      particlesRef.current.forEach((particle, i) => {
        if (mouseRef.current.active) {
          const dx = mouseRef.current.x - particle.x;
          const dy = mouseRef.current.y - particle.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          const maxDistance = 150;

          if (distance < maxDistance) {
            const force = (1 - distance / maxDistance) * 0.9;
            particle.x += dx * force * 0.05;
            particle.y += dy * force * 0.05;
          } else {
            particle.angle += particle.speed;
            const radian = (particle.angle * Math.PI) / 180;
            particle.x +=
              (particle.baseX + Math.cos(radian) * 30 - particle.x) * 0.1;
            particle.y +=
              (particle.baseY + Math.sin(radian) * 30 - particle.y) * 0.1;
          }
        } else {
          particle.angle += particle.speed;
          const radian = (particle.angle * Math.PI) / 180;
          particle.x +=
            (particle.baseX + Math.cos(radian) * 30 - particle.x) * 0.1;
          particle.y +=
            (particle.baseY + Math.sin(radian) * 30 - particle.y) * 0.1;
        }

        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
        ctx.fill();

        particlesRef.current.forEach((particle2, j) => {
          if (i === j) return;
          const dx = particle.x - particle2.x;
          const dy = particle.y - particle2.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 120) {
            ctx.beginPath();
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(particle2.x, particle2.y);
            const opacity = (120 - distance) / 120;
            ctx.strokeStyle = `rgba(139, 92, 246, ${opacity * 0.2})`;
            ctx.stroke();
          }
        });
      });

      animationFrameRef.current = requestAnimationFrame(drawParticles);
    };

    const handleMouseMove = (e: globalThis.MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
        active: true,
      };
    };

    const handleMouseLeave = (e: globalThis.MouseEvent) => {
      mouseRef.current.active = false;
    };

    const handleMouseEnter = (e: globalThis.MouseEvent) => {
      mouseRef.current.active = true;
    };

    window.addEventListener("resize", resizeCanvas);
    canvas.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("mouseleave", handleMouseLeave);
    canvas.addEventListener("mouseenter", handleMouseEnter);

    resizeCanvas();
    createParticles();
    drawParticles();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      canvas.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("mouseleave", handleMouseLeave);
      canvas.removeEventListener("mouseenter", handleMouseEnter);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  return (
    <div ref={containerRef} className="absolute inset-0">
      <canvas ref={canvasRef} className="w-full h-full cursor-none" />
    </div>
  );
}
