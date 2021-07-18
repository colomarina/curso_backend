import type { DenonConfig } from "https://deno.land/x/denon@2.4.7/mod.ts";

const config: DenonConfig = {
  scripts: {
    start: {
      cmd: "deno run --allow-net app.tsx",
      desc: "run my app.tsx file",
    },
  },
};

export default config;