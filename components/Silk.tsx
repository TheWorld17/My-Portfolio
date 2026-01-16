
import React, { useRef, useEffect, memo } from 'react';

interface SilkProps {
  speed?: number;
  scale?: number;
  color?: string;
  noiseIntensity?: number;
  rotation?: number;
}

const Silk: React.FC<SilkProps> = ({
  speed = 15.1,
  scale = 1.4,
  color = '#7b1cce',
  noiseIntensity = 0.2,
  rotation = 4.4
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let time = 0;

    const resize = () => {
      const parent = canvas.parentElement;
      if (parent) {
        // Set actual canvas size to handle high DPI
        canvas.width = parent.clientWidth * window.devicePixelRatio;
        canvas.height = parent.clientHeight * window.devicePixelRatio;
        // Scale context to ensure correct drawing size
        ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
      }
    };
    
    window.addEventListener('resize', resize);
    resize();

    // Helper to convert hex to rgb for opacity handling
    const hexToRgb = (hex: string) => {
      const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
      return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
      } : { r: 123, g: 28, b: 206 };
    };
    
    const rgb = hexToRgb(color);

    const draw = () => {
      if (!canvas || !ctx) return;

      const width = canvas.width / window.devicePixelRatio;
      const height = canvas.height / window.devicePixelRatio;
      
      ctx.clearRect(0, 0, width, height);
      
      const lines = 35; // Number of silk threads
      const cx = width / 2;
      const cy = height / 2;
      
      ctx.save();
      ctx.translate(cx, cy);
      // Rotation in radians. 4.4 is approx 252 degrees
      ctx.rotate(rotation); 
      ctx.translate(-cx, -cy);

      for (let i = 0; i < lines; i++) {
        ctx.beginPath();
        
        // Distribute lines across the height with some padding
        const yBase = (height * 1.4 / lines) * i - (height * 0.2); 
        
        // Fade opacity for depth effect
        const alpha = 0.1 + (Math.sin(i / lines * Math.PI) * 0.5); 
        ctx.strokeStyle = `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${alpha})`;
        ctx.lineWidth = 1.5;

        // Draw the wave
        for (let x = -width * 0.5; x < width * 1.5; x += 10) {
          // Normalize coordinates for the math
          const nx = x * 0.003 * scale; 
          const nt = time * 0.001 * speed;
          
          // Combine sine waves to create "noise" / silk effect
          const wave = 
            Math.sin(nx * 3 + nt + i * 0.2) * 1.0 +
            Math.cos(nx * 5 - nt * 0.8) * 0.7 +
            Math.sin(nx * 1 - nt * 0.3) * 0.4;
          
          const yOffset = wave * (height * 0.15 * noiseIntensity);
          
          // Add gentle global curvature
          const curvature = Math.sin(i * 0.15 + nt * 0.5) * 40;

          const y = yBase + yOffset + curvature;
          
          if (x === -width * 0.5) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.stroke();
      }
      
      ctx.restore();

      time++;
      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [speed, scale, color, noiseIntensity, rotation]);

  return <canvas ref={canvasRef} className="w-full h-full block" />;
};

export default memo(Silk);
