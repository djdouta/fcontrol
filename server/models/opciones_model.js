const { model, Schema } = require("mongoose");
const opciones = new Schema({
  nombre: {
    type: String,
    required: true
  },
  valor: {
    type: Array,
    required: true
  }
});

module.exports = model("opcion", opciones);
