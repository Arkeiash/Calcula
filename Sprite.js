class Sprite {
  constructor(config) {
    this.size = config.size || 32;
    this.type = config.type;
    this.image = new Image();
    this.image.src = config.src;
    this.image.onload = () => {
      this.isLoaded = true;
    };
    
    this.shadow = new Image();
    this.useShadow = config.useShadow;
    if (this.useShadow) {
      this.shadow.src = "Images/Characters/shadow.png";
      this.shadow.onload = () => {
        this.isShadowLoaded = true;
      }
    } else {this.isShadowLoaded = false; }
    
    this.animations = config.animations || {
      "idle-down": [ [0, 0], ],
      "idle-up": [ [4, 0], ],
      "idle-left": [ [8, 0], ],
      "idle-right": [ [12, 0], ],
      
      "walk-down": [[0,0], [1,0], [2,0], [3,0],],
      "walk-up": [[4,0], [5,0], [6,0], [7,0],],
      "walk-left": [[8,0], [9,0], [10,0], [11,0],],
      "walk-right": [[12,0], [13,0], [14,0], [15,0],],
      
      "gateOpening": [[0,0], [1,0], [2,0], [3,0], [4,0], [5,0], [6,0], [7,0],[8,0],],
      "gateClosing": [[8,0],[7,0], [6,0], [5,0], [4,0], [3,0], [2,0], [1,0], [0,0],],
      
      "gateOpen": [[8,0],],
      "gateClosed": [[0,0],],
      
      
    };
    this.currentAnimation = config.currentAnimation || "idle-down";
    this.currentAnimationFrame = 0;
    
    this.animationFrameLimit = config.animationFrameLimit || 12;
    this.animationFrameProgress = this.animationFrameLimit;
    
    this.gameObject = config.gameObject;
  }
  
  get frame() {
    return this.animations[this.currentAnimation][this.currentAnimationFrame];
  }
  
  setAnimation(key) {
    if (this.currentAnimation !== key) {
      this.currentAnimation = key;
      this.currentAnimationFrame = 0;
      this.animationFrameProgress = this.animationFrameLimit;
    }
  }
  
  updateAnimationProgress() {
    if(this.animationFrameProgress > 0) {
      this.animationFrameProgress -= 1;
      return;
    }
    
    this.animationFrameProgress = this.animationFrameLimit;
    this.currentAnimationFrame += 1;
    
    if(this.frame === undefined && this.currentAnimation === "gateOpening") {
      this.currentAnimation = "gateOpen"
      console.log("open");
      
    } if(this.frame === undefined && this.currentAnimation === "gateClosing") {
      this.currentAnimation = "gateClosed"
    }
    
    if(this.frame === undefined && this.gameObject !== "gate") {
      this.currentAnimationFrame = 0;
    }
    
    
  }
  
  
  draw(ctx, cameraPerson) {
    var x = this.gameObject.x-8 + utils.withGrid(10.5) - cameraPerson.x;
    var y = this.gameObject.y-18 + utils.withGrid(6) - cameraPerson.y;
    
    
    if(this.size !== 32 && this.type !== "RaiderRow") {
      x = this.gameObject.x + utils.withGrid(10.5) - cameraPerson.x;
      y = this.gameObject.y-128 + utils.withGrid(6) - cameraPerson.y;
    } else {
      x = this.gameObject.x + utils.withGrid(10.5) - cameraPerson.x;
      y = this.gameObject.y-80 + utils.withGrid(6) - cameraPerson.y;
    }
    if (this.isShadowLoaded && this.useShadow) {
      ctx.drawImage(this.shadow, x-0.5, y+1);
    }
    
    
    const [frameX, frameY] = this.frame;
    
    this.isLoaded && ctx.drawImage(this.image,
    frameX*this.size, frameY*this.size,
    this.size, this.size,
    x, y,
    this.size, this.size
    );
    this.updateAnimationProgress();
    
  }
  
  
}
