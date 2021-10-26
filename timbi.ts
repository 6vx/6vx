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

