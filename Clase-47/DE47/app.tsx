// @deno-types="https://deno.land/x/servest/types/react/index.d.ts"
import React from "https://dev.jspm.io/react/index.js";
// @deno-types="https://deno.land/x/servest/types/react-dom/server/index.d.ts"
import ReactDOMServer from "https://dev.jspm.io/react-dom/server.js";
import { createApp } from "https://deno.land/x/servest/mod.ts";
import Formulario from "./formulario.tsx";

const app = createApp();
const PORT = 8080;
let colores: string[] = [];

const headers = {
  "content-type": "text/html; charset=UTF-8",
}

app.handle("/", async (req: any) => {
  let query = req.url.replace(/\//g, "");
  const params = new URLSearchParams(query);
  let color = params.get("color");
  if (color) {
    let colorDeco = decodeURIComponent(color);
    colores.push(colorDeco)
  }
  await req.respond({
    status: 200,
    headers: new Headers(headers),
    body: ReactDOMServer.renderToString(<Formulario colores={colores} />)
  });
});

app.listen({
  port: PORT
});