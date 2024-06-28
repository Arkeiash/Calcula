class GameObject {
  constructor(config) {
    this.size = config.size || 32;
    this.id = null;
    this.class = config.class;
    this.alive = true;
    this.statDisplay = false;
    this.isMounted = false;
    this.heroIsClose = false;
    this.message = null;
    this.x = config.x || 0;
    this.y = config.y || 0;
    this.direction = config.direction || "down";
    this.useShadow = config.useShadow;
    this.currentAnimation = config.currentAnimation,
    this.sprite = new Sprite({
      gameObject: this,
      src: config.src || "Images/Characters/Hero Sprite Sheet.png",
      size: this.size,
      type: config.type || null,
      currentAnimation: this.currentAnimation,
      useShadow: this.useShadow,
    });
    
    this.behaviorLoop = config.behaviorLoop || [];
    this.behaviorLoopIndex = 0;
    
    this.talking = config.talking || [];
  }
  
  mount(map) {
    this.isMounted = true;
    map.addWall(this.x, this.y);
    console.log("mount");
    
    setTimeout(() => {
      this.doBehaviorEvent(map);
    }, 10);
  }
  dismount(map) {
    this.isMounted = false;
    map.removeWall(this.x, this.y);
  }
  
  update() {
    
  }

  checkForClose(heroX, heroY) {
    if(Math.abs(this.x/16 - heroX/16) <= 1 && Math.abs(this.y/16 - heroY/16) <= 1 && this.id !== "hero" && this.heroIsClose === false
     && this.id !== "gate" && this.class !== "object") { 
      this.heroIsClose = true; 
      console.log("Hero is close");
      const container = document.querySelector(".game-container");
      this.message = new StatBar({
        x: this.x,
        y: this.y +32,
        name: this.name,
        health: window.Enemies[this.id].hp,
        shield: window.Enemies[this.id].barrier,
        amplification: window.Enemies[this.id].amplification,
        fortification: window.Enemies[this.id].fortification,
      })
      this.message.init(container);
    }
    if(this.heroIsClose === true) {
      if(Math.abs(this.x/16 - heroX/16) > 1 || Math.abs(this.y/16 - heroY/16) > 1) {
        this.message.done();
        this.heroIsClose = false;
      }
    }
  }

  
  async doBehaviorEvent(map) {
    
    if (map.isCutscenePlaying || this.isStanding || this.behaviorLoop.length === 0) {
      return;
    }
    
    let eventConfig = this.behaviorLoop[this.behaviorLoopIndex];
    eventConfig.who = this.id;
    
    const eventHandler = new OverworldEvent({ map, event: eventConfig });
    await eventHandler.init();
    
    this.behaviorLoopIndex += 1;
    if (this.behaviorLoopIndex === this.behaviorLoop.length) {
      this.behaviorLoopIndex = 0;
    }
    
    this.doBehaviorEvent(map);
  }
}
//Can you see me?
