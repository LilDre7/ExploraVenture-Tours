require("dotenv").config();
const colors = require("colors");
const app = require("./app");
const { db } = require("./db/config");
const INITMODEL = require("./models/initModel");
const swaggerJSDoc = require("swagger-jsdoc");
const swaggerUI = require("swagger-ui-express");

// SWAGGER SETTING
const URL__BASE = "http://localhost:5000";

const swaggerSpec = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API TOURS",
      version: "1.0.0",
      description: "A simple Express Library API",
    },
    server: [
      {
        url: URL__BASE,
      },
    ],
  },
};

console.log(swaggerSpec.definition.server);

// SWAGGER MIDDLEWARE
app.use(
  "/api-doc",
  swaggerUI.serve,
  swaggerUI.setup(swaggerJSDoc(swaggerSpec))
);

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
