import express from "express";
const router = express.Router();

// جلب جميع العروض
router.get("/", async (req, res) => {
  try {
    const supabase = req.supabase;

    const { data, error } = await supabase
      .from("offers")
      .select("*")
      .order("id", { ascending: false });

    if (error) return res.status(400).json({ error: error.message });

    res.json(data);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

// جلب عرض واحد
router.get("/:id", async (req, res) => {
  try {
    const supabase = req.supabase;
    const id = req.params.id;

    const { data, error } = await supabase
      .from("offers")
      .select("*")
      .eq("id", id)
      .single();

    if (error) return res.status(400).json({ error: error.message });

    res.json(data);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

// إضافة عرض جديد
router.post("/", async (req, res) => {
  try {
    const supabase = req.supabase;
    const body = req.body;

    const { data, error } = await supabase
      .from("offers")
      .insert([body])
      .select();

    if (error) return res.status(400).json({ error: error.message });

    res.json(data[0]);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

// تحديث عرض
router.put("/:id", async (req, res) => {
  try {
    const supabase = req.supabase;
    const id = req.params.id;
    const body = req.body;

    const { data, error } = await supabase
      .from("offers")
      .update(body)
      .eq("id", id)
      .select();

    if (error) return res.status(400).json({ error: error.message });

    res.json(data[0]);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

// حذف عرض
router.delete("/:id", async (req, res) => {
  try {
    const supabase = req.supabase;
    const id = req.params.id;

    const { error } = await supabase
      .from("offers")
      .delete()
      .eq("id", id);

    if (error) return res.status(400).json({ error: error.message });

    res.json({ message: "Deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

export default router;
