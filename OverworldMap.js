class OverworldMap {
  constructor(config) {
    this.overworld = null;
    this.gameObjects = config.gameObjects;
    this.cutsceneSpaces = config.cutsceneSpaces || {};
    this.walls = config.walls || {};
    
    
    this.AChunk = config.AChunk;
    this.BChunk = config.BChunk;
    this.CChunk = config.CChunk;
    this.DChunk = config.DChunk;
    
    this.chunks = config.chunks;
    
    this.lowerImageA = new Image();
    this.lowerImageA.src = config.lowerASrc;
    this.lowerImageB = new Image();
    this.lowerImageB.src = config.lowerBSrc;
    this.lowerImageC = new Image();
    this.lowerImageC.src = config.lowerCSrc;
    this.lowerImageD = new Image();
    this.lowerImageD.src = config.lowerDSrc;
    
    this.waterImageA = new Image();
    this.waterImageA.src = config.waterASrc;
    this.waterImageB = new Image();
    this.waterImageB.src = config.waterBSrc;
    this.waterImageC = new Image();
    this.waterImageC.src = config.waterCSrc;
    this.waterImageD = new Image();
    this.waterImageD.src = config.waterDSrc;
    
    this.upperImageA = new Image();
    this.upperImageA.src = config.upperASrc;
    this.upperImageB = new Image();
    this.upperImageB.src = config.upperBSrc;
    this.upperImageC = new Image();
    this.upperImageC.src = config.upperCSrc;
    this.upperImageD = new Image();
    this.upperImageD.src = config.upperDSrc;
    
    this.isCutscenePlaying = false;
    this.isPaused = false;
    this.oscilator = 0;
  }
  
  
  
  drawLowerImage(ctx, cameraPerson) {
    if(this.lowerImageA.src) {
      ctx.drawImage(
            this.lowerImageA,
            utils.withGrid(10.5) - cameraPerson.x + this.AChunk.coords[0],
            utils.withGrid(6) - cameraPerson.y + this.AChunk.coords[1]
          );
    }
    if(this.lowerImageB.src) {
      ctx.drawImage(
            this.lowerImageB,
            utils.withGrid(10.5) - cameraPerson.x + this.BChunk.coords[0],
            utils.withGrid(6) - cameraPerson.y + this.BChunk.coords[1]
          );
    }
    if(this.lowerImageC.src) {
      ctx.drawImage(
            this.lowerImageC,
            utils.withGrid(10.5) - cameraPerson.x + this.CChunk.coords[0],
            utils.withGrid(6) - cameraPerson.y+ this.CChunk.coords[1]
          );
    }
    if(this.lowerImageD.src) {
      ctx.drawImage(
            this.lowerImageD,
            utils.withGrid(10.5) - cameraPerson.x + this.DChunk.coords[0],
            utils.withGrid(6) - cameraPerson.y+ this.DChunk.coords[1]
          );
    }
        
    if(this.oscilator % 50 < 25) {
      ctx.drawImage(
          this.waterImageA,
          utils.withGrid(10.5) - cameraPerson.x + this.AChunk.coords[0],
          utils.withGrid(6) - cameraPerson.y + this.AChunk.coords[1]
        );
      ctx.drawImage(
            this.waterImageB,
            utils.withGrid(10.5) - cameraPerson.x + this.BChunk.coords[0],
            utils.withGrid(6) - cameraPerson.y+ this.BChunk.coords[1]
          );
      ctx.drawImage(
            this.waterImageC,
            utils.withGrid(10.5) - cameraPerson.x + this.CChunk.coords[0],
            utils.withGrid(6) - cameraPerson.y+ this.CChunk.coords[1]
          );
      ctx.drawImage(
            this.waterImageD,
            utils.withGrid(10.5) - cameraPerson.x + this.DChunk.coords[0],
            utils.withGrid(6) - cameraPerson.y+ this.DChunk.coords[1]
          );
    }
    this.oscilator ++;
  }
  drawUpperImage(ctx, cameraPerson) {
    if(this.upperImageA.src) {
      ctx.drawImage(
            this.upperImageA,
            utils.withGrid(10.5) - cameraPerson.x + this.AChunk.coords[0],
            utils.withGrid(6) - cameraPerson.y + this.AChunk.coords[1]
          );
    }
    if(this.upperImageB.src) {
      ctx.drawImage(
            this.upperImageB,
            utils.withGrid(10.5) - cameraPerson.x + this.BChunk.coords[0],
            utils.withGrid(6) - cameraPerson.y + this.BChunk.coords[1]
          );
    }
    if(this.upperImageC.src) {
      ctx.drawImage(
            this.upperImageC,
            utils.withGrid(10.5) - cameraPerson.x + this.CChunk.coords[0],
            utils.withGrid(6) - cameraPerson.y+ this.CChunk.coords[1]
          );
    }
    if(this.upperImageD.src) {
      ctx.drawImage(
            this.upperImageD,
            utils.withGrid(10.5) - cameraPerson.x + this.DChunk.coords[0],
            utils.withGrid(6) - cameraPerson.y+ this.DChunk.coords[1]
          );
    }
        
    
  }
  
  isSpaceTaken(currentX, currentY, direction) {
    const {x,y} = utils.nextPosition(currentX, currentY, direction);
    return this.walls[`${x},${y}`] || false;
  }
  
  mountObjects() {
    Object.keys(this.gameObjects).forEach(key => {
      let object = this.gameObjects[key];
      object.id = key;
      object.mount(this);
      
      
    })
  }
  dismountObjects() {
    Object.keys(this.gameObjects).filter(object => object.alive === true).forEach(key => {
      let object = this.gameObjects[key];
      object.id = key;
      object.dismount(this);
    })
  }
  
  async startCutscene(events) {
    this.isCutscenePlaying = true;
    const hero = this.gameObjects["hero"];
    for (let i = 0; i<events.length; i++) {
      const eventHandler = new OverworldEvent({
        event: events[i],
        map: this,
      })
      await eventHandler.init();
    }
    
    this.isCutscenePlaying = false;
    Object.values(this.gameObjects).forEach(object => object.doBehaviorEvent(this))
    this.inWhichChunk = null;
    this.updateChunks(hero.x, hero.y);
  }
  
  
  checkForActionCutscene() {
    const hero = this.gameObjects["hero"];
    const nextCoords = utils.nextPosition(hero.x, hero.y, hero.direction);
    const match = Object.values(this.gameObjects).find(object => {
      return `${object.x},${object.y}` === `${nextCoords.x},${nextCoords.y}`
    });
    if (!this.isCutscenePlaying && match && match.talking.length) {
      this.startCutscene(match.talking[0].events);
    }
  }
  
   checkForFootstepCutscene() {
    const hero = this.gameObjects["hero"];
    const match = this.cutsceneSpaces[`${hero.x},${hero.y}`];
    if (!this.isCutscenePlaying && match) {
      this.startCutscene(match[0].events);
    }
  }
  
  addWall(x,y) {
    this.walls[`${x},${y}`] = true;
    
  }
  removeWall(x,y) {
    delete this.walls[`${x},${y}`]
    //console.log(`moving! ${x} ${y}`);
  }
  moveWall(wasX, wasY, direction) {
    this.removeWall(wasX, wasY);
    const {x,y} = utils.nextPosition(wasX, wasY, direction);
    this.addWall(x,y);
    //console.log(`moving! ${x} ${y}`);
  }
  updateChunks(x, y) {
    var chunkX = Math.floor(x/16/49);
    var chunkY = Math.floor(y/16/49);
    
    var relXPos = x - chunkX*16*49;
    var relYPos = y - chunkY*16*49;
  
    if(relXPos >= 392 && relYPos >= 392 && this.inWhichChunk !== "A") {
   
      if(this.chunks[`${chunkX}-${chunkY}`]) {
        this.inWhichChunk = "A";
        this.lowerImageA.src = this.chunks[`${chunkX}-${chunkY}`].Gsrc || null
        this.waterImageA.src = this.chunks[`${chunkX}-${chunkY}`].Wsrc || null
        this.upperImageA.src = this.chunks[`${chunkX}-${chunkY}`].Usrc || null
        this.AChunk = this.chunks[`${chunkX}-${chunkY}`] || null
      }
      if(this.chunks[`${chunkX+1}-${chunkY+1}`]) {
        this.lowerImageD.src = this.chunks[`${chunkX+1}-${chunkY+1}`].Gsrc || null
        this.waterImageD.src = this.chunks[`${chunkX+1}-${chunkY+1}`].Wsrc || null
        this.upperImageD.src = this.chunks[`${chunkX+1}-${chunkY+1}`].Usrc || null
        this.DChunk = this.chunks[`${chunkX+1}-${chunkY+1}`] || null
      }
      if(this.chunks[`${chunkX}-${chunkY+1}`]) {
        this.lowerImageC.src = this.chunks[`${chunkX}-${chunkY+1}`].Gsrc || null
        this.waterImageC.src = this.chunks[`${chunkX}-${chunkY+1}`].Wsrc || null
        this.upperImageC.src = this.chunks[`${chunkX}-${chunkY+1}`].Usrc || null
        this.CChunk = this.chunks[`${chunkX}-${chunkY+1}`] || null
      }
      if(this.chunks[`${chunkX+1}-${chunkY}`]) {
        this.lowerImageB.src = this.chunks[`${chunkX+1}-${chunkY}`].Gsrc || null
        this.waterImageB.src = this.chunks[`${chunkX+1}-${chunkY}`].Wsrc || null
        this.upperImageB.src = this.chunks[`${chunkX+1}-${chunkY}`].Usrc || null
        this.BChunk = this.chunks[`${chunkX+1}-${chunkY}`] || null
      }
      console.log("You are in Chunk A")
      console.log(this.upperImageA.src)
    }
    if(relXPos < 392 && relYPos < 392 && this.inWhichChunk !== "D") {
      this.inWhichChunk = "D";
   
      if(this.chunks[`${chunkX-1}-${chunkY-1}`]) {
        this.lowerImageA.src = this.chunks[`${chunkX-1}-${chunkY-1}`].Gsrc || null
        this.waterImageA.src = this.chunks[`${chunkX-1}-${chunkY-1}`].Wsrc || null
        this.upperImageA.src = this.chunks[`${chunkX-1}-${chunkY-1}`].Usrc || null
        this.AChunk = this.chunks[`${chunkX-1}-${chunkY-1}`] || null
      }
      if(this.chunks[`${chunkX}-${chunkY}`]) {
        this.lowerImageD.src = this.chunks[`${chunkX}-${chunkY}`].Gsrc || null
        this.waterImageD.src = this.chunks[`${chunkX}-${chunkY}`].Wsrc || null
        this.upperImageD.src = this.chunks[`${chunkX}-${chunkY}`].Usrc || null
        this.DChunk = this.chunks[`${chunkX}-${chunkY}`] || null
      }
      if(this.chunks[`${chunkX-1}-${chunkY}`]) {
        this.lowerImageC.src = this.chunks[`${chunkX-1}-${chunkY}`].Gsrc
        this.waterImageC.src = this.chunks[`${chunkX-1}-${chunkY}`].Wsrc
        this.upperImageC.src = this.chunks[`${chunkX-1}-${chunkY}`].Usrc
        this.CChunk = this.chunks[`${chunkX-1}-${chunkY}`] || null
      }
      if(this.chunks[`${chunkX}-${chunkY-1}`]) {
        this.lowerImageB.src = this.chunks[`${chunkX}-${chunkY-1}`].Gsrc || null
        this.waterImageB.src = this.chunks[`${chunkX}-${chunkY-1}`].Wsrc || null
        this.upperImageB.src = this.chunks[`${chunkX}-${chunkY-1}`].Usrc || null
        this.BChunk = this.chunks[`${chunkX}-${chunkY-1}`] || null
      }
      console.log("You are in Chunk D")
      console.log(this.upperImageD.src)
    }
    if(relXPos >= 392 && relYPos < 392 && this.inWhichChunk !== "C") {
      this.inWhichChunk = "C";
   
      if(this.chunks[`${chunkX}-${chunkY-1}`]) {
        this.lowerImageA.src = this.chunks[`${chunkX}-${chunkY-1}`].Gsrc || null
        this.waterImageA.src = this.chunks[`${chunkX}-${chunkY-1}`].Wsrc || null
        this.upperImageA.src = this.chunks[`${chunkX}-${chunkY-1}`].Usrc || null
        this.AChunk = this.chunks[`${chunkX}-${chunkY-1}`] || null
      }
      if(this.chunks[`${chunkX+1}-${chunkY}`]) {
        this.lowerImageD.src = this.chunks[`${chunkX+1}-${chunkY}`].Gsrc || null
        this.waterImageD.src = this.chunks[`${chunkX+1}-${chunkY}`].Wsrc || null
        this.upperImageD.src = this.chunks[`${chunkX+1}-${chunkY}`].Usrc || null
        this.DChunk = this.chunks[`${chunkX+1}-${chunkY}`] || null
      }
      if(this.chunks[`${chunkX}-${chunkY}`]) {
        this.lowerImageC.src = this.chunks[`${chunkX}-${chunkY}`].Gsrc || null
        this.waterImageC.src = this.chunks[`${chunkX}-${chunkY}`].Wsrc || null
        this.upperImageC.src = this.chunks[`${chunkX}-${chunkY}`].Usrc || null
        this.CChunk = this.chunks[`${chunkX}-${chunkY}`] || null
      }
      if(this.chunks[`${chunkX+1}-${chunkY-1}`]) {
        this.lowerImageB.src = this.chunks[`${chunkX+1}-${chunkY-1}`].Gsrc || null
        this.waterImageB.src = this.chunks[`${chunkX+1}-${chunkY-1}`].Wsrc || null
        this.upperImageB.src = this.chunks[`${chunkX+1}-${chunkY-1}`].Usrc || null
        this.BChunk = this.chunks[`${chunkX+1}-${chunkY-1}`] || null
      }
      console.log("You are in Chunk C")
      console.log(this.upperImageC.src)
    }
    if(relXPos < 392 && relYPos >= 392 && this.inWhichChunk !== "B") {

      this.inWhichChunk = "B";
      if(this.chunks[`${chunkX-1}-${chunkY}`]) {
        this.lowerImageA.src = this.chunks[`${chunkX-1}-${chunkY}`].Gsrc || null
        this.waterImageA.src = this.chunks[`${chunkX-1}-${chunkY}`].Wsrc || null
        this.upperImageA.src = this.chunks[`${chunkX-1}-${chunkY}`].Usrc || null
        this.AChunk = this.chunks[`${chunkX-1}-${chunkY}`] || null
      }
      if(this.chunks[`${chunkX}-${chunkY+1}`]) {
        this.lowerImageD.src = this.chunks[`${chunkX}-${chunkY+1}`].Gsrc || null
        this.waterImageD.src = this.chunks[`${chunkX}-${chunkY+1}`].Wsrc || null
        this.upperImageD.src = this.chunks[`${chunkX}-${chunkY+1}`].Usrc || null
        this.DChunk = this.chunks[`${chunkX}-${chunkY+1}`] || null
      }
      if(this.chunks[`${chunkX-1}-${chunkY+1}`]) {
        this.lowerImageC.src = this.chunks[`${chunkX-1}-${chunkY+1}`].Gsrc || null
        this.waterImageC.src = this.chunks[`${chunkX-1}-${chunkY+1}`].Wsrc || null
        this.upperImageC.src = this.chunks[`${chunkX-1}-${chunkY+1}`].Usrc || null
        this.CChunk = this.chunks[`${chunkX-1}-${chunkY+1}`] || null
      }
      if(this.chunks[`${chunkX}-${chunkY}`]) {
        this.lowerImageB.src = this.chunks[`${chunkX}-${chunkY}`].Gsrc  || null
        this.waterImageB.src = this.chunks[`${chunkX}-${chunkY}`].Wsrc  || null
        this.upperImageB.src = this.chunks[`${chunkX}-${chunkY}`].Usrc  || null
        this.BChunk = this.chunks[`${chunkX}-${chunkY}`] || null
      }
      console.log("You are in Chunk B")
      console.log(this.upperImageB.src)
    }
    
    
    
    
  
  }
  
}

window.OverworldMaps = {
  DemoRoom1: {
    id: "DemoRoom1",
    lowerASrc: "Images/Maps/C3-5-G.png",
    lowerBSrc: "Images/Maps/C3-5-G.png",
    lowerCSrc: "Images/Maps/C3-5-G.png",
    lowerDSrc: "Images/Maps/C3-5-G.png",
    waterASrc: "Images/Maps/C3-5-W.png",
    waterBSrc: "Images/Maps/C3-5-W.png",
    waterCSrc: "Images/Maps/C3-5-W.png",
    waterDSrc: "Images/Maps/C3-5-W.png",
    upperASrc: "Images/Maps/C3-5-U.png",
    upperBSrc: "Images/Maps/C3-5-U.png",
    upperCSrc: "Images/Maps/C3-5-U.png",
    upperDSrc: "Images/Maps/C3-5-U.png",
    gameObjects: {
      hero: new Person({
        isPlayerControlled: true,
        x: utils.withGrid(20),
        y: utils.withGrid(15),
        useShadow: true,
      }),
      gate: new Person({
        x: utils.withGrid(20),
        y: utils.withGrid(22),
        size: 128,
        useShadow: false,
        currentAnimation: "gateOpen",
        src: "Images/Objects/Castle Gate.png",
      }),
      raider1: new Person({
        x: utils.withGrid(7),
        y: utils.withGrid(7),
        canBattle: true,
        alive: true,
        useShadow: true,
        src: "Images/Characters/Raider Sprite Sheet.png",
        behaviorLoop: [
          {type: "stand", direction: "down", time: 2000},
          {type: "stand", direction: "left", time: 2100},
          {type: "walk", direction: "left",},
          {type: "stand", direction: "left", time: 2100},
          {type: "stand", direction: "right", time: 3000},
          {type: "stand", direction: "up", time: 3000},
          {type: "walk", direction: "right",},
          {type: "stand", direction: "right", time: 3000},
        ],
        talking: [
          {
            events: [
              {type: "textMessage", text: "Who are you?", faceHero: "raider1"},
              {type: "textMessage", text: "YOU WANT A PIECE OF ME, MOTHERFUCKER!?!?"},
              {type: "battle", enemyId: "raider1", map: this},
              //{who: "hero", type: "walk", direction: "up"},
              //{who: "hero", type: "walk", direction: "up"},
              //{who: "hero", type: "walk", direction: "up"},
            ]
          }
        ],
      }),
      raider2: new Person({
        x: utils.withGrid(18),
        y: utils.withGrid(14),
        useShadow: true,
        canBattle: true,
        alive: false,
        src: "Images/Characters/Raider Sprite Sheet.png",
        behaviorLoop: [
          {type: "stand", direction: "down", time: 2000},
          {type: "stand", direction: "left", time: 2300},
          {type: "walk", direction: "up",},
          {type: "stand", direction: "left", time: 2100},
          {type: "stand", direction: "right", time: 3200},
          {type: "stand", direction: "up", time: 3000},
          {type: "walk", direction: "down",},
          {type: "stand", direction: "right", time: 3100},
        ],
        talking: [
          {
            events: [
              {type: "textMessage", text: "Who are you?", faceHero: "raider2"},
              {type: "textMessage", text: "YOU WANT A PIECE OF ME, MOTHERFUCKER!?!?"},
              {type: "battle", enemyId: "raider2"},
              //{who: "hero", type: "walk", direction: "up"},
              //{who: "hero", type: "walk", direction: "up"},
              //{who: "hero", type: "walk", direction: "up"},
            ]
          }
        ],
      }),
      raider3: new Person({
        x: utils.withGrid(162),
        y: utils.withGrid(-73),
        useShadow: true,
        canBattle: true,
        alive: false,
        src: "Images/Characters/Raider Sprite Sheet.png",
        behaviorLoop: [
          {type: "stand", direction: "down", time: 2000},
          {type: "stand", direction: "left", time: 1300},
          {type: "walk", direction: "up",},
          {type: "stand", direction: "left", time: 2100},
          {type: "stand", direction: "right", time: 6200},
          {type: "stand", direction: "up", time: 3000},
          {type: "walk", direction: "down",},
          {type: "stand", direction: "right", time: 3100},
        ],
        talking: [
          {
            events: [
              {type: "textMessage", text: "Who are you?", faceHero: "raider3"},
              {type: "textMessage", text: "YOU WANT A PIECE OF ME, MOTHERFUCKER!?!?"},
              {type: "battle", enemyId: "raider3"},
              //{who: "hero", type: "walk", direction: "up"},
              //{who: "hero", type: "walk", direction: "up"},
              //{who: "hero", type: "walk", direction: "up"},
            ]
          }
        ],
      }),
      raider4: new Person({
        x: utils.withGrid(166),
        y: utils.withGrid(-70),
        useShadow: true,
        canBattle: true,
        alive: false,
        src: "Images/Characters/Raider Sprite Sheet.png",
        behaviorLoop: [
          {type: "stand", direction: "down", time: 2000},
          {type: "stand", direction: "left", time: 2300},
          {type: "walk", direction: "up",},
          {type: "stand", direction: "left", time: 2100},
          {type: "stand", direction: "right", time: 3100},
          {type: "stand", direction: "up", time: 3050},
          {type: "walk", direction: "down",},
          {type: "stand", direction: "right", time: 3100},
        ],
        talking: [
          {
            events: [
              {type: "textMessage", text: "Who are you?", faceHero: "raider4"},
              {type: "textMessage", text: "YOU WANT A PIECE OF ME, MOTHERFUCKER!?!?"},
              {type: "battle", enemyId: "raider4"},
              //{who: "hero", type: "walk", direction: "up"},
              //{who: "hero", type: "walk", direction: "up"},
              //{who: "hero", type: "walk", direction: "up"},
            ]
          }
        ],
      }),
      raider5: new Person({
        x: utils.withGrid(167),
        y: utils.withGrid(-78),
        useShadow: true,
        canBattle: true,
        alive: false,
        src: "Images/Characters/Raider Sprite Sheet.png",
        behaviorLoop: [
          {type: "stand", direction: "down", time: 2000},
          {type: "stand", direction: "left", time: 2000},
          {type: "walk", direction: "up",},
          {type: "stand", direction: "left", time: 2100},
          {type: "stand", direction: "right", time: 2200},
          {type: "stand", direction: "up", time: 3600},
          {type: "walk", direction: "down",},
          {type: "stand", direction: "right", time: 3900},
        ],
        talking: [
          {
            events: [
              {type: "textMessage", text: "Who are you?", faceHero: "raider5"},
              {type: "textMessage", text: "YOU WANT A PIECE OF ME, MOTHERFUCKER!?!?"},
              {type: "battle", enemyId: "raider5"},
              //{who: "hero", type: "walk", direction: "up"},
              //{who: "hero", type: "walk", direction: "up"},
              //{who: "hero", type: "walk", direction: "up"},
            ]
          }
        ],
      }),
      raider6: new Person({
        x: utils.withGrid(170),
        y: utils.withGrid(-78),
        useShadow: true,
        canBattle: true,
        alive: false,
        src: "Images/Characters/Raider Sprite Sheet.png",
        behaviorLoop: [
          {type: "stand", direction: "down", time: 2000},
          {type: "stand", direction: "left", time: 2300},
          {type: "walk", direction: "up",},
          {type: "stand", direction: "left", time: 2100},
          {type: "stand", direction: "right", time: 3200},
          {type: "stand", direction: "up", time: 4000},
          {type: "walk", direction: "down",},
          {type: "stand", direction: "right", time: 3100},
        ],
        talking: [
          {
            events: [
              {type: "textMessage", text: "Who are you?", faceHero: "raider6"},
              {type: "textMessage", text: "YOU WANT A PIECE OF ME, MOTHERFUCKER!?!?"},
              {type: "battle", enemyId: "raider6"},
              //{who: "hero", type: "walk", direction: "up"},
              //{who: "hero", type: "walk", direction: "up"},
              //{who: "hero", type: "walk", direction: "up"},
            ]
          }
        ],
      }),
      raider7: new Person({
        x: utils.withGrid(178),
        y: utils.withGrid(-74),
        useShadow: true,
        canBattle: true,
        alive: false,
        src: "Images/Characters/Raider Sprite Sheet.png",
        behaviorLoop: [
          {type: "stand", direction: "down", time: 2000},
          {type: "stand", direction: "left", time: 2600},
          {type: "walk", direction: "up",},
          {type: "stand", direction: "left", time: 2100},
          {type: "stand", direction: "right", time: 3200},
          {type: "stand", direction: "up", time: 1000},
          {type: "walk", direction: "down",},
          {type: "stand", direction: "right", time: 3100},
        ],
        talking: [
          {
            events: [
              {type: "textMessage", text: "Who are you?", faceHero: "raider7"},
              {type: "textMessage", text: "YOU WANT A PIECE OF ME, MOTHERFUCKER!?!?"},
              {type: "battle", enemyId: "raider7"},
              //{who: "hero", type: "walk", direction: "up"},
              //{who: "hero", type: "walk", direction: "up"},
              //{who: "hero", type: "walk", direction: "up"},
            ]
          }
        ],
      }),
      raider8: new Person({
        x: utils.withGrid(173),
        y: utils.withGrid(-61),
        useShadow: true,
        canBattle: true,
        alive: false,
        src: "Images/Characters/Raider Sprite Sheet.png",
        behaviorLoop: [
          {type: "stand", direction: "down", time: 2000},
          {type: "stand", direction: "left", time: 2900},
          {type: "walk", direction: "up",},
          {type: "stand", direction: "left", time: 2100},
          {type: "stand", direction: "right", time: 3200},
          {type: "stand", direction: "up", time: 5000},
          {type: "walk", direction: "down",},
          {type: "stand", direction: "right", time: 3100},
        ],
        talking: [
          {
            events: [
              {type: "textMessage", text: "Who are you?", faceHero: "raider8"},
              {type: "textMessage", text: "YOU WANT A PIECE OF ME, MOTHERFUCKER!?!?"},
              {type: "battle", enemyId: "raider8"},
              //{who: "hero", type: "walk", direction: "up"},
              //{who: "hero", type: "walk", direction: "up"},
              //{who: "hero", type: "walk", direction: "up"},
            ]
          }
        ],
      }),
      raider9: new Person({
        x: utils.withGrid(169),
        y: utils.withGrid(-61),
        useShadow: true,
        canBattle: true,
        alive: false,
        src: "Images/Characters/Raider Sprite Sheet.png",
        behaviorLoop: [
          {type: "stand", direction: "down", time: 2000},
          {type: "stand", direction: "left", time: 2300},
          {type: "walk", direction: "up",},
          {type: "stand", direction: "left", time: 2100},
          {type: "stand", direction: "right", time: 3200},
          {type: "stand", direction: "up", time: 3000},
          {type: "walk", direction: "down",},
          {type: "stand", direction: "right", time: 3100},
        ],
        talking: [
          {
            events: [
              {type: "textMessage", text: "Who are you?", faceHero: "raider9"},
              {type: "textMessage", text: "YOU WANT A PIECE OF ME, MOTHERFUCKER!?!?"},
              {type: "battle", enemyId: "raider9"},
              //{who: "hero", type: "walk", direction: "up"},
              //{who: "hero", type: "walk", direction: "up"},
              //{who: "hero", type: "walk", direction: "up"},
            ]
          }
        ],
      }),
      raider10: new Person({
        x: utils.withGrid(168),
        y: utils.withGrid(-69),
        useShadow: true,
        canBattle: true,
        alive: false,
        src: "Images/Characters/Raider Sprite Sheet.png",
        behaviorLoop: [
          {type: "stand", direction: "down", time: 2000},
          {type: "stand", direction: "left", time: 2300},
          {type: "walk", direction: "up",},
          {type: "stand", direction: "left", time: 2100},
          {type: "stand", direction: "right", time: 3200},
          {type: "stand", direction: "up", time: 3000},
          {type: "walk", direction: "down",},
          {type: "stand", direction: "right", time: 3100},
        ],
        talking: [
          {
            events: [
              {type: "textMessage", text: "Who are you?", faceHero: "raider10"},
              {type: "textMessage", text: "YOU WANT A PIECE OF ME, MOTHERFUCKER!?!?"},
              {type: "battle", enemyId: "raider10"},
              //{who: "hero", type: "walk", direction: "up"},
              //{who: "hero", type: "walk", direction: "up"},
              //{who: "hero", type: "walk", direction: "up"},
            ]
          }
        ],
      }),
      peasant1: new Person({
        x: utils.withGrid(25),
        y: utils.withGrid(6),
        useShadow: true,
        canBattle: true,
        alive: false,
        src: "Images/Characters/Peasant Sprite Sheet.png",
        behaviorLoop: [
          {type: "stand", direction: "down", time: 3000},
          {type: "stand", direction: "left", time: 3300},
          {type: "stand", direction: "right", time: 4300},
          
        ],
        talking: [
          {
            events: [
              {type: "textMessage", text: "Hello.", faceHero: "peasant1"},
              {type: "textMessage", text: "Wait, are you a wizard or warlock or something?"},
              {type: "textMessage", text: "Woah! What are you doing??"},
              {type: "battle", enemyId: "peasant1"},
              //{who: "hero", type: "walk", direction: "up"},
              //{who: "hero", type: "walk", direction: "up"},
              //{who: "hero", type: "walk", direction: "up"},
            ]
          }
        ],
      }),
      peasant2: new Person({
        x: utils.withGrid(19),
        y: utils.withGrid(-13),
        useShadow: true,
        canBattle: true,
        alive: false,
        src: "Images/Characters/Female Asian Peasant.png",
        behaviorLoop: [
          {type: "stand", direction: "down", time: 3000},
          {type: "walk", direction: "left"},
          {type: "walk", direction: "left"},
          {type: "walk", direction: "left"},
          {type: "walk", direction: "left"},
          {type: "walk", direction: "left"},
          {type: "walk", direction: "left"},
          {type: "walk", direction: "left"},
          {type: "walk", direction: "left"},
          {type: "walk", direction: "up"},
          {type: "walk", direction: "up"},
          {type: "stand", direction: "right", time: 4300},
          {type: "stand", direction: "down", time: 4300},
          {type: "walk", direction: "down"},
          {type: "walk", direction: "down"},
          {type: "stand", direction: "down", time: 4300},
          {type: "walk", direction: "right"},
          {type: "walk", direction: "right"},
          {type: "walk", direction: "right"},
          {type: "walk", direction: "right"},
          {type: "walk", direction: "right"},
          {type: "walk", direction: "right"},
          {type: "walk", direction: "right"},
          {type: "walk", direction: "right"},
          
        ],
        talking: [
          {
            events: [
              {type: "textMessage", text: "Hi there.", faceHero: "peasant2"},
              {type: "textMessage", text: "Wow! You look like a wizard! Can you do magic?"},
              {type: "textMessage", text: "Wait! Excuse me, Sir!"},
              {type: "battle", enemyId: "peasant2"},
              //{who: "hero", type: "walk", direction: "up"},
              //{who: "hero", type: "walk", direction: "up"},
              //{who: "hero", type: "walk", direction: "up"},
            ]
          }
        ],
      }),
      peasant3: new Person({
        x: utils.withGrid(21),
        y: utils.withGrid(-16),
        useShadow: true,
        canBattle: true,
        alive: false,
        src: "Images/Characters/Female White Peasant.png",
        behaviorLoop: [
          {type: "stand", direction: "down", time: 3000},
          {type: "stand", direction: "left", time: 3300},
          {type: "stand", direction: "right", time: 4300},
          {type: "stand", direction: "down", time: 3000},
          {type: "stand", direction: "left", time: 3300},
          {type: "stand", direction: "right", time: 4300},
          {type: "stand", direction: "down", time: 3000},
          
        ],
        talking: [
          {
            events: [
              {type: "textMessage", text: "Hello.", faceHero: "peasant3"},
              {type: "textMessage", text: "Please leave me alone."},
              {type: "textMessage", text: "No! Stop!!"},
              {type: "battle", enemyId: "peasant3"},
              //{who: "hero", type: "walk", direction: "up"},
              //{who: "hero", type: "walk", direction: "up"},
              //{who: "hero", type: "walk", direction: "up"},
            ]
          }
        ],
      }),
      peasant4: new Person({
        x: utils.withGrid(21),
        y: utils.withGrid(-31),
        useShadow: true,
        canBattle: true,
        alive: false,
        src: "Images/Characters/Female Black Peasant.png",
        behaviorLoop: [
          {type: "stand", direction: "down", time: 3000},
          {type: "stand", direction: "right", time: 3000},
          {type: "walk", direction: "up"},
          {type: "walk", direction: "up"},
          {type: "walk", direction: "up"},
          {type: "walk", direction: "up"},
          {type: "walk", direction: "up"},
          {type: "stand", direction: "right", time: 3000},
          {type: "stand", direction: "down", time: 3000},
          {type: "walk", direction: "down"},
          {type: "walk", direction: "down"},
          {type: "walk", direction: "down"},
          {type: "walk", direction: "down"},
          {type: "walk", direction: "down"},
          
        ],
        talking: [
          {
            events: [
              {type: "textMessage", text: "Hi there, pleasure to meet you", faceHero: "peasant4"},
              {type: "textMessage", text: "What are you? Like, a wizard?"},
              {type: "textMessage", text: "Oh my! No, no, no I don't... Agh!"},
              {type: "battle", enemyId: "peasant4"},
              //{who: "hero", type: "walk", direction: "up"},
              //{who: "hero", type: "walk", direction: "up"},
              //{who: "hero", type: "walk", direction: "up"},
            ]
          }
        ],
      }),
      peasant5: new Person({
        x: utils.withGrid(21),
        y: utils.withGrid(-16),
        useShadow: true,
        canBattle: true,
        alive: false,
        src: "Images/Characters/Male Black Peasant.png",
        behaviorLoop: [
          {type: "stand", direction: "down", time: 3000},
          {type: "stand", direction: "left", time: 3300},
          {type: "stand", direction: "right", time: 4300},
          {type: "stand", direction: "down", time: 3000},
          {type: "stand", direction: "left", time: 3300},
          {type: "stand", direction: "right", time: 4300},
          {type: "stand", direction: "down", time: 3000},
          
        ],
        talking: [
          {
            events: [
              {type: "textMessage", text: "Hello.", faceHero: "peasant5"},
              {type: "textMessage", text: "No, I'm not interested. You're talking to the wrong guy."},
              {type: "textMessage", text: "Woah, woah, woah! Hey! Don't even think about-"},
              {type: "battle", enemyId: "peasant5"},
              //{who: "hero", type: "walk", direction: "up"},
              //{who: "hero", type: "walk", direction: "up"},
              //{who: "hero", type: "walk", direction: "up"},
            ]
          }
        ],
      }),
      peasant6: new Person({
        x: utils.withGrid(6),
        y: utils.withGrid(-56),
        useShadow: true,
        canBattle: true,
        alive: false,
        src: "Images/Characters/Female White Peasant.png",
        behaviorLoop: [
          {type: "stand", direction: "down", time: 3000},
          {type: "stand", direction: "left", time: 3300},
          {type: "walk", direction: "left"},
          {type: "walk", direction: "left"},
          {type: "walk", direction: "left"},
          {type: "walk", direction: "left"},
          {type: "walk", direction: "left"},
          {type: "walk", direction: "left"},
          {type: "walk", direction: "left"},
          {type: "walk", direction: "left"},
          {type: "stand", direction: "right", time: 4300},
          {type: "stand", direction: "down", time: 3000},
          {type: "stand", direction: "left", time: 3300},
          {type: "stand", direction: "right", time: 4300},
          {type: "stand", direction: "down", time: 3000},
          {type: "walk", direction: "right"},
          {type: "walk", direction: "right"},
          {type: "walk", direction: "right"},
          {type: "walk", direction: "right"},
          {type: "walk", direction: "right"},
          {type: "walk", direction: "right"},
          {type: "walk", direction: "right"},
          {type: "walk", direction: "right"},
          
        ],
        talking: [
          {
            events: [
              {type: "textMessage", text: "Hello.", faceHero: "peasant6"},
              {type: "textMessage", text: "Can I help you?"},
              {type: "textMessage", text: "Yeah, I don't think so."},
              {type: "textMessage", text: "Woah dude! Back off!"},
              {type: "battle", enemyId: "peasant6"},
              //{who: "hero", type: "walk", direction: "up"},
              //{who: "hero", type: "walk", direction: "up"},
              //{who: "hero", type: "walk", direction: "up"},
            ]
          }
        ],
      }),
      peasant7: new Person({
        x: utils.withGrid(4),
        y: utils.withGrid(-50),
        useShadow: true,
        canBattle: true,
        alive: false,
        src: "Images/Characters/Female Asian Peasant.png",
        behaviorLoop: [
          {type: "stand", direction: "right", time: 3000},
          {type: "stand", direction: "left", time: 3300},
          {type: "walk", direction: "left"},
          {type: "walk", direction: "left"},
          {type: "walk", direction: "left"},
          {type: "walk", direction: "left"},
          {type: "walk", direction: "left"},
          {type: "walk", direction: "left"},
          {type: "walk", direction: "left"},
          {type: "walk", direction: "left"},
          {type: "stand", direction: "right", time: 4300},
          {type: "stand", direction: "down", time: 3000},
          {type: "stand", direction: "left", time: 3300},
          {type: "stand", direction: "right", time: 4300},
          {type: "stand", direction: "down", time: 3000},
          {type: "walk", direction: "right"},
          {type: "walk", direction: "right"},
          {type: "walk", direction: "right"},
          {type: "walk", direction: "right"},
          {type: "walk", direction: "right"},
          {type: "walk", direction: "right"},
          {type: "walk", direction: "right"},
          {type: "walk", direction: "right"},
          
        ],
        talking: [
          {
            events: [
              {type: "textMessage", text: "Hello.", faceHero: "peasant7"},
              {type: "textMessage", text: "Hi. Nice to meet you."},
              {type: "textMessage", text: "Is that a magic wand?"},
              {type: "textMessage", text: "Oh! Don't hurt me please!"},
              {type: "battle", enemyId: "peasant7"},
              //{who: "hero", type: "walk", direction: "up"},
              //{who: "hero", type: "walk", direction: "up"},
              //{who: "hero", type: "walk", direction: "up"},
            ]
          }
        ],
      }),
      peasant8: new Person({
        x: utils.withGrid(41),
        y: utils.withGrid(-48),
        useShadow: true,
        canBattle: true,
        alive: false,
        src: "Images/Characters/Male Black Peasant.png",
        behaviorLoop: [
          {type: "stand", direction: "up", time: 3000},
          {type: "stand", direction: "left", time: 3300},
          {type: "walk", direction: "down"},
          {type: "walk", direction: "down"},
          {type: "walk", direction: "down"},
          {type: "walk", direction: "down"},
          {type: "walk", direction: "down"},
          {type: "walk", direction: "down"},
          {type: "walk", direction: "down"},
          {type: "walk", direction: "down"},
          {type: "stand", direction: "right", time: 4300},
          {type: "stand", direction: "down", time: 3000},
          {type: "stand", direction: "left", time: 3300},
          {type: "stand", direction: "right", time: 4300},
          {type: "stand", direction: "down", time: 3000},
          {type: "walk", direction: "up"},
          {type: "walk", direction: "up"},
          {type: "walk", direction: "up"},
          {type: "walk", direction: "up"},
          {type: "walk", direction: "up"},
          {type: "walk", direction: "up"},
          {type: "walk", direction: "up"},
          {type: "walk", direction: "up"},
          
        ],
        talking: [
          {
            events: [
              {type: "textMessage", text: "Hey.", faceHero: "peasant8"},
              {type: "textMessage", text: "What are you doing?"},
              {type: "textMessage", text: "Woah dude! I didn't mean to offend you! Don't hurt me!"},
              {type: "battle", enemyId: "peasant8"},
              //{who: "hero", type: "walk", direction: "up"},
              //{who: "hero", type: "walk", direction: "up"},
              //{who: "hero", type: "walk", direction: "up"},
            ]
          }
        ],
      }),
      peasant9: new Person({
        x: utils.withGrid(34),
        y: utils.withGrid(-32),
        useShadow: true,
        canBattle: true,
        alive: false,
        src: "Images/Characters/Peasant Sprite Sheet.png",
        behaviorLoop: [
          {type: "stand", direction: "down", time: 3000},
          {type: "stand", direction: "left", time: 3300},
          {type: "walk", direction: "left"},
          {type: "walk", direction: "left"},
          {type: "walk", direction: "left"},
          {type: "walk", direction: "left"},
          {type: "walk", direction: "left"},
          {type: "walk", direction: "left"},
          {type: "walk", direction: "left"},
          {type: "walk", direction: "left"},
          {type: "stand", direction: "right", time: 4300},
          {type: "stand", direction: "down", time: 3000},
          {type: "stand", direction: "left", time: 3300},
          {type: "stand", direction: "right", time: 4300},
          {type: "stand", direction: "down", time: 3000},
          {type: "walk", direction: "right"},
          {type: "walk", direction: "right"},
          {type: "walk", direction: "right"},
          {type: "walk", direction: "right"},
          {type: "walk", direction: "right"},
          {type: "walk", direction: "right"},
          {type: "walk", direction: "right"},
          {type: "walk", direction: "right"},
          
        ],
        talking: [
          {
            events: [
              {type: "textMessage", text: "Hello, friend! What can I do for you?", faceHero: "peasant9"},
              {type: "textMessage", text: "What do you have there? Is that..."},
              {type: "textMessage", text: "Maybe don't point it directly at me... haha..."},
              {type: "textMessage", text: "Agh! Hey! Listen, man!"},
              {type: "battle", enemyId: "peasant9"},
              //{who: "hero", type: "walk", direction: "up"},
              //{who: "hero", type: "walk", direction: "up"},
              //{who: "hero", type: "walk", direction: "up"},
            ]
          }
        ],
      }),
      peasant10: new Person({
        x: utils.withGrid(34),
        y: utils.withGrid(-32),
        useShadow: true,
        canBattle: true,
        alive: false,
        src: "Images/Characters/Female White Peasant.png",
        behaviorLoop: [
          {type: "stand", direction: "down", time: 3000},
          {type: "stand", direction: "left", time: 3300},
          {type: "walk", direction: "right"},
          {type: "walk", direction: "right"},
          {type: "walk", direction: "right"},
          {type: "walk", direction: "right"},
          {type: "walk", direction: "right"},
          {type: "walk", direction: "right"},
          {type: "walk", direction: "right"},
          {type: "walk", direction: "right"},
          {type: "stand", direction: "right", time: 4300},
          {type: "stand", direction: "down", time: 3000},
          {type: "stand", direction: "left", time: 3300},
          {type: "stand", direction: "right", time: 4300},
          {type: "stand", direction: "down", time: 3000},
          {type: "walk", direction: "left"},
          {type: "walk", direction: "left"},
          {type: "walk", direction: "left"},
          {type: "walk", direction: "left"},
          {type: "walk", direction: "left"},
          {type: "walk", direction: "left"},
          {type: "walk", direction: "left"},
          {type: "walk", direction: "left"},
          
        ],
        talking: [
          {
            events: [
              {type: "textMessage", text: "Oh, uh... Hi.", faceHero: "peasant9"},
              {type: "textMessage", text: "What do you want?"},
              {type: "textMessage", text: "Ah! Somebody help me!"},
              {type: "battle", enemyId: "peasant10"},
              //{who: "hero", type: "walk", direction: "up"},
              //{who: "hero", type: "walk", direction: "up"},
              //{who: "hero", type: "walk", direction: "up"},
            ]
          }
        ],
      }),

      houseRowA6: new Person({
        x: utils.withGrid(-3),
        y: utils.withGrid(-15),
        class: "object",
        useShadow: false,
        size: 896,
        src: "Images/Objects/Village Row.png",
      }),
      houseRowA5: new Person({
        x: utils.withGrid(-3),
        y: utils.withGrid(-24),
        class: "object",
        useShadow: false,
        size: 896,
        src: "Images/Objects/Village Row.png",
      }),
      houseRowA4: new Person({
        x: utils.withGrid(-3),
        y: utils.withGrid(-33),
        class: "object",
        useShadow: false,
        size: 896,
        src: "Images/Objects/Village Row.png",
      }),
      houseRowA3: new Person({
        x: utils.withGrid(-3),
        y: utils.withGrid(-42),
        class: "object",
        useShadow: false,
        size: 896,
        src: "Images/Objects/Village Row.png",
      }),
      houseRowA2: new Person({
        x: utils.withGrid(-3),
        y: utils.withGrid(-58),
        class: "object",
        useShadow: false,
        size: 896,
        src: "Images/Objects/Village Row.png",
      }),
      houseRowA1: new Person({
        x: utils.withGrid(-3),
        y: utils.withGrid(-67),
        class: "object",
        useShadow: false,
        size: 896,
        src: "Images/Objects/Village Row.png",
      }),
      raiderHouseRow1: new Person({
        x: utils.withGrid(162),
        y: utils.withGrid(-74),
        class: "object",
        type: "RaiderRow",
        useShadow: false,
        size: 256,
        src: "Images/Objects/Raider Row 1.png",
      }),
      raiderHouseRow2: new Person({
        x: utils.withGrid(158),
        y: utils.withGrid(-68),
        class: "object",
        type: "RaiderRow",
        useShadow: false,
        size: 896,
        src: "Images/Objects/Raider Row 2.png",
      }),
      raiderHouseRow3: new Person({
        x: utils.withGrid(161),
        y: utils.withGrid(-63),
        class: "object",
        type: "RaiderRow",
        useShadow: false,
        size: 256,
        src: "Images/Objects/Raider Row 1.png",
      }),


      
    },
    chunks: {
      "0-0": {
        coords: [utils.withChunk(0), utils.withChunk(0)],
        Gsrc: "Images/Maps/C3-5-G.png",
        Wsrc: "Images/Maps/C3-5-W.png",
        Usrc: "Images/Maps/C3-5-U.png",
      },
      "0--1": {
        coords: [utils.withChunk(0), utils.withChunk(-1)],
        Gsrc: "Images/Maps/C3-4-G.png",
        Wsrc: "Images/Maps/emptyChunk.png",
        Usrc: "Images/Maps/C3-4-U.png",
      },
      "0--2": {
        coords: [utils.withChunk(0), utils.withChunk(-2)],
        Gsrc: "Images/Maps/C3-3-G.png",
        Wsrc: "Images/Maps/emptyChunk.png",
        Usrc: "Images/Maps/C3-3-U.png",
      },
      "0--3": {
        coords: [utils.withChunk(0), utils.withChunk(-3)],
        Gsrc: "Images/Maps/C3-2-G.png",
        Wsrc: "Images/Maps/C3-2-W.png",
        Usrc: "Images/Maps/C3-2-U.png",
      },
      "-1--3": {
        coords: [utils.withChunk(-1), utils.withChunk(-3)],
        Gsrc: "Images/Maps/C2-2-G.png",
        Wsrc: "Images/Maps/C2-2-W.png",
        Usrc: "Images/Maps/C2-2-U.png",
      },
      "-1--2": {
        coords: [utils.withChunk(-1), utils.withChunk(-2)],
        Gsrc: "Images/Maps/C2-3-G.png",
        Wsrc: "Images/Maps/C2-3-W.png",
        Usrc: "Images/Maps/C2-3-U.png",
      },
      "-1--1": {
        coords: [utils.withChunk(-1), utils.withChunk(-1)],
        Gsrc: "Images/Maps/C2-4-G.png",
        Wsrc: "Images/Maps/C2-4-W.png",
        Usrc: "Images/Maps/C2-4-U.png",
      },
      "-1-0": {
        coords: [utils.withChunk(-1), utils.withChunk(0)],
        Gsrc: "Images/Maps/C2-5-G.png",
        Wsrc: "Images/Maps/C2-5-W.png",
        Usrc: "Images/Maps/C2-5-U.png",
      },
      "-1-1": {
        coords: [utils.withChunk(-1), utils.withChunk(1)],
        Gsrc: "Images/Maps/C2-6-G.png",
        Wsrc: "Images/Maps/C2-6-W.png",
        Usrc: "Images/Maps/C2-6-U.png",
      },
      "1-0": {
        coords: [utils.withChunk(1), utils.withChunk(0)],
        Gsrc: "Images/Maps/C4-5-G.png",
        Wsrc: "Images/Maps/C4-5-W.png",
        Usrc: "Images/Maps/C4-5-U.png",
      },
      "1--1": {
        coords: [utils.withChunk(1), utils.withChunk(-1)],
        Gsrc: "Images/Maps/C4-4-G.png",
        Wsrc: "Images/Maps/emptyChunk.png",
        Usrc: "Images/Maps/C4-4-U.png",
      },
      "0-1": {
        coords: [utils.withChunk(0), utils.withChunk(1)],
        Gsrc: "Images/Maps/C3-6-G.png",
        Wsrc: "Images/Maps/C3-6-W.png",
        Usrc: "Images/Maps/C3-6-U.png",
      },
      "1-1": {
        coords: [utils.withChunk(1), utils.withChunk(1)],
        Gsrc: "Images/Maps/C4-6-G.png",
        Wsrc: "Images/Maps/C4-6-W.png",
        Usrc: "Images/Maps/C4-6-U.png",
      },
      "1--3": {
        coords: [utils.withChunk(1), utils.withChunk(-3)],
        Gsrc: "Images/Maps/C4-2-G.png",
        Wsrc: "Images/Maps/C4-2-W.png",
        Usrc: "Images/Maps/C4-2-U.png",
      },
      "1--2": {
        coords: [utils.withChunk(1), utils.withChunk(-2)],
        Gsrc: "Images/Maps/C4-3-G.png",
        Wsrc: "Images/Maps/C4-3-G.png",
        Usrc: "Images/Maps/C4-3-U.png",
      },
      "0-2": {
        coords: [utils.withChunk(0), utils.withChunk(2)],
        Gsrc: "Images/Maps/C5-6-G.png",
        Wsrc: "Images/Maps/C5-6-W.png",
        Usrc: "Images/Maps/C3-5-U.png",
      },
      "1-2": {
        coords: [utils.withChunk(1), utils.withChunk(2)],
        Gsrc: "Images/Maps/C5-6-G.png",
        Wsrc: "Images/Maps/C5-6-W.png",
        Usrc: "Images/Maps/C3-5-U.png",
      },
      "2-0": {
        coords: [utils.withChunk(2), utils.withChunk(0)],
        Gsrc: "Images/Maps/C5-5-G.png",
        Wsrc: "Images/Maps/C5-5-W.png",
        Usrc: "Images/Maps/C5-5-U.png",
      },
      "3-0": {
        coords: [utils.withChunk(3), utils.withChunk(0)],
        Gsrc: "Images/Maps/C6-5-G.png",
        Wsrc: "Images/Maps/C6-5-W.png",
        Usrc: "Images/Maps/C6-5-U.png",
      },
      "2--1": {
        coords: [utils.withChunk(2), utils.withChunk(-1)],
        Gsrc: "Images/Maps/C5-4-G.png",
        Wsrc: "Images/Maps/emptyChunk.png",
        Usrc: "Images/Maps/C5-4-U.png",
      },
      "2--2": {
        coords: [utils.withChunk(2), utils.withChunk(-2)],
        Gsrc: "Images/Maps/C5-3-G.png",
        Wsrc: "Images/Maps/emptyChunk.png",
        Usrc: "Images/Maps/C5-3-U.png",
      },
      "2--3": {
        coords: [utils.withChunk(2), utils.withChunk(-3)],
        Gsrc: "Images/Maps/C5-2-G.png",
        Wsrc: "Images/Maps/C5-2-W.png",
        Usrc: "Images/Maps/C5-2-U.png",
      },
      "3--3": {
        coords: [utils.withChunk(3), utils.withChunk(-3)],
        Gsrc: "Images/Maps/C6-2-G.png",
        Wsrc: "Images/Maps/C6-2-W.png",
        Usrc: "Images/Maps/C6-2-U.png",
      },
      "3--2": {
        coords: [utils.withChunk(3), utils.withChunk(-2)],
        Gsrc: "Images/Maps/C6-3-G.png",
        Wsrc: "Images/Maps/emptyChunk.png",
        Usrc: "Images/Maps/C6-3-U.png",
      },
      "3--1": {
        coords: [utils.withChunk(3), utils.withChunk(-1)],
        Gsrc: "Images/Maps/C6-4-G.png",
        Wsrc: "Images/Maps/emptyChunk.png",
        Usrc: "Images/Maps/C6-4-U.png",
      },
      "4--3": {
        coords: [utils.withChunk(4), utils.withChunk(-3)],
        Gsrc: "Images/Maps/C7-2-G.png",
        Wsrc: "Images/Maps/C7-2-W.png",
        Usrc: "Images/Maps/C7-2-U.png",
      },
      "5--3": {
        coords: [utils.withChunk(5), utils.withChunk(-3)],
        Gsrc: "Images/Maps/C8-2-G.png",
        Wsrc: "Images/Maps/C8-2-W.png",
        Usrc: "Images/Maps/C8-2-U.png",
      },
      "5--2": {
        coords: [utils.withChunk(5), utils.withChunk(-2)],
        Gsrc: "Images/Maps/C8-3-G.png",
        Wsrc: "Images/Maps/C8-3-W.png",
        Usrc: "Images/Maps/C8-3-U.png",
      },
      "6--2": {
        coords: [utils.withChunk(6), utils.withChunk(-2)],
        Gsrc: "Images/Maps/C9-3-G.png",
        Wsrc: "Images/Maps/C9-3-W.png",
        Usrc: "Images/Maps/C9-3-U.png",
      },
      "6--1": {
        coords: [utils.withChunk(6), utils.withChunk(-1)],
        Gsrc: "Images/Maps/C9-4-G.png",
        Wsrc: "Images/Maps/C9-4-W.png",
        Usrc: "Images/Maps/C9-4-U.png",
      },
      "6-0": {
        coords: [utils.withChunk(6), utils.withChunk(0)],
        Gsrc: "Images/Maps/C9-5-G.png",
        Wsrc: "Images/Maps/C9-5-W.png",
        Usrc: "Images/Maps/C9-5-U.png",
      },
      "6-1": {
        coords: [utils.withChunk(6), utils.withChunk(1)],
        Gsrc: "Images/Maps/C9-6-G.png",
        Wsrc: "Images/Maps/C9-6-W.png",
        Usrc: "Images/Maps/C9-6-U.png",
      },
      "6-2": {
        coords: [utils.withChunk(6), utils.withChunk(2)],
        Gsrc: "Images/Maps/C9-7-G.png",
        Wsrc: "Images/Maps/C9-7-W.png",
        Usrc: "Images/Maps/C9-7-U.png",
      },
      "5--1": {
        coords: [utils.withChunk(5), utils.withChunk(-1)],
        Gsrc: "Images/Maps/C8-4-G.png",
        Wsrc: "Images/Maps/C8-4-W.png",
        Usrc: "Images/Maps/C8-4-U.png",
      },
      "5-0": {
        coords: [utils.withChunk(5), utils.withChunk(0)],
        Gsrc: "Images/Maps/C8-5-G.png",
        Wsrc: "Images/Maps/emptyChunk.png",
        Usrc: "Images/Maps/C8-5-U.png",
      },
      "5-1": {
        coords: [utils.withChunk(5), utils.withChunk(1)],
        Gsrc: "Images/Maps/C8-6-G.png",
        Wsrc: "Images/Maps/emptyChunk.png",
        Usrc: "Images/Maps/C8-6-U.png",
      },
      "5-2": {
        coords: [utils.withChunk(5), utils.withChunk(2)],
        Gsrc: "Images/Maps/C8-7-G.png",
        Wsrc: "Images/Maps/C8-7-W.png",
        Usrc: "Images/Maps/C8-7-U.png",
      },
      "4--2": {
        coords: [utils.withChunk(4), utils.withChunk(-2)],
        Gsrc: "Images/Maps/C7-3-G.png",
        Wsrc: "Images/Maps/C7-3-W.png",
        Usrc: "Images/Maps/C7-3-U.png",
      },
      "4--1": {
        coords: [utils.withChunk(4), utils.withChunk(-1)],
        Gsrc: "Images/Maps/C7-4-G.png",
        Wsrc: "Images/Maps/C7-4-W.png",
        Usrc: "Images/Maps/C7-4-U.png",
      },
      "4-0": {
        coords: [utils.withChunk(4), utils.withChunk(0)],
        Gsrc: "Images/Maps/C7-5-G.png",
        Wsrc: "Images/Maps/C7-5-W.png",
        Usrc: "Images/Maps/C7-5-U.png",
      },
      "4-1": {
        coords: [utils.withChunk(4), utils.withChunk(1)],
        Gsrc: "Images/Maps/C7-6-G.png",
        Wsrc: "Images/Maps/C7-6-W.png",
        Usrc: "Images/Maps/C7-6-U.png",
      },
      "4-2": {
        coords: [utils.withChunk(4), utils.withChunk(2)],
        Gsrc: "Images/Maps/C7-7-G.png",
        Wsrc: "Images/Maps/C7-7-W.png",
        Usrc: "Images/Maps/C7-7-U.png",
      },
      "3-2": {
        coords: [utils.withChunk(3), utils.withChunk(2)],
        Gsrc: "Images/Maps/C6-7-G.png",
        Wsrc: "Images/Maps/C6-7-W.png",
        Usrc: "Images/Maps/C6-7-U.png",
      },
      "3-1": {
        coords: [utils.withChunk(3), utils.withChunk(1)],
        Gsrc: "Images/Maps/C6-6-G.png",
        Wsrc: "Images/Maps/C6-6-W.png",
        Usrc: "Images/Maps/C6-6-U.png",
      },
      "2-1": {
        coords: [utils.withChunk(2), utils.withChunk(1)],
        Gsrc: "Images/Maps/C5-6-G.png",
        Wsrc: "Images/Maps/C5-6-W.png",
        Usrc: "Images/Maps/emptyChunk.png",
      },
      "2-2": {
        coords: [utils.withChunk(2), utils.withChunk(2)],
        Gsrc: "Images/Maps/C5-6-G.png",
        Wsrc: "Images/Maps/C5-6-W.png",
        Usrc: "Images/Maps/emptyChunk.png",
      },
    },
    AChunk: {
        coords: [utils.withChunk(0), utils.withChunk(0)],
        Gsrc: "Images/Maps/C3-5-G.png",
        Wsrc: "Images/Maps/C3-5-W.png",
        Usrc: "Images/Maps/C3-5-U.png",
      },
    BChunk: {
        coords: [utils.withChunk(1), utils.withChunk(0)],
        Gsrc: "Images/Maps/C3-5-G.png",
        Wsrc: "Images/Maps/C3-5-W.png",
        Usrc: "Images/Maps/C3-5-U.png",
      },
    CChunk: {
        coords: [utils.withChunk(0), utils.withChunk(1)],
        Gsrc: "Images/Maps/C3-5-G.png",
        Wsrc: "Images/Maps/C3-5-W.png",
        Usrc: "Images/Maps/C3-5-U.png",
      },
    DChunk: {
        coords: [utils.withChunk(1), utils.withChunk(1)],
        Gsrc: "Images/Maps/C3-5-G.png",
        Wsrc: "Images/Maps/C3-5-W.png",
        Usrc: "Images/Maps/C3-5-U.png",
      },
   /* walls: {
      [utils.asGridCoord(0,0)] : true,
      [utils.asGridCoord(0,1)] : true,
      [utils.asGridCoord(0,2)] : true,
      [utils.asGridCoord(0,3)] : true,
      [utils.asGridCoord(0,4)] : true,
      [utils.asGridCoord(0,5)] : true,
      [utils.asGridCoord(0,6)] : true,
      [utils.asGridCoord(0,7)] : true,
      [utils.asGridCoord(0,8)] : true,
      [utils.asGridCoord(0,9)] : true,
      [utils.asGridCoord(0,10)] : true,
      [utils.asGridCoord(0,11)] : true,
      [utils.asGridCoord(0,12)] : true,
      [utils.asGridCoord(0,13)] : true,
      [utils.asGridCoord(0,14)] : true,
      [utils.asGridCoord(0,15)] : true,
      [utils.asGridCoord(0,16)] : true,
      [utils.asGridCoord(0,17)] : true,
      [utils.asGridCoord(0,18)] : true,
      [utils.asGridCoord(0,19)] : true,
      
    },*/

    walls: function() {
      let walls = {};
      ["4,1", "4,2", "4,3", "4,4", "4,5", "4,6", "4,7", "4,8", 
      "4,9", "4,10", "4,11", "4,12", "4,13", "4,14", "4,15", "4,16", 
      "4,17", "4,18", "4,19", "4,20", "4,21", "4,22", "5,22", "6,22", 

      "-6,76","-9,77","-8,71","-5,68","-10,67","-7,59","-13,61","-16,62","-15,56","-4,54","-8,53","-12,53",
       "-17,52","-4,46","-18,45","-12,43","-4,42","-20,40","-9,38","-13,37","-17,37","-22,36","-4,34","-20,33",
       "-23,31","-18,28","-12,28","-9,27","-22,24","-15,24","-25,22","-18,22","-12,22","-20,18","-5,14","-13,11","-9,10",
       "-16,9","-22,9","-5,8","-12,8","-19,5","-26,5","-29,3","-22,3","-20,-1","-27,-3","-20,-3","-8,-4","-30,-5",
       "-23,-5","-16,-7","-13,-9","-19,-9","-16,-11","-23,-12","-27,-16","-20,-16","-23,-18","-30,-18","-18,-21","-12,-21","-22,-25",
       "-15,-25","-25,-27","-18,-27","-20,-31","-10,-35","-18,-38","-14,-39","-21,-40","-27,-40","-10,-41","-17,-41",
       "-31,-44","-24,-44","-27,-46","-34,-46","-20,-50","-20,-52","-27,-52","-34,-53","-23,-54","-30,-54","-16,-56",
       "-19,-58","-13,-58","-16,-60","-23,-61","-20,-65","-27,-65","-30,-67","-23,-67","-18,-70","-12,-70","-22,-74","-25,-76",
       "-18,-76","-20,-80","-8,-83","-3,-91","-9,-91","-20,-91","-17,-92","-11,-94","-3,-95","-14,-99","-11,-100","-5,-102","-13,-105",
       "-2,-107","-6,-108","-10,-108","-15,-109","-8,-112","-5,-113","-13,-117","-9,-120","-6,-121",


       "8,-1","15,-3","19,-4","12,-5","3,-5","16,-6","6,-7","33,-1","40,-1","47,-3","44,-5","7,-81",
       "17,-81","10,-83","10,-85","3,-85","7,-87","21,-87","2,-91","5,-93","11,-91","14,-89","15,-92","18,-90","22,-92",
       "24,-91","39,-81","42,-83","42,-85","35,-85","28,-86","32,-87","39,-87","46,-89","43,-91","6,-102","15,-100","18,-101",
       "24,-103","16,-106","23,-109","19,-109","14,-110","5,-113","8,-114","14,-116","32,-112","24,-116","27,-117","33,-119","40,-119",
       "43,-120","6,-119","4,-123","9,-122","13,-122","25,-122","36,-124","41,-125","32,-125","28,-125","23,-126","44,-128","39,-129",
       "4,85","7,84","21,85","35,89","38,88","44,86","47,81","43,80","39,80","36,83","34,79","29,81","21,81",
       "5,79","3,75","8,76","12,76","16,77","24,76","31,75","3,64","11,66","18,65","23,63","30,63","36,66",
       "43,65","46,56","43,54","39,58","32,58","31,54","27,55","28,52","24,53","18,55","14,56","15,53","11,54",
       "7,58","5,52","2,54",
       
       "57,80","59,84","62,81","66,81","69,79","70,82","52,76","61,76","69,75","77,75",
       "79,69","72,70","68,67","64,71","60,70","56,70","61,65","69,61","74,64","89,64","77,58","69,57","61,58",
       "51,58","60,52","64,53","72,52","79,52","86,53","79,44","71,44","71,48","63,45","57,47","54,48","55,42",
       "53,38","58,39","59,35","62,39","66,40","74,39","81,38","70,33","69,30","66,32","62,32","57,31","52,27",
       "61,27","69,26","77,26","85,24","96,22","92,21","88,21","83,20","79,20","72,21","64,22","","",
       
      "7,22", "8,22", "9,22", "10,22", "11,22", "12,22", "13,22", "14,22", "15,22", 
      "16,22", "17,22", "18,22", "19,22", "27,22", "28,22", "29,22", "30,22", "31,22", 
      "32,22", "33,22", "34,22", "35,22", "36,22", "37,22", "38,22", "39,22", "40,22", 
      "41,22", "42,22", "43,22", "43,21", "43,20", "43,19", "43,18", "43,17", "43,16", 
      "43,15", "43,14", "43,13", "43,12", "43,11", "43,10", "43,9", "43,8", "43,7", 
      "43,6", "43,5", "43,4", "43,3", "43,2", "43,1", "42,1", "41,1", "40,1", "39,1", 
      "38,1", "37,1", "36,1", "35,1", "34,1", "33,1", "32,1", "31,1", "30,1", "29,1", 
      "28,1", "5,1", "6,1", "7,1", "8,1", "9,1", "10,1", "11,1", "12,1", "13,1", "14,1", 
      "15,1", "16,1", "17,1", "18,1", "19,1", "20,23", "20,24", "20,25", "20,26", "27,23",
      "27,24", "27,25", "27,26", "4,23", "4,24", "4,25", "4,26", "4,27", "4,28", "4,29", 
      "4,30", "4,31", "4,32", "4,33", "4,34", "4,35",   "4,36", "4,37", "4,38", "4,39",
      "4,40", "4,41", "4,42", "4,43", "4,44", "4,45", "4,46", "4,47", "5,47", "6,47", "7,47",
      "8,47", "9,47", "10,47", "11,47", "12,47", "13,47", "14,47", "15,47", "16,47", "17,47",
      "18,47", "19,47", "20,47", "21,47", "22,47", "23,47", "24,47", "25,47", "26,47", "27,47",
      "28,47", "29,47", "30,47", "31,47", "32,47", "33,47", "34,47", "35,47", "36,47", "37,47",
      "38,47", "39,47", "40,47", "41,47", "42,47", "43,47", "43,46", "43,45", "43,44", "43,43",
      "43,42", "43,41", "43,40", "43,39", "43,38", "43,37", "43,36", "43,35", "43,34", "43,33",
      "43,32", "43,31", "43,30", "43,29", "43,28", "43,27", "43,26", "43,25", "43,24", "43,23",
      "-31, 12", "-32,11", "-32, 10", "-32, 9", "-32, 8", "-32, 7", "-32, 6", "-32, 5", "-33, 4", "-33, 3",
      "-33,2", "-33,1", "-33,0", "-33,-1", "-33,-2", "-33,-3", "-33,-4", "-34,-5", "-34,-6", "-34,-7", "-34,-8", "-34,-9",
      "-34,-10", "-34, -11", "-34, -12", "-34, -13", "-34,-14", "-34,-15", "-35, -16","-35, -17", "-35, -18", "-35,-19", "-35,-20", "-35, -21",
      "-36,-22", "-36,-23", "-36,-24", "-36,-25", "-36,-26", "-36,-27", "-36,-28", "-36,-29", "-36,-30", "-36,-31", "-37,-32", "-37,-33", "-37,-34",
      "-37,-35", "-37,-36", "-37,-37", "-37,-38", "-37,-39", "-37,-40", "-37,-41", "-37,42", "-37,-43","-38,-44", "-38,-45","-38,-46", "-38,-47", 
      "-38,-48", "-38, -49", "-39,-50", "-39,-51", "-39,-52", "-38,-53", "-38,-54", "-38,-55", "-38,-56","-38,-57", "-38,-58", "-37,-59", "-37,-60", 
      "-37,-61", "-37,-62", "-36,-63", "-36,-64", "-36,-65", "-35,-66", "-35,-67", "-35,-68", "-34,-69", "-34,-70", "-33,-71", "-33,-72", 
      "-33,-73", "-33,-74", "-32,-75", "-32,-76", "-32,-77", "-31,-78", "-31,-79", "-30,-80", "-30,-81", "-30,-82", "-30,-83", 
      "-30,-81", "-30,-82", "-30,-83", "-29,-84", "-29,-85", "-29,-86", "-28,-87", "-28,-88", "-28,-89", "-27,-90", "-27,-91", 
      "-27,-92", "-26,-93", "-26,-94", "-25,-95", "-25,-96", "-24,-97", "-24,-98", "-24,-99", "-24,-100", "-24,-101", "-24,-102",
      "-24,-103", "-24,-104", "-24,-105", "-24,-106", "-23,-107", "-23,-108", "-22,-109", "-22,-110", "-22,-111", "-22,-112", "-21,-113",
      "-21,-114", "-20,-115", "-20,-116", "-19,-117", "-19,-118", "-18,-119", "-17,-120", "-17,-121", "-17,-122", "-16,-123", "-15,-124", 
      "-15,-125", "-14,-126", "-13,-127", "-12,-127", "-11,-128", "-10,-128", "-9,-128", "-8,-129", "-7,-130", "-6,-130", "-5,-130",   
      "-4,-130", "-3,-130", "-2,-130", "-1,-130", "0,-130", "1,-130", "2,-130", "3,-130", "4,-130", "5,-130", "6,-130", "7,-130",
      "8,-130", "9,-131", "10,-131", "11,-131", "12,-131", "13,-131", "14,-131", "15,-131", "16,-131", "17,-131", "18,-131", 
      "19,-132", "20,-132", "21,-132", "22,-132", "23,-132", "24,-132", "25,-132", "26,-132", "27,-132", "28,-132", "29,-132", 
      "30,-132", "31,-133", "32,-133", "33,-133", "34,-133", "35,-133", "36,-133", "37,-133", "38,-133", "39,-133","40,-133","41,-133",
      "42,-133","43,-133","44,-133","45,-133","46,-133","47,-133","48,-133","49,-133",
      "50,-133","51,-133","52,-133","53,-133","54,-133","55,-133","56,-133","57,-133", "58,-133","59,-133","60,-133","61,-133","62,-133",
      "63,-134","64,-134","65,-134","66,-134","67,-134","68,-134","69,-134","70,-134","71,-134","72,-134","73,-134",
      "74,-134","75,-134","76,-134","77,-134","78,-134","79,-134","80,-134","81,-134","82,-134","83,-134","84,-134","85,-134","86,-134",
      "87,-133","88,-133","89,-133","90,-133","91,-133","92,-133","93,-133","94,-133","95,-133","96,-133","97,-133","98,-133","99,-133",
      "100,-133","101,-133","102,-133","103,-133","104,-133","105,-133","106,-134","107,-134","108,-134","109,-134","110,-134","111,-134","112,-134",
      "113,-134","114,-134","115,-134","116,-135","117,-135","118,-135","119,-135","120,-135","121,-135","122,-136","123,-136","124,-136","125,-136",
      "126,-136","127,-136","128,-137","129,-137","130,-137","131,-137","132,-137","133,-137","134,-138","135,-138","136,-138","137,-138","138,-138",
      "139,-139","140,-139","141,-139","142,-139","143,-139","144,-139","145,-140","146,-140","147,-140","148,-140","149,-140","150,-141","151,-141",
      "152,-141","153,-141","154,-142","155,-142","156,-142","157,-142","158,-143","159,-143","160,-143","161,-143","162,-143","163,-144","164,-144",
      "165,-144","166,-144","167,-144","168,-144","169,-144","170,-144","180,-144","181,-143","182,-143","183,-143","184,-143","185,-143","186,-143",
      "187,-143","188,-143","189,-143","190,-142","191,-142","192,-142","193,-142","194,-142","195,-141","196,-141","197,-141","198,-141","199,-141",
      "200,-141","201,-141","202,-140","203,-140","204,-141","205,-140","206,-140","207,-139","208,-139","209,-139","210,-138","211,-138","212,-138",
      "213,-138","214,-137","215,-137","216,-137","217,-137","218,-137","219,-136","220,-136","221,-136","222,-136","223,-136","224,-135","225,-135",
      "226,-134","227,-134","227,-134","228,-133","229,-132","230,-132","231,-131","232,-131","233,-130","234,-130","235,-129","236,-128","237,-128",
      "238,-128","239,-127","240,-127","241,-126","242,-126","243,-126","244,-126","245,-126","246,-126","247,-126","248,-125","249,-124","250,-123",
      "251,-122","251,-121","251,-120","252,-119","252,-118","252,-117","252,-116","252,-115","252,-114","252,-113","252,-112","251,-111","251,-110",
      "251,-109","251,-108","251,-107","251,-106","250,-105","250,-104","250,-103","250,-102","250,-101","249,-100","249,-99","249,-98","249,-97",
      "249,-96","249,-95","249,-94","249,-93","249,-92","249,-91","248,-90","248,-89","248,-88","248,-87","247,-86","247,-85","247,-84","246,-83",
      "246,-82","245,-81","244,-81","243,-80","242,-79","241,-78","240,-77","239,-76","239,-75","238,-74","237,-73","236,-72","236,-71","236,-70",
      "236,-69","235,-68","234,-67","234,-66","233,-65","233,-64","233,-63","233,-62","233,-61","232,-60","232,-59","232,-58","232,-57","231,-56",
      "230,-55","230,-54","230,-53","229,-52","229,-51","229,-50","229,-49","229,-48","229,-47","229,-46","229,-45","229,-44","229,-43","229,-42","229,-41","229,-40",
      "229,-39","229,-38","229,-37","229,-36","229,-35","229,-34","229,-33","229,-32","229,-31","229,-30","228,-29","228,-28","228,-27","228,-22","228,-21",
      "228,-20","228,-19","228,-18","228,-17","228,-16","228,-15","228,-14","228,-13","228,-12","228,-11","228,-10","228,-9","228,-8",
      "228,-7","228,-6","228,-5","228,-4","228,-3","227,-2","227,-1","227,0","227,1","227,2","227,3","227,4","227,5",
      "227,6","227,7","227,8","227,9","227,10","227,11","227,12","227,13","227,14","226,15","226,16","226,17","226,18","225,19","225,20","224,26",
      "224,27","224,38","224,29","224,30","224,31","224,32","224,33","224,34","224,35","224,36","223,37","223,38","223,39",
      "223,40","222,41","222,42","222,43","222,44","222,45","222,46","221,47","221,48","221,49","221,50","221,54","221,55",
      "221,56","221,57","221,58","221,59","220,60","220,61","220,62","220,63","219,64","218,64","217,65","216,65","215,65",
      "214,65","213,66","212,66","211,66","210,66","209,67","208,67","207,67","206,67","205,68","204,68","203,69","202,70",
      "201,70","201,71","200,72","199,73","199,74","199,75","199,76","198,77","198,78","198,79","198,80","198,81","198,82",
      "198,83","198,84","199,85","199,86","199,87","199,88","200,89","201,90","202,90","203,91","204,91","205,91","206,92",
      "207,93","208,93","209,93","210,93","211,93","212,93","213,93","214,93","215,93","216,93","217,93","218,93","219,93",
      "220,93","221,93","222,93","223,93","224,93","225,92","226,92","227,92","228,92","229,92","230,92","231,92","232,92",
      "233,91","234,91","235,91","236,90","237,90","238,89","239,89","239,88","240,87","241,86","241,85","242,84","242,83",
      "242,82","242,81","243,80","243,79","243,78","243,77","243,76","243,75","243,74","243,73","242,72","242,68","241,67",
      "241,66","240,66","239,65","238,65","237,64","236,63","235,63","234,63","233,63","232,63","231,63","230,63","229,62",
      "229,61","229,60","229,59","229,58","228,57","228,56","228,55","228,54","227,54","226,54","225,54","224,54","223,54",
      "222,54","222,50","223,50","224,50","225,50","226,50","227,50","228,50","228,49","228,48","228,47","228,46","229,45",
      "229,44","229,43","229,42","229,41","229,40","229,39","229,38","230,37","230,36","230,35","231,34","231,33","231,32",
      "231,31","231,30","231,29","231,28","232,27","232,26","232,20","232,19","232,18","232,17","233,16","233,15","233,14",
      "233,13","233,12","233,11","233,10","233,9","233,8","233,7","233,6","233,5","233,4","233,3","233,2","233,1","233,0",
      "233,-1","233,-2","233,-3","233,-4","233,-5","233,-6","233,-7","233,-8","233,-9","233,-10","233,-11","233,-12","233,-13",
      "233,-14","233,-15","232,-16","232,-17","232,-18","232,-19","232,-20","233,-21","233,-22","233,-27","233,-28","233,-29","233,-30",
      "233,-31","233,-32","234,-33","234,-34","234,-35","234,-36","234,-37","234,-38","234,-39","234,-40","234,-41","234,-42","234,-43",
      "234,-44","232,-22","231,-22","230,-22","229,-22","229,-27","230,-27","231,-27","232,-27","231,20","230,20","229,20","228,20",
      "227,20","226,20","225,26","226,26","227,26","228,26","229,26","230,26","231,26","232,26","233,-45","233,-46","233,-47",
      "233,-48","233,-49","233,-50","233,-51","234,-52","234,-53","234,-54","234,-55","234,-56","235,-57","235,-58","236,-59","236,-60",
      "236,-61","236,-62","237,-63","237,-64","237,-65","238,-66","239,-67","239,-68","239,-69","240,-70","241,-71","241,-72","242,-73",
      "243,-74","244,-74","245,-74","246,-75","246,-76","247,-77","248,-78","248,-79","249,-80","249,-81","250,-82","250,-83","251,-84",
      "251,-85","251,-86","251,-87","251,-88","251,-89","252,-90","252,-91","252,-92","252,-93","252,-94","252,-95","252,-96","252,-97",
      "252,-98","252,-99","253,-100","254,-99","254,-98","254,-97","254,-96","254,-95","254,-94","255,-93","255,-92","256,-91","256,-90",
      "257,-89","258,-88","259,-87","259,-86","259,-87","260,-84","261,-83","262,-82","262,-81","263,-81","264,-80","265,-80","266,-79",
      "267,-78","268,-77","268,-76","269,-75","269,-74","269,-73","269,-72","270,-71","271,-70","272,-69","272,-68","273,-68","274,-67",
      "274,-66","275,-65","275,-64","276,-63","277,-63","278,-62","279,-62","280,-62","281,-62","282,-62","283,-61","284,-60","285,-59",
      "286,-58","287,-58","288,-58","289,-57","289,-56","290,-55","290,-54","291,-53","292,-52","293,-51","294,-51","295,-51","296,-51",
      "297,-51","298,-52","299,-52","300,-52","301,-52","302,-52","303,-52","304,-52","305,-52","306,-52","307,-53","308,-53","309,-53",
      "310,-53","311,-54","312,-54","313,-54","314,-55","315,-55","316,-55","317,-55","318,-55","320,-55","321,-56","322,-56","323,-57",
      "324,-57","325,-58","326,-58","327,-58","328,-57","328,-58","328,-57","328,-56","328,-55","328,-54","329,-53","329,-52","329,-51",
      "329,-50","329,-49","329,-48","330,-47","330,-46","330,-45","330,-44","330,-43","330,-42","330,-41","330,-40","330,-39","330,-38",
      "331,-37","331,-36","332,-35","332,-34","332,-33","332,-32","332,-31","332,-30","332,-29","332,-28","332,-27","332,-26","332,-25",
      "332,-24","333,-23","333,-22","333,-21","333,-20","333,-19","333,-18","333,-17","333,-16","334,-15","334,-14","334,-13","334,-12",
      "334,-11","334,-10","334,-9","334,-8","334,-7","334,-6","334,-5","334,-4","334,-3","334,-2","334,-1","334,0","334,1",
      "334,2","334,3","334,4","334,5","334,6","334,7","334,8","334,9","334,10","334,11","334,12","333,13","333,14",
      "333,15","333,16","333,17","333,18","333,19","333,20","333,21","333,22","333,23","333,24","333,25","333,26","333,27",
      "333,28","333,29","332,30","332,31","332,32","332,33","332,34","332,35","331,36","331,37","331,38","331,39","331,40",
      "331,41","330,42","330,43","330,44","329,45","329,46","329,47","329,48","329,50","329,51","329,52","328,53","328,54",
      "327,55","326,56","326,57","326,58","326,59","325,60","325,61","325,62","324,63","324,64","324,65","323,66","323,67",
      "322,68","321,69","321,70","320,71","320,72","320,73","319,74","319,75","319,76","318,77","318,78","318,79","318,80",
      "317,81","317,82","316,83","316,84","316,85","315,86","314,87","314,88","314,89","314,90","314,91","314,92","313,93",
      "313,94","312,95","312,96","312,97","311,98","311,99","311,100","311,101","311,102","311,103","311,104","310,105","310,106",
      "310,107","310,108","310,109","310,110","309,111","309,112","308,113","308,114","307,115","306,116","305,117","304,118",
      "303,119","302,119","301,120","300,120","299,121","298,121","297,122","296,122","295,123","294,123","293,123","292,123","291,123",
      "290,124","289,124","288,124","287,124","286,124","285,125","284,125","283,125","282,125","281,125","280,125","279,126","278,126",
      "277,126","276,126","275,126","274,126","273,126","272,126","271,126","270,126","269,126","268,126","267,127","266,127","265,127",
      "264,127","263,127","262,127","261,127","260,127","259,127","258,127","257,127","256,127","255,127","254,127","253,127","252,127",
      "251,127","250,127","249,127","248,127","247,127","246,127","245,127","244,127","243,127","242,127","241,127","240,127","239,127",
      "238,127","237,127","236,126","235,126","234,126","233,126","232,126","231,126","230,126","229,126","228,126","229,126","228,126",
      "227,126","226,126","225,126","224,125","223,125","222,125","221,125","220,125","219,125","218,125","217,124","216,124","215,124",
      "214,124","213,123","212,123","211,123","210,123","209,123","208,123","207,123","206,123","205,123","204,122","203,122","202,122",
      "201,121","200,121","199,121","198,121","197,121","196,120","195,120","194,120","193,120","192,119","191,119","190,118","189,117",
      "189,116","188,115","188,114","187,113","187,112","186,111","186,110","185,109","185,108","184,107","184,106","184,105","184,104",
      "183,103","183,102","183,101","183,100","183,99","182,98","182,97","182,96","182,95","182,94","181,93","181,92","181,91","181,90",
      "181,89","181,88","181,87","181,86","180,85","180,84","180,83","179,82","179,81","179,80","179,79","179,78","178,77","178,76","178,75",
      "178,74","178,73","177,72","177,71","177,70","176,69","176,68","176,67","176,66","175,65","175,64","175,63","175,62",
      "174,61","174,60","173,59","173,58","173,57","173,56","173,55","173,54","173,53","173,52","172,51","172,50","172,49",
      "172,48","171,47","171,46","171,45","170,44","170,43","169,42","169,41","168,40","167,39","168,38","165,37","164,36",
      "163,35","162,34","161,33","160,32","159,31","158,31","157,30","156,29","155,28","154,27","153,26","152,26","151,26",
      "150,25","149,25","148,25","147,25","146,25","145,25","144,25","143,25","142,25","141,25","140,25","139,24","138,24",
      "137,24","136,24","135,24","134,24","133,24","132,24","131,24","130,24","129,24","128,24","127,24","126,24","125,24",
      "124,24","123,24","122,24","121,24","120,24","119,24","118,24","117,24","116,24","115,24","114,24","113,24","112,24",
      "111,24","110,24","109,24","108,24","107,24","106,24","105,25","104,25","103,25","102,26","101,26","100,27","100,28",
      "99,29","99,30","99,31","98,32","98,33","97,34","97,35","97,36","97,37","97,38","97,39","96,40","96,41",
      "96,42","96,43","96,44","96,45","96,46","96,47","96,48","96,49","96,50","96,51","96,52","96,53","96,54",
      "95,55","95,56","95,57","95,58","95,59","95,60","95,61","95,62","95,63","95,64","95,65","95,66","95,67",
      "95,68","95,69","94,70","94,71","93,72","92,73","92,74","91,75","90,76","89,77","88,78","87,78","86,79",
      "85,79","84,80","83,81","82,81","81,82","80,82","79,83","78,83","77,84","76,85","75,85","74,85","73,86",
      "72,86","71,86","70,87","69,87","68,87","67,88","66,89","65,89","64,89","63,90","62,90","61,90","59,91",
      "58,91","57,91","56,91","55,91","54,92","53,92","52,92","51,92","50,92","49,92","48,92","47,92","46,93",
      "45,93","44,93","43,93","42,93","41,94","40,94","39,94","38,94","37,94","36,94","35,94","34,94","33,94",
      "32,94","31,94","30,94","29,94","28,94","27,94","26,94","25,94","24,94","23,94","22,94","21,94","22,94",
      "21,94","20,94","19,94","18,94","17,94","16,93","15,93","14,93","13,93","12,92","11,92","10,92","9,91",
      "8,91","7,91","6,90","5,90","4,89","3,88","2,88","1,87","0,86","-1,86","-2,86","-3,86","-4,86",
      "-5,86","-6,85","-7,84","-8,84","-9,84","-10,83","-11,83","-12,82","-13,81","-14,80","-15,79","-16,78","-16,77",
      "-16,76","-16,75","-17,74","-17,73","-17,72","-17,71","-17,70","-17,69","-17,68","-18,67","-18,66","-18,65","-18,64",
      "-18,63","-19,62","-19,61","-19,60","-19,59","-20,58","-20,57","-21,56","-21,55","-21,54","-22,53","-22,52","-22,51",
      "-22,50","-22,49","-22,48","-22,47","-22,46","-23,45","-23,44","-24,43","-24,42","-24,41","-25,40","-25,39","-25,38",
      "-25,37","-25,36","-26,35","-26,34","-27,33","-27,32","-27,31","-28,30","-28,29","-28,28","-28,27","-29,26","-29,25",
      "-30,24","-30,23","-30,22","-31,21","-31,20","-31,19","-31,18","-31,17","-31,16","-31,15","-31,14","-31,13","255,-125",
      "256,-126","257,-126","258,-126","259,-126","261,-125","262,-125","263,-124","264,-124","265,-124","266,-123","267,-123","268,-122","269,-122",
      "270,122","271,-121","272,-121","273,-120","274,-119","275,-118","276,-117","277,-116","278,-115","279,-114","280,-113","281,-112","282,-111",
      "283,-110","284,-110","285,-109","286,-108","287,-107","288,-106","289,-105","290,-104","291,-103","292,-102","293,-101","293,-100","293,-99",
      "293,-98","293,-97","293,-96","293,-95","293,-94","293,-93","293,-92","294,-91","294,-90","294,-89","294,-88","294,-87","294,-86",
      "295,-85","295,-84","295,-83","295,-82","296,-81","296,-80","297,-79","298,-79","299,-78","300,-77","300,-77","302,-76","303,-76",
      "304,-75","305,-74","306,-74","307,-74","308,-73","309,-73","310,-72","311,-72","312,-71","313,-71","314,-70","315,-70","316,-69",
      "317,-68","318,-67","319,-66","319,-65","319,-64","157,-73","157,-72","157,-71","157,-70","157,-69","157,-68","157,-67","157,-66",
      "158,-65","159,-64","160,-63","161,-62","162,-61","163,-60","164,-59","165,-58","166,-58","167,-58","168,-58","169,-58","170,-58",
      "171,-58","172,-58","173,-58","174,-59","175,-60","176,-61","177,-62","178,-63","179,-64","180,-65","181,-66","181,-67","181,-68",
      "181,-69","181,-70","181,-71","181,-72","181,-73","180,-74","179,-75","178,-76","177,-77","176,-78","175,-79","174,-80","173,-81","172,-81",
      "171,-81","170,-81","169,-81","168,-81","167,-81","166,-81","165,-81","164,-80","163,-79","162,-78","161,-77","160,-76","159,-75",
      "159,-75","158,-74","157,-73","250,-49","250,-48","250,-47","250,-46","250,-45","250,-44","250,-43","250,-42","250,-41","250,-40","250,-39",
      "250,-38","250,-37","250,-36","250,-35","250,-34","250,-33","250,-32","250,-31","250,-30","250,-29","250,-28","250,-27","250,-26",
      "250,-25","250,-24","250,-23","250,-22","250,-21","250,-20","250,-19","250,-18","250,-17","250,16","250,-15","250,-14","250,-13",
      "250,-12","250,-11","250,-10","250,-9","250,-8","251,-7","252,-6","253,-5","254,-4","255,-3","256,-3","257,-3","258,-3","259,-3","260,-3",
      "261,-3","262,-3","263,-3","264,-3","265,-3","266,-3","266,-4","266,-5","266,-6","266,-7","266,-8","266,-9","266,-10",
      "266,-11","265,-11","264,-11","263,-11","262,-11","261,-11","260,-11","259,-11","258,-11","257,-11","256,-11","255,-11","254,-11",
      "254,-12","254,-13","254,-14","254,-15","254,-16","254,-17","254,-18","255,-18","256,-18","257,-18","258,-18","259,-18","260,-18",
      "261,-18","262,-18","263,-18","264,-18","265,-18","266,-18","266,-19","266,-20","266,-21","266,-22","266,-23","266,-24","266,-25",
      "266,-26","266,-27","273,-27","266,-28","266,-29","266,-30","266,-31","266,-32","273,-32","273,-31","273,-30","273,-29","273,-28",
      "273,-27","273,-26","273,-25","273,-24","273,-23","273,-22","273,-21","273,-20","273,-19","273,-18","274,-18","275,-18","276,-18",
      "277,-18","278,-18","279,-18","280,-18","281,-18","282,-18","283,-18","284,-18","285,-18","285,-17","285,-16","285,-15","285,-14",
      "285,-13","285,-12","285,-11","284,-11","283,-11","282,-11","281,-11","280,-11","279,-11","278,-11","277,-11","276,-11","275,-11",
      "274,-11","273,-11","273,-10","273,-9","273,-8","273,-7","273,-6","273,-5","273,-4","273,-3","274,-3","275,-3",
      "276,-3","277,-3","278,-3","279,-3","280,-3","281,-3","282,-3","283,-3","284,-3","285,-4","286,-5","287,-6","288,-7",
      "289,-8","289,-9","289,-10","289,-11","289,-12","289,-13","289,-14","289,-15","289,-16","289,-17","289,-18","289,-19","289,-20",
      "289,-21","289,-22","289,-23","289,-24","289,-25","289,-26","289,-27","289,-28","289,-29","289,-30","289,-31","289,-32","289,-33",
      "289,-34","289,-35","289,-36","289,-37","289,-38","289,-39","289,-40","289,-41","289,-42","289,-43","289,-44","289,-45","289,-46",
      "289,-47","289,-48","289,-49","288,-49","287,-49","286,-49","285,-49","284,-49","283,-49","282,-49","281,-49","280,-49","279,-49",
      "278,-49","277,-49","276,-49","275,-49","274,-49","273,-49","272,-49","271,-49","270,-49","269,-49","268,-49","267,-49","266,-49",
      "265,-49","264,-49","263,-49","262,-49","261,-49","260,-49","259,-49","258,-49","257,-49","256,-49","255,-49","254,-49","253,-49",
      "252,-49","251,-49","-2,-15","-1,-15","0,-15","1,-15","2,-15","3,-15","4,-15","-2,-16","-2,-17","-2,-18","-2,-19","-2,-20","-1,-20",
      "0,-20","1,-20","2,-20","3,-20","4,-20","4,-19","4,-18","4,-17","4,-16","13,-15","14,-15","15,-15","16,-15","17,-15","18,-15",
      "19,-15","19,-16","19,-17","19,-18","19,-19","19,-20","18,-20","17,-20","16,-20","15,-20","14,-20","13,-20","13,-19","13,-18",
      "13,-17","13,-16","","","","","","","","","","","",


      ].forEach(coord => {
        let [x,y] = coord.split(",");
        walls[utils.asGridCoord(x,y)] = true;
      })
      return walls;
    }(),
    cutsceneSpaces: {
      [utils.asGridCoord(1,1)]: [
        {
          events: [
            {who: "hero", type: "walk", direction: "down",},
            {who: "hero", type: "walk", direction: "down",},
            {who: "hero", type: "walk", direction: "down",},
          ],
        },
      ],
      //for when you nee to change maps
      
      [utils.asGridCoord(21,26)]: [
        {
          events: [
            {type: "changeMap", map: "Castle", x: 18*16, y: 0, direction: "down",},
          ],
        },
      ],
      //The raider portal
              [utils.asGridCoord(-7,-121)]: [
        {
          events: [
            {type: "changeMap", map: "DemoRoom1", x: 165*16, y: -74*16, direction: "up",},
            {who: "hero", type: "walk", direction: "up"},
          ],
        },
      ],
      [utils.asGridCoord(175,-67)]: [
        {
          events: [
            {type: "changeMap", map: "DemoRoom1", x: -7*16, y: -122*16, direction: "up",},
            {who: "hero", type: "walk", direction: "up"},
            {who: "hero", type: "walk", direction: "up"},
            {who: "hero", type: "walk", direction: "up"},
            {who: "hero", type: "walk", direction: "left"},
            {who: "hero", type: "walk", direction: "left"},
          ],
        },
      ],
      //Castle
      [utils.asGridCoord(22,26)]: [
        {
          events: [
            {type: "changeMap", map: "Castle", x: 18*16, y: 0, direction: "down",},
          ],
        },
      ],
      [utils.asGridCoord(23,26)]: [
        {
          events: [
            {type: "changeMap", map: "Castle", x: 19*16, y: 0, direction: "down",},
          ],
        },
      ],
      [utils.asGridCoord(24,26)]: [
        {
          events: [
            {type: "changeMap", map: "Castle", x: 20*16, y: 0, direction: "down",},
          ],
        },
      ],
      [utils.asGridCoord(25,26)]: [
        {
          events: [
            {type: "changeMap", map: "Castle", x: 21*16, y: 0, direction: "down",},
          ],
        },
      ],
      [utils.asGridCoord(26,26)]: [
        {
          events: [
            {type: "changeMap", map: "Castle", x: 21*16, y: 0, direction: "down",},
          ],
        },
      ],
      [utils.asGridCoord(31,-14)]: [
        {
          events: [
            {type: "changeMap", map: "HouseTest", x: 21*16, y: 0, direction: "down",},
          ],
        },
      ],
      /*[utils.asGridCoord(24,16)]: [
        {
          events: [
            {who: "gate", type: "workGateH"},
          ],
        },
      ],
      [utils.asGridCoord(24,17)]: [
        {
          events: [
            {who: "gate", type: "workGateH"},
          ],
        },
      ],
      [utils.asGridCoord(24,18)]: [
        {
          events: [
            {who: "gate", type: "workGateH"},
          ],
        },
      ],
      [utils.asGridCoord(24,19)]: [
        {
          events: [
            {who: "gate", type: "workGateH"},
          ],
        },
      ],
      [utils.asGridCoord(24,20)]: [
        {
          events: [
            {who: "gate", type: "workGateH"},
          ],
        },
      ],
      
      [utils.asGridCoord(16,15)]: [
        {
          events: [
            {who: "gate", type: "workGateV"},
          ],
        },
      ],
      [utils.asGridCoord(17,15)]: [
        {
          events: [
            {who: "gate", type: "workGateV"},
          ],
        },
      ],
      [utils.asGridCoord(18,15)]: [
        {
          events: [
            {who: "gate", type: "workGateV"},
          ],
        },
      ],
      [utils.asGridCoord(19,15)]: [
        {
          events: [
            {who: "gate", type: "workGateV"},
          ],
        },
      ],
      [utils.asGridCoord(20,15)]: [
        {
          events: [
            {who: "gate", type: "workGateV"},
          ],
        },
      ],
      [utils.asGridCoord(21,15)]: [
        {
          events: [
            {who: "gate", type: "workGateV"},
          ],
        },
      ],
      [utils.asGridCoord(22,15)]: [
        {
          events: [
            {who: "gate", type: "workGateV"},
          ],
        },
      ],
      [utils.asGridCoord(23,15)]: [
        {
          events: [
            {who: "gate", type: "workGateV"},
          ],
        },
      ],
      
      [utils.asGridCoord(15,16)]: [
        {
          events: [
            {who: "gate", type: "workGateH"},
          ],
        },
      ],
      [utils.asGridCoord(15,17)]: [
        {
          events: [
            {who: "gate", type: "workGateH"},
          ],
        },
      ],
      [utils.asGridCoord(15,18)]: [
        {
          events: [
            {who: "gate", type: "workGateH"},
          ],
        },
      ],
      [utils.asGridCoord(15,19)]: [
        {
          events: [
            {who: "gate", type: "workGateH"},
          ],
        },
      ],
      [utils.asGridCoord(15,20)]: [
        {
          events: [
            {who: "gate", type: "workGateH"},
          ],
        },
      ],
      
      [utils.asGridCoord(17,22)]: [
        {
          events: [
            {who: "gate", type: "workGateV"},
          ],
        },
      ],
      [utils.asGridCoord(18,22)]: [
        {
          events: [
            {who: "gate", type: "workGateV"},
          ],
        },
      ],
      [utils.asGridCoord(19,22)]: [
        {
          events: [
            {who: "gate", type: "workGateV"},
          ],
        },
      ],
      [utils.asGridCoord(20,22)]: [
        {
          events: [
            {who: "gate", type: "workGateV"},
          ],
        },
      ],
      [utils.asGridCoord(21,22)]: [
        {
          events: [
            {who: "gate", type: "workGateV"},
          ],
        },
      ],*/
    },
  },
  Castle: {
    id: "Castle",
    lowerASrc: "Images/Maps/castleLower.png",
    lowerBSrc: "Images/Maps/emptyChunk.png",
    lowerCSrc: "Images/Maps/emptyChunk.png",
    lowerDSrc: "Images/Maps/emptyChunk.png",
    waterASrc: "Images/Maps/castleLower.png",
    waterBSrc: "Images/Maps/emptyChunk.png",
    waterCSrc: "Images/Maps/emptyChunk.png",
    waterDSrc: "Images/Maps/emptyChunk.png",
    upperASrc: "Images/Maps/emptyChunk.png",
    upperBSrc: "Images/Maps/emptyChunk.png",
    upperCSrc: "Images/Maps/emptyChunk.png",
    upperDSrc: "Images/Maps/emptyChunk.png",
    gameObjects: {
      hero: new Person({
        isPlayerControlled: true,
      }),
      raider1: new Person({
        x: utils.withGrid(7),
        y: utils.withGrid(7),
        src: "Images/Characters/Raider Sprite Sheet.png",
        behaviorLoop: [
          {type: "stand", direction: "down", time: 2000},
          {type: "stand", direction: "left", time: 2100},
          {type: "walk", direction: "left",},
          {type: "stand", direction: "left", time: 2100},
          {type: "stand", direction: "right", time: 3000},
          {type: "stand", direction: "up", time: 3000},
          {type: "walk", direction: "right",},
          {type: "stand", direction: "right", time: 3000},
        ],
        talking: [
          {
            events: [
              {type: "textMessage", text: "Who are you?", faceHero: "raider1"},
              {type: "textMessage", text: "YOU WANT A PIECE OF ME MOTHERFUCKER!?!?!?."},
              {type: "battle", enemyId: "raider1"},
              //{who: "hero", type: "walk", direction: "up"},
              //{who: "hero", type: "walk", direction: "up"},
              //{who: "hero", type: "walk", direction: "up"},
            ]
          }
        ],
      }),
      vikki: new Person({
        x: utils.withGrid(20),
        y: utils.withGrid(30),
        useShadow: true,
        canBattle: true,
        alive: false,
        src: "Images/Characters/Vikki Sprite Sheet.png",
        behaviorLoop: [
          {type: "stand", direction: "down", time: 4000},
          {type: "stand", direction: "left", time: 4300},
          {type: "walk", direction: "up",},
          {type: "stand", direction: "left", time: 4100},
          {type: "stand", direction: "right", time: 4200},
          {type: "stand", direction: "up", time: 4000},
          {type: "walk", direction: "down",},
          {type: "stand", direction: "right", time: 4100},
        ],
        talking: [
          {
            events: [
              {type: "textMessage", text: "Yes?", faceHero: "raider1"},
              {type: "textMessage", text: "Who said you could talk to me?!"},
              {type: "textMessage", text: "Do I have something on my face, shithead??"},
              {type: "battle", enemyId: "vikki"},
              //{who: "hero", type: "walk", direction: "up"},
              //{who: "hero", type: "walk", direction: "up"},
              //{who: "hero", type: "walk", direction: "up"},
            ]
          }
        ],
      }),
    },
    chunks: {
      "0-0": {
        coords: [utils.withChunk(0), utils.withChunk(0)],
        Gsrc: "Images/Maps/castleLower.png",
        Wsrc: "Images/Maps/castleLower.png",
        Usrc: "Images/Maps/emptyChunk.png",
      },
      "1-0": {
        coords: [utils.withChunk(1), utils.withChunk(0)],
        Gsrc: "Images/Maps/emptyChunk.png",
        Wsrc: "Images/Maps/emptyChunk.png",
        Usrc: "Images/Maps/emptyChunk.png",
      },
      "0-1": {
        coords: [utils.withChunk(0), utils.withChunk(1)],
        Gsrc: "Images/Maps/emptyChunk.png",
        Wsrc: "Images/Maps/emptyChunk.png",
        Usrc: "Images/Maps/emptyChunk.png",
      },
      "1-1": {
        coords: [utils.withChunk(1), utils.withChunk(1)],
        Gsrc: "Images/Maps/emptyChunk.png",
        Wsrc: "Images/Maps/emptyChunk.png",
        Usrc: "Images/Maps/emptyChunk.png",
      },
      
    },
    AChunk: {
        coords: [utils.withChunk(0), utils.withChunk(0)],
        Gsrc: "Images/Maps/C3-5-G.png",
        Wsrc: "Images/Maps/C3-5-W.png",
        Usrc: "Images/Maps/C3-5-U.png",
      },
    BChunk: {
        coords: [utils.withChunk(1), utils.withChunk(0)],
        Gsrc: "Images/Maps/C3-5-G.png",
        Wsrc: "Images/Maps/C3-5-W.png",
        Usrc: "Images/Maps/C3-5-U.png",
      },
    CChunk: {
        coords: [utils.withChunk(0), utils.withChunk(1)],
        Gsrc: "Images/Maps/C3-5-G.png",
        Wsrc: "Images/Maps/C3-5-W.png",
        Usrc: "Images/Maps/C3-5-U.png",
      },
    DChunk: {
        coords: [utils.withChunk(1), utils.withChunk(1)],
        Gsrc: "Images/Maps/C3-5-G.png",
        Wsrc: "Images/Maps/C3-5-W.png",
        Usrc: "Images/Maps/C3-5-U.png",
      },
    /*walls: {
      [utils.asGridCoord(0,0)] : true,
      [utils.asGridCoord(0,1)] : true,
      [utils.asGridCoord(0,2)] : true,
      [utils.asGridCoord(0,3)] : true,
      [utils.asGridCoord(0,4)] : true,
      [utils.asGridCoord(0,5)] : true,
      [utils.asGridCoord(0,6)] : true,
      [utils.asGridCoord(0,7)] : true,
      [utils.asGridCoord(0,8)] : true,
      [utils.asGridCoord(0,9)] : true,
      [utils.asGridCoord(0,10)] : true,
      [utils.asGridCoord(0,11)] : true,
      [utils.asGridCoord(0,12)] : true,
      [utils.asGridCoord(0,13)] : true,
      [utils.asGridCoord(0,14)] : true,
      [utils.asGridCoord(0,15)] : true,
      [utils.asGridCoord(0,16)] : true,
      [utils.asGridCoord(0,17)] : true,
      [utils.asGridCoord(0,18)] : true,
      [utils.asGridCoord(0,19)] : true,
      
    },*/

    walls: function() {
      let walls = {};
      ["4,9", "5,8", "6,9", "7,9", "8,9", "9,9", "10,9", "11,9", "12,9", "13,8", "14,8", "15,7",
        "16,7", "17,7", "18,7", "19,7", "20,7", "21,7", "22,7", "23,7", "24,7", "24,6", "24,5", "26,5", "26,6", "26,7", "27,7", "28,8", "28,9", "29,8", "30,9", "31,9", "32,9", "33,9",
        "16,9", "17,9", "25,9", "26,9", "16,10", "17,10", "25,10", "26,10", "16,11", "17,11", "25,11", "26,11",
        "18,11","19,11",
        "4,14", "5,14", "6,14", "7,14", "8,14", "9,14", "10,14", "11,14", "12,14", "13,14", "14,14", "15,14", "16,14", "17,14", "18,14", "19,14", "20,14", "21,14", "22,14", "23,14",
        "24,14", "25,14", "26,14", "27,14", "28,14", "29,14", "30,14", "31,14", "32,14", "33,14",
        "3,10", "3,11", "3,12", "3,13", "34,10", "34,11", "34,12", "34,13",
          "29,8","25,4",
      ].forEach(coord => {
        let [x,y] = coord.split(",");
        walls[utils.asGridCoord(x,y)] = true;
      })
      return walls;
    }(),

    cutsceneSpaces: {
      [utils.asGridCoord(1,1)]: [
        {
          events: [
            {who: "hero", type: "walk", direction: "down",},
            {who: "hero", type: "walk", direction: "down",},
            {who: "hero", type: "walk", direction: "down",},
          ],
        },
      ],
      [utils.asGridCoord(21,0)]: [
        {
          events: [
            {type: "changeMap", map: "DemoRoom1", x: 21*16, y: 25*16, direction: "up",},
          ],
        },
      ],
      [utils.asGridCoord(20,0)]: [
        {
          events: [
            {type: "changeMap", map: "DemoRoom1", x: 20*16, y: 25*16, direction: "up",},
          ],
        },
      ],
      [utils.asGridCoord(19,0)]: [
        {
          events: [
            {type: "changeMap", map: "DemoRoom1", x: 19*16, y: 25*16, direction: "up",},
          ],
        },
      ],
      [utils.asGridCoord(18,0)]: [
        {
          events: [
            {type: "changeMap", map: "DemoRoom1", x: 18*16, y: 25*16, direction: "up",},
          ],
        },
      ],
    },
  },
  HouseTest: {
    id: "Castle",
    lowerASrc: "Images/Maps/castleLower.png",
    lowerBSrc: "Images/Maps/emptyChunk.png",
    lowerCSrc: "Images/Maps/emptyChunk.png",
    lowerDSrc: "Images/Maps/emptyChunk.png",
    waterASrc: "Images/Maps/castleLower.png",
    waterBSrc: "Images/Maps/emptyChunk.png",
    waterCSrc: "Images/Maps/emptyChunk.png",
    waterDSrc: "Images/Maps/emptyChunk.png",
    upperASrc: "Images/Maps/emptyChunk.png",
    upperBSrc: "Images/Maps/emptyChunk.png",
    upperCSrc: "Images/Maps/emptyChunk.png",
    upperDSrc: "Images/Maps/emptyChunk.png",
    gameObjects: {
      hero: new Person({
        isPlayerControlled: true,
      }),
      raider1: new Person({
        x: utils.withGrid(7),
        y: utils.withGrid(7),
        src: "Images/Characters/Raider Sprite Sheet.png",
        behaviorLoop: [
          {type: "stand", direction: "down", time: 2000},
          {type: "stand", direction: "left", time: 2100},
          {type: "walk", direction: "left",},
          {type: "stand", direction: "left", time: 2100},
          {type: "stand", direction: "right", time: 3000},
          {type: "stand", direction: "up", time: 3000},
          {type: "walk", direction: "right",},
          {type: "stand", direction: "right", time: 3000},
        ],
        talking: [
          {
            events: [
              {type: "textMessage", text: "Who are you?", faceHero: "raider1"},
              {type: "textMessage", text: "YOU WANT A PIECE OF ME MOTHERFUCKER!?!?!?."},
              {type: "battle", enemyId: "raider1"},
              //{who: "hero", type: "walk", direction: "up"},
              //{who: "hero", type: "walk", direction: "up"},
              //{who: "hero", type: "walk", direction: "up"},
            ]
          }
        ],
      }),
      vikki: new Person({
        x: utils.withGrid(20),
        y: utils.withGrid(30),
        useShadow: true,
        canBattle: true,
        alive: false,
        src: "Images/Characters/Vikki Sprite Sheet.png",
        behaviorLoop: [
          {type: "stand", direction: "down", time: 4000},
          {type: "stand", direction: "left", time: 4300},
          {type: "walk", direction: "up",},
          {type: "stand", direction: "left", time: 4100},
          {type: "stand", direction: "right", time: 4200},
          {type: "stand", direction: "up", time: 4000},
          {type: "walk", direction: "down",},
          {type: "stand", direction: "right", time: 4100},
        ],
        talking: [
          {
            events: [
              {type: "textMessage", text: "Yes?", faceHero: "raider1"},
              {type: "textMessage", text: "Who said you could talk to me?!"},
              {type: "textMessage", text: "Do I have something on my face, shithead??"},
              {type: "battle", enemyId: "vikki"},
              //{who: "hero", type: "walk", direction: "up"},
              //{who: "hero", type: "walk", direction: "up"},
              //{who: "hero", type: "walk", direction: "up"},
            ]
          }
        ],
      }),
    },
    chunks: {
      "0-0": {
        coords: [utils.withChunk(0), utils.withChunk(0)],
        Gsrc: "Images/Maps/castleLower.png",
        Wsrc: "Images/Maps/castleLower.png",
        Usrc: "Images/Maps/emptyChunk.png",
      },
      "1-0": {
        coords: [utils.withChunk(1), utils.withChunk(0)],
        Gsrc: "Images/Maps/emptyChunk.png",
        Wsrc: "Images/Maps/emptyChunk.png",
        Usrc: "Images/Maps/emptyChunk.png",
      },
      "0-1": {
        coords: [utils.withChunk(0), utils.withChunk(1)],
        Gsrc: "Images/Maps/emptyChunk.png",
        Wsrc: "Images/Maps/emptyChunk.png",
        Usrc: "Images/Maps/emptyChunk.png",
      },
      "1-1": {
        coords: [utils.withChunk(1), utils.withChunk(1)],
        Gsrc: "Images/Maps/emptyChunk.png",
        Wsrc: "Images/Maps/emptyChunk.png",
        Usrc: "Images/Maps/emptyChunk.png",
      },
      
    },
    AChunk: {
        coords: [utils.withChunk(0), utils.withChunk(0)],
        Gsrc: "Images/Maps/C3-5-G.png",
        Wsrc: "Images/Maps/C3-5-W.png",
        Usrc: "Images/Maps/C3-5-U.png",
      },
    BChunk: {
        coords: [utils.withChunk(1), utils.withChunk(0)],
        Gsrc: "Images/Maps/C3-5-G.png",
        Wsrc: "Images/Maps/C3-5-W.png",
        Usrc: "Images/Maps/C3-5-U.png",
      },
    CChunk: {
        coords: [utils.withChunk(0), utils.withChunk(1)],
        Gsrc: "Images/Maps/C3-5-G.png",
        Wsrc: "Images/Maps/C3-5-W.png",
        Usrc: "Images/Maps/C3-5-U.png",
      },
    DChunk: {
        coords: [utils.withChunk(1), utils.withChunk(1)],
        Gsrc: "Images/Maps/C3-5-G.png",
        Wsrc: "Images/Maps/C3-5-W.png",
        Usrc: "Images/Maps/C3-5-U.png",
      },
    /*walls: {
      [utils.asGridCoord(0,0)] : true,
      [utils.asGridCoord(0,1)] : true,
      [utils.asGridCoord(0,2)] : true,
      [utils.asGridCoord(0,3)] : true,
      [utils.asGridCoord(0,4)] : true,
      [utils.asGridCoord(0,5)] : true,
      [utils.asGridCoord(0,6)] : true,
      [utils.asGridCoord(0,7)] : true,
      [utils.asGridCoord(0,8)] : true,
      [utils.asGridCoord(0,9)] : true,
      [utils.asGridCoord(0,10)] : true,
      [utils.asGridCoord(0,11)] : true,
      [utils.asGridCoord(0,12)] : true,
      [utils.asGridCoord(0,13)] : true,
      [utils.asGridCoord(0,14)] : true,
      [utils.asGridCoord(0,15)] : true,
      [utils.asGridCoord(0,16)] : true,
      [utils.asGridCoord(0,17)] : true,
      [utils.asGridCoord(0,18)] : true,
      [utils.asGridCoord(0,19)] : true,
      
    },*/

    walls: function() {
      let walls = {};
      ["4,9", "5,8", "6,9", "7,9", "8,9", "9,9", "10,9", "11,9", "12,9", "13,8", "14,8", "15,7",
        "16,7", "17,7", "18,7", "19,7", "20,7", "21,7", "22,7", "23,7", "24,7", "24,6", "24,5", "26,5", "26,6", "26,7", "27,7", "28,8", "28,9", "29,8", "30,9", "31,9", "32,9", "33,9",
        "16,9", "17,9", "25,9", "26,9", "16,10", "17,10", "25,10", "26,10", "16,11", "17,11", "25,11", "26,11",
        "18,11","19,11",
        "4,14", "5,14", "6,14", "7,14", "8,14", "9,14", "10,14", "11,14", "12,14", "13,14", "14,14", "15,14", "16,14", "17,14", "18,14", "19,14", "20,14", "21,14", "22,14", "23,14",
        "24,14", "25,14", "26,14", "27,14", "28,14", "29,14", "30,14", "31,14", "32,14", "33,14",
        "3,10", "3,11", "3,12", "3,13", "34,10", "34,11", "34,12", "34,13",
          "29,8","25,4",
      ].forEach(coord => {
        let [x,y] = coord.split(",");
        walls[utils.asGridCoord(x,y)] = true;
      })
      return walls;
    }(),

    cutsceneSpaces: {
      [utils.asGridCoord(1,1)]: [
        {
          events: [
            {who: "hero", type: "walk", direction: "down",},
            {who: "hero", type: "walk", direction: "down",},
            {who: "hero", type: "walk", direction: "down",},
          ],
        },
      ],
      
    },
  },
  
  
};
