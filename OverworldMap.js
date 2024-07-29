class OverworldMap {
  constructor(config) {
    this.overworld = null;
    this.gameObjects = {}; // Live objects are in here
    this.configObjects = config.configObjects; // Configuration content
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
    Object.keys(this.configObjects).forEach(key => {
      let object = this.configObjects[key];
      
      object.id = key;
    
      let instance;
      if (object.anark === "Person") {
        instance = new Person(object);

      }
      
      this.gameObjects[key] = instance;
      console.log(this.gameObjects[key]);
      this.gameObjects[key].id = key;
      instance.mount(this);
    })
    console.log(this.gameObjects);
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
       console.log(`you are in ${chunkX}, ${chunkY}`)
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
   console.log(`you are in ${chunkX}, ${chunkY}`)
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
   console.log(`you are in ${chunkX}, ${chunkY}`)
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
console.log(`you are in ${chunkX}, ${chunkY}`)
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
    configObjects: {
      hero: {
        anark: "Person",
        isPlayerControlled: true,
        x: utils.withGrid(20),
        y: utils.withGrid(15),
        useShadow: true,
      },
      gate: {
        x: utils.withGrid(20),
        y: utils.withGrid(22),
        size: 128,
        useShadow: false,
        currentAnimation: "gateOpen",
        src: "Images/Objects/Castle Gate.png",
      },
      raider1: {
        anark: "Person",
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
      },
      raider2: {
        anark: "Person",
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
      },
      raider3: {
        anark: "Person",
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
      },
      raider4: {
        anark: "Person",
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
      },
      raider5: {
        anark: "Person",
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
      },
      raider6: {
        anark: "Person",
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
      },
      raider7: {
        anark: "Person",
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
      },
      raider8: {
        anark: "Person",
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
      },
      raider9: {
        anark: "Person",
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
      },
      raider10: {
        anark: "Person",
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
      },
      peasant1: {
        anark: "Person",
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
      },
      peasant2: {
        anark: "Person",
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
      },
      peasant3: {
        anark: "Person",
        x: utils.withGrid(51),
        y: utils.withGrid(-13),
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
      },
      peasant4: {
        anark: "Person",
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
      },
      peasant5: {
        anark: "Person",
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
      },
      peasant6: {
         anark: "Person",
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
      },
      peasant7: {
        anark: "Person",
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
      }, 
      peasant8: {
        anark: "Person",
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
      },
      peasant9: {
        anark: "Person",
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
      },
      peasant10: {
        anark: "Person",
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
      },
      mrsooter: {
        anark: "Person",
        x: utils.withGrid(138),
        y: utils.withGrid(22),
        useShadow: true,
        canBattle: true,
        alive: false,
        src: "Images/Characters/Mr Sooter.png",
        behaviorLoop: [
          {type: "stand", direction: "down", time: 9000},
          {type: "stand", direction: "left", time: 4000},
          
        ],
        talking: [
          {
            events: [
              {type: "textMessage", text: "Hey! What's up?", faceHero: "peasant9"},
              {type: "textMessage", text: "Woah dude, are you serious right now?"},
              {type: "textMessage", text: "Alright... Well this one's on you. I'm not about to go easy on you."},
              {type: "battle", enemyId: "mrsooter"},
              //{who: "hero", type: "walk", direction: "up"},
              //{who: "hero", type: "walk", direction: "up"},
              //{who: "hero", type: "walk", direction: "up"},
            ]
          }
        ],
      },

      houseRowA6: {
        anark: "Person",
        x: utils.withGrid(-3),
        y: utils.withGrid(-15),
        class: "object",
        useShadow: false,
        size: 896,
        src: "Images/Objects/Village Row.png",
      },
      houseRowA5: {
        anark: "Person",
        x: utils.withGrid(-3),
        y: utils.withGrid(-24),
        class: "object",
        useShadow: false,
        size: 896,
        src: "Images/Objects/Village Row.png",
      },
      houseRowA4: {
        anark: "Person",
        x: utils.withGrid(-3),
        y: utils.withGrid(-33),
        class: "object",
        useShadow: false,
        size: 896,
        src: "Images/Objects/Village Row.png",
      },
      houseRowA3: {
        anark: "Person",
        x: utils.withGrid(-3),
        y: utils.withGrid(-42),
        class: "object",
        useShadow: false,
        size: 896,
        src: "Images/Objects/Village Row.png",
      },
      houseRowA2: {
        anark: "Person",
        x: utils.withGrid(-3),
        y: utils.withGrid(-58),
        class: "object",
        useShadow: false,
        size: 896,
        src: "Images/Objects/Village Row.png",
      },
      houseRowA1: {
        anark: "Person",
        x: utils.withGrid(-3),
        y: utils.withGrid(-67),
        class: "object",
        useShadow: false,
        size: 896,
        src: "Images/Objects/Village Row.png",
      },
      houseRowB1: {
        anark: "Person",
        x: utils.withGrid(254),
        y: utils.withGrid(26),
        class: "object",
        useShadow: false,
        size: 960,
        src: "Images/Objects/Villiage Row 2.png",
      },
      houseRowB2: {
        anark: "Person",
        x: utils.withGrid(254),
        y: utils.withGrid(35),
        class: "object",
        useShadow: false,
        size: 960,
        src: "Images/Objects/Villiage Row 2.png",
      },
      houseRowB3: {
        anark: "Person",
        x: utils.withGrid(254),
        y: utils.withGrid(50),
        class: "object",
        useShadow: false,
        size: 960,
        src: "Images/Objects/Villiage Row 2.png",
      },
      houseRowB4: {
        anark: "Person",
        x: utils.withGrid(254),
        y: utils.withGrid(59),
        class: "object",
        useShadow: false,
        size: 960,
        src: "Images/Objects/Villiage Row 2.png",
      },
      raiderHouseRow1: {
        anark: "Person",
        x: utils.withGrid(162),
        y: utils.withGrid(-74),
        class: "object",
        type: "RaiderRow",
        useShadow: false,
        size: 256,
        src: "Images/Objects/Raider Row 1.png",
      },
      raiderHouseRow2: {
        anark: "Person",
        x: utils.withGrid(158),
        y: utils.withGrid(-68),
        class: "object",
        type: "RaiderRow",
        useShadow: false,
        size: 896,
        src: "Images/Objects/Raider Row 2.png",
      },
      raiderHouseRow3: {
        anark: "Person",
        x: utils.withGrid(161),
        y: utils.withGrid(-63),
        class: "object",
        type: "RaiderRow",
        useShadow: false,
        size: 256,
        src: "Images/Objects/Raider Row 1.png",
      },
      randomHouse1: {
        anark: "Person",
        x: utils.withGrid(101),
        y: utils.withGrid(-5),
        class: "object",
        type: "RaiderRow",
        useShadow: false,
        size: 96,
        src: "Images/Objects/Raider House 1.png",
      },
      randomHouse2: {
        anark: "Person",
        x: utils.withGrid(273),
        y: utils.withGrid(118),
        class: "object",
        type: "RaiderRow",
        useShadow: false,
        size: 96,
        src: "Images/Objects/Raider House 1.png",
      },

      
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
       "175,-63","175,-64","175,-65","174,-63","174,-65","173,-63","173,-65","172,-63","172,-65","172,-64",
       "170,-63","170,-64","170,-65","169,-63","169,-65","168,-63","168,-65","167,-63","167,-65","167,-64",
       "165,-63","165,-64","165,-65","164,-63","164,-65","163,-63","163,-65","162,-63","162,-65","162,-64",
       "166,-74","166,-75","166,-76","165,-74","165,-76","164,-74","164,-76","163,-74","163,-76","163,-75",
       "171,-74","171,-75","171,-76","170,-74","170,-76","169,-74","169,-76","168,-74","168,-76","168,-75",
       "176,-74","176,-75","176,-76","175,-74","175,-76","174,-74","174,-76","173,-74","173,-76","173,-75",
       "162,-68","161,-68","160,-68","159,-68","158,-68","162,-70","161,-70","160,-70","159,-70","158,-70","158,-69","162,-69",
       "180,-68","179,-68","178,-68","177,-68","176,-68","180,-70","179,-70","178,-70","177,-70","176,-70","176,-69","180,-69",
       

       


       "8,-1","15,-3","19,-4","12,-5","3,-5","16,-6","6,-7","33,-1","40,-1","47,-3","44,-5","7,-81",
       "17,-81","10,-83","10,-85","3,-85","7,-87","21,-87","2,-91","5,-93","11,-91","14,-89","15,-92","18,-90","22,-92",
       "24,-91","39,-81","42,-83","42,-85","35,-85","28,-86","32,-87","39,-87","46,-89","43,-91","6,-102","15,-100","18,-101",
       "24,-103","16,-106","23,-109","19,-109","14,-110","5,-113","8,-114","14,-116","32,-112","24,-116","27,-117","33,-119","40,-119",
       "43,-120","6,-119","4,-123","9,-122","13,-122","25,-122","36,-124","41,-125","32,-125","28,-125","23,-126","44,-128","39,-129",
       "4,85","7,84","21,85","35,89","38,88","44,86","47,81","43,80","39,80","36,83","34,79","29,81","21,81",
       "5,79","3,75","8,76","12,76","16,77","24,76","31,75","3,64","11,66","18,65","23,63","30,63","36,66",
       "43,65","46,56","43,54","39,58","32,58","31,54","27,55","28,52","24,53","18,55","14,56","15,53","11,54",
       "7,58","5,52","2,54","4,-30","4,-29","4,-28","4,-27","4,-26","4,-25","4,-24","3,-24","2,-24","1,-24","0,-24","-1,-24","-2,-24",
       "-2,-25","-2,-26","-2,-27","-2,-28","-2,-29","-2,-30","-1,-30","0,-30","1,-30","2,-30","3,-30","4,-33","3,-33",
       "2,-33","1,-33","0,-33","-1,-33","-2,-33","-2,-34","-2,-35","-2,-36","-2,-37","-2,-38","-2,-39","-1,-39","0,-39",
       "1,-39","2,-39","3,-39","4,-39","4,-38","4,-37","4,-36","4,-35","4,-34","4,-42","3,-42","2,-42","1,-42",
       "0,-42","-1,-42","-2,-42","-2,-43","-2,-44","-2,-45","-2,-46","-2,-47","-2,-48","-1,-48","0,-48","1,-48","2,-48",
       "3,-48","4,-48","4,-47","4,-46","4,-45","4,-44","4,-43","4,-58","3,-58","2,-58","1,-58","0,-58","-1,-58",
       "-2,-58","-2,-59","-2,-60","-2,-61","-2,-62","-2,-63","-2,-64","-1,-64","0,-64","1,-64","2,-64","3,-64","4,-64",
       "4,-63","4,-62","4,-61","4,-60","4,-59","4,-67","3,-67","2,-67","1,-67","1,-67","0,-67","-1,-67","-2,-67",
       "-2,-68","-2,-69","-2,-70","-2,-71","-2,-72","-2,-73","-1,-73","0,-73","1,-73","2,-73","3,-73","4,-73","4,-72","4,-71",
       "4,-70","4,-69","4,-68","19,-67","18,-67","17,-67","16,-67","15,-67","14,-67","13,-67","13,-68","13,-69","13,-70",
       "13,-71","13,-72","14,-72","15,-72","16,-72","17,-72","18,-72","19,-72","19,-71","19,-70","19,-69","19,-68",
       "19,-58","18,-58","17,-58","16,-58","15,-58","14,-58","13,-58","13,-59","13,-60","13,-61","13,-62","13,-63","14,-63",
       "15,-63","16,-63","17,-63","18,-63","19,-63","19,-62","19,-61","19,-60","19,-59","19,-58","19,-42","18,-42","17,-42","16,-42",
       "15,-42","13,-42","13,-43","13,-44","13,-45","13,-46","13,-47","14,-47","15,-47","16,-47","17,-47","18,-47","19,-47",
       "19,-46","19,-45","19,-44","19,-43","19,-42","19,-33","18,-33","17,-33","16,-33","15,-33","14,-33","13,-33","13,-34",
       "13,-35","13,-36","13,-37","13,-38","14,-38","15,-38","15,-38","16,-38","17,-38","18,-38","19,-38","19,-37","19,-36",
       "19,-35","19,-34","19,-24","18,-24","17,-24","16,-24","15,-24","14,-24","13,-14","13,-25","13,-26","13,-27","13,-28",
       "13,-29","14,-29","15,-29","16,-29","17,-29","18,-29","19,-29","19,-28","19,-27","19,-26","19,-25","34,-15","33,-15",
       "32,-15","31,-15","30,-15","29,-15","28,-15","28,-16","28,-17","28,-18","28,-19","28,-20","29,-20","30,-20","31,-20",
       "32,-20","33,-20","34,-20","34,-19","34,-18","34,-17","34,-16","34,-24","33,-24","32,-24","31,-24","30,-24","29,-24",
       "28,-24","28,-25","28,-26","28,-27","28,-28","28,-29","29,-29","30,-29","31,-29","32,-29","33,-29","34,-29","34,-28",
       "34,-33","33,-33","32,-33","31,-33","30,-33","29,-33","28,-33","28,-34","28,-35","28,-36","28,-37","28,-38","29,-38",
       "30,-38","31,-38","32,-38","33,-38","34,-38","34,-37","34,-36","34,-35","34,-34",
       "34,-42","33,-42","32,-42","31,-42","30,-42","29,-42","28,-42","28,-43","28,-44","28,-45","28,-46","28,-47","29,-47",
       "30,-47","31,-47","32,-47","33,-47","34,-47","34,-46","34,-45","34,-44","34,-43",
       "34,-58","33,-58","32,-58","31,-58","30,-58","29,-58","28,-58","28,-59","28,-60","28,-61","28,-62","28,-63","29,-63",
       "30,-63","31,-63","32,-63","33,-63","34,-63","34,-62","34,-61","34,-60","34,-59",
       "34,-67","33,-67","32,-67","31,-67","30,-67","29,-67","28,-67","28,-68","28,-69","28,-70","28,-71","28,-72","29,-72",
       "30,-72","31,-72","32,-72","33,-72","34,-72","34,-71","34,-70","34,-69","34,-68",
       "49,-67","48,-67","47,-67","46,-67","45,-67","44,-67","43,-67","43,-68","43,-69","43,-70","43,-71","43,-72","43,-73",
       "44,-73","45,-73","46,-73","47,-73","48,-73","49,-73","49,-72","49,-71","49,-70","49,-69","49,-68",
       "49,-58","48,-58","47,-58","46,-58","45,-58","44,-58","43,-58","43,-59","43,-60","43,-61","43,-62","43,-63","43,-64",
       "44,-64","45,-64","46,-64","47,-64","48,-64","49,-64","49,-63","49,-62","49,-61","49,-60","49,-59",
       "49,-42","48,-42","47,-42","46,-42","45,-42","44,-42","43,-42","43,-43","43,-44","43,-45","43,-46","43,-47","43,-48",
       "44,-48","45,-48","46,-48","47,-48","48,-48","49,-48","49,-47","49,-46","49,-45","49,-44","49,-43",
       "49,-33","48,-33","47,-33","46,-33","45,-33","44,-33","43,-33","43,-34","43,-35","43,-36","43,-37","43,-38","43,-39",
       "44,-39","45,-39","46,-39","47,-39","48,-39","49,-39","49,-38","49,-37","49,-36","49,-35","49,-34",
       "49,-24","48,-24","47,-24","46,-24","45,-24","44,-24","43,-24","43,-25","43,-26","43,-27","43,-28","43,-29","43,-30",
       "44,-30","45,-30","46,-30","47,-30","48,-30","49,-30","49,-29","49,-28","49,-27","49,-26","49,-25",
       "49,-15","48,-15","47,-15","46,-15","45,-15","44,-15","43,-15","43,-16","43,-17","43,-18","43,-19","43,-20","43,-21",
       "44,-21","45,-21","46,-21","47,-21","48,-21","49,-21","49,-20","49,-19","49,-18","49,-17","49,-16",
       
       
       "57,80","59,84","62,81","66,81","69,79","70,82","52,76","61,76","69,75","77,75",
       "79,69","72,70","68,67","64,71","60,70","56,70","61,65","69,61","74,64","89,64","77,58","69,57","61,58",
       "51,58","60,52","64,53","72,52","79,52","86,53","79,44","71,44","71,48","63,45","57,47","54,48","55,42",
       "53,38","58,39","59,35","62,39","66,40","74,39","81,38","70,33","69,30","66,32","62,32","57,31","52,27",
       "61,27","69,26","77,26","85,24","96,22","92,21","88,21","83,20","79,20","72,21","64,22","60,21","56,21",
       "61,16","68,18","74,15","89,15","77,9","69,12","69,8","61,9","51,9","60,3","64,4","72,3","79,3","86,4",
       "70,-1","56,-2","69,-7","90,-2","93,-3","69,-7","61,-9","67,-11","75,-12","78,-9","83,-12","89,-12","91,-8",
       "94,-11","89,-12","83,-12","59,-14","70,-16","78,-17","85,-18","87,-16","96,-19","69,-19","66,-17","62,-17","57,-18",
       "57,-18","61,-22","69,-23","77,-23","92,-22","95,-25","91,-25","56,-28","60,-28","64,-27","72,-28","79,-29","91,-30",
       "89,-34","74,-34","68,-31","61,-33","69,-37","92,-37","95,-38","93,-43","77,-40","69,-41","61,-40","60,-46","64,-45",
       "72,-46","79,-46","96,-46","90,-51","93,-52","70,-50","56,-51","69,-56","91,-57","89,-61","83,-61","78,-58","75,-61",
       "67,-60","61,-58","59,-63","87,-65","85,-67","78,-66","70,-65","69,-68","66,-66","62,-66","57,-67","61,-71","69,-72",
        "77,-72","79,-78","72,-77","64,-76","60,-77","56,-77","51,-82","61,-82","69,-80","74,-83","52,-86","55,-87","61,-89",
        "69,-90","77,-89","96,-68","92,-71","91,-74","95,-74","91,-79","89,-83","92,-86","95,-87","93,-92","96,-95","90,-100",
        "93,-101","79,-95","72,-95","64,-94","60,-95","56,-95","53,-92","56,-100","77,-99","91,-106","78,-107","61,-107","53,-110",
        "67,-109","75,-110","83,-110","89,-110","94,-109","83,-110","59,-112","62,-115","66,-115","70,-114","69,-117","78,-115","85,-116",
        "87,-114","90,-115","96,-117","88,-120","77,-121","69,-121","62,-120","55,-118","52,-117","61,-120","95,-123","91,-123","86,-124",
        "79,-127","72,-126","64,-125","60,-126","56,-126","53,-123","51,-127","56,-126","60,-126","72,-126","79,-127",
       "261,26","260,26","259,26","258,26","257,26","256,26","255,26","255,25","255,24","255,23","255,22","255,21","255,20","256,20","257,20",
       "258,20","259,20","260,20","261,20","261,21","261,22","261,23","261,24","261,25",
       "261,35","260,35","259,35","258,35","257,35","256,35","255,35","255,34","255,33","255,32","255,31","255,30","255,29","256,29","257,29",
       "258,29","259,29","260,29","261,29","261,30","261,31","261,32","261,33","261,34",
       "261,50","260,50","259,50","258,50","257,50","256,50","255,50","255,49","255,48","255,47","255,46","255,45","255,44","256,44","257,44","258,44",
       "259,44","260,44","261,44","261,45","261,46","261,47","261,48","261,49",
       "261,59","260,59","259,59","258,59","257,59","256,59","255,59","255,58","255,57","255,56","255,55","255,54","255,53","256,53","257,53","258,53",
       "259,53","260,53","261,53","261,54","261,55","261,56","261,57","261,58",
       "270,59","269,59","268,59","267,59","266,59","265,59","264,59","264,58","264,57","264,56","264,55","264,54","265,54","266,54","267,54","268,54",
       "269,54","270,54","270,55","270,56","270,57","270,58",
       "270,50","269,50","268,50","267,50","266,50","265,50","264,50","264,49","264,48","264,47","264,46","264,45","265,45","266,45","267,45","268,45",
       "269,45","270,45","270,46","270,47","270,48","270,49",
       "270,35","269,35","268,35","267,35","266,35","265,35","264,35","264,34","264,33","264,32","264,31","264,30","265,30","266,30","267,30","268,30",
       "269,30","270,30","270,31","270,32","270,33","270,34",
       "270,26","269,26","268,26","267,26","266,26","265,26","264,26","264,25","264,24","264,23","264,22","264,21","265,21","266,21","267,21","268,21",
       "269,21","270,21","270,22","270,23","270,24","270,25",
       "279,26","278,26","277,26","276,26","275,26","274,26","273,26","273,25","273,24","273,23","273,22","273,21","273,20","274,20","275,20","276,20",
       "277,20","278,20","279,20","279,21","279,22","279,23","279,24","279,25",
       "279,35","278,35","277,35","276,35","275,35","274,35","273,35","273,34","273,33","273,32","273,31","273,30","273,29","274,29","275,29","276,29",
       "277,29","278,29","279,29","279,30","279,31","279,32","279,33","279,34",
       "279,50","278,50","277,50","276,50","275,50","274,50","273,50","273,49","273,48","273,47","273,46","273,45","273,44","274,44","275,44","276,44",
       "277,44","278,44","279,44","279,45","279,46","279,47","279,48","279,49",
       "279,59","278,59","277,59","276,59","275,59","274,59","273,59","273,58","273,57","273,56","273,55","273,54","273,53","274,53","275,53","276,53",
       "277,53","278,53","279,53","279,54","279,55","279,56","279,57","279,58",
       "294,59","293,59","292,59","291,59","290,59","289,59","288,59","288,58","288,57","288,56","288,55","288,54","288,53","289,53","290,53","291,53",
       "292,53","293,53","294,53","294,54","294,55","294,56","294,57","294,58",
       "294,50","293,50","292,50","291,50","290,50","289,50","288,50","288,49","288,48","288,47","288,46","288,45","288,44","289,44","290,44","291,44",
       "292,44","293,44","294,44","294,45","294,46","294,47","294,48","294,49",
       "294,35","293,35","292,35","291,35","290,35","289,35","288,35","288,34","288,33","288,32","288,31","288,30","288,29","289,29","290,29","291,29",
       "292,29","293,29","294,29","294,30","294,31","294,32","294,33","294,34",
       "294,26","293,26","292,26","291,26","290,26","289,26","288,26","288,25","288,24","288,23","288,22","288,21","288,20","289,20","290,20","291,20",
       "292,20","293,20","294,20","294,21","294,22","294,23","294,24","294,25",
       "303,26","302,26","301,26","300,26","299,26","298,26","297,26","297,25","297,24","297,23","297,22","297,21","298,21","299,21","300,21","301,21",
       "302,21","303,21","303,22","303,23","303,24","303,25",
       "303,35","302,35","301,35","300,35","299,35","298,35","297,35","297,34","297,33","297,32","297,31","297,30","298,30","299,30","300,30","301,30",
       "302,30","303,30","303,31","303,32","303,33","303,34",
       "303,50","302,50","301,50","300,50","299,50","298,50","297,50","297,49","297,48","297,47","297,46","297,45","298,45","299,45","300,45","301,45",
       "302,45","303,45","303,46","303,47","303,48","303,49",
       "303,59","302,59","301,59","300,59","299,59","298,59","297,59","297,58","297,57","297,56","297,55","297,54","298,54","299,54","300,54","301,54",
       "302,54","303,54","303,55","303,56","303,57","303,58",
       "312,59","311,59","310,59","309,59","308,59","307,59","306,59","306,58","306,57","306,56","306,55","306,54","306,53","307,53","308,53","309,53",
       "310,53","311,53","312,53","312,54","312,55","312,56","312,57","312,58",
       "312,50","311,50","310,50","309,50","308,50","307,50","306,50","306,49","306,48","306,47","306,46","306,45","306,44","307,44","308,44","309,44",
       "310,44","311,44","312,44","312,45","312,46","312,47","312,48","312,49",
       "312,35","311,35","310,35","309,35","308,35","307,35","306,35","306,34","306,33","306,32","306,31","306,30","306,29","307,29","308,29","309,29",
       "310,29","311,29","312,29","312,30","312,31","312,32","312,33","312,34",
       "312,26","311,26","310,26","309,26","308,26","307,26","306,26","306,25","306,24","306,23","306,22","306,21","306,20","307,20","308,20","309,20",
       "310,20","311,20","312,20","312,21","312,22","312,23","312,24","312,25",

       "201,67","199,62","207,65","212,61","216,63","219,58","215,58","212,61","202,59","202,53","199,54","208,44","216,47",
       "216,43","219,38","217,33","211,39","207,38","198,37","200,33","203,32","201,27","199,23","204,24","209,30","217,29",
       "220,15","214,17","211,18","201,18","202,10","212,12","220,15","219,9","212,4","202,4","199,-2","208,-5","216,-2",
       "216,-6","224,-6","226,-12","219,-11","217,-16","217,-20","211,-10","207,-11","203,-11","200,-9","198,-12","200,-16","203,-17",
       "201,-22","204,-25","208,-25","212,-24","220,-25","220,-34","219,-40","215,-40","214,-32","212,-37","207,-33","206,-39","201,-31",
       "199,-36","199,-44","202,-45","212,-45","215,-46","224,-55","219,-60","216,-55","216,-51","211,-59","208,-54","207,-60","203,-60",
       "202,-52","200,-57","199,-51","200,-65","203,-66","209,-68","217,-69","217,-65","225,-69","226,-61","231,-80","228,-79","227,-75",
       "220,-74","212,-73","211,-80","208,-74","204,-74","201,-80","201,-71","199,-75","198,-79","202,-88","206,-88","207,-82","211,-80",
       "212,-86","214,-81","220,-83","229,-85","232,-88","236,-88","237,-82","232,-94","229,-93","234,-100","231,-99","215,-95","216,-100",
       "212,-94","202,-94","199,-93","199,-100","202,-101","200,-106","203,-109","207,-109","208,-103","211,-108","216,-104","219,-109","224,-104",
       "226,-110","230,-109","232,-105","235,-108","239,-108","240,-102","246,-108","249,-109","250,-117","247,-114","241,-116","235,-114","232,-113","233,-119",
       "225,-118","217,-118","217,-114","209,-117","203,-115","201,-120","200,-114","199,-124","204,-123","208,-123","212,-122","220,-123","227,-124",
       "231,-123","236,-122","240,-122","247,-122","232,61","198,117","199,111","201,116","212,110","212,112","212,117","226,112","234,116",
       "236,121","238,116","241,112","252,118","253,112","255,117","243,104","239,106","236,108","229,102","227,107","225,102","219,107",
       "215,107","215,101","212,102","212,102","202,108","199,103","199,96","201,93","208,95","212,95","216,96","218,95","223,95",
       "227,95","231,96","233,95","238,95","252,96","253,90","251,86","201,67","207,65","199,62","212,61","216,63","219,58",
       "215,58","215,52","212,53","202,59","202,53","199,54","208,44","216,43","216,47","219,38","217,33","209,30","203,32",
       "200,33","199,23","201,27","205,24","217,29","220,15","214,17","211,18","212,12","201,18","202,10","202,4","212,4",
       "215,3","215,9","219,9","224,-6","216,-2","216,-6","211,-10","208,-5","200,-9","199,-2","198,-12","200,-16","203,-17",
       "201,-22","209,-19","217,-20","217,-16","225,-20",

       

        "105,-126","109,-126","113,-125","121,-126","128,-127","132,-127","134,-123","137,-126","141,-126","145,-125","142,-120","136,-118","133,-117",
        "126,-121","118,-121","110,-120","101,-120","106,-116","111,-115","115,-115","118,-117","119,-114","133,-117","136,-118","142,-120","152,-120",
        "150,-124","152,-115","151,-114","144,-112","137,-111","130,-109","123,-108","115,-107","111,-108","107,-108","102,-109","104,-105","103,-99",
        "103,-99","106,-100","112,-102","120,-103","120,-99","128,-103","153,-101","150,-100","105,-95","109,-95","113,-94","121,-95","129,-95",
        "134,-94","138,-94","142,-93","139,-88","133,-86","130,-85","118,-86","104,-87","101,-86","100,-80","103,-81","105,-77","109,-77",
        "113,-76","121,-77","128,-78","132,-78","137,-77","141,-77","145,-76","150,-76","153,-77","152,-73","142,-71","134,-74","136,-69",
        "134,-68","126,-72","118,-72","118,-68","119,-65","115,-66","111,-66","108,-63","106,-67","137,-62","144,-63","151,-63","153,-58", 
        "150,-57","142,-57","134,-57","130,-60","123,-59","115,-58","111,-59","107,-59","104,-56","102,-60","103,-56","112,-53","120,-54",
        "120,-50","112,-53","113,-45","121,-46","129,-46","134,-45","138,-45","142,-44","139,-39","133,-37","130,-36","151,-33","141,-28",
        "137,-28","132,-29","121,-29","113,-27","109,-28","105,-28","103,-32","100,-31","101,-22","110,-22","118,-23","126,-23","142,-22",
        "154,-17","151,-14","144,-14","137,-13","130,-11","119,-16","118,-19","115,-17","111,-17","108,-14","106,-18","102,-11","107,-10",
        "111,-10","112,-4","115,-9","120,-5","120,-1","123,-10","128,-5","134,-8","142,-8","150,-8","153,-9","149,-2","152,-3","142,5",
        "138,4","134,4","131,7","129,3","126,8","121,3","118,8","113,4","110,9","102,6","105,3","101,12","104,11",
        "100,18","103,17","130,13","133,12","139,10","157,10","162,9","165,8","163,3","170,7","173,4","177,4","178,10",
        "181,5","182,15","186,9","186,13","190,15","189,4","190,15","192,19","194,9","198,19","199,13","199,5","193,24",
        "193,24","190,25","187,33","188,39","191,34","193,45","190,46","193,45","199,47","200,40","203,38","194,58","189,53",
        "186,58","186,62","187,69","190,64","192,68","198,68","197,73","193,73","190,74","187,82","188,88","191,83","193,94",
        "190,95","190,103","166,-6","169,-7","188,-10","187,-16","183,-16","174,-15","172,-18","165,-18","159,-20","158,-30","179,-29",
        "187,-29","192,-30","190,-24","193,-25","198,-30","199,-26","194,-40","190,-34","186,-36","186,-40","182,-34","178,-39","172,-37",
        "169,-36","164,-37","162,-40","159,-34","157,-39","156,-33","163,-46","165,-41","168,-46","170,-42","173,-45","177,-45","181,-44",
        "189,-45","188,-59","182,-57","179,-56","149,-51","152,-52","159,-60","154,-66","183,-65","187,-65","191,-64","198,-61","193,-74",
        "192,-79","190,-73","187,-78","179,-78","158,-79","156,-82","159,-83","157,-88","162,-89","164,-86","165,-90","165,-89","172,-86",
        "178,-88","182,-83","186,-85","186,-89","190,-83","194,-89","199,-85","189,-94","185,-100","182,-99","181,-93","177,-94","173,-94",
        "170,-91","168,-95","167,-100","163,-95","159,-103","158,-109","154,-109","151,-106","149,-110","154,-115","162,-108","167,-104","170,-109",
        "175,-104","177,-110","181,-109","183,-105","186,-108","190,-108","191,-102","198,-110","192,-116","186,-114","183,-113","176,-118","168,-114",
        "168,-118","160,-117","155,-123","159,-123","163,-122","171,-123","176,-118","178,-124","182,-123","187,-122","191,-122",

        "249,78","249,69","241,63","236,59","239,57","243,55","247,45","238,46","237,40","247,36","238,30","247,28","248,24",
       "242,20","237,16","241,14","236,10","239,8","243,6","247,6","252,7","238,-3","237,-9","239,-13","238,-19","248,-25",
       "242,-29","237,-33","241,-35","236,-39","247,-44","250,-53","246,-59","249,-60","247,-65","250,-68","255,-81","257,-65","260,-66",
       "262,-66","263,-69","267,-69","270,-64","279,-59","275,-57","272,-55","272,-59","266,-60","264,-55","262,-60","277,-51","280,-55",
       "282,-50","284,-55","255,2","259,6","263,7","264,3","267,8","272,4","276,9","281,7","283,10","297,-45","299,-41",
       "302,-44","306,-44","310,-43","318,-44","325,-45","323,-39","315,-39","307,-38","303,-33","301,-36","298,-35","305,-29","308,-32",
       "312,-32","316,-31","324,-32","329,-37","321,-37","313,-26","307,-24","304,-23","299,-24","296,-23","295,-21","291,-22","297,-17",
       "300,-20","304,-20","308,-19","313,-15","315,-10","311,-11","307,-11","323,-11","330,-12","328,-6","320,-6","320,-2","312,-5",
       "306,-3","303,-2","290,-3","255,2","259,6","264,3","263,7","267,8","288,5","296,3","299,5","303,3","303,9",
       "306,5","309,9","313,8","316,10","320,8","320,14","323,12","323,10","324,4","327,6","325,21","328,23","325,27",
       "321,32","324,33","327,35","324,39","321,44","326,42","324,47","248,69","251,71","255,69","258,71","261,75","265,74",
       "272,74","276,70","279,72","279,73","307,76","302,81","300,78","296,77","295,80","292,79","289,77","289,83","285,79",
       "282,77","279,77","275,78","275,76","272,74","272,80","268,76","263,80","257,78","256,87","260,87","264,88","268,86",
       "272,87","279,86","282,87","289,83","287,88","291,88","296,85","297,90","304,88","310,84","307,96","299,93","306,103",
       "302,103","297,102","299,106","292,104","286,96","283,97","284,101","286,106","283,107","282,109","297,108","284,113","277,102",
       "272,109","296,106","296,102","296,96","261,93","261,103","255,95","255,105","252,106","251,108","256,109","260,109","261,115",
       "269,118","269,114","283,119","286,118","292,116","298,112","301,111","303,114","307,109",
        

        
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
      "158,-65","159,-64","160,-63","161,-62","162,-61","163,-60","164,-59","165,-58","166,-58",
      "172,-58","173,-58","174,-59","175,-60","176,-61","177,-62","178,-63","179,-64","180,-65","181,-66","181,-67","181,-68",
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
      "13,-17","13,-16","274,118","275,118","276,118","277,118","277,117","277,116","276,116","275,116","274,116","274,115","105,-5","103,-5",
       "102,-5","104,-5","102,-6","102,-7","103,-7","104,-7","105,-7","105,-6","","","","","",


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
      
      //(267-272, -31) Castle 2
      [utils.asGridCoord(267,-31)]: [
        {
          events: [
            {type: "changeMap", map: "Castle2", x: 22*16, y: 48*16, direction: "up",},
          ],
        },
      ],
      [utils.asGridCoord(268,-31)]: [
        {
          events: [
            {type: "changeMap", map: "Castle2", x: 23*16, y: 48*16, direction: "up",},
          ],
        },
      ],
      [utils.asGridCoord(269,-31)]: [
        {
          events: [
            {type: "changeMap", map: "Castle2", x: 24*16, y: 48*16, direction: "up",},
          ],
        },
      ],
      [utils.asGridCoord(270,-31)]: [
        {
          events: [
            {type: "changeMap", map: "Castle2", x: 24*16, y: 48*16, direction: "up",},
          ],
        },
      ],
      [utils.asGridCoord(271,-31)]: [
        {
          events: [
            {type: "changeMap", map: "Castle2", x: 25*16, y: 48*16, direction: "up",},
          ],
        },
      ],
      [utils.asGridCoord(272,-31)]: [
        {
          events: [
            {type: "changeMap", map: "Castle2", x: 26*16, y: 48*16, direction: "up",},
          ],
        },
      ],

        //Castle
      [utils.asGridCoord(21,26)]: [
        {
          events: [
            {type: "changeMap", map: "Castle", x: 22*16, y: 0, direction: "down",},
          ],
        },
      ],
      [utils.asGridCoord(22,26)]: [
        {
          events: [
            {type: "changeMap", map: "Castle", x: 23*16, y: 0, direction: "down",},
          ],
        },
      ],
      [utils.asGridCoord(23,26)]: [
        {
          events: [
            {type: "changeMap", map: "Castle", x: 23*16, y: 0, direction: "down",},
          ],
        },
      ],
      [utils.asGridCoord(24,26)]: [
        {
          events: [
            {type: "changeMap", map: "Castle", x: 24*16, y: 0, direction: "down",},
          ],
        },
      ],
      [utils.asGridCoord(25,26)]: [
        {
          events: [
            {type: "changeMap", map: "Castle", x: 24*16, y: 0, direction: "down",},
          ],
        },
      ],
      [utils.asGridCoord(26,26)]: [
        {
          events: [
            {type: "changeMap", map: "Castle", x: 25*16, y: 0, direction: "down",},
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
      ["21,1","21,2","21,3","21,4","21,5","21,6","21,7","21,8","21,9","21,10","21,11","21,12","21,13","21,14",
       "21,15","26,1","26,2","26,3","26,4","26,5","26,6","26,7","26,8","26,9","26,10","26,11","26,12","26,13",
       "26,14","26,15","27,16","28,17","29,18","30,19","31,20","32,21","33,22","34,23","35,24","36,24","37,24","38,24",
       "39,24","40,24","41,24","42,24","43,24","44,24","45,24","46,24","47,24","20,16","19,17","18,18","17,19","16,20","15,21",
       "14,22","13,23","12,24","11,24","10,24","9,24","8,24","7,24","6,24","5,24","4,24","3,24","2,24",
       "1,24","0,24","0,25","0,26","0,27","0,28","0,29","0,30","0,31","0,32","0,33",
       "0,34","0,35","0,36","0,37","0,38","0,39","0,40","0,41","0,42","0,43","0,44","0,45","0,46",
       "0,47","0,48","1,48","2,48","3,48","4,48","5,48","6,48","7,48","8,48","9,48","10,48","11,48","12,48",
       "13,48","14,48","15,48","16,48","17,48","18,48","19,48","20,48","21,48","22,48","23,48","24,48","25,48",
       "26,48","27,48","28,48","29,48","30,48","31,48","32,48","33,48","34,48","35,58","36,48","37,48","38,48","39,48",
       "40,48","41,48","42,48","43,48","44,48","45,48","46,48","47,48","48,48","47,25","47,26","47,27","47,28",
       "47,29","47,30","47,31","47,32","47,33","47,34","47,35","47,36","47,37","47,38","47,39","47,40","47,41","47,42","47,43",
       "47,44","47,45","47,46",

       
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
      [utils.asGridCoord(25,0)]: [
        {
          events: [
            {type: "changeMap", map: "DemoRoom1", x: 25*16, y: 25*16, direction: "up",},
          ],
        },
      ],
      [utils.asGridCoord(24,0)]: [
        {
          events: [
            {type: "changeMap", map: "DemoRoom1", x: 24*16, y: 25*16, direction: "up",},
          ],
        },
      ],
      [utils.asGridCoord(23,0)]: [
        {
          events: [
            {type: "changeMap", map: "DemoRoom1", x: 23*16, y: 25*16, direction: "up",},
          ],
        },
      ],
      [utils.asGridCoord(22,0)]: [
        {
          events: [
            {type: "changeMap", map: "DemoRoom1", x: 22*16, y: 25*16, direction: "up",},
          ],
        },
      ],
    },
  },
//CASTLE 2

  Castle2: {
    id: "Castle2",
    lowerASrc: "Images/Maps/Castle 2 Ground.png",
    lowerBSrc: "Images/Maps/emptyChunk.png",
    lowerCSrc: "Images/Maps/emptyChunk.png",
    lowerDSrc: "Images/Maps/emptyChunk.png",
    waterASrc: "Images/Maps/Castle 2 Ground.png",
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
    },
    chunks: {
      "0-0": {
        coords: [utils.withChunk(0), utils.withChunk(0)],
        Gsrc: "Images/Maps/Castle 2 Ground.png",
        Wsrc: "Images/Maps/Castle 2 Ground.png",
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


    walls: function() {
      let walls = {};
      ["21,48","21,47","21,46","21,45","21,44","21,43","21,42","21,41","21,40","21,39","20,38","19,37","18,36","17,35","16,34","15,33","14,32","13,31","12,31",
       "11,31","10,31","9,31","8,31","7,31","6,31","5,31","4,31","3,31","2,31","1,31","0,31","27,48","27,47","27,46","27,45","27,44","27,43","27,42",
       "27,41","27,40","27,39","28,38","29,37","30,36","31,35","32,34","33,33","34,32","35,31","36,31","37,31","38,31","39,31","40,31","41,31",
       "42,31","43,31","44,31","45,31","46,31","47,31","48,31","48,30","48,29","48,28","48,27","48,26","48,25","48,24","48,23","48,22","48,21",
       "48,20","48,19","48,18","48,17","48,16","48,15","48,14","48,13","48,12","48,11","48,10","48,9","48,8","48,7","48,6","48,5","48,4",
       "48,3","48,2","48,1","48,0","47,0","46,0","45,0","44,0","43,0","42,0","41,0","40,0","39,0","38,0","37,0","36,0","35,0","34,0","33,0","32,0","31,0",
       "30,0","29,0","28,0","27,0","26,0","25,0","24,0","23,0","22,0","21,0","20,0","19,0","18,0","17,0","16,0","15,0","14,0","13,0","12,0","11,0",
       "10,0","9,0","8,0","7,0","6,0","5,0","4,0","3,0","2,0","1,0","0,0","47,0","46,0","45,0","44,0","43,0","42,0","41,0","40,0","39,0","38,0","37,0","36,0",
       "35,0","34,0","33,0","32,0","31,0",
        ].forEach(coord => {
        let [x,y] = coord.split(",");
        walls[utils.asGridCoord(x,y)] = true;
      })
      return walls;
    }(),

    cutsceneSpaces: {
      
      [utils.asGridCoord(22,48)]: [
        {
          events: [
            {type: "changeMap", map: "DemoRoom1", x: 267*16, y: -30*16, direction: "down",},
          ],
        },
      ],
      [utils.asGridCoord(23,48)]: [
        {
          events: [
            {type: "changeMap", map: "DemoRoom1", x: 269*16, y: -30*16, direction: "down",},
          ],
        },
      ],
      [utils.asGridCoord(24,48)]: [
        {
          events: [
            {type: "changeMap", map: "DemoRoom1", x: 270*16, y: -30*16, direction: "down",},
          ],
        },
      ],
      [utils.asGridCoord(25,48)]: [
        {
          events: [
            {type: "changeMap", map: "DemoRoom1", x: 271*16, y: -30*16, direction: "down",},
          ],
        },
      ],
      [utils.asGridCoord(26,48)]: [
        {
          events: [
            {type: "changeMap", map: "DemoRoom1", x: 272*16, y: -30*16, direction: "down",},
          ],
        },
      ],
    },
  },







  
 
  
  
};
