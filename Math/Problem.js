class Problem {
  constructor({onComplete, problem}) {
    this.onComplete = onComplete;
    this.problem = problem;
    this.correct = false;
  }
  createElement() {
    this.element = document.createElement("div");
    this.element.classList.add("Problem");
    
  }
  
  submission() {
    if(this.correct) {
      console.log(this.problem);
      console.log(this.problem.reward());
      window.playerState.items.push(this.problem.reward());
      
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
