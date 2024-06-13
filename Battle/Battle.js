class Battle {
  constructor({enemy, onComplete, map}) {
    this.enemy = enemy;
    this.onComplete = onComplete;
    this.map = map;
    this.combatants = {
      "player1": new Combatant({
        team: "player",
        hp: window.playerState.hp,
        name: window.playerState.name,
        maxHp: window.playerState.maxHp,
        barrier: window.playerState.barrier,
        maxBarrier: window.playerState.maxBarrier,
        fortification: window.playerState.fortification,
        amplification: window.playerState.amplification,
        isPlayerControlled: true,
      }, this),
      "enemy1": new Combatant({
        team: "enemy",
        hp: this.enemy.hp,
        maxHp: this.enemy.maxHp,
        name: this.enemy.name,
        barrier: this.enemy.barrier,
        maxBarrier: this.enemy.maxBarrier,
        fortification: this.enemy.fortification,
        amplification: this.enemy.amplification,
        rActions: this.enemy.rActions
      }, this),
    }
    
    this.activeCombatants = {
      player: "player1",
      enemy: "enemy1",
    };
    this.inventory = [];
    
    window.playerState.items.forEach(item => {
      this.inventory.push({
        ...item,
        team: "player",
      })
    })
    this.usedInstanceIds = {};
  }
  
  addCombatant(id, team, config) {
    this.combatants[id] = new Combatant({
      team,
      isPlayerControlled: team === "player",
      
    }, this)
    this.activeCombatants[team] = this.activeCombatants[team] || id
  }
  
  createElement() {
    this.element = document.createElement("div");
    this.element.classList.add("Battle");
    
    
    this.heroElement = document.createElement("div");
    this.heroElement.classList.add("Battle_hero_div");
    this.heroImageElement = document.createElement("img");
    this.heroImageElement.src = "/Images/Characters/Hero Sprite Sheet.png";
    this.heroImageElement.classList.add("Battle_hero_img")
    this.element.appendChild(this.heroElement);
    this.heroElement.appendChild(this.heroImageElement);
    
    this.enemyElement = document.createElement("div");
    this.enemyElement.classList.add("Battle_enemy_div");
    this.enemyImageElement = document.createElement("img");
    this.enemyImageElement.src = this.enemy.src;
    this.enemyImageElement.classList.add("Battle_enemy_img")
    this.element.appendChild(this.enemyElement);
    this.enemyElement.appendChild(this.enemyImageElement);
    
  }
    
    /*this.enemyElement = document.createElement("div");
    this.enemyElement.classList.add("Battle_enemy");
    this.enemyElement.innerHTML = (`
      <img src="${'/Images/Characters/Raider Sprite Sheet.png'}" alt="Enemy" />
    `);
    this.element.appendChild(this.enemyElement);
  }*/
  
  quit() {
    
    this.element.remove();
    this.onComplete();
    window.playerState.hp = this.combatants["player1"].hp;
    window.playerState.maxBarrier = this.combatants["player1"].maxBarrier;
    window.playerState.barrier = this.combatants["player1"].barrier;
    window.playerState.fortification = this.combatants["player1"].fortification;
    window.playerState.amplification = this.combatants["player1"].amplification;
    window.playerState.items = [];
    utils.emitEvent("PlayerStateUpdated");
    document.querySelector("#battleMusicAudio").pause();
    document.querySelector("#battleMusicAudio").currentTime = 0;
    document.querySelector("#ambientWorldAudio").play();
    document.querySelector("#ambientWorldAudio").loop = true;
  }
  
  init(container) {
    this.createElement();
    container.appendChild(this.element);
    Object.keys(this.combatants).forEach(key => {
      let combatant = this.combatants[key];
      combatant.id = key;
      combatant.init(this.element)
    })
    
    this.turnCycle = new TurnCycle({
      battle: this,
      onNewEvent: event => {
        return new Promise(resolve => {
          const battleEvent = new BattleEvent(event, this);
          battleEvent.init(resolve);
        })
      },
      onWinner: winner => {
        if(winner === "player") {
          this.enemy.alive = false;
          window.playerState.hp = this.combatants["player1"].hp;
          window.playerState.maxBarrier = this.combatants["player1"].maxBarrier;
          window.playerState.barrier = this.combatants["player1"].barrier;
          window.playerState.fortification = this.combatants["player1"].fortification;
          window.playerState.amplification = this.combatants["player1"].amplification;
          const mapEnemyObject = this.map.gameObjects[this.enemy.id];
          mapEnemyObject.isMounted = false;
          mapEnemyObject.message.done();
          console.log(`${this.enemy.x}, ${this.enemy.y}`);
          
          this.map.removeWall(mapEnemyObject.x, mapEnemyObject.y);
          this.map.removeWall(mapEnemyObject.x+16, mapEnemyObject.y);
          this.map.removeWall(mapEnemyObject.x+16, mapEnemyObject.y+16);
          this.map.removeWall(mapEnemyObject.x, mapEnemyObject.y+16);
          this.map.removeWall(mapEnemyObject.x-16, mapEnemyObject.y);
          this.map.removeWall(mapEnemyObject.x-16, mapEnemyObject.y-16);
          this.map.removeWall(mapEnemyObject.x, mapEnemyObject.y-16);
        }
        this.element.remove();
        this.onComplete();
        window.playerState.items = [];
        document.querySelector("#battleMusicAudio").pause();
        document.querySelector("#battleMusicAudio").currentTime = 0;
        document.querySelector("#ambientWorldAudio").play();
        document.querySelector("#ambientWorldAudio").loop = true;
        utils.emitEvent("PlayerStateUpdated");
      }
    })
    this.turnCycle.init();
    
  }
  
}