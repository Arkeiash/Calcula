class StatBar {
    constructor(config) {
        this.x = config.x;
        this.y = config.y;
        this.name = config.name;
        this.health = config.health;
        this.shield = config.shield;
        this.amplification = config.amplification;
        this.fortification = config.fortification;
        this.element = null;
    }

    createElement() {
        this.element = document.createElement("div");
        this.element.classList.add("Combatant")
        this.element.style.position = "absolute";
        this.element.style.top = "120px";
        this.element.style.left = "120px";
        this.element.innerHTML = (`
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
                <rect x="0" y="1" height="20" width="60" />
                <rect x="1" y="2" height="18" width="58" fill="rgb(205, 204, 232)" />
            </svg>
            <p>${this.name}</p>
        </div>`)
        this.statsDiv = document.createElement("div");
        this.statsDiv.classList.add("Combatant_stats_box");
        this.statsDiv.innerHTML = (`
        <svg>
            <rect x="0" y="20" height="22" width="25" />
            <rect x="1" y="21" height="20" width="23" fill="rgb(205, 204, 232)" />
        </svg>
        `);
        this.element.appendChild(this.statsDiv);
        
        
        //Create Display Text
        this.hpDisplayElement = document.createElement("p");
        this.barrierDisplayElement = document.createElement("p");
        this.hpDisplayElement.id = "hpDisplay";
        this.barrierDisplayElement.id = "barrierDisplay";
        this.hpDisplayElement.innerText = this.health;
        this.barrierDisplayElement.innerText = this.shield;
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
    
      this.element.appendChild(this.fortDiv);
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
   
      this.element.appendChild(this.amplDiv);
      this.amplDiv.appendChild(this.amplDisplayElement);
    }
    done() {
        this.element.remove();
    }
    init(container) {
        this.createElement();
        container.appendChild(this.element);
      }
} 