const { Router } = require("express");
const router = Router();
const corte_controller = require("../controllers/corte_controller");

router.get("/corte", corte_controller.showCorte);
router.get("/corte/find", corte_controller.findCorte);
router.post("/corte", corte_controller.addCorte);
router.patch("/corte", corte_controller.editCorte);
module.exports = router;
