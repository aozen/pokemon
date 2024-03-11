const express = require("express");
const cors = require("cors");
const db = require("./db");
const authRoutes = require("./routes/authRoutes");
const pokemonRoutes = require("./routes/pokemonRoutes");
const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "../../.env") });

db.on("error", (error) => {
  console.log("Error: Database not Connected", error);
  process.exit(0);
});

db.on("open", () => console.log("Database connection established"));

const app = express();
app
  .use(cors())
  .use(express.json())
  .use(express.urlencoded({ extended: false }))
  .use("/poke", authRoutes)
  .use("/poke", pokemonRoutes);

const PORT = process.env.APP_PORT || 3000;
app.listen(PORT, () => {
  console.log(`App running on http://localhost:${PORT}`);
});
