const Tela = require("../models/tela_model.js");

exports.addTela = async (req, res, tela) => {
  const telas = new Tela(tela);
  try {
    await telas.save();
    res.json(telas);
  } catch (err) {
    res.status(500).send(err);
  }
};

exports.showTela = async (req, res, next) => {
  const telas = await Tela.find({});
  try {
    res.json(telas);
  } catch (err) {
    res.status(500).send(err);
  }
};

exports.findRemito = async (req, res) => {
  const telas = await Tela.find({
    $and: [
      { remito: { $regex: ".*" + req.query.remito + ".*" } },
      { "datos.metros_stock": { $gt: 0 } }
    ]
  });
  try {
    res.json(telas);
  } catch (error) {
    res.status(500).send({ error });
  }
};
