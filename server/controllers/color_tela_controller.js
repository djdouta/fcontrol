const ColorTela = require("../models/color_tela_model");

exports.findColorTela = async (req, res) => {
  try {
    const colorTela = await ColorTela.find({
      name: { $regex: ".*" + req.query.nombre + ".*" }
    });
    res.json(colorTela);
  } catch (error) {
    res.error(500).send(error);
  }
};
