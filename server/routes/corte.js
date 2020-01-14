const { Router } = require("express");
const router = Router();

router.get("/corte", (req, res) => {
  res.json({ hola: "mundo" });
});

module.exports = router;
