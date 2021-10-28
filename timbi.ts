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
  story?: string;
  NPC?: NPC;
}

interface Space {
  x: number;
  y: number;
  place?: Place;
  highScore?: number;
  leaderboard?: string;
  id?: string;
  tile?: Tile;
  isLit?: boolean;
  isDoubleLetter?: boolean;
  isTripleLetter?: boolean;
  isDoubleWord?: boolean;
  isTripleWord?: boolean;
}

interface Level {
  level: number;
  xpRequired: number;
}

interface spaceBuffs {
  chanceDoubleLetter: number;
  chanceTripleLetter: number;
  chanceDoubleWord: number;
  chanceTripleWord: number;
  chanceLit: number;
}

function assignSpaceBuffs () {
  masterMap.forEach(space => {
    // randomly decide if chanceDoubleLetter
    if (Math.random() < spaceBuffSettings.chanceDoubleLetter) {
      space.isDoubleLetter = true
    }
    // randomly decide if chanceTripleLetter
    if (Math.random() < spaceBuffSettings.chanceTripleLetter) {
      space.isTripleLetter = true
    }
    // randomly decide if chanceDoubleWord
    if (Math.random() < spaceBuffSettings.chanceDoubleWord) {
      space.isDoubleWord = true
    }
    // randomly decide if chanceTripleWord
    if (Math.random() < spaceBuffSettings.chanceTripleWord) {
      space.isTripleWord = true
    }
    // randomly decide if chanceLit
    if (Math.random() < spaceBuffSettings.chanceLit) {
      space.isLit = true
    }
  })
}

let spaceBuffSettings:spaceBuffs = {
  chanceDoubleLetter: 0.05,
  chanceTripleLetter: 0.02,
  chanceDoubleWord: 0.008,
  chanceTripleWord: 0.004,
  chanceLit: 0.01
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

let mapAttributes = {
  x_min: 0,
  x_max: 500,
  y_min: 0,
  y_max: 500,
}

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

let bagOptions:BagSpawnOptions = {
  colorList: [
      "red", "green", "blue", "black", "white", "gray"
  ],
  bagLengthLimit: 50,
  maxMultiplier: 2,
  chanceLit: 0.1,
  chanceColor: 0.16,
  chanceLevelBumped: 0.5,
}

let masterMap:Space[] = [];

function createMap() {
  for (let x = 0; x < mapAttributes.x_max; x++) {
    for (let y = 0; y < mapAttributes.y_max; y++) {
      // masterMap.push({x: x, y: y, id: crypto.randomUUID()})
      masterMap.push({x: x, y: y});
    }
  }
}
  
function addPlaces() {
  places.forEach(place => {
    for (let x = place.x_min; x < place.x_max; x++) {
      for (let y = place.y_min; y < place.y_max; y++) {
        // fine master map entry where x and y are equal to place x and y
        // then assign place as place
        masterMap.find(entry => {
          if (entry.x === x && entry.y === y) {
            entry.place = place
          }
        })
      }
    }
  })
}
  
function bootMap() {
  createMap();
  addPlaces();
  assignSpaceBuffs();
}
  

// This gets really intense if you've got the grid over 500x500. Watch out.
// bootMap();

// function writeJson(path: string, data: object): string {
//     try {
//       Deno.writeTextFileSync(path, JSON.stringify(data));
  
//       return "Written to " + path;
//     } catch (e) {
//       return e.message;
//     }
//   }
  
// console.log(writeJson("./map.json", masterMap));

//
  //
  //
  // function Prime Number Array
  // create a function that outputs an array of prime numbers
  // up to a certain number
  // function primeNumberArray(max: number) {
  //   let primeArray = [];
  //   let i = 2;
  //   let counter = 0;

  //   while (counter < max) {
  //     if (isPrime(i)) {
  //       counter ++;
  //       let obj = { number: i, counter: counter };
  //       primeArray.push(obj);

  //     }
  //     i++;
  //   }
  //   return primeArray;
  // }
  // function isPrime(num: number) {
  //   for (let i = 2; i < num; i++) {
  //     if (num % i === 0) {
  //       return false;
  //     }
  //   }
  //   return true;
  // }

  // console.log(primeNumberArray(10001).pop());
  // // result was number 104743 - correct answer :)
  //
//

  let numberString = `73167176531330624919225119674426574742355349194934
                      96983520312774506326239578318016984801869478851843
                      85861560789112949495459501737958331952853208805511
                      12540698747158523863050715693290963295227443043557
                      66896648950445244523161731856403098711121722383113
                      62229893423380308135336276614282806444486645238749
                      30358907296290491560440772390713810515859307960866
                      70172427121883998797908792274921901699720888093776
                      65727333001053367881220235421809751254540594752243
                      52584907711670556013604839586446706324415722155397
                      53697817977846174064955149290862569321978468622482
                      83972241375657056057490261407972968652414535100474
                      82166370484403199890008895243450658541227588666881
                      16427171479924442928230863465674813919123162824586
                      17866458359124566529476545682848912883142607690042
                      24219022671055626321111109370544217506941658960408
                      07198403850962455444362981230987879927244284909188
                      84580156166097919133875499200524063689912560717606
                      05886116467109405077541002256983155200055935729725
                      71636269561882670428252483600823257530420752963450`;

// write a function that reads a string of numbers 13 digits at a time
// and adds each 13 digit number to an array
// then find the largest product of those 13 digit numbers


