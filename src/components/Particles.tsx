import React, { useRef, useEffect } from "react";

const Particles: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let particlesArray: Particle[] = [];
    let animationFrameId: number;

    const particleColor = "rgba(100, 181, 246, 0.5)";
    const lineColorStart = "140, 158, 255";

    const setCanvasSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    setCanvasSize();

    class Particle {
      x: number;
      y: number;
      directionX: number;
      directionY: number;
      size: number;
      color: string;

      constructor(
        x: number,
        y: number,
        directionX: number,
        directionY: number,
        size: number,
        color: string
      ) {
        this.x = x;
        this.y = y;
        this.directionX = directionX;
        this.directionY = directionY;
        this.size = size;
        this.color = color;
      }

      draw() {
        if (!ctx) return;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
        ctx.fillStyle = this.color;
        ctx.fill();
      }

      update() {
        if (canvas) {
          if (this.x > canvas.width || this.x < 0) {
            this.directionX = -this.directionX;
          }
          if (this.y > canvas.height || this.y < 0) {
            this.directionY = -this.directionY;
          }
        }
        this.x += this.directionX;
        this.y += this.directionY;
        this.draw();
      }
    }

    const init = () => {
      particlesArray = [];
      // 🔥 Scale particle count by screen size (less on mobile, more on desktop)
      const densityFactor =
        window.innerWidth < 768
          ? 12000
          : window.innerWidth < 1200
          ? 10000
          : 9000;
      const numberOfParticles = (canvas.height * canvas.width) / densityFactor;

      for (let i = 0; i < numberOfParticles; i++) {
        const size = Math.random() * 2 + 1;
        const x = Math.random() * (window.innerWidth - size * 4) + size * 2;
        const y = Math.random() * (window.innerHeight - size * 4) + size * 2;
        const directionX = Math.random() * 0.4 - 0.2;
        const directionY = Math.random() * 0.4 - 0.2;

        particlesArray.push(
          new Particle(x, y, directionX, directionY, size, particleColor)
        );
      }
    };

    const connect = () => {
      let opacityValue = 1;
      for (let a = 0; a < particlesArray.length; a++) {
        for (let b = a; b < particlesArray.length; b++) {
          const dx = particlesArray[a].x - particlesArray[b].x;
          const dy = particlesArray[a].y - particlesArray[b].y;
          const distance = dx * dx + dy * dy;

          if (distance < (canvas.width / 7) * (canvas.height / 7)) {
            opacityValue = 1 - distance / 20000;
            ctx.strokeStyle = `rgba(${lineColorStart}, ${opacityValue})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
            ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
            ctx.stroke();
          }
        }
      }
    };

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

      for (let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].update();
      }
      connect();
    };

    // 🔥 Throttle resize for better performance
    let resizeTimeout: number | null = null;
    const handleResize = () => {
      if (resizeTimeout) clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        setCanvasSize();
        init();
      }, 200); // wait 200ms after resize
    };

    window.addEventListener("resize", handleResize);

    init();
    animate();

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
      particlesArray = []; // free memory
    };
  }, []);

  return (
    <canvas ref={canvasRef} className="fixed top-0 left-0 w-full h-full z-0" />
  );
};

export default Particles;
