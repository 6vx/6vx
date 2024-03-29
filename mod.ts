// Main deno deploy test script. Really impressed. Will keep using.
import { listenAndServe } from "https://deno.land/std@0.111.0/http/server.ts";

// Defining the tile you pick up!
// Starting early on making them cray and unique
// They'll only get crazier.
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

// A root alphabet that limits the quantity of letters and their base level.
let masterAlphabet = [
    {"letter":"A","maxquantity":11,"baselevel":1,},
    {"baselevel":3,"letter":"B","maxquantity":3},
    {"maxquantity":3,"baselevel":3,"letter":"C"},
    {"maxquantity":6,"letter":"D","baselevel":3},
    {"maxquantity":14,"baselevel":1,"letter":"E"},
    {"maxquantity":3,"letter":"F","baselevel":4},
    {"maxquantity":4,"baselevel":2,"letter":"G"},
    {"letter":"H","baselevel":4,"maxquantity":3},
    {"maxquantity":10,"letter":"I","baselevel":1},
    {"letter":"J","maxquantity":2,"baselevel":9},
    {"letter":"K","baselevel":7,"maxquantity":2},
    {"letter":"L","maxquantity":5,"baselevel":1},
    {"maxquantity":3,"baselevel":3,"letter":"M"},
    {"letter":"N","maxquantity":7,"baselevel":1},
    {"baselevel":1,"maxquantity":9,"letter":"O"},
    {"maxquantity":3,"baselevel":3,"letter":"P"},
    {"letter":"Q","baselevel":11,"maxquantity":2},
    {"letter":"R","maxquantity":7,"baselevel":1},
    {"letter":"S","maxquantity":6,"baselevel":1},
    {"maxquantity":8,"letter":"T","baselevel":2},
    {"baselevel":1,"letter":"U","maxquantity":5},
    {"baselevel":5,"letter":"V","maxquantity":3},
    {"baselevel":5,"maxquantity":2,"letter":"W"},
    {"baselevel":10,"maxquantity":2,"letter":"X"},
    {"letter":"Y","maxquantity":3,"baselevel":5},
    {"maxquantity":2,"baselevel":11,"letter":"Z"}
]

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
      "red", "green", "blue", "black", "white"
  ],
  bagLengthLimit: 50,
  maxMultiplier: 2,
  chanceLit: 0.1,
  chanceColor: 0.16,
  chanceLevelBumped: 0.5,
}

let bag:Tile[] = [];


// using to shuffle the bag after filling it
function shuffleArray(array: any[]) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

// using to choose a color, if the tile happens to be colored.
function chooseRandomFromArray(array: any[]) {
  return array[Math.floor(Math.random() * array.length)];
}

// using to choose the quantity of tiles added to bag
function chooseRandomBetweenTwoNumbers(min:any, max:any) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// using to decide if a tile is colored or not
function assignColor() {
  // if random number is less than chancecolor, assign color.
  if (Math.random() < options.chanceColor) {
    return chooseRandomFromArray(options.colorList);
  } else {
    return "gray";
  }
}

// using to decide if a tile gets a level bump
function assignLevel(baseLevel:number) {
  let level = baseLevel;
  if (Math.random() < options.chanceLevelBumped) {
    level += 1;
  }
  return level;
}

// this function takes the alphabet and spits out a colored, boosted, 
// and lit bag of tiles to be used as a bag. 

function updateBag () {
  masterAlphabet.forEach(letter => {
    let newTile:Tile = letter
    for (let i = 0; i < chooseRandomBetweenTwoNumbers(1, letter.maxquantity); i++) {
      newTile.uuid = crypto.randomUUID();
      newTile.multiplier = chooseRandomBetweenTwoNumbers(1, options.maxMultiplier);
      newTile.color = assignColor();
      newTile.level = assignLevel(letter.baselevel);
      newTile.isLit = Math.random() < options.chanceLit;
      // this is my first use of the spread operator.
      // if you don't dereference your array you end up
      // applying your changes to each instance of the 
      // original alphabet letters, since the computer 
      // thinks they're all the same. 
      bag.push({...newTile});
    }
  });
  // SHAKE IT BABY!
  shuffleArray(bag);
  // pop tiles until bag is equal to bagLengthLimit
  while (bag.length > options.bagLengthLimit) {
    bag.pop();
  }
}

// Execute the shebang for delivery. 
updateBag();

// ROUTES BELOW AND STUFF THANKS 


async function handleRequest(request:any) {
  const { pathname } = new URL(request.url);

  if (pathname.startsWith("/style.css")) {
    // Read the style.css file from the file system.
    const file = await Deno.readFile("./style.css");
    // Respond to the request with the style.css file.
    return new Response(file, {
      headers: {
        "content-type": "text/css",
      }
    });
  }

  // Respond with HTML
  if (pathname.startsWith("/html")) {
    const html = `<html>
      <p><b>Message:</b> Hello from the internet. GLHFEV.</p>
      </html>`;

    return new Response(html, {
      headers: {
        // The interpretation of the body of the response by the client depends
        // on the 'content-type' header.
        // The "text/html" part implies to the client that the content is HTML
        // and the "charset=UTF-8" part implies to the client that the content
        // is encoded using UTF-8.
        "content-type": "text/html; charset=UTF-8",
      },
    });
  }

  // Respond with JSON
  if (pathname.startsWith("/json")) {
    // Use stringify function to convert javascript object to JSON string.
    const json = JSON.stringify({
      message: "Hello from typescript <3",
    });

    return new Response(json, {
      headers: {
        "content-type": "application/json; charset=UTF-8",
      },
    });
  }

  // Respond with Alphabet
  if (pathname.startsWith("/alphabet")) {
    // Use stringify function to convert javascript object to JSON string.
    const json = JSON.stringify({
      alphabet: masterAlphabet
    });

    return new Response(json, {
      headers: {
        "content-type": "application/json; charset=UTF-8",
      },
    });
  }

  // Respond with Bag
  if (pathname.startsWith("/bag")) {
    // Use stringify function to convert javascript object to JSON string.
    const json = JSON.stringify(
      bag
    );

    return new Response(json, {
      headers: {
        "content-type": "application/json; charset=UTF-8",
      },
    });
  }

  return new Response(
    `<html>
  <head>
    <link rel="stylesheet" href="style.css" />
  </head>
    
    <body>
      <h1>6vx</h1>
      <p>
        <a href="/html">/html</a> - responds with HTML
      </p>
      <p>
        <a href="/json">/json</a> - responds with JSON
      </p>
      <p>
        <a href="/alphabet">/alphabet</a> - responds with the illustrious master alphabet
      </p>
      <p>
        <a href="/bag">/bag</a> - responds with a newly shuffled bag
      </p>
    </body>
    </html>`,
    {
      headers: {
        "content-type": "text/html; charset=UTF-8",
      },
    },
  );
}

console.log("Listening on http://localhost:8080");
await listenAndServe(":8080", handleRequest);