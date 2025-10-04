import express from "express";
import cors from "cors";

const app = express();

// middleware
app.use(cors());
app.use(express.json());

// sample route
app.get("/", (req, res) => {
  res.send("Backend is running 🚀");
});

// PORT from .env or default 5000
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
