import React, { useRef, useEffect, memo } from 'react';

interface SilkProps {
  speed?: number;
  scale?: number;
  color?: string;
  noiseIntensity?: number;
  rotation?: number;
}

const Silk: React.FC<SilkProps> = ({
  speed = 10, 
  scale = 1.4,
  color = '#7b1cce',
  noiseIntensity = 0.2,
  rotation = 4.4
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    // Optimization 1: Disable alpha if not strictly needed (though we use it here, context settings help)
    const ctx = canvas.getContext('2d', { alpha: true, desynchronized: true });
    if (!ctx) return;

    let animationFrameId: number;
    let time = 0;
    let isVisible = true;
    
    // Optimization 2: Hard cap DPR to 1. 
    // On Retina screens (DPR 2 or 3), canvas performance drops significantly.
    // For abstract waves, DPR 1 is visually sufficient and much faster.
    const MAX_DPR = 1; 

    const resize = () => {
      const parent = canvas.parentElement;
      if (parent) {
        const dpr = Math.min(window.devicePixelRatio || 1, MAX_DPR);
        const displayWidth = parent.clientWidth;
        const displayHeight = parent.clientHeight;
        
        if (canvas.width !== displayWidth * dpr || canvas.height !== displayHeight * dpr) {
            canvas.width = displayWidth * dpr;
            canvas.height = displayHeight * dpr;
            ctx.scale(dpr, dpr);
        }
      }
    };
    
    resize();
    
    // Optimization 3: Debounce resize
    let resizeTimeout: number;
    const handleResize = () => {
      window.clearTimeout(resizeTimeout);
      resizeTimeout = window.setTimeout(resize, 200);
    };
    window.addEventListener('resize', handleResize);

    const hexToRgb = (hex: string) => {
      const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
      return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
      } : { r: 123, g: 28, b: 206 };
    };
    
    const rgb = hexToRgb(color);
    
    // Pre-calculate constants outside loop
    const lines = 18; 
    const verticalSpacingFactor = 1.4;
    const yOffsetBaseFactor = 0.2;
    const noiseFactor = 0.15;

    const draw = () => {
      // Optimization 4: Stop loop if not visible
      if (!isVisible) return;

      if (!canvas || !ctx) return;

      const dpr = Math.min(window.devicePixelRatio || 1, MAX_DPR);
      const width = canvas.width / dpr;
      const height = canvas.height / dpr;
      
      ctx.clearRect(0, 0, width, height);
      
      const cx = width / 2;
      const cy = height / 2;
      
      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate(rotation); 
      ctx.translate(-cx, -cy);

      ctx.lineWidth = 1.5;
      
      const timeSpeed = time * 0.001 * speed;
      const verticalSpacing = (height * verticalSpacingFactor) / lines;
      const yOffsetBase = height * yOffsetBaseFactor;

      for (let i = 0; i < lines; i++) {
        ctx.beginPath();
        
        const yBase = verticalSpacing * i - yOffsetBase;
        const alpha = 0.1 + (Math.sin(i / lines * Math.PI) * 0.5); 
        ctx.strokeStyle = `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${alpha})`;

        // Optimization 5: Increase step size (x += 20) to reduce vertex count
        for (let x = -width * 0.5; x < width * 1.5; x += 20) {
          const nx = x * 0.003 * scale; 
          
          const wave = 
            Math.sin(nx * 3 + timeSpeed + i * 0.2) +
            Math.cos(nx * 5 - timeSpeed * 0.8) * 0.7;
          
          const yOffset = wave * (height * noiseFactor * noiseIntensity);
          const curvature = Math.sin(i * 0.15 + timeSpeed * 0.5) * 40;

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

    // Optimization 6: IntersectionObserver to stop animation when out of view
    const observer = new IntersectionObserver(([entry]) => {
      const wasVisible = isVisible;
      isVisible = entry.isIntersecting;
      
      if (isVisible && !wasVisible) {
        // Restart loop if it was stopped
        draw(); 
      }
    }, { threshold: 0 });

    if (canvas) observer.observe(canvas);

    draw();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
      observer.disconnect();
    };
  }, [speed, scale, color, noiseIntensity, rotation]);

  return (
    <div ref={containerRef} className="w-full h-full">
        <canvas ref={canvasRef} className="w-full h-full block" />
    </div>
  );
};

export default memo(Silk);