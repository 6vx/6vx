// Just goofin' around to see what sorts of nonsense I can write using Deno.
// Love the native typescript, being able to just spam interfaces off the hop.
// And can't argue with deploying instantly via github with offline dev env. 
import { listenAndServe } from "https://deno.land/std@0.111.0/http/server.ts";

// This script is going to handle the survivor pool in it's entirety.
interface Castaway {
    name: string;
    age?: number;
    score?: number;
    belongsToPlayers?: Array<Player>;
    eliminated?: boolean;
}
// Players have a roster of six castaways.
interface Player {
    name: string;
    email?: string;
    roster?: Array<Castaway>;
}
// Rosters have 6 castaways, one of them is the MVP.
interface Roster {
    castaways: Array<Castaway>;
    MVP: Castaway;
    score?: number;
}
// There are castaways and players competing over 14 weeks. 
const castaways: Castaway[] = [];
const players: Player[] = [];
let weeks = 14;

// Castaways are given points every week.
// Current total of castaway's points are retrieved from a google spreadsheet.
// Players are ranked by how many points their roster of castaway's has.

let playerList = ["Becky","Bonnie","Chad","Chelsea","Christie","Ciara","Cole T","Courtney","Dom","DJ",
                    "Greg","Jace","Jenny","Jess G","Jess T","Kendal","Kristen","Kerri","Lainie","Lisa",
                    "MaryAnn","Mason","Mike J","Mimi","Nick","Rob","Ryan","Sheila","Steph","Tim","Ted","Theresa"]
let castawayList = ["Ricard","Shantel","Jairus","Genie","Brad","Sydney","Evvie","Danny","Deshawn","David",
                    "Eric","Erika","Heather","Liana","Naseer","Sara","Tiffany","Xander"]


// For each playerList create a player and add it to the players array.
for (let i = 0; i < playerList.length; i++) {
    let player: Player = {
        name: playerList[i],
        roster: []
    }
    players.push(player);
}

// For each castawayList create a castaway and add it to the castaways array.
for (let i = 0; i < castawayList.length; i++) {
    let castaway: Castaway = {
        name: castawayList[i],
        score: 0,
        eliminated: false
    }
    castaways.push(castaway);
}


function handleRequest(request:any) {
    const { pathname } = new URL(request.url);
  
    // Respond with castaways
    if (pathname.startsWith("/castaways")) {
      // Use stringify function to convert javascript object to JSON string.
      const json = JSON.stringify(
        castaways
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
        <h1>Survivor</h1>
    
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