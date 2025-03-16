const express = require("express");
const fs = require("fs");
const cors = require("cors");
const path = require("path");

const app = express();
const PORT = 3000;

// ✅ Enable CORS
app.use(cors());
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  if (req.method === "OPTIONS") return res.sendStatus(204);
  next();
});

// ✅ Increase request size limit
app.use(express.json({ limit: "100mb" }));
app.use(express.urlencoded({ limit: "100mb", extended: true }));

// ✅ Serve static files
app.use(express.static(path.join(__dirname, "public")));

// ✅ Load latest modified data
app.get("/api/load", (req, res) => {
  fs.readFile("data.json", "utf8", (err, data) => {
    if (err || !data) {
      console.error("❌ Load Error:", err);
      return res.json({ title: "Default Title", paragraph: "Default paragraph", image: "", lastEditedBy: "Unknown" });
    }
    try {
      res.json(JSON.parse(data));
    } catch (parseError) {
      console.error("❌ JSON Parse Error:", parseError);
      res.status(500).json({ error: "Invalid JSON format" });
    }
  });
});

app.post("/api/save", (req, res) => {
    const role = req.headers["x-user-role"]; // Get role from headers
  
    if (role !== "admin") {
      return res.status(403).json({ error: "❌ Unauthorized: Only admins can edit!" });
    }
  
    console.log("📥 Received Data:", req.body);
    fs.writeFile("data.json", JSON.stringify(req.body, null, 2), (err) => {
      if (err) {
        console.error("❌ Save Error:", err);
        return res.status(500).json({ error: "Failed to save data" });
      }
      res.json({ message: "✅ Data saved successfully!" });
    });
  });
  

// ✅ Handle 404 errors
app.use((req, res) => {
  res.status(404).json({ error: "❌ Route not found" });
});

// ✅ Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
