const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const telaSchema = new Schema({
  fecha: {
    type: Date,
    required: true
  },
  fecha_remito: {
    type: Date,
    required: true
  },
  textilera: {
    type: String,
    required: true
  },
  remito: {
    type: String,
    required: true
  },
  datos: {
    type: Array,
    required: true
  }
});
module.exports = mongoose.model("tela", telaSchema);
