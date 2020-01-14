const express = require("express");
const app = express();
const morgan = require("morgan");
const path = require("path");
const mongoose = require("mongoose");

//settings
app.set("port", process.env.PORT || 3002);
app.set("json spaces", 2);

//middleware
app.use(express.static(path.join(__dirname, "../build")));
app.use("/uploads", express.static(__dirname + "/uploads"));
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//routes
app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "../build", "index.html"));
});
app.use(require("./routes/index"));
app.use(require("./routes/corte"));
app.use(require("./routes/tela"));

//database

const url =
  "mongodb+srv://djdouta:20761019@betty-hyw9k.azure.mongodb.net/test?retryWrites=true&w=majority";
mongoose
  .connect(url, {
    useUnifiedTopology: true,
    useCreateIndex: true,
    useNewUrlParser: true
  })
  .then(() => {
    // app.listen(3002);
    console.log("database connected!");
  })
  .catch(err => console.log(err));
// mongoose.connect("paste db link", {useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true });

//starting the server
app.listen(app.get("port"), () => {
  console.log(`Port on server ${app.get("port")}`);
});
