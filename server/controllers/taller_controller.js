const Taller = require("../models/taller_model");

exports.addTaller = async (req, res) => {
  delete req.body._id;
  delete req.body.__v;
  const taller = new Taller(req.body);
  try {
    const newTaller = await taller.save();
    return res.status(200).json({ newTaller });
  } catch (error) {
    res.status(500).send(error);
  }
};
