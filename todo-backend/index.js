const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const routes = require("../todo-backend/routes/todoRoutes");
require("dotenv").config();

const app = express();
const PORT = process.env.port || 8000;
app.use(express.json());
app.use(cors());
mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => console.log("Connected to mongodb"))
  .catch((err) => console.log(err));
app.use(routes);
app.listen(PORT, () => console.log(`Server is listening on: ${PORT}`));
