const { Router } = require("express");
const router = Router();
const textileraTela = require("../controllers/textilera_tela_controller");

router.get("/textileraTela/find", textileraTela.findTextileraTela);

module.exports = router;
