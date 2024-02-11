let highestZ = 1;

class Paper {
  constructor() {
    this.holdingPaper = false;
    this.mouseTouchX = 0;
    this.mouseTouchY = 0;
    this.mouseX = 0;
    this.mouseY = 0;
    this.prevMouseX = 0;
    this.prevMouseY = 0;
    this.velX = 0;
    this.velY = 0;
    this.rotation = Math.random() * 30 - 15;
    this.currentPaperX = 0;
    this.currentPaperY = 0;
    this.rotating = false;
  }

  init(paper) {
    const moveHandler = (e) => {
      // Normalize touch and mouse coordinates
      const clientX = e.touches ? e.touches[0].clientX : e.clientX;
      const clientY = e.touches ? e.touches[0].clientY : e.clientY;

      if (!this.rotating) {
        this.velX = clientX - this.prevMouseX;
        this.velY = clientY - this.prevMouseY;
      }

      if (this.holdingPaper) {
        if (!this.rotating) {
          this.currentPaperX += this.velX;
          this.currentPaperY += this.velY;
          paper.style.transform = `translateX(${this.currentPaperX}px) translateY(${this.currentPaperY}px) rotateZ(${this.rotation}deg)`;
        }
        this.prevMouseX = clientX;
        this.prevMouseY = clientY;
      }
    };

    const startHandler = (e) => {
      // Prevent multiple touches from interfering
      if (e.touches && e.touches.length > 1) return;
      this.holdingPaper = true;
      paper.style.zIndex = highestZ++;
      const clientX = e.touches ? e.touches[0].clientX : e.clientX;
      const clientY = e.touches ? e.touches[0].clientY : e.clientY;
      this.mouseTouchX = clientX;
      this.mouseTouchY = clientY;
      this.prevMouseX = clientX;
      this.prevMouseY = clientY;
      e.preventDefault(); // Prevent text selection on drag
    };

    const endHandler = () => {
      this.holdingPaper = false;
      this.rotating = false;
    };

    // Attach mouse event listeners
    paper.addEventListener('mousedown', startHandler);
    document.addEventListener('mousemove', moveHandler);
    document.addEventListener('mouseup', endHandler);

    // Attach touch event listeners
    paper.addEventListener('touchstart', startHandler);
    document.addEventListener('touchmove', moveHandler, { passive: false });
    document.addEventListener('touchend', endHandler);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const papers = document.querySelectorAll('.paper');
  papers.forEach(paper => {
    const p = new Paper();
    p.init(paper);
  });
});

