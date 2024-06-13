class Hud {
  constructor() {
    
  }
  
  update() {
    this.scoreboard.update(window.playerState);
  }
  createElement() {
    this.element = document.createElement("div");
    this.element.classList.add("Hud");
    const {playerState} = window;
    this.scoreboard = new Combatant({
      id: "Player",
      team: "player",
      hp: window.playerState.hp,
      name: window.playerState.name,
      maxHp: window.playerState.maxHp,
      barrier: window.playerState.barrier,
      maxBarrier: window.playerState.maxBarrier,
      fortification: window.playerState.fortification,
      amplification: window.playerState.amplification,
      isPlayerControlled: true,
      
    }, null)
    this.scoreboard.createElement();
    this.element.appendChild(this.scoreboard.hudElement);
    
    this.update();
    
  }
  init(container) {
    this.createElement();
    container.appendChild(this.element);
    
    document.addEventListener("PlayerStateUpdated", () => {
      this.update();
    })
    
  }
  
}