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
  // masterMap.forEach(space => {
  //   // randomly decide if chanceDoubleLetter
  //   if (Math.random() < spaceBuffSettings.chanceDoubleLetter) {
  //     space.isDoubleLetter = true
  //   }
  //   // randomly decide if chanceTripleLetter
  //   if (Math.random() < spaceBuffSettings.chanceTripleLetter) {
  //     space.isTripleLetter = true
  //   }
  //   // randomly decide if chanceDoubleWord
  //   if (Math.random() < spaceBuffSettings.chanceDoubleWord) {
  //     space.isDoubleWord = true
  //   }
  //   // randomly decide if chanceTripleWord
  //   if (Math.random() < spaceBuffSettings.chanceTripleWord) {
  //     space.isTripleWord = true
  //   }
  //   // randomly decide if chanceLit
  //   if (Math.random() < spaceBuffSettings.chanceLit) {
  //     space.isLit = true
  //   }
  // })
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
  x_min: 400,
  x_max: 500,
  y_min: 400,
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

let masterMap:any = {};

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


function bootMap() {
  createMap();
  addPlaces();
  assignSpaceBuffs();
  removeBoringSpaces();
  // stringifySpaces();
}
  

// This gets really intense if you've got the grid over 500x500. Watch out.
bootMap();

function writeJson(path: string, data: object): string {
    try {
      Deno.writeTextFileSync(path, JSON.stringify(data));
  
      return "Written to " + path;
    } catch (e) {
      return e.message;
    }
  }
  
console.log(writeJson("./map.json", masterMap));



































































// EUPROB 8: Complete
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

// EUPROB 9: Complete

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

// EUPROB 10: Complete
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

// // EUPROB 11: WIP
// // throwback. this is from prob 8. Make an even bigger prime array and 
// // add em all together. 

// // a function to check if a number is prime
// async function isPrime(num: number) {
//   for (let i = 2; i < num; i++) {
//     if (num % i === 0) {
//       return false;
//     }
//   }
//   return true;
// }

// // a function to execute the isPrime function on a range of numbers
// // using Promise.all to execute all the promises at once
// async function primeNumberArray(limit: number) {
//   let primeArray: number[] = [];
//   let promises = [];
//   for (let i = 2; i < limit; i++) {
//     promises.push(isPrime(i));
//   }
//   let results = await Promise.all(promises);
//   for (let i = 0; i < results.length; i++) {
//     if (results[i]) {
//       primeArray.push(i);
//     }
//   }
//   return primeArray.reduce((a, b) => a + b);
// }

// console.log(primeNumberArray(2000000));