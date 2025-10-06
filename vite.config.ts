import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
    plugins: [react()],
    // Avec un custom domain, on sert à la racine :
    base: "/",
});
