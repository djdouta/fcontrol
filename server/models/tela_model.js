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
  datos: [
    {
      color: String,
      tipo: String,
      descripcion: String,
      temporada: String,
      metros: Number,
      rollos: Number,
      metros_stock: Number,
      rollos_stock: Number,
      codigo: String,
      estampado: Boolean,
      telaImagen: String,
      factura: String
    }
  ]
});
module.exports = mongoose.model("tela", telaSchema);
