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