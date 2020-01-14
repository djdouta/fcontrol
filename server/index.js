const express = require("express");
const app = express();
const morgan = require("morgan");
const path = require("path");
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

//starting the server
app.listen(app.get("port"), () => {
  console.log(`Port on server ${app.get("port")}`);
});
