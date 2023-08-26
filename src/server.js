require("dotenv").config();
const colors = require("colors");
const app = require("./app");
const { db } = require("./db/config");

db.authenticate()
  .then(() => {
    console.log("Database authenticate 🌚 ".bgBlack.white);
  })
  .catch((err) => console.log(err));

db.sync({ force: false })
  .then(() => {
    console.log("Database synced 🦧 ".bgMagenta.black);
  })
  .catch((err) => console.log(err));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(` 🦊 App running on port ${PORT} 🍔 `.bgGreen.black);
});
