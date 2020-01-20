const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const corteSchema = new Schema({
  numero: {
    type: String,
    required: true
  },
  encimador: {
    type: String,
    required: true
  },
  fecha: {
    type: Date,
    required: true
  },
  cortador: {
    type: String,
    required: true
  },
  textilera: {
    type: String,
    required: true
  },
  tela: {
    type: String,
    required: true
  },
  temporada: {
    type: String,
    required: true
  },
  tizada: {
    type: Array,
    required: true
  }
});

module.exports = mongoose.model("corte", corteSchema);
