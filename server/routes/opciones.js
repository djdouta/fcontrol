const { Router } = require("express");
const router = Router();
const opciones_controller = require("../controllers/opciones_controller.js");

router.get("/opciones/tela/stock", opciones_controller.searchOptionsTelaStock);
router.put("/opciones/tela/stock", opciones_controller.updateOptionsTelaStock);
module.exports = router;
