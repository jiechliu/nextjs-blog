'use client';

import { useEffect, useRef } from 'react';

const AnimatedBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // 设置画布大小
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // 增强粒子类
    class Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      opacity: number;
      color: string;
      originalSize: number;
      pulse: number;
      trail: Array<{x: number, y: number, opacity: number}>;

      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.vx = (Math.random() - 0.5) * 0.8;
        this.vy = (Math.random() - 0.5) * 0.8;
        this.originalSize = Math.random() * 4 + 1;
        this.size = this.originalSize;
        this.opacity = Math.random() * 0.6 + 0.3;
        this.pulse = Math.random() * Math.PI * 2;
        this.trail = [];
        
        const colors = [
          '#667eea', '#764ba2', '#f093fb', '#4facfe', '#00f2fe',
          '#a8edea', '#fed6e3', '#d299c2', '#fef9d7', '#b2fefa'
        ];
        this.color = colors[Math.floor(Math.random() * colors.length)];
      }

      update() {
        // 添加轨迹点
        this.trail.push({
          x: this.x,
          y: this.y,
          opacity: this.opacity * 0.5
        });
        
        // 限制轨迹长度
        if (this.trail.length > 8) {
          this.trail.shift();
        }
        
        // 更新轨迹透明度
        this.trail.forEach((point, index) => {
          point.opacity *= 0.9;
        });

        this.x += this.vx;
        this.y += this.vy;
        
        // 脉冲效果
        this.pulse += 0.05;
        this.size = this.originalSize + Math.sin(this.pulse) * 0.5;

        // 边界检测
        if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
        if (this.y < 0 || this.y > canvas.height) this.vy *= -1;

        // 保持在画布内
        this.x = Math.max(0, Math.min(canvas.width, this.x));
        this.y = Math.max(0, Math.min(canvas.height, this.y));
      }

      draw() {
        if (!ctx) return;
        
        // 绘制轨迹
        this.trail.forEach((point, index) => {
          if (point.opacity > 0.01) {
            ctx.save();
            ctx.globalAlpha = point.opacity;
            ctx.fillStyle = this.color;
            ctx.beginPath();
            const trailSize = this.originalSize * (index / this.trail.length) * 0.5;
            ctx.arc(point.x, point.y, trailSize, 0, Math.PI * 2);
            ctx.fill();
            ctx.restore();
          }
        });
        
        // 绘制主粒子
        ctx.save();
        ctx.globalAlpha = this.opacity;
        
        // 外层光晕
        const gradient = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.size * 3);
        gradient.addColorStop(0, this.color);
        gradient.addColorStop(1, 'transparent');
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size * 3, 0, Math.PI * 2);
        ctx.fill();
        
        // 内层粒子
        ctx.fillStyle = this.color;
        ctx.shadowColor = this.color;
        ctx.shadowBlur = 15;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
        
        ctx.restore();
      }
    }

    // 流星类
    class Meteor {
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      opacity: number;
      life: number;
      maxLife: number;

      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = -50;
        this.vx = (Math.random() - 0.5) * 2;
        this.vy = Math.random() * 3 + 2;
        this.size = Math.random() * 2 + 1;
        this.opacity = 1;
        this.maxLife = Math.random() * 100 + 50;
        this.life = this.maxLife;
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;
        this.life--;
        this.opacity = this.life / this.maxLife;
      }

      draw() {
        if (!ctx || this.life <= 0) return;
        
        ctx.save();
        ctx.globalAlpha = this.opacity;
        
        // 流星尾迹
        const gradient = ctx.createLinearGradient(
          this.x, this.y, 
          this.x - this.vx * 10, this.y - this.vy * 10
        );
        gradient.addColorStop(0, '#ffffff');
        gradient.addColorStop(1, 'transparent');
        
        ctx.strokeStyle = gradient;
        ctx.lineWidth = this.size;
        ctx.beginPath();
        ctx.moveTo(this.x, this.y);
        ctx.lineTo(this.x - this.vx * 10, this.y - this.vy * 10);
        ctx.stroke();
        
        ctx.restore();
      }

      isDead() {
        return this.life <= 0 || this.y > canvas.height + 50;
      }
    }

    // 创建粒子和流星
    const particles: Particle[] = [];
    const meteors: Meteor[] = [];
    const particleCount = 60;

    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }

    // 鼠标位置和光晕效果
    let mouseX = 0;
    let mouseY = 0;
    let mouseInfluence = 0;

    // 连接线
    const drawConnections = () => {
      if (!ctx) return;
      
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 120) {
            ctx.save();
            ctx.globalAlpha = (120 - distance) / 120 * 0.3;
            
            // 渐变连接线
            const gradient = ctx.createLinearGradient(
              particles[i].x, particles[i].y,
              particles[j].x, particles[j].y
            );
            gradient.addColorStop(0, particles[i].color);
            gradient.addColorStop(1, particles[j].color);
            
            ctx.strokeStyle = gradient;
            ctx.lineWidth = 1.5;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
            ctx.restore();
          }
        }
      }
    };

    // 绘制鼠标光晕
    const drawMouseGlow = () => {
      if (!ctx || mouseInfluence <= 0) return;
      
      ctx.save();
      ctx.globalAlpha = mouseInfluence * 0.3;
      
      // 外层光晕
      const outerGradient = ctx.createRadialGradient(mouseX, mouseY, 0, mouseX, mouseY, 150);
      outerGradient.addColorStop(0, 'rgba(102, 126, 234, 0.3)');
      outerGradient.addColorStop(0.5, 'rgba(139, 92, 246, 0.2)');
      outerGradient.addColorStop(1, 'transparent');
      
      ctx.fillStyle = outerGradient;
      ctx.beginPath();
      ctx.arc(mouseX, mouseY, 150, 0, Math.PI * 2);
      ctx.fill();
      
      // 内层光晕
      const innerGradient = ctx.createRadialGradient(mouseX, mouseY, 0, mouseX, mouseY, 50);
      innerGradient.addColorStop(0, 'rgba(255, 255, 255, 0.4)');
      innerGradient.addColorStop(1, 'transparent');
      
      ctx.fillStyle = innerGradient;
      ctx.beginPath();
      ctx.arc(mouseX, mouseY, 50, 0, Math.PI * 2);
      ctx.fill();
      
      ctx.restore();
    };

    // 动画循环
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // 随机生成流星
      if (Math.random() < 0.003) {
        meteors.push(new Meteor());
      }

      // 更新和绘制流星
      for (let i = meteors.length - 1; i >= 0; i--) {
        meteors[i].update();
        meteors[i].draw();
        
        if (meteors[i].isDead()) {
          meteors.splice(i, 1);
        }
      }

      // 更新和绘制粒子
      particles.forEach(particle => {
        particle.update();
        particle.draw();
      });

      // 绘制连接线
      drawConnections();
      
      // 绘制鼠标光晕
      drawMouseGlow();
      
      // 鼠标影响衰减
      mouseInfluence *= 0.95;

      requestAnimationFrame(animate);
    };

    animate();

    // 鼠标交互
    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseX = e.clientX - rect.left;
      mouseY = e.clientY - rect.top;
      mouseInfluence = Math.min(mouseInfluence + 0.1, 1);

      particles.forEach(particle => {
        const dx = mouseX - particle.x;
        const dy = mouseY - particle.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < 150) {
          const force = (150 - distance) / 150;
          particle.vx += dx * force * 0.002;
          particle.vy += dy * force * 0.002;
          
          // 增强粒子效果
          particle.opacity = Math.min(particle.opacity + force * 0.1, 1);
          particle.size = particle.originalSize + force * 2;
        }
      });
    };

    const handleMouseLeave = () => {
      mouseInfluence = 0;
    };

    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ background: 'transparent' }}
    />
  );
};

export default AnimatedBackground;