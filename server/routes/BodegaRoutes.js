const express = require('express');
const router = express.Router();

//Controlador
const Bodega = require('../controllers/BodegaController');


router.get("/", Bodega.get);


module.exports = router;