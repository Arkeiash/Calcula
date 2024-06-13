class BattleEvent {
  constructor(event, battle) {
    this.event = event;
    this.battle = battle;
  }
  
  textMessage(resolve) {
    
    const text = this.event.text
    .replace("{CASTER}", this.event.caster?.name)
    .replace("{TARGET}", this.event.target?.name)
    .replace("{ACTION}", this.event.action?.name)
    
    
    const message = new TextMessage({
      text,
      onComplete: () => {
        resolve();
      }
    })
    message.init( this.battle.element )
  }
  
  async stateChange(resolve) {
    const {caster, target, damage, recover, barrier, fortify, amplify} = this.event;
    var combatantElement;
    var barrierSave;
    if (caster.team === "enemy") {
      combatantElement = this.battle.heroElement;
    } else {
      combatantElement = this.battle.enemyElement;
    }
    

      if(damage) {
        if(target.barrier > 0) {
          
          
          if(damage < target.barrier) {
            target.update({
              barrier: target.barrier - damage*(1+caster.amplification/100)*(1-target.fortification/100),
            })
          }
          if(damage > target.barrier) {
            barrierSave = target.barrier;
            target.update({
              barrier: target.barrier - damage*(1+caster.amplification/100)*(1-target.fortification/100),
            })
            target.update({
              hp: target.hp - (damage*(1+caster.amplification/100)*(1-target.fortification/100)-barrierSave),
            })
          }
          
          
        } else {
          target.update({
            hp: target.hp - damage*(1+caster.amplification/100)*(1-target.fortification/100),
          })
        }
        combatantElement.classList.add("battle-damage-blink");
      }
    
    
    if(recover && caster.hp < caster.maxHp) {
      if ( recover < caster.maxHp - caster.hp) {
        caster.update({
          hp: caster.hp + recover,
        })
      } else {
        caster.update({
          hp: caster.maxHp,
        })
      }
      
    }
    
    if(barrier) {
      if(caster.maxBarrier === 0) {
        caster.update({
          maxBarrier: caster.maxBarrier + barrier,
        })
        caster.update({
          barrier: caster.barrier + barrier,
        })
      } else if(caster.barrier < caster.maxBarrier) {
        
        if ( barrier < caster.maxBarrier - caster.barrier) {
          caster.update({
            barrier: caster.barrier + barrier,
          })
        } else {
          barrierSave = barrier - (caster.maxBarrier - caster.barrier);
          caster.update({
            barrier: caster.maxBarrier,
          })
          caster.update({
            maxBarrier: caster.maxBarrier + barrierSave,
          })
          caster.update({
            barrier: caster.barrier + barrierSave,
          })
        }
      } else {
        caster.update({
          maxBarrier: caster.maxBarrier + barrier,
        })
        caster.update({
          barrier: caster.barrier + barrier,
        })
      }
    }
    
    if(fortify) {
      caster.update({
          fortification: caster.fortification + fortify,
        })
    }
    if(amplify) {
      caster.update({
          amplification: caster.amplification + amplify,
        })
    }
    
    
    await utils.wait(600);
    
    
    combatantElement.classList.remove("battle-damage-blink");
    
    resolve();
    
  }
  
  async combatantAnimation(resolve) {
    
    var theirTurn = this.battle.heroImageElement;
    var theirClass = "animating-hero";
    if(this.event.caster.team === "enemy") {
      theirTurn = this.battle.enemyImageElement;
      theirClass = "animating-enemy";
    }
    
    theirTurn.classList.add(theirClass);
    
    await utils.wait(1000);
    
    theirTurn.classList.remove(theirClass);
    
    resolve();
  }
  
  async spellAnimation(resolve) {
    
    var posX;
    if(this.event.friendly) {
      console.log("LOGGING")
      posX = 0;
      if(this.event.caster.team === "enemy") {
        posX = 280;
      }
    } else {
        posX = 280
        if(this.event.caster.team === "enemy") {
          posX = 0;
        }
    }
    
    this.spellElement = document.createElement("div");
    this.spellImageElement = document.createElement("img");
    this.spellElement.classList.add("Spell_div");
    this.spellElement.style.left = `${posX}px`;
    
    this.spellImageElement.classList.add("Spell_img");
    this.spellImageElement.src = this.event.src;
    this.battle.element.appendChild(this.spellElement);
    this.spellElement.appendChild(this.spellImageElement);
    //console.log("it's running");
  
    
    //begin Spell animation
    this.spellImageElement.classList.add("animating-spell");
    
    
    await utils.wait(1000);
    //end Spell animation
    
    
    this.spellImageElement.classList.remove("animating-spell");
    this.battle.element.removeChild(this.spellElement);
    this.spellElement.removeChild(this.spellImageElement);
    
    resolve();
  }
  
  submissionMenu(resolve) {
    const menu = new SubmissionMenu({
      caster: this.event.caster,
      enemy: this.event.enemy,
      inventory: this.battle.inventory,
      onComplete: submission => {
        resolve(submission)
      },
      battle: this.battle,
    })
    menu.init(this.battle.element)
  }
  
  
  init(resolve) {
    this[this.event.type](resolve);
  }
}