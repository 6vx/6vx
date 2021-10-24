import { Application, Router } from "https://deno.land/x/oak/mod.ts";

import { v4 as uuidv4 } from 'https://cdn.skypack.dev/uuid';

// import * as playfabWebSdk from 'https://cdn.skypack.dev/playfab-web-sdk';

console.log(uuidv4());
console.log("Help meeeeee", playfabWebSdk);

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
  });

const app = new Application();
app.use(router.routes());
app.use(router.allowedMethods());

console.log("I wait, master!")
await app.listen({ port: 8080 });