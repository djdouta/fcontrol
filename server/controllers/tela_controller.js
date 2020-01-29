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
