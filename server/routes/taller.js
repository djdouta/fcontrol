const { Router } = require("express");
const router = Router();
const taller_controller = require("../controllers/taller_controller");

router.post("/taller", taller_controller.addTaller);

module.exports = router;
