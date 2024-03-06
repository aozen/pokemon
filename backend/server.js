const express = require("express");
// const bodyParser = require("body-parser");
const db = require("./db");
const authRoutes = require('./routes/authRoutes');
const { APP_PORT } = require("../.env")

db.on('error', (error) => {
  console.log('Error: Database not Connected', error)
  process.exit(0)
})

db.on('open', () => console.log('Database connection established'))

var app = express();
app
  // .use(bodyParser.urlencoded({ extended: true }))
  .use(express.json())
  .use(express.urlencoded({ extended: false }))
  .use("", authRoutes);

const PORT = APP_PORT || 3000;
app.listen(PORT, () => {
  console.log(`App running on http://localhost:${PORT}`);
});
