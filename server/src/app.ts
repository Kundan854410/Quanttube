import express from "express";
import sessionRoutes from "./routes/sessions";
import dubbingRoutes from "./routes/dubbing";
import reelsRoutes from "./routes/reels";

const app = express();

app.use(express.json());

/** Health check */
app.get("/api/health", (_req, res) => {
  res.json({ status: "ok", engine: "format-shifting-engine", version: "1.0.0" });
});

/** Session & stream management */
app.use("/api/sessions", sessionRoutes);

/** Deep-Dubbing ML endpoints */
app.use("/api/dubbing", dubbingRoutes);

/** Quanttube reels sharing + deep-link + Quantsink pressure endpoints */
app.use("/api/reels", reelsRoutes);

export default app;
