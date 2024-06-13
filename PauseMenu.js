class PauseMenu {
  constructor({progress, onComplete, map}) {
    this.progress = progress;
    this.onComplete = onComplete;
    this.map = map;
  }
  
  getOptions(pageKey) {
    if (pageKey === "root") {
      return [
        {
          label: "Save",
          description: "Save your Progress",
          handler: () => {
            this.progress.save();
            this.close();
          }
        },
        {
          label: "Spells",
          description: "View all spells",
          handler: () => {
            this.keyboardMenu.setOptions(this.getOptions("spells"));
          }
        },
        {
          label: "Close",
          description: "Close the pause menu",
          handler: () => {
            this.close();
          }
        }
      ]
    }
    if (pageKey === "spells") {
      return [
        {
          label: "Attack",
          description: "Create a spell to hurt someone",
          handler: () => {
            this.keyboardMenu.setOptions(this.getOptions("R"));
          }
        },
        {
          label: "Heal",
          description: "Create a spell to heal yourself",
          handler: () => {
            this.keyboardMenu.setOptions(this.getOptions("B"));
          }
        },
        {
          label: "Protect",
          description: "Create a spell to shield yourself from damage",
          handler: () => {
            this.keyboardMenu.setOptions(this.getOptions("G"));
          }
        },
        {
          label: "Destroy",
          description: "Create a spell to absolutely wreck someone",
          handler: () => {
            this.keyboardMenu.setOptions(this.getOptions("M"));
          }
        },
        {
          label: "Fortify",
          description: "Create a spell to reduce damage done to you",
          handler: () => {
            this.keyboardMenu.setOptions(this.getOptions("Y"));
          }
        },
        {
          label: "Amplify",
          description: "Create a spell to boost the damage you do",
          handler: () => {
            this.keyboardMenu.setOptions(this.getOptions("C"));
          }
        },
        {
          label: "Back",
          description: "Go back to main menu",
          handler: () => {
            this.keyboardMenu.setOptions( this.getOptions("root") );
          }
        },
      ]
    }
    if (pageKey === "R") {
      return [
        {
          label: "Sweep",
          description: "Require addition or subtraction",
          handler: () => {
            this.keyboardMenu.setOptions(this.getOptions("sweep"));
          }
        },
        {
          label: "Blast",
          description: "Require multiplication or division",
          handler: () => {
            this.keyboardMenu.setOptions(this.getOptions("blast"));
          }
        },
        {
          label: "Flare",
          description: "Require evauluating and writing expressions",
          handler: () => {
            this.keyboardMenu.setOptions(this.getOptions("flare"));
          }
        },
        {
          label: "Scar",
          description: "Require exponents, radicals, or logarithms",
          handler: () => {
            this.keyboardMenu.setOptions(this.getOptions("scar"));
          }
        },
        {
          label: "Singe",
          description: "Require basic algebra skills",
          handler: () => {
            this.keyboardMenu.setOptions(this.getOptions("singe"));
          }
        },
        {
          label: "Scorch",
          description: "Require require intermediate algebra skills",
          handler: () => {
            this.keyboardMenu.setOptions(this.getOptions("scorch"));
          }
        },
        {
          label: "Raze",
          description: "Require sophisticated algebra skills",
          handler: () => {
            this.keyboardMenu.setOptions(this.getOptions("raze"));
          }
        },
        {
          label: "Back",
          description: "Go back to main menu",
          handler: () => {
            this.keyboardMenu.setOptions( this.getOptions("root") );
          }
        },
      ]
    }
    if (pageKey === "B") {
      return [
        {
          label: "Aid",
          description: "Require identifying shapes in space",
          handler: () => {
            this.keyboardMenu.setOptions(this.getOptions("aid"));
          }
        },
        {
          label: "Vive",
          description: "Require angle properties",
          handler: () => {
            this.keyboardMenu.setOptions(this.getOptions("vive"));
          }
        },
        {
          label: "Heal",
          description: "Require finding areas and perimeters",
          handler: () => {
            this.keyboardMenu.setOptions(this.getOptions("heal"));
          }
        },
        {
          label: "Rush",
          description: "Require using trigonometric relationships",
          handler: () => {
            this.keyboardMenu.setOptions(this.getOptions("rush"));
          }
        },
        {
          label: "Back",
          description: "Go back to main menu",
          handler: () => {
            this.keyboardMenu.setOptions( this.getOptions("root") );
          }
        },
      ]
    }
    if (pageKey === "G") {
      return [
        {
          label: "Flect",
          description: "Require analyzing situations and visual data.",
          handler: () => {
            this.keyboardMenu.setOptions(this.getOptions("flect"));
          }
        },
        {
          label: "Block",
          description: "Require telling time and counting U.S. money",
          handler: () => {
            this.keyboardMenu.setOptions(this.getOptions("block"));
          }
        },
        {
          label: "Vert",
          description: "Require analyzing reading graphs and estimating",
          handler: () => {
            this.keyboardMenu.setOptions(this.getOptions("vert"));
          }
        },
        {
          label: "Fract",
          description: "Require classifying angles and converting units",
          handler: () => {
            this.keyboardMenu.setOptions(this.getOptions("fract"));
          }
        },
        {
          label: "Guard",
          description: "Require analyzing data from samples",
          handler: () => {
            this.keyboardMenu.setOptions(this.getOptions("guard"));
          }
        },
        {
          label: "Sheild",
          description: "Require analyzing situations involving probability",
          handler: () => {
            this.keyboardMenu.setOptions(this.getOptions("sheild"));
          }
        },
        {
          label: "Back",
          description: "Go back to main menu",
          handler: () => {
            this.keyboardMenu.setOptions( this.getOptions("root") );
          }
        },
      ]
    }
    if (pageKey === "M") {
      return [
        {
          label: "Maim",
          description: "Require using limits and limit properties",
          handler: () => {
            this.keyboardMenu.setOptions(this.getOptions("maim"));
          }
        },
        {
          label: "Gore",
          description: "Require taking derivitives",
          handler: () => {
            this.keyboardMenu.setOptions(this.getOptions("gore"));
          }
        },
        {
          label: "Scald",
          description: "Require using integrals",
          handler: () => {
            this.keyboardMenu.setOptions(this.getOptions("scald"));
          }
        },
        {
          label: "Wrench",
          description: "Require using geometric and power series",
          handler: () => {
            this.keyboardMenu.setOptions(this.getOptions("wrench"));
          }
        },
        {
          label: "Back",
          description: "Go back to main menu",
          handler: () => {
            this.keyboardMenu.setOptions( this.getOptions("root") );
          }
        },
      ]
    }
    if (pageKey === "Y") {
      return [
        {
          label: "Barr",
          description: "Require analyzing categorical data",
          handler: () => {
            this.keyboardMenu.setOptions(this.getOptions("barr"));
          }
        },
        {
          label: "Struct",
          description: "Require analyzing quantitative data",
          handler: () => {
            this.keyboardMenu.setOptions(this.getOptions("gore"));
          }
        },
        {
          label: "Stop",
          description: "Require probability and combinatorics",
          handler: () => {
            this.keyboardMenu.setOptions(this.getOptions("scald"));
          }
        },
        {
          label: "Clude",
          description: "Require sampling distributions and Central Limit Theorem",
          handler: () => {
            this.keyboardMenu.setOptions(this.getOptions("wrench"));
          }
        },
        {
          label: "Hinde",
          description: "Require making inferences with proportions",
          handler: () => {
            this.keyboardMenu.setOptions(this.getOptions("hinde"));
          }
        },
        {
          label: "Clot",
          description: "Require making inferences with means",
          handler: () => {
            this.keyboardMenu.setOptions(this.getOptions("wrench"));
          }
        },
        {
          label: "Snag",
          description: "Require making inferences using Chi-suqred distribution",
          handler: () => {
            this.keyboardMenu.setOptions(this.getOptions("wrench"));
          }
        },
        {
          label: "Terr",
          description: "Require making inferences about regression lines",
          handler: () => {
            this.keyboardMenu.setOptions(this.getOptions("wrench"));
          }
        },
        {
          label: "Back",
          description: "Go back to main menu",
          handler: () => {
            this.keyboardMenu.setOptions( this.getOptions("root") );
          }
        },
      ]
    }
    if (pageKey === "C") {
      return [
        {
          label: "Boost",
          description: "Require vector operations and properties",
          handler: () => {
            this.keyboardMenu.setOptions(this.getOptions("boost"));
          }
        },
        {
          label: "Grade",
          description: "Require analyzing spaces and subspaces",
          handler: () => {
            this.keyboardMenu.setOptions(this.getOptions("gore"));
          }
        },
        {
          label: "Hance",
          description: "Require using matrix properties and operations",
          handler: () => {
            this.keyboardMenu.setOptions(this.getOptions("scald"));
          }
        },
        {
          label: "Spand",
          description: "Require applying and analyzing transformations",
          handler: () => {
            this.keyboardMenu.setOptions(this.getOptions("wrench"));
          }
        },
        {
          label: "Surge",
          description: "Require finding Eigenvectors and Eigenvalues",
          handler: () => {
            this.keyboardMenu.setOptions(this.getOptions("wrench"));
          }
        },
        {
          label: "Back",
          description: "Go back to main menu",
          handler: () => {
            this.keyboardMenu.setOptions( this.getOptions("root") );
          }
        },
      ]
    }
    const spellOptions = [];
    Object.keys(window.Problems).filter(i => window.Problems[i].dakek === pageKey).forEach(id => {
      spellOptions.push(
        {
          label: window.Problems[id].name,
          description: window.Spells[window.Problems[id].reward().actionId].description,
          handler: () => {
            this.esc?.unbind();
            this.keyboardMenu.end();
            this.element.remove();
            document.querySelector("#ambientWorldAudio").pause();
            document.querySelector("#ambientWorldAudio").currentTime=0;
            document.querySelector("#mathAudio").play();
            document.querySelector("#mathAudio").loop = true;
            //this.onComplete();
            this.map.startCutscene([
              {type: "problem", problem: window.Problems[id].prop},
            ]);
            
          },
        }
      );
    });
    return [
        ...spellOptions,
        {
          label: "Back",
          description: "Go back to main menu",
          handler: () => {
            this.keyboardMenu.setOptions( this.getOptions("root") );
          }
        },
      ]
  }
  
  createElement() {
    this.element = document.createElement("div");
    this.element.classList.add("PauseMenu");
    this.element.innerHTML = (`
      <h2>Pause Menu</h2>
    `)
  }
  
  close() {
    this.esc?.unbind();
    this.keyboardMenu.end();
    this.element.remove();
    this.onComplete();
  }
  
  
  async init(container) {
    this.createElement();
    this.keyboardMenu = new KeyboardMenu({
      descriptionContainer: container,
    });
    this.keyboardMenu.init(this.element);
    this.keyboardMenu.setOptions(this.getOptions("root"));
    
    container.appendChild(this.element);
    
    utils.wait(200);
    this.esc = new KeyPressListener("KeyP", () => {
      this.close();
    })
  }
}