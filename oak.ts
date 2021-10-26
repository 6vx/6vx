// I've grown attached to the idea of this map, and how it's structured. 
// This way of doing things, though, it too heavy to live in a 
// serverless function. 
// Will have to add in a way to write to an object, then I can spit it through
// a static site generator and have it be a static site.

import { Application, Router } from "https://deno.land/x/oak/mod.ts";

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
  place?: Place,
  highScore?: number,
}

let mapAttributes = {
  x_min: 0,
  x_max: 500,
  y_min: 0,
  y_max: 500,
}

let masterMap:Space[] = [

]

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

function createMap() {
  for (let x = 0; x < mapAttributes.x_max; x++) {
    for (let y = 0; y < mapAttributes.y_max; y++) {
      masterMap.push({x: x, y: y})
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
}
// turning this off for now. Because it's too heavy to run on a deno deploy
// needs an actual server to run on. Very fucking rad. Will update every time I add new content. So. Sick.
bootMap();

// find mastermap location where x is 241 and y is 250
// and console.log the place
console.log(masterMap.find(entry => {
  if (entry.x === 241 && entry.y === 250) {
    return entry.place
  }
}))

const books = new Map<string, any>();
books.set("1", {
  id: "1",
  title: "The Hound of the Baskervilles",
  author: "Conan Doyle, Arthur",
});

const router = new Router();
router
  .get("/", (context) => {
    context.response.body = "Hiya.";
  })
  .get("/book", (context) => {
    context.response.body = Array.from(books.values());
  })
  .get("/book/:id", (context) => {
    if (context.params && context.params.id && books.has(context.params.id)) {
      context.response.body = books.get(context.params.id);
    }
  })
  .get("/location/:x/:y", (context) => {
    if (context.params && context.params.x && context.params.y) {
      // find the space in masterMap where x and y are equal to context.params.x and context.params.y
      context.response.body = masterMap.filter(function(result) {
        return result.x === Number(context.params.x) && result.y === Number(context.params.y);
      })

      // context.response.body = masterMap.find(entry => {
      //   if (entry.x === Number(context.params.x) && Number(context.params.y) === entry.y) {
      //     return entry.place
      //   }
      // });
    }
  });

const app = new Application();
app.use(router.routes());
app.use(router.allowedMethods());

console.log("I wait, master!")
await app.listen({ port: 8080 });