class OverworldEvent {
  constructor({map, event}) {
    this.map = map;
    this.event = event;
  }
  
  stand(resolve) {
    const who = this.map.gameObjects[ this.event.who ];
    who.startBehavior({
      map: this.map,
    }, {
      type: "stand",
      direction: this.event.direction,
      time: this.event.time,
    });
    
    const completeHandler = e => {
      if (e.detail.whoId === this.event.who) {
        document.removeEventListener("PersonStandComplete", completeHandler);
        resolve();
      }
    };
    
    document.addEventListener("PersonStandComplete", completeHandler);
  }
  
  walk(resolve) {
    const who = this.map.gameObjects[ this.event.who ];
    who.startBehavior({
      who: who,
      map: this.map,
    }, {
      type: "walk",
      direction: this.event.direction,
      retry: true,
    });
    
    const completeHandler = e => {
      if (e.detail.whoId === this.event.who) {
        document.removeEventListener("PersonWalkingComplete", completeHandler);
        resolve();
      }
    };
    
    document.addEventListener("PersonWalkingComplete", completeHandler);
  }
  
  
  textMessage(resolve) {
    
    if(this.event.faceHero) {
      const obj = this.map.gameObjects[this.event.faceHero];
      obj.direction = utils.oppositeDirection(this.map.gameObjects["hero"].direction);
    }
    
    const message = new TextMessage({
      text: this.event.text,
      onComplete: () => resolve()
    })
    message.init( document.querySelector(".game-container") )
  }
  
  changeMap(resolve) {
    const sceneTransition = new SceneTransition();
    sceneTransition.init(document.querySelector(".game-container"), () => {
      this.map.overworld.startMap(window.OverworldMaps[this.event.map], {
        x: this.event.x,
        y: this.event.y,
        direction: this.event.direction,
      });

       
      
      resolve();
      
      sceneTransition.fadeOut();
    });
    
  }
  workGateH(resolve) {
    const who = this.map.gameObjects[ this.event.who ];
    var hero = this.map.gameObjects.hero;
    if(who.sprite.currentAnimation !== "gateClosed") {
      if (hero.x/16 > 20 && hero.direction === "right") {
      who.sprite.currentAnimation = "gateClosing";
      console.log("d");
      resolve();
      return;
    }
      if (hero.x/16 < 20 && hero.direction === "left") {
      who.sprite.currentAnimation = "gateClosing";
      console.log("a");
      resolve();
      
      return;
    }
    }
    if (who.sprite.currentAnimation !== "gateOpen") {
      if (hero.x/16 < 20 && hero.direction === "right") {
      who.sprite.currentAnimation = "gateOpening";
      console.log("b");
      resolve();
      return;
    }
      if (hero.x/16 > 20 && hero.direction === "left") {
      who.sprite.currentAnimation = "gateOpening";
      console.log("c");
      resolve();
      return;
    }
    }
  }
  workGateV(resolve) {
    const who = this.map.gameObjects[ this.event.who ];
    var hero = this.map.gameObjects.hero;
    if (20 < hero.y/16 && hero.direction === "down") {
      who.sprite.currentAnimation = "gateClosing";
      console.log("a");
      resolve();
      return;
    }
    if (20 < hero.y/16 && hero.direction === "up") {
      who.sprite.currentAnimation = "gateOpening";
      console.log("b");
      resolve();
      return
    }
    if (20 > hero.y/16 && hero.direction === "down") {
      who.sprite.currentAnimation = "gateOpening";
      console.log("c");
      resolve();
      return
    } else {
      who.sprite.currentAnimation = "gateClosing";
      console.log("d");
      resolve();
      return
    }
    
   

  }
  
  battle(resolve) {
    const battle = new Battle({
      enemy: Enemies[this.event.enemyId],
      onComplete: () => {
        resolve();
      },
      map: this.map,
    })
    battle.init(document.querySelector(".game-container"));
    document.querySelector("#ambientWorldAudio").pause();
    document.querySelector("#ambientWorldAudio").currentTime = 0;
    document.querySelector("#battleMusicAudio").play();
    document.querySelector("#battleMusicAudio").loop = true;
  }
  
  pause(resolve) {
    console.log("pause now");
    this.map.isPaused = true;
    const menu = new PauseMenu({
      progress: this.map.overworld.progress,
      onComplete: () => {
        resolve();
        this.map.isPaused = false;
      },
      map: this.map,
    });
    menu.init(document.querySelector(".game-container"));
  }
  calculator(resolve) {
    console.log("calculator now");
    this.map.isPaused = true;
    const calculator = new Calculator({
      onComplete: () => {
        resolve();
        this.map.isPaused = false;
      },
    });
    calculator.init(document.getElementById("popUpContainer"));
  }
  
  problem(resolve) {
    this.map.isCutscenePlaying = false;
    const problem = new Problem({
      problem: Problems[this.event.problem],
      onComplete: () => {
        resolve();
        this.map.isPaused = false;
        
      }
    })
    problem.init(document.querySelector(".game-container"));
  }
  
  init() {
    return new Promise(resolve => {
      this[this.event.type](resolve);
    });
  }
}
