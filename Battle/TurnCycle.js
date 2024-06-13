class TurnCycle {
  constructor({ battle, onNewEvent, onWinner }) {
    this.battle = battle;
    this.onNewEvent = onNewEvent;
    this.onWinner = onWinner;
    this.currentTeam = "player";
  }
  
  async turn() {
    const casterId = this.battle.activeCombatants[this.currentTeam];
    const caster = this.battle.combatants[casterId];
    const enemyId = this.battle.activeCombatants[caster.team === "player" ? "enemy" : "player"];
    const enemy = this.battle.combatants[enemyId];
    console.log(caster);
    
    const submission = await this.onNewEvent({
      type: "submissionMenu",
      caster,
      enemy
    })
    
    if (submission.instanceId) {
      
      this.battle.usedInstanceIds[submission.instanceId] = true
      
      
      this.battle.inventory = this.battle.inventory.filter(i => i.instanceId !== submission.instanceId)
    }
    
    const resultingEvents = submission.action
    
    .success;
    for( let i=0; i<resultingEvents.length; i++) {
      const event = {
        ...resultingEvents[i],
        submission,
        action: submission.action,
        caster,
        target: submission.target,
      }
      await this.onNewEvent(event);
    }
    const targetDead = submission.target.hp <= 0;
    if (targetDead) {
      await this.onNewEvent({
        type: "textMessage", text: `${submission.target.name} is destroyed!`
      })
    }
  
    const winner = this.getWinningTeam();
    if (winner) {
      await this.onNewEvent({
        type: "textMessage",
        text: "Winner!",
      })
      this.onWinner(winner);
      return;
    }
    
    
    this.currentTeam = this.currentTeam === "player" ? "enemy" : "player";
    this.turn();
  }
  

  
  getWinningTeam() {
    let aliveTeams = {};
    Object.values(this.battle.combatants).forEach(c => {
      if(c.hp > 0) {
        aliveTeams[c.team] = true;
      }
    })
    if(!aliveTeams["player"]) {return "enemy"}
    if(!aliveTeams["enemy"]) {return "player"}
    return null;
    
  }
  
  async init() {
    await this.onNewEvent({
      type: "textMessage",
      text: "the battle begins"
    })
    
    this.turn();
  }
  
}