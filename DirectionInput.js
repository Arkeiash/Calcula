class DirectionInput {
  constructor() {
    this.heldDirections = [];
    
    this.map = {
      "ArrowUp": "up",
      "ArrowDown": "down",
      "ArrowLeft": "left",
      "ArrowRight": "right",
      "KeyW": "up",
      "KeyS": "down",
      "KeyA": "left",
      "KeyD": "right",
    };
    
    // For swipe detection
    this.touchStartX = 0;
    this.touchStartY = 0;
    this.touchEndX = 0;
    this.touchEndY = 0;
    this.swipeThreshold = 50; // Adjust this value based on sensitivity
  }

  get direction() {
    return this.heldDirections[0];
  }

  init() {
    // Keyboard events
    document.addEventListener("keydown", e => {
      const dir = this.map[e.code];
      if (dir && this.heldDirections.indexOf(dir) === -1) {
        this.heldDirections.unshift(dir);
      }
    });

    document.addEventListener("keyup", e => {
      const dir = this.map[e.code];
      const index = this.heldDirections.indexOf(dir);
      if (index > -1) {
        this.heldDirections.splice(index, 1);
      }
    });

    // Touch events for swipe detection
    document.addEventListener("touchstart", e => {
      this.touchStartX = e.touches[0].clientX;
      this.touchStartY = e.touches[0].clientY;
    });

    document.addEventListener("touchend", e => {
      this.touchEndX = e.changedTouches[0].clientX;
      this.touchEndY = e.changedTouches[0].clientY;
      this.handleSwipe();
    });

    // Touch event for tap detection
    document.addEventListener("click", () => {
      this.heldDirections = []; // Clear held directions on tap
    });
  }

  handleSwipe() {
    const xDiff = this.touchEndX - this.touchStartX;
    const yDiff = this.touchEndY - this.touchStartY;

    if (Math.abs(xDiff) > Math.abs(yDiff)) { // Horizontal swipe
      if (Math.abs(xDiff) > this.swipeThreshold) {
        if (xDiff > 0) {
          this.addDirection("right");
        } else {
          this.addDirection("left");
        }
      }
    } else { // Vertical swipe
      if (Math.abs(yDiff) > this.swipeThreshold) {
        if (yDiff > 0) {
          this.addDirection("down");
        } else {
          this.addDirection("up");
        }
      }
    }
  }

  addDirection(dir) {
    if (this.heldDirections.indexOf(dir) === -1) {
      this.heldDirections.unshift(dir);
    }
  }
}
