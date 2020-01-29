var mongoose = require("mongoose");
var Schema = mongoose.Schema;

const autoIncrementModelID = require("./counter_model");

const colorTela = new Schema({
  id: { type: Number, unique: true, min: 1 },
  //   createdAt: { type: Date, default: Date.now },
  //   updatedAt: { type: Date },
  name: { type: String }
});

colorTela.pre("save", function(next) {
  if (!this.isNew) {
    next();
    return;
  }

  autoIncrementModelID("activities", this, next);
});

// const tipoTela = new Schema({
//   // _id: {},
//   nombre: {
//     type: String,
//     required: true
//   }
// });
module.exports = mongoose.model("colorTela", colorTela);
