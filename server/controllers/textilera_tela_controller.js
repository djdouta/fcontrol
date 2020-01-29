const TextileraTela = require("../models/textilera_tela_model");

exports.findTextileraTela = async (req, res) => {
  try {
    const textileraTela = await TextileraTela.find({
      name: { $regex: ".*" + req.query.nombre + ".*" }
    });
    res.json(textileraTela);
  } catch (error) {
    res.error(500).send(error);
  }
};
