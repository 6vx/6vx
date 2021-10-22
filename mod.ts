import { listenAndServe } from "https://deno.land/std@0.111.0/http/server.ts";



const masterAlphabet = [
    {"letter":"A","maxquantity":11,"baselevel":1},
    {"baselevel":3,"letter":"B","maxquantity":3},
    {"maxquantity":"3","baselevel":3,"letter":"C"},
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

let colorList = [
  "red", "green", "blue", "black", "white"
]

let bagLengthLimit:number = 50;

let maxMultiplier:number = 2;

let chanceLit:number = 0.1;

let chanceColor:number = 0.16;

let chanceLevelBumped:number = 0.5;

let bag:any[] = [];

function shuffleArray(array: any[]) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

function chooseRandomFromArray(array: any[]) {
  return array[Math.floor(Math.random() * array.length)];
}

function chooseRandomBetweenTwoNumbers(min:any, max:any) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function fillBag(array1:any[], array2:any[]) {
  array1.forEach(letter => {
    let quantity = chooseRandomBetweenTwoNumbers(1, letter.maxquantity);
    for (let i = 0; i < quantity; i++) {
      array2.push(letter);
    }
  });
}

function colorDecider(chanceColor:any, colorList:any[]) {
  let colorThisTile = false;
  if (Math.random() < chanceColor) {
    colorThisTile = true;
  }
  if (colorThisTile) {
    let color = chooseRandomFromArray(colorList);
    return color;
  } else {
    return "gray";
  }
}

function bumpedLevelDecider(chanceLevelBumped:number, baselevel:number) {
  let bumpedLevel = false;
  if (Math.random() < chanceLevelBumped) {
    bumpedLevel = true;
  }
  if (bumpedLevel) {
    return baselevel + 1;
  } else {
    return baselevel;
  }
}

function stampTiles(array:any[]) {
  array.forEach(tile => {
    tile.lit = Math.random() < chanceLit;
    tile.color = colorDecider(chanceColor, colorList);
    tile.level = bumpedLevelDecider(chanceLevelBumped, tile.baselevel);
    tile.multiplier = chooseRandomBetweenTwoNumbers(1, maxMultiplier);
  });
} 

function makeNewBag () {
  bag = [];
  fillBag(masterAlphabet, bag);
  shuffleArray(bag);
  stampTiles(bag);
  bag.slice(0, bagLengthLimit);
}



function handleRequest(request:any) {
  const { pathname } = new URL(request.url);

  // Respond with HTML
  if (pathname.startsWith("/html")) {
    const html = `<html>
      <p><b>Message:</b> Hello from Deno Deploy.</p>
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
      message: "Hello from Deno Deploy",
      other: masterAlphabet
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

  // Respond with Alphabet
  if (pathname.startsWith("/bag")) {
    makeNewBag();
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
    `<body
      align="center"
      style="font-family: Avenir, Helvetica, Arial, sans-serif; font-size: 1.5rem;"
    >
      <h1>Return JSON and/or HTML Example</h1>
      <p>
        <a href="/html">/html</a> - responds with HTML to the request.
      </p>
      <p>
        <a href="/json">/json</a> - responds with JSON to the request.
      </p>
      <p>
        <a href="/alphabet">/alphabet</a> - responds with the illustrious master alphabet to the request.
      </p>
      <p>
        <a href="/bag">/bag</a> - responds with a newly shuffled bag.
      </p>
    </body>`,
    {
      headers: {
        "content-type": "text/html; charset=UTF-8",
      },
    },
  );
}

console.log("Listening on http://localhost:8080");
await listenAndServe(":8080", handleRequest);