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
    
    // Touch swipe variables
    this.touchStartX = null;
    this.touchStartY = null;
    this.touchEndX = null;
    this.touchEndY = null;
    
    // Minimum distance threshold for swipe detection
    this.swipeThreshold = 50; // Adjust as needed
    
    // Double tap variables
    this.doubleTapDelay = 300; // Maximum delay between taps to consider as a double tap
    this.lastTapTime = 0;
    this.tapCount = 0;
  }
  
  get direction() {
    return this.heldDirections[0];
  }
  
  init() {
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
    
    // Listen for touch start
    document.addEventListener('touchstart', event => {
      this.touchStartX = event.touches[0].clientX;
      this.touchStartY = event.touches[0].clientY;
      
      // Handle double tap logic
      const currentTime = new Date().getTime();
      if (currentTime - this.lastTapTime <= this.doubleTapDelay) {
        this.tapCount++;
      } else {
        this.tapCount = 1;
      }
      
      // Store the last tap time
      this.lastTapTime = currentTime;
      
      // Check if it's a double tap
      if (this.tapCount === 2) {
        this.handleDoubleTap();
        this.tapCount = 0; // Reset tap count after handling double tap
      }
    });
    
    // Listen for touch move (to determine direction)
    document.addEventListener('touchmove', event => {
      this.touchEndX = event.touches[0].clientX;
      this.touchEndY = event.touches[0].clientY;
    });
    
    // Listen for touch end
    document.addEventListener('touchend', () => {
      if (this.touchStartX !== null && this.touchEndX !== null && this.touchStartY !== null && this.touchEndY !== null) {
        let deltaX = this.touchEndX - this.touchStartX;
        let deltaY = this.touchEndY - this.touchStartY;
        
        // Determine predominant direction
        if (Math.abs(deltaX) > Math.abs(deltaY)) {
          // Horizontal swipe
          if (deltaX > this.swipeThreshold) {
            this.heldDirections.unshift("right");
          } else if (deltaX < -this.swipeThreshold) {
            this.heldDirections.unshift("left");
          }
        } else {
          // Vertical swipe
          if (deltaY > this.swipeThreshold) {
            this.heldDirections.unshift("down");
          } else if (deltaY < -this.swipeThreshold) {
            this.heldDirections.unshift("up");
          }
        }
        
        // Reset touch variables
        this.touchStartX = null;
        this.touchStartY = null;
        this.touchEndX = null;
        this.touchEndY = null;
      }
    });
  }
  
  // Function to handle the action on double tap
  handleDoubleTap() {
    // Simulate keyup action
    const dir = this.heldDirections[0];
    const index = this.heldDirections.indexOf(dir);
    if (index > -1) {
      this.heldDirections.splice(index, 1);
    }
  }
}

// Usage example:
const directionInput = new DirectionInput();
directionInput.init();

// Now you can access the current direction:
// directionInput.direction will give you the current held direction
