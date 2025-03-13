import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import eslint from "vite-plugin-eslint";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), eslint()],
  server: {
    host: "0.0.0.0", // Allow external connections to the server (e.g. from the host machine). By using 0.0.0.0 instead of the default 127.0.0.1 in your Dockerized services, you ensure that they are accessible from both inside and outside the Docker container. This is crucial for applications that need to interact with other services or users across a network, facilitating easier debugging, testing, and integration of Dockerized applications.
    port: 3000, // Replace with your desired port number
  },
  define: {
      'process.env.ENCODING': JSON.stringify('utf-8'), // Override encoding
    },
});
