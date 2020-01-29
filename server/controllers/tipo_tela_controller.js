const TipoTela = require("../models/tipo_tela_model");

exports.findTipoTela = async (req, res) => {
  try {
    const tipoTela = await TipoTela.find({
      name: { $regex: ".*" + req.query.nombre + ".*" }
    });
    res.json(tipoTela);
  } catch (error) {
    res.error(500).send(error);
  }
};
