

import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);
import requestsRoutes from "./routes/requests.js";
import offersRoutes from "./routes/offers.js";

app.use("/api/requests", requestsRoutes);
app.use("/api/offers", offersRoutes);

import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Backend is running");
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log("Server running on port", port);
});
