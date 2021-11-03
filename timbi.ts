// timbits is for stuff I'm working on but isn't prod. All my main types should be here.

// attributes of a tile
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

// options for the tile generation sequence
interface BagSpawnOptions {
  colorList: string[];
  bagLengthLimit: number;
  maxMultiplier: number;
  chanceLit: number;
  chanceColor: number;
  chanceLevelBumped: number;
}

// attributes on a player
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

// attributes of an NPC
interface NPC {
  name: string;
  age: number;
  occupation: string;
  wares?: any[];
  story?: string;
}

// attributes of a place
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

// attributes of a space
interface Space {
  x: number;
  y: number;
  lock: false;
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

// attributes of a level
interface Level {
  level: number;
  xpRequired: number;
}

// options for space generation sequence
interface spaceBuffs {
  chanceDoubleLetter: number;
  chanceTripleLetter: number;
  chanceDoubleWord: number;
  chanceTripleWord: number;
  chanceLit: number;
}

// assigns space buffs during map generation
function assignSpaceBuffs () {
  for (let x = 0; x < mapAttributes.x_max; x++) {
    for (let y = 0; y < mapAttributes.y_max; y++) {
      let space = masterMap[x + "," + y]
      // randomly decide if chanceDoubleLetter
      if (Math.random() < spaceBuffSettings.chanceDoubleLetter) {
        space.isDoubleLetter = true
        space.lock = true
      }
      // randomly decide if chanceTripleLetter
      if (Math.random() < spaceBuffSettings.chanceTripleLetter) {
        space.isTripleLetter = true
        space.lock = true
      }
      // randomly decide if chanceDoubleWord
      if (Math.random() < spaceBuffSettings.chanceDoubleWord) {
        space.isDoubleWord = true
        space.lock = true
      }
      // randomly decide if chanceTripleWord
      if (Math.random() < spaceBuffSettings.chanceTripleWord) {
        space.isTripleWord = true
        space.lock = true
      }
      // randomly decide if chanceLit
      if (Math.random() < spaceBuffSettings.chanceLit) {
        space.isLit = true
        space.lock = true
      }
    }
  }
}

// declaring my settings for space buffs
let spaceBuffSettings:spaceBuffs = {
  chanceDoubleLetter: 0.05,
  chanceTripleLetter: 0.02,
  chanceDoubleWord: 0.008,
  chanceTripleWord: 0.004,
  chanceLit: 0.01
}

// declaring the games starting player stats
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

// declaring the Places and their attributes
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

// declaring the settings for map options
let mapAttributes = {
  x_min: 400,
  x_max: 500,
  y_min: 400,
  y_max: 500,
}

// declaring the levels and their xp
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

// declaring tile spawning options
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

// declaring an empty array for map to be spawned into
let masterMap:any = {};

// function to create the map spaces, x and y.
function createMap() {
  for (let x = 0; x < mapAttributes.x_max; x++) {
    for (let y = 0; y < mapAttributes.y_max; y++) {
      // create a space in the masterMap
      let space:Space = {
        x: x,
        y: y,
        lock: false,
    }
      // assign space to masterMap
      masterMap[x + "," + y] = space
  }
}
}

// function to add places to the appropriate sapces
function addPlaces() {
  // add places to masterMap
  places.forEach(place => {
    for (let x = place.x_min; x <= place.x_max; x++) {
      for (let y = place.y_min; y <= place.y_max; y++) {
        // if the space x and y are within the place x and y, 
        // add the place to the space
        if (x >= place.x_min && x <= place.x_max && y >= place.y_min && y <= place.y_max) {
          masterMap[x + "," + y].place = place
          masterMap[x + "," + y].lock = true
        }
      }
    }
  })
}

// function to remove the boring spaces and only write the good ones
// that is: if the only stats on a space are x and y, we don't need to know about it
function removeBoringSpaces() {
  // if lock isn't true, remove the space
  for (let x = 0; x < mapAttributes.x_max; x++) {
    for (let y = 0; y < mapAttributes.y_max; y++) {
      if (masterMap[x + "," + y].lock === false) {
        delete masterMap[x + "," + y]
      }
    }
  }
}

// function to stringify each space in the masterMap
function stringifySpaces() {
  for (let x = 0; x < mapAttributes.x_max; x++) {
    for (let y = 0; y < mapAttributes.y_max; y++) {
      masterMap[x + "," + y] = JSON.stringify(masterMap[x + "," + y])
    }
  }
}

// currently booting the map for two different return styles
// one is to write the whole thing to a json file, which is snice.
// the other is to live serve it, which is kinda not my thing, but 
// also would be cool if the cost wasn't an issue. 
function bootMap() {
  createMap();
  addPlaces();
  assignSpaceBuffs();
  removeBoringSpaces();
  // stringifySpaces();
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

// now i want to write the gameplay pipeline
// that is, how is a play being handled as the turn progresses?
// i want a stack experience like Magic so I can understand it.

// declaring who is playing the turn
interface Player {
  id: string,
  highScore?: number,
  bestPlay?: Turn,
}

// declaring what a turn is and what is has
interface Turn {
  player : Player,
  multiplier : number,
  score : number,
  playlist : Play[],
}

// declaring what a play looks like
interface Play {
  word : Tile[],
  score? : number,
  multiplier? : number,
  color? : string,
  level? : number,
}

































































// EUPROB 7: Complete
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
//

// EUPROB 8: Complete

  // let numberString = "7316717653133062491922511967442657474235534919493496983520312774506326239578318016984801869478851843858615607891129494954595017379583319528532088055111254069874715852386305071569329096329522744304355766896648950445244523161731856403098711121722383113622298934233803081353362766142828064444866452387493035890729629049156044077239071381051585930796086670172427121883998797908792274921901699720888093776657273330010533678812202354218097512545405947522435258490771167055601360483958644670632441572215539753697817977846174064955149290862569321978468622482839722413756570560574902614079729686524145351004748216637048440319989000889524345065854122758866688116427171479924442928230863465674813919123162824586178664583591245665294765456828489128831426076900422421902267105562632111110937054421750694165896040807198403850962455444362981230987879927244284909188845801561660979191338754992005240636899125607176060588611646710940507754100225698315520005593572972571636269561882670428252483600823257530420752963450";

  // // make array with each digit in numberString as an element
  // let numberArray = numberString.split("").map(element => parseInt(element));
  // console.log(numberArray);

  // // check the product of the first 13 elements in the array
  // // then increase index by one, and check the product of the next 13 elements
  // // until the end of the array
  // // if the product is greater than the current greatest product, set the new product as the greatest product
  // function greatestProduct(array: number[]) {
  //   let greatestProduct = 0;
  //   let currentProduct = 0;
  //   let index = 0;
  //   array.forEach(element => {
  //     // find product of index to index + 13
  //     currentProduct = array.slice(index, index + 13).reduce((a, b) => a * b);
  //     if (currentProduct > greatestProduct) {
  //       greatestProduct = currentProduct;
  //     }
  //     index++;
  //   });
  //   return greatestProduct;
  // }
  // console.log(greatestProduct(numberArray));
  // result was 23514624000 - correct answer :)
//

// EUPROB 9: Complete
  //
  // make an array containing objects each with property a b and c
  // then loop through the array and find entries where a squared plus b squared equals c squared
  // then find the sum of a, b and c
  // wow this is super brute force. I'm sure there's a better way because I'm typing all this
  // white I wait for the program to finish executing. 
  // I bet I could add "bail out" conditions to the loop so that it doesn't go through the entire array 
  // when the sum is already at 1000. Geez... I wonder if doing that would be faster than waiting for
  // the program to finish executing...
  // just defining the thing I'm using here as an interface
  // interface Triplet {
  //   a: number;
  //   b: number;
  //   c: number;
  // }
  // // declaring my array of triplets
  // let pythagoreanTriplet:Triplet[] = [];
  // // this sends in values up to an arbitrary sub-1000 limit.
  // function seedPythagoreanTriplet(limit:number) {
  //   for (let a = 1; a < limit; a++) {
  //     for (let b = 1; b < limit; b++) {
  //       for (let c = 1; c < limit; c++) {
  //         if ((a * a + b * b === c * c) && (a + b + c === 1000)) {
  //           pythagoreanTriplet.push({a: a, b: b, c: c});
  //         }
  //       }
  //     }
  //   }
  // }
  // seedPythagoreanTriplet(500);

  // function findProductOfTriplet(triplet: Triplet) {
  //   return triplet.a * triplet.b * triplet.c;
  // }
    
  // console.log(findProductOfTriplet(pythagoreanTriplet[0]));
// result was 31875000 - correct answer :)

  // // // EUPROB 10: Complete

  // async function isPrime(num: number) {
  //   for (let i = 2; i < num; i++) {
  //     if (num % i === 0) {
  //       return false;
  //     }
  //   }
  //   return true;
  // }

  // // function that makes an array containing 
  // // every number from 2 to the limit

  // function makeArray(limit: number) {
  //   let array: number[] = [];
  //   for (let i = 2; i < limit; i++) {
  //     array.push(i);
  //   }
  //   return array;
  // }

  // // function that accepts an array as an argument
  // // and then removes every element that is not prime

  // async function removeNonPrimes(array: number[]) {
  //   let newArray: number[] = [];
  //   for (let i = 0; i < array.length; i++) {
  //     if (await isPrime(array[i])) {
  //       newArray.push(array[i]);
  //     }
  //   }
  //   return newArray;
  // }

  // async function sumArray(array: number[]) {
  //   let sum = 0;
  //   for (let i = 0; i < array.length; i++) {
  //     sum += array[i];
  //   }
  //   return sum;
  // }


  // async function logAnswer() {
  //   console.log(await sumArray(await removeNonPrimes(makeArray(2000000))));
  // }

  // logAnswer()

  // // Correct answer is 142913828922 <3


// // Problem 11 : WIP

// // Find the largest product of four adjacent numbers in the same direction 
// // (up, down, left, right, or diagonally) in the 20×20 grid.

// let gridString = `08 02 22 97 38 15 00 40 00 75 04 05 07 78 52 12 50 77 91 08
// 49 49 99 40 17 81 18 57 60 87 17 40 98 43 69 48 04 56 62 00
// 81 49 31 73 55 79 14 29 93 71 40 67 53 88 30 03 49 13 36 65
// 52 70 95 23 04 60 11 42 69 24 68 56 01 32 56 71 37 02 36 91
// 22 31 16 71 51 67 63 89 41 92 36 54 22 40 40 28 66 33 13 80
// 24 47 32 60 99 03 45 02 44 75 33 53 78 36 84 20 35 17 12 50
// 32 98 81 28 64 23 67 10 26 38 40 67 59 54 70 66 18 38 64 70
// 67 26 20 68 02 62 12 20 95 63 94 39 63 08 40 91 66 49 94 21
// 24 55 58 05 66 73 99 26 97 17 78 78 96 83 14 88 34 89 63 72
// 21 36 23 09 75 00 76 44 20 45 35 14 00 61 33 97 34 31 33 95
// 78 17 53 28 22 75 31 67 15 94 03 80 04 62 16 14 09 53 56 92
// 16 39 05 42 96 35 31 47 55 58 88 24 00 17 54 24 36 29 85 57
// 86 56 00 48 35 71 89 07 05 44 44 37 44 60 21 58 51 54 17 58
// 19 80 81 68 05 94 47 69 28 73 92 13 86 52 17 77 04 89 55 40
// 04 52 08 83 97 35 99 16 07 97 57 32 16 26 26 79 33 27 98 66
// 88 36 68 87 57 62 20 72 03 46 33 67 46 55 12 32 63 93 53 69
// 04 42 16 73 38 25 39 11 24 94 72 18 08 46 29 32 40 62 76 36
// 20 69 36 41 72 30 23 88 34 62 99 69 82 67 59 85 74 04 36 16
// 20 73 35 29 78 31 90 01 74 31 49 71 48 86 81 16 23 57 05 54
// 01 70 54 71 83 51 54 69 16 92 33 48 61 43 52 01 89 19 67 48`

// // function that accepts a string and adds each two digit number 
// // to an array 

// function stringToArray(string: string) {
//   // split the string on spaces and new lines
//   let array = string.split(/\s+/);
//   // transform each into a number
//   let newArray: number[] = [];
//   array.forEach(element => {
//     newArray.push(Number(element));
//   });
//   return newArray;
// }

// let rows = 20;
// let columns = 20;

// // function that takes an array and returns an array of objects
// // each object has a number, a row and a column

// function arrayToObjects(array: number[]) {
//   let arrayReturn:any = []
//   let row = 1;
//   let column = 1;
//   let limit = 20;
//   array.forEach(numInput => {
//     arrayReturn.push({num: numInput, row: row, column: column});
//     column++;
//     if (column > limit) {
//       column = 1;
//       row++;
//     }
//   });
//   return arrayReturn;
// }

// let strategies = [
//   {row: 1, column:0}, {row: 0, column: 1}, {row: 1, column: 1}
// ];

// let freshlyMinted:Coin[] = (arrayToObjects(stringToArray(gridString)))

// interface Coin {
//   num: number;
//   row: number;
//   column: number;
// }
// console.log(freshlyMinted);

// let max = 0;

// // function that takes a coin and a strategy and returns the product of the four numbers 
// freshlyMinted.forEach(coin => {
//   strategies.forEach(strategy => {
//     // select 3 more coins
//     // by increasing the row and column by the strategy
//     // for coin2, filter freshlyMinted to only include coins 
//     // that have rows equal to coin.row + strategy.row and columns equal to coin.column + strategy.column
//     let coin2 = freshlyMinted.filter(coin => coin.row === coin.row + strategy.row && coin.column === coin.column + strategy.column);
//     // for coin3, filter freshlyMinted to only include coins
//     // that have rows equal to coin.row + strategy.row and columns equal to coin.column + strategy.column
//     let coin3 = freshlyMinted.filter(coin => coin.row === coin.row + strategy.row *2 && coin.column === coin.column + strategy.column*2);
//     // for coin4, filter freshlyMinted to only include coins
//     // that have rows equal to coin.row + strategy.row and columns equal to coin.column + strategy.column
//     let coin4 = freshlyMinted.filter(coin => coin.row === coin.row + strategy.row *3 && coin.column === coin.column + strategy.column*3);
//     // multiply the numbers
//     // if the numbers all exist
//     if(coin2.length > 0 && coin3.length > 0 && coin4.length > 0) {
//       let product = coin.num * coin2[0].num * coin3[0].num * coin4[0].num;
//       if (product > max) {
//         max = product;
//       }
//     }
//   });
// });
    
// console.log(max);
  
// console.log("Time to brain thee.");