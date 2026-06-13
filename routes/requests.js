import express from "express";
const router = express.Router();

// جلب جميع الطلبات
router.get("/", async (req, res) => {
  try {
    const supabase = req.supabase;

    const { data, error } = await supabase
      .from("requests")
      .select("*")
      .order("id", { ascending: false });

    if (error) return res.status(400).json({ error: error.message });

    res.json(data);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

// إضافة طلب جديد
router.post("/", async (req, res) => {
  try {
    const supabase = req.supabase;
    const body = req.body;

    const { data, error } = await supabase
      .from("requests")
      .insert([body])
      .select();

    if (error) return res.status(400).json({ error: error.message });

    res.json(data[0]);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

// حذف طلب
router.delete("/:id", async (req, res) => {
  try {
    const supabase = req.supabase;
    const id = req.params.id;

    const { error } = await supabase
      .from("requests")
      .delete()
      .eq("id", id);

    if (error) return res.status(400).json({ error: error.message });

    res.json({ message: "Deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

export default router;
