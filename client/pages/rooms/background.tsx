import React, { useEffect, useRef } from 'react';

const Fireworks: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const particles: Particle[] = [];

  class Particle {
    x: number;
    y: number;
    speed: number;
    direction: number;
    size: number;
    color: string;
    life: number;

    constructor(x: number, y: number) {
      this.x = x;
      this.y = y;
      this.speed = Math.random() * 2 + 1;
      this.direction = Math.random() * Math.PI * 2;
      this.size = Math.random() * 3 + 1;
      this.color = `hsl(${Math.random() * 360}, 100%, 50%)`;
      this.life = 100;
    }

    update() {
      this.x += Math.cos(this.direction) * this.speed;
      this.y += Math.sin(this.direction) * this.speed;
      this.size *= 0.96; // 減衰効果
      this.life--;
    }

    draw(ctx: CanvasRenderingContext2D) {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fillStyle = this.color;
      ctx.fill();
    }
  }

  const createFirework = (x: number, y: number) => {
    for (let i = 0; i < 50; i++) {
      particles.push(new Particle(x, y));
    }
  };

  const updateCanvas = (ctx: CanvasRenderingContext2D) => {
    // 背景を半透明で塗りつぶして、前のフレームの残像を残す
    ctx.fillStyle = 'rgba(0, 0, 0, 0.2)';
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);

    for (let i = particles.length - 1; i >= 0; i--) {
      const particle = particles[i];
      particle.update();
      particle.draw(ctx);

      // パーティクルの寿命が尽きたら配列から削除
      if (particle.life <= 0) {
        particles.splice(i, 1);
      }
    }

    requestAnimationFrame(() => updateCanvas(ctx));
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // 初期の描画を開始
    updateCanvas(ctx);

    // キャンバスのクリックイベントの設定
    const handleCanvasClick = (event: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      createFirework(x, y);
    };

    canvas.addEventListener('click', handleCanvasClick);

    // コンポーネントのクリーンアップ
    return () => {
      canvas.removeEventListener('click', handleCanvasClick);
    };
  }, []);

  return <canvas ref={canvasRef} width={800} height={600} />;
};

export default Fireworks;
