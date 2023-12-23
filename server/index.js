require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const morgan = require("morgan");
const app = express();
const mongoose = require("mongoose");
const UserRouter = require("./routes/User");
const StoreRouter = require("./routes/Store");
const CategoryRouter = require("./routes/Category");
const ProductRouter = require("./routes/Product");

// const uri =
//   "mongodb+srv://13x54r:Q2FZ1F64mO2NK7O3@zetsy.fy8g5nx.mongodb.net/zetsy?retryWrites=true&w=majority";
const uri = "mongodb://localhost:27017/zetsy-main"
mongoose.connect(uri);
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {
  console.log("Connected to DB");
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(cors()); // enabling CORS for all routes

app.use(morgan("dev")); // log HTTP requests for debugging

// for serving static file
// app.use(express.static(__dirname + "/uploads"))

app.get("/", (req, res) => {
  res.send("Hello World!");
});

// to disable cache use disable etag

app
  .disable("etag")
  .use("/api/user", UserRouter)
  .use("/api/store", StoreRouter)
  .use("/api/category",CategoryRouter)
  .use("/api/products",ProductRouter)
  .use(express.static(__dirname + "/uploads"))

app.use("*", (req, res) => res.send("API endpoint not found!").status(404));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
