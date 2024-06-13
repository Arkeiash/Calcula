class ProblemGenerator {
  constructor({problem, problemInst, onNewEvent}) {
    this.problemInst = problemInst;
    this.problem = problem;
    this.onNewEvent = onNewEvent;
  }
  createElement() {
    this.problem.getRandoms();
    this.prompt = this.problem.prompt;
    this.content = this.problem.content();
    this.element = document.createElement("div");
    this.element.classList.add("Problem-text");
    
    this.promptElement = document.createElement("div");
    this.promptElement.classList.add("Problem-text-prompt");
    this.promptElement.innerHTML = (`
      <h2>${this.problem.name}</h2>
      ${this.prompt}
    `);
    this.element.appendChild(this.promptElement);
    
    this.contentElement = document.createElement("div");
    this.contentElement.classList.add("Problem-text-content");
    
    this.element.appendChild(this.contentElement);
    this.contentElement.innerHTML = this.content;
    
  }
  init(container) {
    this.createElement();
    container.appendChild(this.element);
    
    this.userInput = new UserInput(this.problem, this.problem.inputType, this.problemInst, this.onNewEvent);
    this.userInput.init(this.element);
    
  }
}