class PlayerState {
  constructor() {
    this.team= "player",
    this.hp=100,
    this.name= "Player",
    this.maxHp= 100,
    this.barrier= 0,
    this.maxBarrier= 0,
    this.fortification= 0,
    this.amplification= 0,
    this.src= "/Images/Characters/Hero Sprite Sheet.png",
    
    this.items = []
    this.kills = [];
    
  }
}
window.playerState = new PlayerState();