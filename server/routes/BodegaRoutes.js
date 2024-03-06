const express = require('express');
const router = express.Router();

const bodegaController =require('../controllers/BodegaController');


router.get('/',bodegaController.get) //Llama el metodo get de module.exports del controller

router.post('/',bodegaController.create) //Llama el metodo post de module.exports del controller

router.put('/:id',bodegaController.update) //Llama el metodo put de module.exports del controller

router.delete('/:id',bodegaController.delete) //Llama el metodo delete de module.exports del controller



 //  '/:id' 
// los dos puntos definen un parametro y solo aquí se definen
//Los parametros deben ir mas abajo
router.get('/:id', bodegaController.getById)

module.exports=router