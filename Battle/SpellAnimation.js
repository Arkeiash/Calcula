class SpellAnimation {
  constructor({battle, spell}) {
    this.battle = battle;
    this.spell = spell;
  }
  
  createElement() {
    this.element = document.createElement("div");
    this.element.classList.add("Spell_image");
    this.element.innerHTML = (`
    <img src="${this.spell.src}" alt="Spell" />
    `)
    
  }
  
  init() {
    this.createElement();
    this.battle.element.appendChild(this.element);
  }
}