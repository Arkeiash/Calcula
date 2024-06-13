class Combatant {
  constructor(config, battle) {
    Object.keys(config).forEach(key => {
      this[key] = config[key];
    })
    this.hp = typeof(this.hp) === "undefined" ? this.maxHp : this.hp;
    this.battle = battle;
  }
  get hpPercent() {
    const percent = this.hp / this.maxHp;
    return percent > 0 ? percent : 0;
  }
  get barrierPercent() {
    const percent = this.barrier / this.maxBarrier;
    return percent > 0 ? percent : 0;
  }
  get isActive() {
    return this.battle?.activeCombatants[this.team] === this.id;
  }
  get isFortified() {
    return this.fortification > 0;
  }
  get isAmplified() {
    return this.amplification > 0;
  }
  
  createElement() {
    this.hudElement = document.createElement("div");
    this.hudElement.classList.add("Combatant");
    this.hudElement.setAttribute("data-combatant", this.id);
    this.hudElement.setAttribute("data-team", this.team);
    this.hudElement.innerHTML = (`
      <svg class="base1">
            <rect x="0" y="0" width="72" height="22" fill="rgb(0,0,0)" />
            <rect x="1" y="1" width="70" height="20" fill="rgb(205, 204, 232)" />
        </svg>
        <svg class="Combatant_life-container_base">
        <rect x="28" y="24" height="5" width="40" stroke="black" stroke-width="1px" fill="transparent"/>
        
        </svg>
        <svg class="Combatant_barrier-container_base">
            <rect x="28" y="33" height="5" width="40" stroke="black" stroke-width="1px" fill="transparent"/>
        </svg>
        <svg class="Combatant_life-container">
            <rect x="28" y="25" height="4" width="40" stroke="transparent" stroke-width="1px" fill="rgb(255, 0, 0)"/>
        <rect x="28" y="24" height="1" width="40" stroke="transparent" stroke-width="1px" fill="rgb(255, 125, 125)"/>
        </svg>
        <svg class="Combatant_barrier-container">
        <rect x="28" y="34" height="4" width="40" stroke="transparent" stroke-width="1px" fill="rgb(0,255,0)"/>
            <rect x="28" y="33" height="1" width="40" stroke="transparent" fill="rgb(125, 255, 125)"/>
        </svg>
        <div class="Combatant_name">
            <svg>
                <rect x="0" y="1" height="20" width="50" />
                <rect x="1" y="2" height="18" width="48" fill="rgb(205, 204, 232)" />
            </svg>
            <p>${this.name}</p>
        </div>
    `);
    //Create Div
    this.statsDiv = document.createElement("div");
    this.statsDiv.classList.add("Combatant_stats_box");
    this.statsDiv.innerHTML = (`
      <svg>
        <rect x="0" y="20" height="22" width="25" />
        <rect x="1" y="21" height="20" width="23" fill="rgb(205, 204, 232)" />
      </svg>
    `);
    this.hudElement.appendChild(this.statsDiv);
    
    
    //Create Display Text
    this.hpDisplayElement = document.createElement("p");
    this.barrierDisplayElement = document.createElement("p");
    this.hpDisplayElement.id = "hpDisplay";
    this.barrierDisplayElement.id = "barrierDisplay";
    this.hpDisplayElement.innerText = this.hp;
    this.barrierDisplayElement.innerText = this.barrier;
    //Attach my children
    this.statsDiv.appendChild(this.hpDisplayElement);
    this.statsDiv.appendChild(this.barrierDisplayElement);
    
      this.fortDiv = document.createElement("div");
      this.fortDiv.classList.add("Combatant_fortifying_box");
      this.fortDiv.innerHTML = (`
        <svg>
          <rect x="83" y="19.5" width="20" height="11.5" />
          <rect x="84" y="21" width="18" height="9" fill="rgb(255, 251, 0)" />
        </svg>
      `);
      
      this.fortDisplayElement = document.createElement("p");
      this.fortDisplayElement.id = "fortDisplay";
      this.fortDisplayElement.innerText = `${this.fortification}%`;
    
      this.hudElement.appendChild(this.fortDiv);
      this.fortDiv.appendChild(this.fortDisplayElement);
    
      this.amplDiv = document.createElement("div");
      this.amplDiv.classList.add("Combatant_amplifying_box");
      this.amplDiv.innerHTML = (`
        <svg>
          <rect x="71" y="20" width="20" height="11.5" />
          <rect x="72" y="21" width="18" height="10" fill="rgb(0, 238, 255)" />
        </svg>
      `);
      
      this.amplDisplayElement = document.createElement("p");
      this.amplDisplayElement.id = "amplDisplay";
      this.amplDisplayElement.innerText = `${this.amplification}%`;
   
      this.hudElement.appendChild(this.amplDiv);
      this.amplDiv.appendChild(this.amplDisplayElement);
    
    
    
    
    
  
    this.hpFills = this.hudElement.querySelectorAll(".Combatant_life-container > rect")
    this.barrierFills = this.hudElement.querySelectorAll(".Combatant_barrier-container > rect")
  }
  
  
  
  
  
  update(changes={}) {
    

    Object.keys(changes).forEach(key => {
      this[key] = changes[key]
    });
    

    this.hudElement.setAttribute("data-active", this.isActive);
    
    if (this.hp < 0) {this.hp = 0;}
    if (this.barrier < 0) {this.barrier = 0;}
    
    this.hpFills.forEach(rect => rect.style.width = 40*this.hpPercent)
    this.barrierFills.forEach(rect => rect.style.width = 40*this.barrierPercent)
    this.hpDisplayElement.innerText = Math.round(this.hp);
    this.barrierDisplayElement.innerText = Math.round(this.barrier);
    this.fortDisplayElement.innerText = `${this.fortification}%`;
    this.amplDisplayElement.innerText = `${this.amplification}%`;
  }
  
  init(container) {
    this.createElement();
    container.appendChild(this.hudElement);
    this.update();
  }
}