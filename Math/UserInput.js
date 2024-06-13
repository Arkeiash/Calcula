class UserInput {
  constructor(problem, type, problemInst, onNewEvent) {
    this.problem = problem;
    this.type = type;
    this.problemInst = problemInst;
    this.onNewEvent = onNewEvent;
    
  }
  createElement() {
    this.element = document.createElement("div");
    this.element.classList.add("User-input");
    this.checkBoxElement= document.createElement("button");
    this.checkBoxElement.classList.add("User-input-checkButton");
    this.checkBoxElement.innerHTML = "check";
    if(this.type === "text") {
      this.textBoxElement = document.createElement("input");
      this.textBoxElement.type = "text";
      this.textBoxElement.classList.add("User-input-textBox");
      this.element.appendChild(this.textBoxElement);
      
      this.checkBoxElement.addEventListener("click", () => {
        this.problemInst.element.scrollTo(0,0);
        const userAnswer = utils.getInput(this.textBoxElement);
        this.checkAnswer(userAnswer);
      });
    } else if(this.type === "2choice") {
      this.problem.getChoices();
      utils.shuffleArray(window.Choices);
      
      this.optionAElement = document.createElement("div");
      this.optionAElement.classList.add("optionA");
      this.OABElement = document.createElement("button");
      this.OABElement.classList.add("optionA-button");
      this.optionAElement.appendChild(this.OABElement);
      this.optionATextElement = document.createElement("p");
      this.optionATextElement.innerHTML = `${window.Choices[0]}`;
      this.optionAElement.appendChild(this.optionATextElement);
      this.element.appendChild(this.optionAElement);
      this.OABElement.addEventListener("click", () => {
        this.selectedAnswer = `${window.Choices[0]}`;
        this.checkBoxElement.addEventListener("click", () => {
          this.problemInst.element.scrollTo(0,0);
          console.log(this.element.scrollTop)
          this.checkAnswer(this.selectedAnswer);
        });
      });
      
      this.optionBElement = document.createElement("div");
      this.optionBElement.classList.add("optionB");
      this.OBBElement = document.createElement("button");
      this.OBBElement.classList.add("optionB-button");
      this.optionBElement.appendChild(this.OBBElement);
      this.optionBTextElement = document.createElement("p");
      this.optionBTextElement.innerHTML = `${window.Choices[1]}`;
      this.optionBElement.appendChild(this.optionBTextElement);
      this.element.appendChild(this.optionBElement);
      this.OBBElement.addEventListener("click", () => {
        this.selectedAnswer = `${window.Choices[1]}`;
        this.checkBoxElement.addEventListener("click", () => {
          this.problemInst.element.scrollTo(0,0);
          this.checkAnswer(this.selectedAnswer);
        });
      });
    } else if(this.type === "3choice") {
      this.problem.getChoices();
      utils.shuffleArray(window.Choices);
      
      this.optionAElement = document.createElement("div");
      this.optionAElement.classList.add("optionA");
      this.OABElement = document.createElement("button");
      this.OABElement.classList.add("optionA-button");
      this.optionAElement.appendChild(this.OABElement);
      this.optionATextElement = document.createElement("p");
      this.optionATextElement.innerHTML = `${window.Choices[0]}`;
      this.optionAElement.appendChild(this.optionATextElement);
      this.element.appendChild(this.optionAElement);
      this.OABElement.addEventListener("click", () => {
        this.selectedAnswer = `${window.Choices[0]}`;
        this.checkBoxElement.addEventListener("click", () => {
          this.problemInst.element.scrollTo(0,0);
          console.log(this.element.scrollTop)
          this.checkAnswer(this.selectedAnswer);
        });
      });
      
      this.optionBElement = document.createElement("div");
      this.optionBElement.classList.add("optionB");
      this.OBBElement = document.createElement("button");
      this.OBBElement.classList.add("optionB-button");
      this.optionBElement.appendChild(this.OBBElement);
      this.optionBTextElement = document.createElement("p");
      this.optionBTextElement.innerHTML = `${window.Choices[1]}`;
      this.optionBElement.appendChild(this.optionBTextElement);
      this.element.appendChild(this.optionBElement);
      this.OBBElement.addEventListener("click", () => {
        this.selectedAnswer = `${window.Choices[1]}`;
        this.checkBoxElement.addEventListener("click", () => {
          this.problemInst.element.scrollTo(0,0);
          this.checkAnswer(this.selectedAnswer);
        });
      });
      
      this.optionCElement = document.createElement("div");
      this.optionCElement.classList.add("optionC");
      this.OCBElement = document.createElement("button");
      this.OCBElement.classList.add("optionC-button");
      this.optionCElement.appendChild(this.OCBElement);
      this.optionCTextElement = document.createElement("p");
      this.optionCTextElement.innerHTML = `${window.Choices[2]}`;
      this.optionCElement.appendChild(this.optionCTextElement);
      this.element.appendChild(this.optionCElement);
      this.OCBElement.addEventListener("click", () => {
        this.selectedAnswer = `${window.Choices[2]}`;
        this.checkBoxElement.addEventListener("click", () => {
          this.problemInst.element.scrollTo(0,0);
          this.checkAnswer(this.selectedAnswer);
        });
      });
    } else {
      this.problem.getChoices();
      utils.shuffleArray(window.Choices);
      
      this.optionAElement = document.createElement("div");
      this.optionAElement.classList.add("optionA");
      this.OABElement = document.createElement("button");
      this.OABElement.classList.add("optionA-button");
      this.optionAElement.appendChild(this.OABElement);
      this.optionATextElement = document.createElement("p");
      this.optionATextElement.innerHTML = `${window.Choices[0]}`;
      this.optionAElement.appendChild(this.optionATextElement);
      this.element.appendChild(this.optionAElement);
      this.OABElement.addEventListener("click", () => {
        this.selectedAnswer = `${window.Choices[0]}`;
        this.checkBoxElement.addEventListener("click", () => {
          this.problemInst.element.scrollTo(0,0);
          console.log(this.element.scrollTop)
          this.checkAnswer(this.selectedAnswer);
        });
      });
      
      this.optionBElement = document.createElement("div");
      this.optionBElement.classList.add("optionB");
      this.OBBElement = document.createElement("button");
      this.OBBElement.classList.add("optionB-button");
      this.optionBElement.appendChild(this.OBBElement);
      this.optionBTextElement = document.createElement("p");
      this.optionBTextElement.innerHTML = `${window.Choices[1]}`;
      this.optionBElement.appendChild(this.optionBTextElement);
      this.element.appendChild(this.optionBElement);
      this.OBBElement.addEventListener("click", () => {
        this.selectedAnswer = `${window.Choices[1]}`;
        this.checkBoxElement.addEventListener("click", () => {
          this.problemInst.element.scrollTo(0,0);
          this.checkAnswer(this.selectedAnswer);
        });
      });
      
      this.optionCElement = document.createElement("div");
      this.optionCElement.classList.add("optionC");
      this.OCBElement = document.createElement("button");
      this.OCBElement.classList.add("optionC-button");
      this.optionCElement.appendChild(this.OCBElement);
      this.optionCTextElement = document.createElement("p");
      this.optionCTextElement.innerHTML = `${window.Choices[2]}`;
      this.optionCElement.appendChild(this.optionCTextElement);
      this.element.appendChild(this.optionCElement);
      this.OCBElement.addEventListener("click", () => {
        this.selectedAnswer = `${window.Choices[2]}`;
        this.checkBoxElement.addEventListener("click", () => {
          this.problemInst.element.scrollTo(0,0);
          this.checkAnswer(this.selectedAnswer);
        });
      });
      
      this.optionDElement = document.createElement("div");
      this.optionDElement.classList.add("optionA");
      this.ODBElement = document.createElement("button");
      this.ODBElement.classList.add("optionA-button");
      this.optionDElement.appendChild(this.ODBElement);
      this.optionDTextElement = document.createElement("p");
      this.optionDTextElement.innerHTML = `${window.Choices[3]}`;
      this.optionDElement.appendChild(this.optionDTextElement);
      this.element.appendChild(this.optionDElement);
      this.ODBElement.addEventListener("click", () => {
        this.selectedAnswer = `${window.Choices[3]}`;
        this.checkBoxElement.addEventListener("click", () => {
          this.problemInst.element.scrollTo(0,0);
          this.checkAnswer(this.selectedAnswer);
        });
      });
    }
    this.element.appendChild(this.checkBoxElement);
    console.log(this.problem.getSolution());
  }
  async checkAnswer(answer) {
    this.checkBoxElement.remove();
    document.querySelector("#mathAudio").pause();
      document.querySelector("#mathAudio").currentTime = 0;
    if (answer === this.problem.getSolution()) {
      document.querySelector("#correctAnswerAudio").play();
      await this.onNewEvent({
        type: "textMessage",
        text: `Correct!`,
      });
      await this.onNewEvent({
        type: "textMessage",
        text: `${this.problem.name} was added to your inventory!`,
      });
      this.problemInst.correct = true;
      this.problemInst.submission();
      document.querySelector("#ambientWorldAudio").play();
      document.querySelector("#ambientWorldAudio").volume=0.5;
      document.querySelector("#ambientWorldAudio").loop = true;
      
    } else {
      document.querySelector("#wrongAnswerAudio").play();
      await this.onNewEvent({
        type: "textMessage",
        text: `Uh-oh! Incorrect!`,
      });
      await this.onNewEvent({
        type: "textMessage",
        text: `You lose ${this.problem.penalty} health`,
      });
      this.problemInst.submission();
      document.querySelector("#ambientWorldAudio").play();
      document.querySelector("#ambientWorldAudio").volume=0.5;
      document.querySelector("#ambientWorldAudio").loop = true;
    }
    
  }
  
  init(container) {
    this.createElement();
    container.appendChild(this.element);
  }
}