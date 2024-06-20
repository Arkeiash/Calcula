class Person extends GameObject {
  constructor(config) {
    super(config);
    this.movingProgressRemaining = 0;
    this.isStanding = false;
    this.openProgressRemaining = 0;
    this.closeProgressRemaining = 0;
    this.isPlayerControlled = config.isPlayerControlled || false;
    this.canBattle = config.canBattle || false;
    this.alive = true;
    this.directionUpdate = {
      "up": ["y", -1],
      "down": ["y", 1],
      "left": ["x", -1],
      "right": ["x", 1],
    }
    
  }
  
  update(state) {
    if (this.movingProgressRemaining > 0 && this.alive) {
      this.updatePosition();
    } else {
      if (!state.map.isCutscenePlaying && this.isPlayerControlled && state.arrow) {
        this.startBehavior(state, {
          type: "walk",
          direction: state.arrow,
        })
      }
      this.updateSprite(state);
    }
  }
  
  startBehavior(state, behavior) {
    this.direction = behavior.direction;
    if(behavior.type === "walk" && this.alive) {
      if(state.map.isSpaceTaken(this.x, this.y, this.direction)) {
        behavior.retry && setTimeout(() => {
          this.startBehavior(state, behavior)
        }, 10)
        return;
      }
      state.map.moveWall(this.x, this.y, this.direction);
      this.movingProgressRemaining = 16;
      this.updateSprite(state);
      if(state.who.id === "hero") {
        state.map.updateChunks(this.x, this.y);
      }
    
    }
    if(behavior.type === "stand") {
      this.isStanding = true;
      setTimeout(() => {
        utils.emitEvent("PersonStandComplete", {
          whoId: this.id
        });
        this.isStanding = false;
      }, behavior.time)
    }
    
  }
  
  updateAlive() {
      this.alive = window.Enemies[this.id].alive;
    
  }
  
  updatePosition() {
    
      const [property, change] = this.directionUpdate[this.direction];
      this[property] += change;
      this.movingProgressRemaining -= 1;
      
      if(this.movingProgressRemaining === 0) {
        utils.emitEvent("PersonWalkingComplete", {
          whoId: this.id
        });
      }
      if(this.id !== "hero") {
        window.Enemies[this.id][property] = this[property];
      }
    
  }


  updateSprite() {
    
    if(this.movingProgressRemaining > 0) {
      this.sprite.setAnimation("walk-"+this.direction);
      return;
    }
  
    if (this.movingProgressRemaining === 0 && this.id !== "gate") {
      this.sprite.setAnimation("idle-"+this.direction);
      return;
    }
    
  }
}
