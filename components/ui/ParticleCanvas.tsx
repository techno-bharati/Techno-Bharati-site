"use client";

import { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
  side: "left" | "right";
}

export function ParticleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0, y: 0, radius: 150 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const canvasEl = canvas; // Store non-null reference

    const resizeCanvas = () => {
      canvasEl.width = window.innerWidth;
      canvasEl.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Responsive calculations
    const isMobile = window.innerWidth <= 768;
    const sideWidthPercentage = isMobile ? 0.4 : 0.3; // 40% on mobile, 30% on desktop
    const particleDensity = isMobile ? 0.15 : 0.12; // Higher density on mobile
    const baseParticleSize = isMobile ? 2 : 3; // Slightly smaller on mobile
    const baseConnectionDistance = isMobile ? 100 : 150; // Shorter connections on mobile

    // Create particles
    const particles: Particle[] = [];
    const particleCount = Math.min(
      Math.floor(window.innerWidth * particleDensity),
      isMobile ? 150 : 250
    );
    const connectionDistance = baseConnectionDistance;
    const mouseRadius = isMobile ? 100 : 150;

    for (let i = 0; i < particleCount; i++) {
      const side = i < particleCount / 2 ? "left" : "right";
      const sideWidth = canvasEl.width * sideWidthPercentage;

      const x =
        side === "left"
          ? Math.random() * sideWidth // Left side
          : canvasEl.width - Math.random() * sideWidth; // Right side

      particles.push({
        x,
        y: Math.random() * canvasEl.height,
        vx: (Math.random() - 0.5) * 0.4, // Faster movement
        vy: (Math.random() - 0.5) * 0.4, // Faster movement
        size: Math.random() * baseParticleSize + (isMobile ? 1 : 2), // Adjusted size
        opacity: Math.random() * 0.6 + 0.4, // Higher opacity
        side,
      });
    }

    function drawParticles() {
      particles.forEach((particle) => {
        ctx!.beginPath();
        ctx!.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx!.fillStyle = `rgba(0, 255, 255, ${particle.opacity})`;
        ctx!.fill();

        // Add glow effect
        ctx!.shadowBlur = 15;
        ctx!.shadowColor = "rgba(0, 255, 255, 0.5)";
      });
      ctx!.shadowBlur = 0; // Reset shadow for other drawings
    }

    function drawConnections() {
      ctx!.strokeStyle = "#00ffff";
      ctx!.lineWidth = isMobile ? 0.4 : 0.3; // Thicker lines on mobile

      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          if (particles[i].side !== particles[j].side) continue;

          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < connectionDistance) {
            const opacity =
              (1 - distance / connectionDistance) * (isMobile ? 0.4 : 0.3);
            ctx!.strokeStyle = `rgba(0, 255, 255, ${opacity})`;
            ctx!.beginPath();
            ctx!.moveTo(particles[i].x, particles[i].y);
            ctx!.lineTo(particles[j].x, particles[j].y);
            ctx!.stroke();
          }
        }

        // Mouse interaction
        const dx = mouseRef.current.x - particles[i].x;
        const dy = mouseRef.current.y - particles[i].y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < mouseRadius) {
          const opacity = (1 - distance / mouseRadius) * 0.5; // Increased interaction opacity
          ctx!.strokeStyle = `rgba(0, 255, 255, ${opacity})`;
          ctx!.beginPath();
          ctx!.moveTo(particles[i].x, particles[i].y);
          ctx!.lineTo(mouseRef.current.x, mouseRef.current.y);
          ctx!.stroke();
        }
      }
    }

    function updateParticles() {
      particles.forEach((particle) => {
        particle.x += particle.vx;
        particle.y += particle.vy;

        // Keep particles in their respective sides
        const sideWidth = canvasEl.width * sideWidthPercentage;
        if (particle.side === "left") {
          if (particle.x < 0) particle.x = sideWidth;
          if (particle.x > sideWidth) particle.x = 0;
        } else {
          const minX = canvasEl.width - sideWidth;
          if (particle.x < minX) particle.x = canvasEl.width;
          if (particle.x > canvasEl.width) particle.x = minX;
        }

        // Bounce off top and bottom with more randomness
        if (particle.y < 0 || particle.y > canvasEl.height) {
          particle.vy *= -1;
          particle.vy += (Math.random() - 0.5) * 0.2; // More random bouncing
          particle.vx += (Math.random() - 0.5) * 0.2; // Add some horizontal variation
        }

        // Keep particles within vertical bounds
        particle.y = Math.max(0, Math.min(canvasEl.height, particle.y));
      });
    }

    function animate() {
      ctx!.clearRect(0, 0, canvasEl.width, canvasEl.height);

      // Enhanced gradient background
      const gradient = ctx!.createLinearGradient(0, 0, 0, canvasEl.height);
      gradient.addColorStop(0, "#000000");
      gradient.addColorStop(0.5, "#001a1a");
      gradient.addColorStop(1, "#002a2a");
      ctx!.fillStyle = gradient;
      ctx!.fillRect(0, 0, canvasEl.width, canvasEl.height);

      updateParticles();
      drawConnections();
      drawParticles();
      requestAnimationFrame(animate);
    }

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvasEl.getBoundingClientRect();
      mouseRef.current.x = e.clientX - rect.left;
      mouseRef.current.y = e.clientY - rect.top;
    };

    const handleTouchMove = (e: TouchEvent) => {
      e.preventDefault(); // Prevent scrolling while interacting
      const rect = canvasEl.getBoundingClientRect();
      mouseRef.current.x = e.touches[0].clientX - rect.left;
      mouseRef.current.y = e.touches[0].clientY - rect.top;
    };

    canvasEl.addEventListener("mousemove", handleMouseMove);
    canvasEl.addEventListener("touchmove", handleTouchMove, { passive: false });
    animate();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      canvasEl.removeEventListener("mousemove", handleMouseMove);
      canvasEl.removeEventListener("touchmove", handleTouchMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0"
      style={{
        background: "linear-gradient(to bottom, #000000, #002a2a)",
      }}
    />
  );
}
