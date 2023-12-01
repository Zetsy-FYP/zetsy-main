require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const morgan = require("morgan");
const app = express();
const mongoose = require("mongoose");
const UserRouter = require("./routes/User");
const StoreRouter = require("./routes/Store");

const uri =
  "mongodb+srv://13x54r:Q2FZ1F64mO2NK7O3@zetsy.fy8g5nx.mongodb.net/?retryWrites=true&w=majority";
// const uri = "mongodb://localhost:27017/zetsy-main"
mongoose.connect(uri);
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {
  console.log("Connected to DB");
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors()); // enabling CORS for all routes

app.use(morgan("dev")); // log HTTP requests for debugging

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/api/user", UserRouter).use("/api/store", StoreRouter);

app.use("*", (req, res) => res.send("API endpoint not found!").status(404));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
