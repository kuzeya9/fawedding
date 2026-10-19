/**
 * Romantic Bokeh & Petals Particle Animation
 * Gives the authentic Garden Watercolor atmospheric feel.
 */

(function() {
  'use strict';

  const canvas = document.createElement('canvas');
  canvas.id = 'particles-canvas';
  document.body.prepend(canvas);

  const ctx = canvas.getContext('2d');
  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  const particles = [];
  const particleCount = 28;

  class Particle {
    constructor() {
      this.reset(true);
    }

    reset(initial = false) {
      this.x = Math.random() * width;
      this.y = initial ? Math.random() * height : -20;
      this.size = Math.random() * 5 + 3;
      this.speedY = Math.random() * 0.8 + 0.3;
      this.speedX = Math.random() * 0.6 - 0.3;
      this.angle = Math.random() * Math.PI * 2;
      this.spin = Math.random() * 0.02 - 0.01;
      this.opacity = Math.random() * 0.5 + 0.3;
      this.isPetal = Math.random() > 0.4;
      // Soft rose gold / champagne gold / ivory colors
      const colors = ['rgba(255, 240, 225, ', 'rgba(215, 175, 155, ', 'rgba(235, 215, 195, ', 'rgba(255, 255, 255, '];
      this.color = colors[Math.floor(Math.random() * colors.length)];
    }

    update() {
      this.y += this.speedY;
      this.x += Math.sin(this.angle) * 0.5 + this.speedX;
      this.angle += this.spin;

      if (this.y > height + 20 || this.x < -20 || this.x > width + 20) {
        this.reset();
      }
    }

    draw() {
      ctx.save();
      ctx.translate(this.x, this.y);
      ctx.rotate(this.angle);

      if (this.isPetal) {
        // Draw soft petal shape
        ctx.beginPath();
        ctx.fillStyle = this.color + this.opacity + ')';
        ctx.ellipse(0, 0, this.size * 1.5, this.size * 0.8, 0, 0, Math.PI * 2);
        ctx.fill();
      } else {
        // Draw glowing bokeh circle
        ctx.beginPath();
        const grad = ctx.createRadialGradient(0, 0, 0, 0, 0, this.size * 2);
        grad.addColorStop(0, this.color + (this.opacity * 0.8) + ')');
        grad.addColorStop(1, this.color + '0)');
        ctx.fillStyle = grad;
        ctx.arc(0, 0, this.size * 2, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.restore();
    }
  }

  for (let i = 0; i < particleCount; i++) {
    particles.push(new Particle());
  }

  function loop() {
    ctx.clearRect(0, 0, width, height);
    particles.forEach(p => {
      p.update();
      p.draw();
    });
    requestAnimationFrame(loop);
  }

  loop();
})();
