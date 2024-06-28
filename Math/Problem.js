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
    if(this.correct) {
      console.log(this.problem.reward().actionId);
      console.log(spell.success[2].recover);

      
      
      if(this.rewardType !== 'B') {
        window.playerState.items.push(this.problem.reward());
      } else {window.playerState.hp += spell.success[2].recover}
      
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
