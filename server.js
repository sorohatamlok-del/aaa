import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { createClient } from "@supabase/supabase-js";

dotenv.config(); // تحميل المتغيرات أولاً

// إنشاء السيرفر
const app = express();
app.use(cors());
app.use(express.json());

// إنشاء Supabase client بعد تحميل dotenv
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
);

// تمرير supabase للروتات
import requestsRoutes from "./routes/requests.js";
import offersRoutes from "./routes/offers.js";

app.use("/api/requests", (req, res, next) => {
  req.supabase = supabase;
  next();
}, requestsRoutes);

app.use("/api/offers", (req, res, next) => {
  req.supabase = supabase;
  next();
}, offersRoutes);

// Route رئيسي
app.get("/", (req, res) => {
  res.send("Backend is running");
});

// تشغيل السيرفر
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log("Server running on port", port);
});
