const express = require('express');
const router = express.Router();

const proveedorController =require('../controllers/ProveedorController');


router.get('/',proveedorController.get) //Llama el metodo get de module.exports del controller

router.post('/',proveedorController.create) //Llama el metodo post de module.exports del controller

router.put('/:id',proveedorController.update) //Llama el metodo put de module.exports del controller




 //  '/:id' 
// los dos puntos definen un parametro y solo aquí se definen
//Los parametros deben ir mas abajo
router.get('/:id', proveedorController.getById)

module.exports=router