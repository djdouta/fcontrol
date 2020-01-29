const { Router } = require("express");
const router = Router();
const colorTela = require("../controllers/color_tela_controller");

router.get("/colorTela/find", colorTela.findColorTela);

module.exports = router;
