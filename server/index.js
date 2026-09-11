import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import path from "path";
import { fileURLToPath } from "url";
import reservationRoutes from "./routes/waitlist.js";

dotenv.config();

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/trackpay";

app.use(cors());
app.use(express.json());

app.get("/api/health", (req, res) => {
  res.json({ status: "ok", service: "trackpay-server" });
});

app.use("/api/waitlist", reservationRoutes);

// Serve the built React app (client/dist) from this same server.
const clientDist = path.join(__dirname, "..", "client", "dist");
app.use(express.static(clientDist));

// Any route that isn't /api/* falls through to the React app.
app.get(/^(?!\/api).*/, (req, res) => {
  res.sendFile(path.join(clientDist, "index.html"));
});

mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(PORT, () => console.log(`Trackpay running on http://localhost:${PORT}`));
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err.message);
    // Start the server anyway so the site + /api/health still work
    // while you get MONGO_URI set up.
    app.listen(PORT, () =>
      console.log(`Trackpay running on http://localhost:${PORT} (no DB connection)`)
    );
  });
