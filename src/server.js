require("dotenv").config();
const colors = require("colors");
const app = require("./app");
const { db } = require("./db/config");
const INITMODEL = require("./models/initModel");
const swaggerJSDoc = require("swagger-jsdoc");
const swaggerUI = require("swagger-ui-express");

// SWAGGER
app.use("/api-doc", swaggerUI.serve, swaggerUI.setup(swaggerJSDoc()));

db.authenticate()
  .then(() => {
    console.log("Database authenticate 🌚 ".bgBlack.white);
  })
  .catch((err) => console.log(err));

INITMODEL();

db.sync({ force: true })
  .then(() => {
    console.log("Database synced 🦧 ".bgMagenta.black);
  })
  .catch((err) => console.log(err));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(` 🦊 App running on port ${PORT} 🍔 `.bgGreen.black);
});
