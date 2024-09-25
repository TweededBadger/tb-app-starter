import { defineConfig } from "@solidjs/start/config";

export default defineConfig({
  server: {
    routeRules: {
      "/pbapi/**": {
        proxy: {
          to: "http://localhost:8090/**",
        },
      },
    },
  },
});
