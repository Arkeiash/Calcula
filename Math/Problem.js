class Problem {
  constructor({onComplete, problem}) {
    this.onComplete = onComplete;
    this.problem = problem;
    this.correct = false;
    this.rewardType = this.problem.reward().dakek;
  }
  createElement() {
    this.element = document.createElement("div");
    this.element.classList.add("Problem");
    
  }
  
  submission() {
    let spell = window.Spells[this.problem.reward().actionId];
    let hpDiff = window.playerState.maxHp-window.playerState.hp;
    let barrierDiff = window.playerState.barrierHp - window.playerState.barrier;
    if(this.correct) {
      console.log(barrierDiff);
      
      console.log(hpDiff);
      

      
      
      if(this.rewardType !== 'B' || this.rewardType !== 'G') {
        window.playerState.items.push(this.problem.reward());
      } else if(this.rewardType === 'B') {
        console.log("it recognizes the type");
        if (hpDiff <= spell.success[2].recover) {
          
          window.playerState.hp = 100;
        } else if(hpDiff > spell.success[2].recover) {
          
          window.playerState.hp += spell.success[2].recover;
        }
       
      } else {
        
        if(barrierDiff===0) {
          window.playerState.barrier += spell.success[2].recover;
          window.playerState.maxHp += spell.success[2].recover;
        } else if (barrierDiff <= spell.success[2].recover) {
          window.playerState.barrier = window.playerState.maxBarrier;
          
        } else if(barrierDiff > spell.success[2].recover) {
          window.playerState.hp += spell.success[2].recover;
        }
        window.playerState.barrier += spell.success[2].recover
      }
      
      this.element.remove();
      this.onComplete();
    } else {
      window.playerState.hp -= this.problem.penalty;
      utils.emitEvent("PlayerStateUpdated");
      this.element.remove();
      
      this.onComplete();
    }
  }
  init(container) {
    this.createElement();
    container.appendChild(this.element);
    this.problemText = new ProblemGenerator({
      problem: this.problem,
      problemInst: this,
      onNewEvent: event => {
        return new Promise(resolve => {
          const problemEvent = new ProblemEvent(event, this);
          problemEvent.init(resolve);
        })
      },
    });
    this.problemText.init(this.element);
    MathJax.typesetPromise();
    
  }
}
