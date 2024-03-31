const express=require('express');
const router= express.Router();

//Controlador
const ubicacionController =require('../controllers/UbicacionController');

//Rutas
router.get('/',ubicacionController.getProvincias) //Llama el metodo get de module.exports del controller


router.get('/:idProvincia',ubicacionController.getCantonesPorProvincia) //Llama el metodo get de module.exports del controller
router.get('/:idProvincia/:idCanton',ubicacionController.getDistritoporCanton) //Llama el metodo get de module.exports del controller



module.exports=router