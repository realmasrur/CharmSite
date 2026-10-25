import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import fs from "node:fs";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  const site = (env.VITE_SITE_URL || "https://charm.voidkin.world").replace(/\/$/, "");
  const og = ["og.png", "og.jpg", "og.jpeg"].find((f) => fs.existsSync(`public/${f}`)) || "og.png";
  return { plugins: [react(), { name: "site-url", transformIndexHtml: (h) => h.replaceAll("__SITE_URL__", site).replaceAll("__OG_FILE__", og) }] };
});
