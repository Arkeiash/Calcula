window.SpellTypes = {
  Attacking: "Attacking",
  Healing: "Healing",
  Protecting: "Protecting",
  Destroying: "Destroying",
  Fortifying: "Fortifying",
  Amplifying: "Amplifying",
}
window.Spells = {
  Headshot: {
    name: "Headshot",
    type: SpellTypes.Attacking,
    description: "Does 80 damage",
    required: window.Problems.sweep1,
    
    icon: "Images/Battle/attackingIcon.png",
    success: [
      { type: "textMessage", text: "{ACTION}"},
      { type: "combatantAnimation"},
      
      { type: "stateChange", damage: 80},
    ]
  },
  Crackshot: {
    name: "Crack Shot",
    type: SpellTypes.Attacking,
    description: "Does 50 damage",
    required: window.Problems.sweep1,
    
    icon: "Images/Battle/attackingIcon.png",
    success: [
      { type: "textMessage", text: "{ACTION}"},
      { type: "combatantAnimation"},
      
      { type: "stateChange", damage: 50},
    ]
  },
  Fleshwound: {
    name: "Flesh Wound",
    type: SpellTypes.Attacking,
    description: "Does 50 damage",
    required: window.Problems.sweep1,
    
    icon: "Images/Battle/attackingIcon.png",
    success: [
      { type: "textMessage", text: "{ACTION}"},
      { type: "combatantAnimation"},
      
      { type: "stateChange", damage: 50},
    ]
  },
  Ouch: {
    name: "Ouch!",
    type: SpellTypes.Attacking,
    description: "Does 50 damage",
    required: window.Problems.sweep1,
    
    icon: "Images/Battle/attackingIcon.png",
    success: [
      { type: "textMessage", text: "{ACTION}"},
      { type: "combatantAnimation"},
      { type: "stateChange", damage: 10},
    ]
  },
  Laceration: {
    name: "Laceration!",
    type: SpellTypes.Attacking,
    description: "Does 120 damage",
    required: window.Problems.sweep1,
    
    icon: "Images/Battle/attackingIcon.png",
    success: [
      { type: "textMessage", text: "{ACTION}"},
      { type: "combatantAnimation"},
      { type: "stateChange", damage: 10},
    ]
  },
  Beg1: {
    name: "Beg",
    type: SpellTypes.Attacking,
    description: "Does 120 damage",
    required: window.Problems.sweep1,
    
    icon: "Images/Battle/attackingIcon.png",
    success: [
      { type: "textMessage", text: "Please! Don't hurt me!"},
      
    ]
  },
  Beg2: {
    name: "Beg",
    type: SpellTypes.Attacking,
    description: "Does 120 damage",
    required: window.Problems.sweep1,
    
    icon: "Images/Battle/attackingIcon.png",
    success: [
      { type: "textMessage", text: "Spare my life! I beg you!"},
      
    ]
  },
  Sweep1: {
    name: "Sweep 1",
    type: SpellTypes.Attacking,
    description: "Does 10 damage",
    required: window.Problems.sweep1,
    
    icon: "Images/Battle/attackingIcon.png",
    success: [
      { type: "textMessage", text: "{CASTER} casted {ACTION}"},
      { type: "combatantAnimation"},
      { type: "spellAnimation", src: "Images/Battle/Spells/Sweep Sprite Sheet.png"},
      { type: "stateChange", damage: 10},
    ]
  },
  Sweep2: {
    name: "Sweep 2",
    type: SpellTypes.Attacking,
    description: "Does 15 damage",
    required: window.Problems.sweep2,
    
    icon: "Images/Battle/attackingIcon.png",
    success: [
      { type: "textMessage", text: "{CASTER} casted {ACTION}"},
      { type: "combatantAnimation"},
      { type: "spellAnimation", src: "Images/Battle/Spells/Sweep Sprite Sheet.png"},
      { type: "stateChange", damage: 15},
    ]
  },
  Sweep3: {
    name: "Sweep 3",
    type: SpellTypes.Attacking,
    description: "Does 20 damage",
    required: window.Problems.sweep3,
    
    icon: "Images/Battle/attackingIcon.png",
    success: [
      { type: "textMessage", text: "{CASTER} casted {ACTION}"},
      { type: "combatantAnimation"},
      { type: "spellAnimation", src: "Images/Battle/Spells/Sweep Sprite Sheet.png"},
      { type: "stateChange", damage: 20},
    ]
  },
  Sweep4: {
    name: "Sweep 4",
    type: SpellTypes.Attacking,
    description: "Does 45 damage",
    required: window.Problems.sweep4,
    
    icon: "Images/Battle/attackingIcon.png",
    success: [
      { type: "textMessage", text: "{CASTER} casted {ACTION}"},
      { type: "combatantAnimation"},
      { type: "spellAnimation", src: "Images/Battle/Spells/Sweep Sprite Sheet.png"},
      { type: "stateChange", damage: 45},
    ]
  },
  Sweep5: {
    name: "Sweep 5",
    type: SpellTypes.Attacking,
    description: "Does 50 damage",
    required: window.Problems.sweep5,
    
    icon: "Images/Battle/attackingIcon.png",
    success: [
      { type: "textMessage", text: "{CASTER} casted {ACTION}"},
      { type: "combatantAnimation"},
      { type: "spellAnimation", src: "Images/Battle/Spells/Sweep Sprite Sheet.png"},
      { type: "stateChange", damage: 50},
    ]
  },
  Sweep6: {
    name: "Sweep 6",
    type: SpellTypes.Attacking,
    description: "Does 55 damage",
    required: window.Problems.sweep6,
    
    icon: "Images/Battle/attackingIcon.png",
    success: [
      { type: "textMessage", text: "{CASTER} casted {ACTION}"},
      { type: "combatantAnimation"},
      { type: "spellAnimation", src: "Images/Battle/Spells/Sweep Sprite Sheet.png"},
      { type: "stateChange", damage: 55},
    ]
  },
  Blast1: {
    name: "Blast 1",
    type: SpellTypes.Attacking,
    description: "Does 40 damage",
    icon: "Images/Battle/attackingIcon.png",
    success: [
      { type: "textMessage", text: "{CASTER} casted {ACTION}"},
      { type: "combatantAnimation"},
      { type: "spellAnimation", src: "Images/Battle/Spells/Sweep Sprite Sheet.png"},
      { type: "stateChange", damage: 40},
    ]
  },
  Blast2: {
    name: "Blast 2",
    type: SpellTypes.Attacking,
    description: "Does 50 damage",
    icon: "Images/Battle/attackingIcon.png",
    success: [
      { type: "textMessage", text: "{CASTER} casted {ACTION}"},
      { type: "combatantAnimation"},
      { type: "spellAnimation", src: "Images/Battle/Spells/Sweep Sprite Sheet.png"},
      { type: "stateChange", damage: 50},
    ]
  },
  Blast3: {
    name: "Blast 3",
    type: SpellTypes.Attacking,
    description: "Does 60 damage",
    icon: "Images/Battle/attackingIcon.png",
    success: [
      { type: "textMessage", text: "{CASTER} casted {ACTION}"},
      { type: "combatantAnimation"},
      { type: "spellAnimation", src: "Images/Battle/Spells/Sweep Sprite Sheet.png"},
      { type: "stateChange", damage: 60},
    ]
  },
  Blast4: {
    name: "Blast 4",
    type: SpellTypes.Attacking,
    description: "Does 70 damage",
    icon: "Images/Battle/attackingIcon.png",
    success: [
      { type: "textMessage", text: "{CASTER} casted {ACTION}"},
      { type: "combatantAnimation"},
      { type: "spellAnimation", src: "Images/Battle/Spells/Sweep Sprite Sheet.png"},
      { type: "stateChange", damage: 70},
    ]
  },
  Flare1: {
    name: "Flare 1",
    type: SpellTypes.Attacking,
    description: "Does 50 damage",
    icon: "Images/Battle/attackingIcon.png",
    success: [
      { type: "textMessage", text: "{CASTER} casted {ACTION}"},
      { type: "combatantAnimation"},
      { type: "spellAnimation", src: "Images/Battle/Spells/Sweep Sprite Sheet.png"},
      { type: "stateChange", damage: 50},
    ]
  },
  Flare2: {
    name: "Flare 2",
    type: SpellTypes.Attacking,
    description: "Does 60 damage",
    icon: "Images/Battle/attackingIcon.png",
    success: [
      { type: "textMessage", text: "{CASTER} casted {ACTION}"},
      { type: "combatantAnimation"},
      { type: "spellAnimation", src: "Images/Battle/Spells/Sweep Sprite Sheet.png"},
      { type: "stateChange", damage: 60},
    ]
  },
  Flare3: {
    name: "Flare 3",
    type: SpellTypes.Attacking,
    description: "Does 70 damage",
    icon: "Images/Battle/attackingIcon.png",
    success: [
      { type: "textMessage", text: "{CASTER} casted {ACTION}"},
      { type: "combatantAnimation"},
      { type: "spellAnimation", src: "Images/Battle/Spells/Sweep Sprite Sheet.png"},
      { type: "stateChange", damage: 70},
    ]
  },
  Flare4: {
    name: "Flare 4",
    type: SpellTypes.Attacking,
    description: "Does 80 damage",
    icon: "Images/Battle/attackingIcon.png",
    success: [
      { type: "textMessage", text: "{CASTER} casted {ACTION}"},
      { type: "combatantAnimation"},
      { type: "spellAnimation", src: "Images/Battle/Spells/Sweep Sprite Sheet.png"},
      { type: "stateChange", damage: 80},
    ]
  },
  Flare5: {
    name: "Flare 5",
    type: SpellTypes.Attacking,
    description: "Does 90 damage",
    icon: "Images/Battle/attackingIcon.png",
    success: [
      { type: "textMessage", text: "{CASTER} casted {ACTION}"},
      { type: "combatantAnimation"},
      { type: "spellAnimation", src: "Images/Battle/Spells/Sweep Sprite Sheet.png"},
      { type: "stateChange", damage: 90},
    ]
  },
  Flare6: {
    name: "Flare 6",
    type: SpellTypes.Attacking,
    description: "Does 100 damage",
    icon: "Images/Battle/attackingIcon.png",
    success: [
      { type: "textMessage", text: "{CASTER} casted {ACTION}"},
      { type: "combatantAnimation"},
      { type: "spellAnimation", src: "Images/Battle/Spells/Sweep Sprite Sheet.png"},
      { type: "stateChange", damage: 100},
    ]
  },
  Scar1: {
    name: "Scar 1",
    type: SpellTypes.Attacking,
    description: "Does 60 damage",
    icon: "Images/Battle/attackingIcon.png",
    success: [
      { type: "textMessage", text: "{CASTER} casted {ACTION}"},
      { type: "combatantAnimation"},
      { type: "spellAnimation", src: "Images/Battle/Spells/Sweep Sprite Sheet.png"},
      { type: "stateChange", damage: 60},
    ]
  },
  Scar2: {
    name: "Scar 2",
    type: SpellTypes.Attacking,
    description: "Does 80 damage",
    icon: "Images/Battle/attackingIcon.png",
    success: [
      { type: "textMessage", text: "{CASTER} casted {ACTION}"},
      { type: "combatantAnimation"},
      { type: "spellAnimation", src: "Images/Battle/Spells/Sweep Sprite Sheet.png"},
      { type: "stateChange", damage: 80},
    ]
  },
  Scar3: {
    name: "Scar 3",
    type: SpellTypes.Attacking,
    description: "Does 100 damage",
    icon: "Images/Battle/attackingIcon.png",
    success: [
      { type: "textMessage", text: "{CASTER} casted {ACTION}"},
      { type: "combatantAnimation"},
      { type: "spellAnimation", src: "Images/Battle/Spells/Sweep Sprite Sheet.png"},
      { type: "stateChange", damage: 100},
    ]
  },
  Scar4: {
    name: "Scar 4",
    type: SpellTypes.Attacking,
    description: "Does 150 damage",
    icon: "Images/Battle/attackingIcon.png",
    success: [
      { type: "textMessage", text: "{CASTER} casted {ACTION}"},
      { type: "combatantAnimation"},
      { type: "spellAnimation", src: "Images/Battle/Spells/Sweep Sprite Sheet.png"},
      { type: "stateChange", damage: 150},
    ]
  },
  Singe1: {
    name: "Singe 1",
    type: SpellTypes.Attacking,
    description: "Does 80 damage",
    icon: "Images/Battle/attackingIcon.png",
    success: [
      { type: "textMessage", text: "{CASTER} casted {ACTION}"},
      { type: "combatantAnimation"},
      { type: "spellAnimation", src: "Images/Battle/Spells/Sweep Sprite Sheet.png"},
      { type: "stateChange", damage: 80},
    ]
  },
  Singe2: {
    name: "Singe 2",
    type: SpellTypes.Attacking,
    description: "Does 90 damage",
    icon: "Images/Battle/attackingIcon.png",
    success: [
      { type: "textMessage", text: "{CASTER} casted {ACTION}"},
      { type: "combatantAnimation"},
      { type: "spellAnimation", src: "Images/Battle/Spells/Sweep Sprite Sheet.png"},
      { type: "stateChange", damage: 90},
    ]
  },
  Singe3: {
    name: "Singe 3",
    type: SpellTypes.Attacking,
    description: "Does 100 damage",
    icon: "Images/Battle/attackingIcon.png",
    success: [
      { type: "textMessage", text: "{CASTER} casted {ACTION}"},
      { type: "combatantAnimation"},
      { type: "spellAnimation", src: "Images/Battle/Spells/Sweep Sprite Sheet.png"},
      { type: "stateChange", damage: 100},
    ]
  },
  Singe4: {
    name: "Singe 4",
    type: SpellTypes.Attacking,
    description: "Does 120 damage",
    icon: "Images/Battle/attackingIcon.png",
    success: [
      { type: "textMessage", text: "{CASTER} casted {ACTION}"},
      { type: "combatantAnimation"},
      { type: "spellAnimation", src: "Images/Battle/Spells/Sweep Sprite Sheet.png"},
      { type: "stateChange", damage: 120},
    ]
  },
  Singe5: {
    name: "Singe 5",
    type: SpellTypes.Attacking,
    description: "Does 150 damage",
    icon: "Images/Battle/attackingIcon.png",
    success: [
      { type: "textMessage", text: "{CASTER} casted {ACTION}"},
      { type: "combatantAnimation"},
      { type: "spellAnimation", src: "Images/Battle/Spells/Sweep Sprite Sheet.png"},
      { type: "stateChange", damage: 150},
    ]
  },
  Scorch1: {
    name: "Scorch 1",
    type: SpellTypes.Attacking,
    description: "Does 160 damage",
    icon: "Images/Battle/attackingIcon.png",
    success: [
      { type: "textMessage", text: "{CASTER} casted {ACTION}"},
      { type: "combatantAnimation"},
      { type: "spellAnimation", src: "Images/Battle/Spells/Sweep Sprite Sheet.png"},
      { type: "stateChange", damage: 160},
    ]
  },
  Scorch2: {
    name: "Scorch 2",
    type: SpellTypes.Attacking,
    description: "Does 180 damage",
    icon: "Images/Battle/attackingIcon.png",
    success: [
      { type: "textMessage", text: "{CASTER} casted {ACTION}"},
      { type: "combatantAnimation"},
      { type: "spellAnimation", src: "Images/Battle/Spells/Sweep Sprite Sheet.png"},
      { type: "stateChange", damage: 180},
    ]
  },
  Scorch3: {
    name: "Scorch 3",
    type: SpellTypes.Attacking,
    description: "Does 200 damage",
    icon: "Images/Battle/attackingIcon.png",
    success: [
      { type: "textMessage", text: "{CASTER} casted {ACTION}"},
      { type: "combatantAnimation"},
      { type: "spellAnimation", src: "Images/Battle/Spells/Sweep Sprite Sheet.png"},
      { type: "stateChange", damage: 200},
    ]
  },
  Scorch4: {
    name: "Scorch 4",
    type: SpellTypes.Attacking,
    description: "Does 240 damage",
    icon: "Images/Battle/attackingIcon.png",
    success: [
      { type: "textMessage", text: "{CASTER} casted {ACTION}"},
      { type: "combatantAnimation"},
      { type: "spellAnimation", src: "Images/Battle/Spells/Sweep Sprite Sheet.png"},
      { type: "stateChange", damage: 240},
    ]
  },
  Raze1: {
    name: "Raze 1",
    type: SpellTypes.Attacking,
    description: "Does 260 damage",
    icon: "Images/Battle/attackingIcon.png",
    success: [
      { type: "textMessage", text: "{CASTER} casted {ACTION}"},
      { type: "combatantAnimation"},
      { type: "spellAnimation", src: "Images/Battle/Spells/Sweep Sprite Sheet.png"},
      { type: "stateChange", damage: 260},
    ]
  },
  Raze2: {
    name: "Raze 2",
    type: SpellTypes.Attacking,
    description: "Does 280 damage",
    icon: "Images/Battle/attackingIcon.png",
    success: [
      { type: "textMessage", text: "{CASTER} casted {ACTION}"},
      { type: "combatantAnimation"},
      { type: "spellAnimation", src: "Images/Battle/Spells/Sweep Sprite Sheet.png"},
      { type: "stateChange", damage: 280},
    ]
  },
  Raze3: {
    name: "Raze 3",
    type: SpellTypes.Attacking,
    description: "Does 300 damage",
    icon: "Images/Battle/attackingIcon.png",
    success: [
      { type: "textMessage", text: "{CASTER} casted {ACTION}"},
      { type: "combatantAnimation"},
      { type: "spellAnimation", src: "Images/Battle/Spells/Sweep Sprite Sheet.png"},
      { type: "stateChange", damage: 300},
    ]
  },
  Aid1: {
    name: "Aid 1",
    type: SpellTypes.Healing,
    description: "Restores 5 health",
    amount: 5,
    icon: "Images/Battle/healingIcon.png",
    friendly: true,
    success: [
      { type: "textMessage", text: "{CASTER} casted {ACTION}"},
      { type: "spellAnimation", friendly: true, src: "Images/Battle/Spells/Aid Sprite Sheet.png"},
      { type: "stateChange", recover: 5},
    ]
  },
  Aid2: {
    name: "Aid 2",
    type: SpellTypes.Healing,
    description: "Restores 10 health",
    icon: "Images/Battle/healingIcon.png",
    friendly: true,
    success: [
      { type: "textMessage", text: "{CASTER} casted {ACTION}"},
      { type: "spellAnimation", friendly: true, src: "Images/Battle/Spells/Aid Sprite Sheet.png"},
      { type: "stateChange", recover: 10},
    ]
  },
  Aid3: {
    name: "Aid 3",
    type: SpellTypes.Healing,
    description: "Restores 10 health",
    icon: "Images/Battle/healingIcon.png",
    friendly: true,
    success: [
      { type: "textMessage", text: "{CASTER} casted {ACTION}"},
      { type: "spellAnimation", friendly: true, src: "Images/Battle/Spells/Aid Sprite Sheet.png"},
      { type: "stateChange", recover: 10},
    ]
  },
  Aid4: {
    name: "Aid 4",
    type: SpellTypes.Healing,
    description: "Restores 12 health",
    icon: "Images/Battle/healingIcon.png",
    friendly: true,
    success: [
      { type: "textMessage", text: "{CASTER} casted {ACTION}"},
      { type: "spellAnimation", friendly: true, src: "Images/Battle/Spells/Aid Sprite Sheet.png"},
      { type: "stateChange", recover: 12},
    ]
  },
  Aid5: {
    name: "Aid 5",
    type: SpellTypes.Healing,
    description: "Restores 15 health",
    icon: "Images/Battle/healingIcon.png",
    friendly: true,
    success: [
      { type: "textMessage", text: "{CASTER} casted {ACTION}"},
      { type: "spellAnimation", friendly: true, src: "Images/Battle/Spells/Aid Sprite Sheet.png"},
      { type: "stateChange", recover: 15},
    ]
  },
  Aid6: {
    name: "Aid 6",
    type: SpellTypes.Healing,
    description: "Restores 16 health",
    icon: "Images/Battle/healingIcon.png",
    friendly: true,
    success: [
      { type: "textMessage", text: "{CASTER} casted {ACTION}"},
      { type: "spellAnimation", friendly: true, src: "Images/Battle/Spells/Aid Sprite Sheet.png"},
      { type: "stateChange", recover: 16},
    ]
  },
  Vive1: {
    name: "Vive 1",
    type: SpellTypes.Healing,
    description: "Restores 7 health",
    icon: "Images/Battle/healingIcon.png",
    friendly: true,
    success: [
      { type: "textMessage", text: "{CASTER} casted {ACTION}"},
      { type: "spellAnimation", friendly: true, src: "Images/Battle/Spells/Aid Sprite Sheet.png"},
      { type: "stateChange", recover: 1},
    ]
  },
  Vive2: {
    name: "Vive 2",
    type: SpellTypes.Healing,
    description: "Restores 9 health",
    icon: "Images/Battle/healingIcon.png",
    friendly: true,
    success: [
      { type: "textMessage", text: "{CASTER} casted {ACTION}"},
      { type: "spellAnimation", friendly: true, src: "Images/Battle/Spells/Aid Sprite Sheet.png"},
      { type: "stateChange", recover: 9},
    ]
  },
  Vive3: {
    name: "Vive 3",
    type: SpellTypes.Healing,
    description: "Restores 11 health",
    icon: "Images/Battle/healingIcon.png",
    friendly: true,
    success: [
      { type: "textMessage", text: "{CASTER} casted {ACTION}"},
      { type: "spellAnimation", friendly: true, src: "Images/Battle/Spells/Aid Sprite Sheet.png"},
      { type: "stateChange", recover: 11},
    ]
  },
  Heal1: {
    name: "Heal 1",
    type: SpellTypes.Healing,
    description: "Restores 8 health",
    icon: "Images/Battle/healingIcon.png",
    friendly: true,
    success: [
      { type: "textMessage", text: "{CASTER} casted {ACTION}"},
      { type: "spellAnimation", friendly: true, src: "Images/Battle/Spells/Aid Sprite Sheet.png"},
      { type: "stateChange", recover: 8},
    ]
  },
  Heal2: {
    name: "Heal 2",
    type: SpellTypes.Healing,
    description: "Restores 9 health",
    icon: "Images/Battle/healingIcon.png",
    friendly: true,
    success: [
      { type: "textMessage", text: "{CASTER} casted {ACTION}"},
      { type: "spellAnimation", friendly: true, src: "Images/Battle/Spells/Aid Sprite Sheet.png"},
      { type: "stateChange", recover: 9},
    ]
  },
  Heal3: {
    name: "Heal 3",
    type: SpellTypes.Healing,
    description: "Restores 10 health",
    icon: "Images/Battle/healingIcon.png",
    friendly: true,
    success: [
      { type: "textMessage", text: "{CASTER} casted {ACTION}"},
      { type: "spellAnimation", friendly: true, src: "Images/Battle/Spells/Aid Sprite Sheet.png"},
      { type: "stateChange", recover: 10},
    ]
  },
  Heal4: {
    name: "Heal 4",
    type: SpellTypes.Healing,
    description: "Restores 12 health",
    icon: "Images/Battle/healingIcon.png",
    friendly: true,
    success: [
      { type: "textMessage", text: "{CASTER} casted {ACTION}"},
      { type: "spellAnimation", friendly: true, src: "Images/Battle/Spells/Aid Sprite Sheet.png"},
      { type: "stateChange", recover: 12},
    ]
  },
  Heal5: {
    name: "Heal 5",
    type: SpellTypes.Healing,
    description: "Restores 20 health",
    icon: "Images/Battle/healingIcon.png",
    friendly: true,
    success: [
      { type: "textMessage", text: "{CASTER} casted {ACTION}"},
      { type: "spellAnimation", friendly: true, src: "Images/Battle/Spells/Aid Sprite Sheet.png"},
      { type: "stateChange", recover: 20},
    ]
  },
  Rush1: {
    name: "Rush 1",
    type: SpellTypes.Healing,
    description: "Restores 20 health",
    icon: "Images/Battle/healingIcon.png",
    friendly: true,
    success: [
      { type: "textMessage", text: "{CASTER} casted {ACTION}"},
      { type: "spellAnimation", friendly: true, src: "Images/Battle/Spells/Aid Sprite Sheet.png"},
      { type: "stateChange", recover: 20},
    ]
  },
  Rush2: {
    name: "Rush 2",
    type: SpellTypes.Healing,
    description: "Restores 25 health",
    icon: "Images/Battle/healingIcon.png",
    friendly: true,
    success: [
      { type: "textMessage", text: "{CASTER} casted {ACTION}"},
      { type: "spellAnimation", friendly: true, src: "Images/Battle/Spells/Aid Sprite Sheet.png"},
      { type: "stateChange", recover: 25},
    ]
  },
  Rush3: {
    name: "Rush 3",
    type: SpellTypes.Healing,
    description: "Restores 30 health",
    icon: "Images/Battle/healingIcon.png",
    friendly: true,
    success: [
      { type: "textMessage", text: "{CASTER} casted {ACTION}"},
      { type: "spellAnimation", friendly: true, src: "Images/Battle/Spells/Aid Sprite Sheet.png"},
      { type: "stateChange", recover: 30},
    ]
  },
  Flect1: {
    name: "Flect 1",
    type: SpellTypes.Protecting,
    description: "Generates 10 sheild points",
    icon: "Images/Battle/protectingIcon.png",
    success: [
      { type: "textMessage", text: "{CASTER} casted {ACTION}"},
      { type: "spellAnimation", friendly: true, src: "Images/Battle/Spells/Flect Sprite Sheet.png"},
      { type: "stateChange", barrier: 10},
    ]
  },
  Flect2: {
    name: "Flect 2",
    type: SpellTypes.Protecting,
    description: "Generates 12 sheild points",
    icon: "Images/Battle/protectingIcon.png",
    success: [
      { type: "textMessage", text: "{CASTER} casted {ACTION}"},
      { type: "spellAnimation", friendly: true, src: "Images/Battle/Spells/Flect Sprite Sheet.png"},
      { type: "stateChange", barrier: 12},
    ]
  },
  Flect3: {
    name: "Flect 3",
    type: SpellTypes.Protecting,
    description: "Generates 20 sheild points",
    icon: "Images/Battle/protectingIcon.png",
    success: [
      { type: "textMessage", text: "{CASTER} casted {ACTION}"},
      { type: "spellAnimation", friendly: true, src: "Images/Battle/Spells/Flect Sprite Sheet.png"},
      { type: "stateChange", barrier: 20},
    ]
  },
  Flect4: {
    name: "Flect 4",
    type: SpellTypes.Protecting,
    description: "Generates 22 sheild points",
    icon: "Images/Battle/protectingIcon.png",
    success: [
      { type: "textMessage", text: "{CASTER} casted {ACTION}"},
      { type: "spellAnimation", friendly: true, src: "Images/Battle/Spells/Flect Sprite Sheet.png"},
      { type: "stateChange", barrier: 22},
    ]
  },
  Flect5: {
    name: "Flect 5",
    type: SpellTypes.Protecting,
    description: "Generates 25 sheild points",
    icon: "Images/Battle/protectingIcon.png",
    success: [
      { type: "textMessage", text: "{CASTER} casted {ACTION}"},
      { type: "spellAnimation", friendly: true, src: "Images/Battle/Spells/Flect Sprite Sheet.png"},
      { type: "stateChange", barrier: 25},
    ]
  },
  Block1: {
    name: "Block 1",
    type: SpellTypes.Protecting,
    description: "Generates 12 sheild points",
    icon: "Images/Battle/protectingIcon.png",
    success: [
      { type: "textMessage", text: "{CASTER} casted {ACTION}"},
      { type: "spellAnimation", friendly: true, src: "Images/Battle/Spells/Flect Sprite Sheet.png"},
      { type: "stateChange", barrier: 12},
    ]
  },
  Block2: {
    name: "Block 2",
    type: SpellTypes.Protecting,
    description: "Generates 15 sheild points",
    icon: "Images/Battle/protectingIcon.png",
    success: [
      { type: "textMessage", text: "{CASTER} casted {ACTION}"},
      { type: "spellAnimation", friendly: true, src: "Images/Battle/Spells/Flect Sprite Sheet.png"},
      { type: "stateChange", barrier: 15},
    ]
  },
  Vert1: {
    name: "Vert 1",
    type: SpellTypes.Protecting,
    description: "Generates 10 sheild points",
    icon: "Images/Battle/protectingIcon.png",
    success: [
      { type: "textMessage", text: "{CASTER} casted {ACTION}"},
      { type: "spellAnimation", friendly: true, src: "Images/Battle/Spells/Flect Sprite Sheet.png"},
      { type: "stateChange", barrier: 10},
    ]
  },
  Vert2: {
    name: "Vert 2",
    type: SpellTypes.Protecting,
    description: "Generates 12 sheild points",
    icon: "Images/Battle/protectingIcon.png",
    success: [
      { type: "textMessage", text: "{CASTER} casted {ACTION}"},
      { type: "spellAnimation", friendly: true, src: "Images/Battle/Spells/Flect Sprite Sheet.png"},
      { type: "stateChange", barrier: 12},
    ]
  },
  Vert3: {
    name: "Vert 3",
    type: SpellTypes.Protecting,
    description: "Generates 15 sheild points",
    icon: "Images/Battle/protectingIcon.png",
    success: [
      { type: "textMessage", text: "{CASTER} casted {ACTION}"},
      { type: "spellAnimation", friendly: true, src: "Images/Battle/Spells/Flect Sprite Sheet.png"},
      { type: "stateChange", barrier: 15},
    ]
  },
  Vert4: {
    name: "Vert 4",
    type: SpellTypes.Protecting,
    description: "Generates 18 sheild points",
    icon: "Images/Battle/protectingIcon.png",
    success: [
      { type: "textMessage", text: "{CASTER} casted {ACTION}"},
      { type: "spellAnimation", friendly: true, src: "Images/Battle/Spells/Flect Sprite Sheet.png"},
      { type: "stateChange", barrier: 18},
    ]
  },
  Vert5: {
    name: "Vert 5",
    type: SpellTypes.Protecting,
    description: "Generates 25 sheild points",
    icon: "Images/Battle/protectingIcon.png",
    success: [
      { type: "textMessage", text: "{CASTER} casted {ACTION}"},
      { type: "spellAnimation", friendly: true, src: "Images/Battle/Spells/Flect Sprite Sheet.png"},
      { type: "stateChange", barrier: 25},
    ]
  },
  Fract1: {
    name: "Fract 1",
    type: SpellTypes.Protecting,
    description: "Generates 25 sheild points",
    icon: "Images/Battle/protectingIcon.png",
    success: [
      { type: "textMessage", text: "{CASTER} casted {ACTION}"},
      { type: "spellAnimation", friendly: true, src: "Images/Battle/Spells/Flect Sprite Sheet.png"},
      { type: "stateChange", barrier: 25},
    ]
  },
  Fract2: {
    name: "Fract 2",
    type: SpellTypes.Protecting,
    description: "Generates 30 sheild points",
    icon: "Images/Battle/protectingIcon.png",
    success: [
      { type: "textMessage", text: "{CASTER} casted {ACTION}"},
      { type: "spellAnimation", friendly: true, src: "Images/Battle/Spells/Flect Sprite Sheet.png"},
      { type: "stateChange", barrier: 30},
    ]
  },
  Fract3: {
    name: "Fract 3",
    type: SpellTypes.Protecting,
    description: "Generates 45 sheild points",
    icon: "Images/Battle/protectingIcon.png",
    success: [
      { type: "textMessage", text: "{CASTER} casted {ACTION}"},
      { type: "spellAnimation", friendly: true, src: "Images/Battle/Spells/Flect Sprite Sheet.png"},
      { type: "stateChange", barrier: 45},
    ]
  },
  Guard1: {
    name: "Guard 1",
    type: SpellTypes.Protecting,
    description: "Generates 30 sheild points",
    icon: "Images/Battle/protectingIcon.png",
    success: [
      { type: "textMessage", text: "{CASTER} casted {ACTION}"},
      { type: "spellAnimation", friendly: true, src: "Images/Battle/Spells/Flect Sprite Sheet.png"},
      { type: "stateChange", barrier: 30},
    ]
  },
  Guard2: {
    name: "Guard 2",
    type: SpellTypes.Protecting,
    description: "Generates 40 sheild points",
    icon: "Images/Battle/protectingIcon.png",
    success: [
      { type: "textMessage", text: "{CASTER} casted {ACTION}"},
      { type: "spellAnimation", friendly: true, src: "Images/Battle/Spells/Flect Sprite Sheet.png"},
      { type: "stateChange", barrier: 40},
    ]
  },
  Guard3: {
    name: "Guard 3",
    type: SpellTypes.Protecting,
    description: "Generates 50 sheild points",
    icon: "Images/Battle/protectingIcon.png",
    success: [
      { type: "textMessage", text: "{CASTER} casted {ACTION}"},
      { type: "spellAnimation", friendly: true, src: "Images/Battle/Spells/Flect Sprite Sheet.png"},
      { type: "stateChange", barrier: 50},
    ]
  },
  Guard4: {
    name: "Guard 3",
    type: SpellTypes.Protecting,
    description: "Generates 60 sheild points",
    icon: "Images/Battle/protectingIcon.png",
    success: [
      { type: "textMessage", text: "{CASTER} casted {ACTION}"},
      { type: "spellAnimation", friendly: true, src: "Images/Battle/Spells/Flect Sprite Sheet.png"},
      { type: "stateChange", barrier: 60},
    ]
  },
  Sheild1: {
    name: "Sheild 1",
    type: SpellTypes.Protecting,
    description: "Generates 60 sheild points",
    icon: "Images/Battle/protectingIcon.png",
    success: [
      { type: "textMessage", text: "{CASTER} casted {ACTION}"},
      { type: "spellAnimation", friendly: true, src: "Images/Battle/Spells/Flect Sprite Sheet.png"},
      { type: "stateChange", barrier: 60},
    ]
  },
  Sheild2: {
    name: "Sheild 2",
    type: SpellTypes.Protecting,
    description: "Generates 70 sheild points",
    icon: "Images/Battle/protectingIcon.png",
    success: [
      { type: "textMessage", text: "{CASTER} casted {ACTION}"},
      { type: "spellAnimation", friendly: true, src: "Images/Battle/Spells/Flect Sprite Sheet.png"},
      { type: "stateChange", barrier: 70},
    ]
  },
  Maim1: {
    name: "Maim 1",
    type: SpellTypes.Destroying,
    description: "Does 250 damage",
    icon: "Images/Battle/destroyingIcon.png",
    success: [
      { type: "textMessage", text: "{CASTER} casted {ACTION}"},
      { type: "combatantAnimation"},
      { type: "spellAnimation", src: "Images/Battle/Spells/Maim Sprite Sheet.png"},
      { type: "stateChange", damage: 250},
    ]
  },
  Maim2: {
    name: "Maim 2",
    type: SpellTypes.Destroying,
    description: "Does 300 damage",
    icon: "Images/Battle/destroyingIcon.png",
    success: [
      { type: "textMessage", text: "{CASTER} casted {ACTION}"},
      { type: "combatantAnimation"},
      { type: "spellAnimation", src: "Images/Battle/Spells/Maim Sprite Sheet.png"},
      { type: "stateChange", damage: 250},
    ]
  },
  Maim3: {
    name: "Maim 3",
    type: SpellTypes.Destroying,
    description: "Does 350 damage",
    icon: "Images/Battle/destroyingIcon.png",
    success: [
      { type: "textMessage", text: "{CASTER} casted {ACTION}"},
      { type: "combatantAnimation"},
      { type: "spellAnimation", src: "Images/Battle/Spells/Maim Sprite Sheet.png"},
      { type: "stateChange", damage: 350},
    ]
  },
  Gore1: {
    name: "Gore 1",
    type: SpellTypes.Destroying,
    description: "Does 400 damage",
    icon: "Images/Battle/destroyingIcon.png",
    success: [
      { type: "textMessage", text: "{CASTER} casted {ACTION}"},
      { type: "combatantAnimation"},
      { type: "spellAnimation", src: "Images/Battle/Spells/Maim Sprite Sheet.png"},
      { type: "stateChange", damage: 400},
    ]
  },
  Gore2: {
    name: "Gore 2",
    type: SpellTypes.Destroying,
    description: "Does 450 damage",
    icon: "Images/Battle/destroyingIcon.png",
    success: [
      { type: "textMessage", text: "{CASTER} casted {ACTION}"},
      { type: "combatantAnimation"},
      { type: "spellAnimation", src: "Images/Battle/Spells/Maim Sprite Sheet.png"},
      { type: "stateChange", damage: 450},
    ]
  },
  Gore3: {
    name: "Gore 3",
    type: SpellTypes.Destroying,
    description: "Does 500 damage",
    icon: "Images/Battle/destroyingIcon.png",
    success: [
      { type: "textMessage", text: "{CASTER} casted {ACTION}"},
      { type: "combatantAnimation"},
      { type: "spellAnimation", src: "Images/Battle/Spells/Maim Sprite Sheet.png"},
      { type: "stateChange", damage: 500},
    ]
  },
  Gore4: {
    name: "Gore 4",
    type: SpellTypes.Destroying,
    description: "Does 600 damage",
    icon: "Images/Battle/destroyingIcon.png",
    success: [
      { type: "textMessage", text: "{CASTER} casted {ACTION}"},
      { type: "combatantAnimation"},
      { type: "spellAnimation", src: "Images/Battle/Spells/Maim Sprite Sheet.png"},
      { type: "stateChange", damage: 600},
    ]
  },
  Gore5: {
    name: "Gore 5",
    type: SpellTypes.Destroying,
    description: "Does 650 damage",
    icon: "Images/Battle/destroyingIcon.png",
    success: [
      { type: "textMessage", text: "{CASTER} casted {ACTION}"},
      { type: "combatantAnimation"},
      { type: "spellAnimation", src: "Images/Battle/Spells/Maim Sprite Sheet.png"},
      { type: "stateChange", damage: 650},
    ]
  },
  Gore6: {
    name: "Gore 6",
    type: SpellTypes.Destroying,
    description: "Does 700 damage",
    icon: "Images/Battle/destroyingIcon.png",
    success: [
      { type: "textMessage", text: "{CASTER} casted {ACTION}"},
      { type: "combatantAnimation"},
      { type: "spellAnimation", src: "Images/Battle/Spells/Maim Sprite Sheet.png"},
      { type: "stateChange", damage: 700},
    ]
  },
  Scald1: {
    name: "Scald 1",
    type: SpellTypes.Destroying,
    description: "Does 500 damage",
    icon: "Images/Battle/destroyingIcon.png",
    success: [
      { type: "textMessage", text: "{CASTER} casted {ACTION}"},
      { type: "combatantAnimation"},
      { type: "spellAnimation", src: "Images/Battle/Spells/Maim Sprite Sheet.png"},
      { type: "stateChange", damage: 500},
    ]
  },
  Scald2: {
    name: "Scald 2",
    type: SpellTypes.Destroying,
    description: "Does 600 damage",
    icon: "Images/Battle/destroyingIcon.png",
    success: [
      { type: "textMessage", text: "{CASTER} casted {ACTION}"},
      { type: "combatantAnimation"},
      { type: "spellAnimation", src: "Images/Battle/Spells/Maim Sprite Sheet.png"},
      { type: "stateChange", damage: 600},
    ]
  },
  Scald3: {
    name: "Scald 3",
    type: SpellTypes.Destroying,
    description: "Does 750 damage",
    icon: "Images/Battle/destroyingIcon.png",
    success: [
      { type: "textMessage", text: "{CASTER} casted {ACTION}"},
      { type: "combatantAnimation"},
      { type: "spellAnimation", src: "Images/Battle/Spells/Maim Sprite Sheet.png"},
      { type: "stateChange", damage: 750},
    ]
  },
  Scald4: {
    name: "Scald 4",
    type: SpellTypes.Destroying,
    description: "Does 800 damage",
    icon: "Images/Battle/destroyingIcon.png",
    success: [
      { type: "textMessage", text: "{CASTER} casted {ACTION}"},
      { type: "combatantAnimation"},
      { type: "spellAnimation", src: "Images/Battle/Spells/Maim Sprite Sheet.png"},
      { type: "stateChange", damage: 800},
    ]
  },
  Scald5: {
    name: "Scald 5",
    type: SpellTypes.Destroying,
    description: "Does 850 damage",
    icon: "Images/Battle/destroyingIcon.png",
    success: [
      { type: "textMessage", text: "{CASTER} casted {ACTION}"},
      { type: "combatantAnimation"},
      { type: "spellAnimation", src: "Images/Battle/Spells/Maim Sprite Sheet.png"},
      { type: "stateChange", damage: 850},
    ]
  },
  Barr1: {
    name: "Barr 1",
    type: SpellTypes.Fortifying,
    description: "Reduces incoming damage by 2%",
    icon: "Images/Battle/fortifyingIcon.png",
    success: [
      { type: "textMessage", text: "{CASTER} casted {ACTION}"},
      { type: "spellAnimation", friendly: true, src: "Images/Battle/Spells/Sweep Sprite Sheet.png"},
      { type: "stateChange", fortify: 2},
    ]
  },
  Hinde1: {
    name: "Hinde 1",
    type: SpellTypes.Fortifying,
    description: "Reduces incoming damage by 15%",
    icon: "Images/Battle/fortifyingIcon.png",
    success: [
      { type: "textMessage", text: "{CASTER} casted {ACTION}"},
      { type: "spellAnimation", friendly: true, src: "Images/Battle/Spells/Hinde Sprite Sheet.png"},
      { type: "stateChange", fortify: 15},
    ]
  },
  
  Boost1: {
    name: "Boost 1",
    type: SpellTypes.Amplifying,
    description: "Increases outgoing damage by 2%",
    icon: "Images/Battle/fortifyingIcon.png",
    success: [
      { type: "textMessage", text: "{CASTER} casted {ACTION}"},
      { type: "spellAnimation", friendly: true, src: "Images/Battle/Spells/Sweep Sprite Sheet.png"},
      { type: "stateChange", amplify: 2},
    ]
  },
  Boost2: {
    name: "Boost 2",
    type: SpellTypes.Amplifying,
    description: "Increases outgoing damage by 2%",
    icon: "Images/Battle/fortifyingIcon.png",
    success: [
      { type: "textMessage", text: "{CASTER} casted {ACTION}"},
      { type: "spellAnimation", friendly: true, src: "Images/Battle/Spells/Sweep Sprite Sheet.png"},
      { type: "stateChange", amplify: 2},
    ]
  },
  Boost3: {
    name: "Boost 3",
    type: SpellTypes.Amplifying,
    description: "Increases outgoing damage by 3%",
    icon: "Images/Battle/fortifyingIcon.png",
    success: [
      { type: "textMessage", text: "{CASTER} casted {ACTION}"},
      { type: "spellAnimation", friendly: true, src: "Images/Battle/Spells/Sweep Sprite Sheet.png"},
      { type: "stateChange", amplify: 3},
    ]
  },
  Boost4: {
    name: "Boost 4",
    type: SpellTypes.Amplifying,
    description: "Increases outgoing damage by 5%",
    icon: "Images/Battle/fortifyingIcon.png",
    success: [
      { type: "textMessage", text: "{CASTER} casted {ACTION}"},
      { type: "spellAnimation", friendly: true, src: "Images/Battle/Spells/Sweep Sprite Sheet.png"},
      { type: "stateChange", amplify: 5},
    ]
  },
  Boost5: {
    name: "Boost 5",
    type: SpellTypes.Amplifying,
    description: "Increases outgoing damage by 10%",
    icon: "Images/Battle/fortifyingIcon.png",
    success: [
      { type: "textMessage", text: "{CASTER} casted {ACTION}"},
      { type: "spellAnimation", friendly: true, src: "Images/Battle/Spells/Sweep Sprite Sheet.png"},
      { type: "stateChange", amplify: 10},
    ]
  },
  Boost6: {
    name: "Boost 6",
    type: SpellTypes.Amplifying,
    description: "Increases outgoing damage by 8%",
    icon: "Images/Battle/fortifyingIcon.png",
    success: [
      { type: "textMessage", text: "{CASTER} casted {ACTION}"},
      { type: "spellAnimation", friendly: true, src: "Images/Battle/Spells/Sweep Sprite Sheet.png"},
      { type: "stateChange", amplify: 8},
    ]
  },
  Boost7: {
    name: "Boost 7",
    type: SpellTypes.Amplifying,
    description: "Increases outgoing damage by 9%",
    icon: "Images/Battle/fortifyingIcon.png",
    success: [
      { type: "textMessage", text: "{CASTER} casted {ACTION}"},
      { type: "spellAnimation", friendly: true, src: "Images/Battle/Spells/Sweep Sprite Sheet.png"},
      { type: "stateChange", amplify: 9},
    ]
  },
}
