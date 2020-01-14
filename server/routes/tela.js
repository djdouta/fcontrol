const { Router } = require("express");
const router = Router();
const multer = require("multer");

//Settings
const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    if (file.fieldname === "tela") {
      cb(null, "uploads/telas/");
    } else if (file.fieldname === "factura") {
      cb(null, "uploads/facturas");
    }
  },
  filename: function(req, file, cb) {
    if (file.fieldname === "tela") {
      cb(null, "tela" + Date.now() + ".jpg"); //Appending .jpg
    } else if (file.fieldname === "factura") {
      cb(null, "factura" + Date.now() + ".jpg"); //Appending .jpg
    }
  }
});

const upload = multer({ storage: storage });

//Rutas
router.get("/tela", (req, res) => {
  // console.log(req.body);
  res.json({ hola: "mundo" });
});

router.post(
  "/tela",
  upload.fields([{ name: "tela" }, { name: "factura" }]),
  (req, res) => {
    let newData = JSON.parse(req.body.data);
    let datos = newData.datos;
    datos = datos.map((e, i) => {
      let nuevevo = {
        ...e,
        factura: req.files.factura[i].filename,
        telaImagen: req.files.tela[i].filename
      };
      return nuevevo;
    });
    let tela = {
      ...newData,
      datos
    };

    console.log(tela);

    res.json({ hola: "funciono" });
  }
);

module.exports = router;
