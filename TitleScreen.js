class TitleScreen {
  constructor({ progress }) {
    this.progress = progress;
  }
  getOptions(resolve, pageKey) {
    const saveFile = this.progress.getSaveFile;
    if(pageKey === "click") {
      return [
        {
          label: "Click",
          description: "Click to continue",
          handler: () => {
            document.querySelector("#mainThemeAudio").play();
            document.querySelector("#mainThemeAudio").loop = true;
            this.keyboardMenu.setOptions(this.getOptions(resolve, "play"));
          }
        },
      ]
    }
    if(pageKey === "play") {
      return [
        {
          label: "New Game",
          description: "Begin as a brand new sorcerer",
          handler: () => {
            document.querySelector("#mainThemeAudio").pause();
            document.querySelector("#mainThemeAudio").currentTime = 0;
            document.querySelector("#ambientWorldAudio").play();
            document.querySelector("#ambientWorldAudio").loop = true;
            this.close();
            resolve();
          }
        },
        saveFile ? {
          label: "Continue",
          description: "Resume your adventure",
          handler: () => {
            document.querySelector("#mainThemeAudio").pause();
            document.querySelector("#mainThemeAudio").currentTime = 0;
            document.querySelector("#ambientWorldAudio").play();
            document.querySelector("#ambientWorldAudio").loop = true;
            this.close();
            resolve(saveFile);
          }
        } : null
      ].filter(v => v);
    }
  }
  
  createElement() {
    this.element = document.createElement("div");
    this.element.classList.add("TitleScreen");
    //this.element.innerHTML = (`
    //  <img class="TitleScreen_logo" src="/Images/logo.png" alt="Pizza Legends" />
    //`)
    
  }
  close() {
    this.keyboardMenu.end();
    this.element.remove();
  }
  
  init(container) {
    return new Promise(resolve => {
      this.createElement();
      container.appendChild(this.element);
      this.keyboardMenu = new KeyboardMenu();
      this.keyboardMenu.init(this.element);
      this.keyboardMenu.setOptions(this.getOptions(resolve, "click"));
    })
  }
}