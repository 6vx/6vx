interface Tile {
    uuid?: string;
    letter: string;
    maxquantity?: number;
    baselevel?: number;
    level?: number;
    color?: string;
    multiplier?: number;
    isLit?: boolean;
  }

interface BagSpawnOptions {
    colorList: string[];
    bagLengthLimit: number;
    maxMultiplier: number;
    chanceLit: number;
    chanceColor: number;
    chanceLevelBumped: number;
}

interface PlayerStats {
    highScore?: number;
    bestPlay?: string;
    str?: number;
    dex?: number;
    vit?: number;
    ene?: number;
    hp?: number;
    mp?: number;
    xp?: number;
    level?: number;
    name?: string;
}

interface NPC {
    name: string;
    age: number;
    occupation: string;
    wares?: any[];
    story?: string;
  }
  
interface Place {
    name: string;
    x_min: number;
    x_max: number;
    y_min: number;
    y_max: number;
    hasStore: boolean;
    hasNPC: boolean;
    NPC?: NPC;
}

interface Space {
    x: number;
    y: number;
    place?: Place;
    highScore?: number;
    leaderboard?: string;
}

interface Level {
    level: number;
    xpRequired: number;
}

let mapAttributes = {
    x_min: 0,
    x_max: 500,
    y_min: 0,
    y_max: 500,
  }

let options:BagSpawnOptions = {
    colorList: [
        "red", "green", "blue", "black", "white", "gray"
    ],
    bagLengthLimit: 50,
    maxMultiplier: 2,
    chanceLit: 0.1,
    chanceColor: 0.16,
    chanceLevelBumped: 0.5,
}

let startingStats:PlayerStats = {
    highScore: 0,
    bestPlay: "",
    str: 5,
    dex: 5,
    vit: 5,
    ene: 5,
    hp: 50,
    mp: 50,
    xp: 0,
    level: 1,
    name: "",
}

let places:Place[] = [
    {
      name: "Forest Camp",
      x_min: 240,
      x_max: 250,
      y_min: 245,
      y_max: 255,
      hasStore: true,
      hasNPC: true,
      NPC: {
        name: "Warren",
        age: 35,
        occupation: "Forest Ranger",
      }
    }
  ]

let levels:Level[] = [
    { level: 1, xpRequired: 0 },
    { level: 2, xpRequired: 500 },
    { level: 3, xpRequired: 1500 },
    { level: 4, xpRequired: 3750 },
    { level: 5, xpRequired: 8000 }, 
    { level: 6, xpRequired: 14000 },
    { level: 7, xpRequired: 23000 },
    { level: 8, xpRequired: 34000 },
    { level: 9, xpRequired: 44000 },
    { level: 10, xpRequired: 55000 },
    { level: 11, xpRequired: 72000 },
    { level: 12, xpRequired: 90000 },
    { level: 13, xpRequired: 110000 },
    { level: 14, xpRequired: 140000 },
    { level: 15, xpRequired: 176000 },
    { level: 16, xpRequired: 275000 },
    { level: 17, xpRequired: 400000 },
    { level: 18, xpRequired: 535000 },
    { level: 19, xpRequired: 700000 },
    { level: 20, xpRequired: 900000 }
]
