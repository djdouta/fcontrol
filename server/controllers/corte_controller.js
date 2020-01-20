const Corte = require("../models/corte_model");

exports.addCorte = async (req, res) => {
  const corte = new Corte(req.body);
  try {
    await corte.save();
    res.json(corte);
  } catch (error) {
    res.status(500).send(error);
  }
};
exports.showCorte = async (req, res) => {
  try {
    const cortes = await Corte.find({});
    res.json(cortes);
  } catch (error) {
    res.status(504).send(error);
  }
};
exports.editCorte = async (req, res) => {
  console.log(req.body.tizada[0].encimados);
  try {
    const corte = await Corte.findByIdAndUpdate(req.query.id, req.body);

    await corte.save();

    res.json(corte);
  } catch (error) {
    res.status(500).send(error);
  }
};
exports.findCorte = async (req, res) => {
  try {
    const cortes = await Corte.find({
      $and: [
        { numero: { $regex: ".*" + req.query.id + ".*" } },
        { "tizada.encimados.cantidad_stock": { $gt: 0 } }
      ]
    });
    res.json(cortes);
  } catch (error) {
    res.status(504).send(error);
  }
};
