const { Router } = require("express");
const router = Router();
const tipoTela = require("../controllers/tipo_tela_controller");

router.get("/tipoTela/find", tipoTela.findTipoTela);

module.exports = router;
