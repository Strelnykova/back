const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const resourceRoutes = require("./routes/resourceRoutes.js");
const unitRoutes = require("./routes/unitRoutes.js");
const userRoutes = require("./routes/userRoutes.js");
const usedResourcesRoutes = require("./routes/usedResourcesRoutes.js");
const authRoutes = require("./routes/auth.js");

const sequelize = require("./models/index.js");

const app = express();

app.use(cors());
app.use(bodyParser.json());

sequelize
  .sync()
  .then(() => {
    console.log("Database synchronized successfully");
  })
  .catch((err) => {
    console.error("Unable to sync the database:", err);
  });

app.use("/api/resources", resourceRoutes);
app.use("/api/units", unitRoutes);
app.use("/api/users", userRoutes);
app.use("/api/used-resources", usedResourcesRoutes);
app.use("/auth", authRoutes);

const PORT = 4000;
app.listen(PORT, async () => {
  console.log(`Сервер запущено на порті ${PORT}`);
});
