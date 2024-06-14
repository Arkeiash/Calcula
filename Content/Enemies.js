window.Enemies = {
  "raider1": {
    name: "Raider",
    id: "raider1",
    alive: true,
    x: utils.withGrid(7),
    y: utils.withGrid(7),
    src: "/Images/Characters/Raider Sprite Sheet.png",
    hp: 50,
    maxHp: 50,
    barrier: 0,
    maxBarrier: 0,
    fortification: 1,
    amplification: 1,
    rActions: ["Headshot", "Crackshot", "Fleshwound", "Ouch"]
  },
  "raider2": {
    name: "Raider",
    id: "raider1",
    alive: true,
    src: "/Images/Characters/Raider Sprite Sheet.png",
    hp: 1000,
    maxHp: 1000,
    barrier: 30,
    maxBarrier: 30,
    fortification: 1,
    amplification: 200,
    rActions: ["Headshot", "Crackshot", "Fleshwound", "Ouch"]
  },
  "vikki": {
    name: "Vikki",
    id: "vikki",
    alive: true,
    src: "/Images/Characters/Vikki Sprite Sheet.png",
    hp: 500,
    maxHp: 500,
    barrier: 0,
    maxBarrier: 0,
    fortification: 0,
    amplification: 0,
    rActions: ["Fleshwound", "Ouch", "Laceration"]
  },
  "peasant1": {
    name: "Peasant",
    id: "peasant1",
    alive: true,
    src: "/Images/Characters/Peasant Sprite Sheet.png",
    hp: 50,
    maxHp: 50,
    barrier: 0,
    maxBarrier: 0,
    fortification: 0,
    amplification: 0,
    rActions: ["Beg1", "Beg2"]
  },
}