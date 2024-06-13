class SubmissionMenu {
  constructor({ caster, enemy, onComplete, inventory, battle}) {
    this.caster = caster;
    this.enemy = enemy;
    this.onComplete = onComplete;
    this.battle = battle;
    
    let quantityMap = {};
    inventory.forEach(item => {
      if(item.team === caster.team) {
        
        let existing = quantityMap[item.actionId];
        if (existing) {
          existing.quantity += 1;
          
        } else {
        
          quantityMap[item.actionId] = {
            actionId: item.actionId,
            quantity: 1,
            instanceId: item.instanceId,
            dakek: item.dakek,
          }
        }
      }
    })
    this.items = Object.values(quantityMap);
    console.log(this.items);
  }
  
  getPages() {
    const backOption = {
      label: "Back",
      description: "Go back to previous page",
      handler: () => {
        this.keyboardMenu.setOptions(this.getPages().root)
      }
    }
    
    return {
      root: [
        
        
        {
          label: "Attack",
          color: "rgb(255,0,0)",
          description: "Do damage to your enemy",
          handler: () => {
            this.keyboardMenu.setOptions(this.getPages().attacking);
          }
        },
        {
          label: "Heal",
          color: "rgb(255,0,0)",
          description: "Increase your health",
          handler: () => {
            this.keyboardMenu.setOptions(this.getPages().healing);
          }
        },
        {
          label: "Protect",
          color: "rgb(255,0,0)",
          description: "Increase your shield",
          handler: () => {
            this.keyboardMenu.setOptions(this.getPages().protecting);
          }
        },
        {
          label: "Destroy",
          color: "rgb(255,0,0)",
          description: "Do way more damage to your enemy",
          handler: () => {
            this.keyboardMenu.setOptions(this.getPages().destroying);
          }
        },
        {
          label: "Fortify",
          color: "rgb(255,0,0)",
          description: "Reduce the effect of enemy attacks",
          handler: () => {
            this.keyboardMenu.setOptions(this.getPages().fortifying);
          }
        },
        {
          label: "Amplify",
          color: "rgb(255,0,0)",
          description: "Boost the effect of your attacks",
          handler: () => {
            this.keyboardMenu.setOptions(this.getPages().amplifying);
          }
        },
        {
          label: "Quit",
          color: "rgb(255,0,0)",
          description: "Surrender and quit the battle",
          handler: () => {
            this.keyboardMenu.setOptions(this.getPages().duhNuhNuh);
          }
        },
      ],
      
      attacking: [
        ...this.items.filter(i => i.dakek === "R").map(item => {
          const action = Spells[item.actionId];
            return {
            label: action.name,
            description: action.description,
            right: () => {
              return "x"+item.quantity;
            },
            handler: () => {
              console.log(item.instanceId);
              this.menuSubmit(action, item.instanceId)
            }
          }
        }),
        backOption
      ],
      healing: [
        ...this.items.filter(i => i.dakek === "B").map(item => {
          const action = Spells[item.actionId];
            return {
            label: action.name,
            description: action.description,
            right: () => {
              return "x"+item.quantity;
            },
            handler: () => {
              console.log(item.instanceId);
              this.menuSubmit(action, item.instanceId)
            }
          }
        }),
        backOption
      ],
      protecting: [
        ...this.items.filter(i => i.dakek === "G").map(item => {
          const action = Spells[item.actionId];
            return {
            label: action.name,
            description: action.description,
            right: () => {
              return "x"+item.quantity;
            },
            handler: () => {
              console.log(item.instanceId);
              this.menuSubmit(action, item.instanceId)
            }
          }
        }),
        backOption
      ],
      destroying: [
        ...this.items.filter(i => i.dakek === "M").map(item => {
          const action = Spells[item.actionId];
            return {
            label: action.name,
            description: action.description,
            right: () => {
              return "x"+item.quantity;
            },
            handler: () => {
              console.log(item.instanceId);
              this.menuSubmit(action, item.instanceId)
            }
          }
        }),
        backOption
      ],
      fortifying: [
        ...this.items.filter(i => i.dakek === "Y").map(item => {
          const action = Spells[item.actionId];
            return {
            label: action.name,
            description: action.description,
            right: () => {
              return "x"+item.quantity;
            },
            handler: () => {
              console.log(item.instanceId);
              this.menuSubmit(action, item.instanceId)
            }
          }
        }),
        backOption
      ],
      amplifying: [
        ...this.items.filter(i => i.dakek === "C").map(item => {
          const action = Spells[item.actionId];
            return {
            label: action.name,
            description: action.description,
            right: () => {
              return "x"+item.quantity;
            },
            handler: () => {
              console.log(item.instanceId);
              this.menuSubmit(action, item.instanceId)
            }
          }
        }),
        backOption
      ],
      duhNuhNuh: [
        {
          label: "Quit",
          description: "Are you sure you want to quit?",
          handler: () => {
            this.battle.quit();
          }
        },
     
        backOption
      ],
    }
  }
  
  menuSubmit(action, instanceId=null) {
    this.keyboardMenu?.end();
    
    this.onComplete({
      action,
      target: action.targetType === "friendly" ? this.caster : this.enemy,
      instanceId,
    })
  }
  
  decide() {
    console.log(this.caster.rActions)
    this.menuSubmit(Spells[ this.caster.rActions[utils.getRandomInt(this.caster.rActions.length)] ]);
  }
  
  showMenu(container) {
    this.keyboardMenu = new KeyboardMenu();
    this.keyboardMenu.init(container);
    this.keyboardMenu.setOptions( this.getPages().root );
  }
  
  init(container) {
    
    if(this.caster.isPlayerControlled) {
      
      
      this.showMenu(container);
    } else {
      this.decide();
    }
  }
}