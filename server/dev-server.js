console.log("Starting dev server...");

import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import http from "http";
import path from "path";
import { fileURLToPath } from "url";
import { createServer as createViteServer } from "vite";
import waitlistRoutes from "./routes/waitlist.js";

dotenv.config();

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/trackpay";

async function start() {
  console.log("Setting up Express...");
  const app = express();
  app.use(cors());
  app.use(express.json());

  app.get("/api/health", (req, res) => {
    res.json({ status: "ok", service: "trackpay-server (dev)" });
  });
  app.use("/api/waitlist", waitlistRoutes);

  const httpServer = http.createServer(app);

  console.log("Starting Vite middleware...");
  const vite = await createViteServer({
  root: path.join(__dirname, "..", "client"),
  css: {
    postcss: path.join(__dirname, "..", "client"),
  },
  server: { middlewareMode: true, hmr: { server: httpServer } },
  appType: "spa",
});
  app.use(vite.middlewares);

  mongoose
    .connect(MONGO_URI)
    .then(() => console.log("Connected to MongoDB"))
    .catch((err) => console.error("MongoDB connection error:", err.message));

  httpServer.listen(PORT, () =>
    console.log(`Trackpay (dev, hot-reload) running on http://localhost:${PORT}`)
  );
}

start().catch((err) => {
  console.error("FAILED TO START:", err);
  process.exit(1);
});