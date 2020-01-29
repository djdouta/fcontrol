const Opciones = require("../models/opciones_model");

exports.searchOptionsTelaStock = async (req, res) => {
  try {
    const opciones = await Opciones.findOne({ nombre: "telaStock" });
    res.json(opciones);
  } catch (error) {
    res.status(504).send(error);
  }
};

exports.updateOptionsTelaStock = async (req, res) => {
  console.log(req.body);
  const opciones = await Opciones.findOneAndUpdate(
    { nombre: "telaStock" },
    { valor: req.body },
    {
      new: true,
      upsert: true // Make this update into an upsert
    }
  );
  res.json(opciones);
  try {
  } catch (error) {
    res.status(500).send(error);
  }
};
