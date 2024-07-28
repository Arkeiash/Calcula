class Overworld {
  constructor(config) {
    this.element = config.element;
    this.canvas = this.element.querySelector(".game-canvas");
    this.ctx = this.canvas.getContext("2d");
    this.map = null;
  }
  
  
  startGameLoop() {
    const step = () => {
      
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      //console.log(`${window.Enemies["raider1"].x} ${window.Enemies["raider1"].y}`);
      //console.log(`${this.map.gameObjects.hero.x/16} ${this.map.gameObjects.hero.y/16}`);
      //console.log(this.map.gameObjects.raider1.isMounted);
      //console.log(this.map.isCutscenePlaying)
      
      
      
      
      const cameraPerson = this.map.gameObjects.hero;
      
      
      Object.values(this.map.gameObjects).forEach(object => {
        object.update({
          arrow: this.directionInput.direction,
          map: this.map,
        });
      });
      Object.values(this.map.gameObjects).filter(o => o.canBattle === true).forEach(object => {
        object.updateAlive();
      });
      
      this.map.drawLowerImage(this.ctx, cameraPerson);
      
      Object.values(this.map.gameObjects).filter(object => object.alive === true).sort((a,b) => {
        return a.y - b.y;
      }).forEach(object => {
        object.sprite.draw(this.ctx, cameraPerson);
        object.checkForClose(this.map.gameObjects.hero.x, this.map.gameObjects.hero.y);
      });
      
      this.map.drawUpperImage(this.ctx, cameraPerson);
      console.log(`${this.map.gameObjects.hero.x/16}, ${this.map.gameObjects.hero.y/16}`);
      
      
      requestAnimationFrame(() => {
        step();
      });
      
    };
    step();
  }
  
  bindActionInput() {
    new KeyPressListener("Enter", () => {
      this.map.checkForActionCutscene()
    })
    new KeyPressListener("KeyP", () => {
      if (!this.map.isCutscenePlaying) {
        this.map.startCutscene([
          {type: "pause"}
        ])
      }
    })
    new KeyPressListener("KeyC", () => {
       if (!this.map.isCalculator) {
        this.map.startCutscene([
          {type: "calculator"}
        ])
       }
    })
  }
  bindHeroPositionCheck() {
    document.addEventListener("PersonWalkingComplete", e => {
      if (e.detail.whoId === "hero") {
        this.map.checkForFootstepCutscene();
      }
    });
  }
  
  startMap(mapConfig, heroInitialState=null) {
    this.map = new OverworldMap(mapConfig);
    this.map.overworld = this;
    this.map.mountObjects();
    
    if(heroInitialState) {
      const {hero} = this.map.gameObjects;
      this.map.removeWall(hero.x, hero.y)
      hero.x = heroInitialState.x;
      hero.y = heroInitialState.y;
      hero.direction = heroInitialState.direction;
      this.map.addWall(hero.x, hero.y)
      this.map.updateChunks(hero.x, hero.y);
    }
    this.progress.mapId = mapConfig.id;
    this.progress.startingHeroX = this.map.gameObjects.hero.x;
    this.progress.startingHeroY = this.map.gameObjects.hero.y;
    this.progress.startingHeroDirection = this.map.gameObjects.hero.direction;
    
  }
  
  async init() {
    
    const container = document.querySelector(".game-container");
    
    this.progress = new Progress();
    
    this.titleScreen = new TitleScreen({
      progress: this.progress,
    });
    const useSaveFile = await this.titleScreen.init(container);

    let initialHeroState = null;
    const saveFile = this.progress.getSaveFile();
    if(useSaveFile) {
      this.progress.load();
      initialHeroState = {
        x: this.progress.startingHeroX,
        y: this.progress.startingHeroY,
        direction: this.progress.startingHeroDirection,
        
      }
    }
    
    this.hud = new Hud();
    this.hud.init(container);
    
    
    this.startMap(window.OverworldMaps[this.progress.mapId], initialHeroState);
    
    this.bindActionInput();
    this.bindHeroPositionCheck();
    
    this.directionInput = new DirectionInput();
    this.directionInput.init();
    this.directionInput.direction;
    
    this.startGameLoop();
    
    //this.map.startCutscene([
    // {type: "problem", problem: "maim1"},
    //]);
    
    
    
  }
  
}
