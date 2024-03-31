const express = require('express');
const router = express.Router();

const pedidoController =require('../controllers/PedidoController');

//// detalle/////
router.get('/',pedidoController.get) //Llama el metodo get de module.exports del controller

router.post('/',pedidoController.create) //Llama el metodo post de module.exports del controller

//  router.put('/:id',pedidoController.update) //Llama el metodo put de module.exports del controller

// router.delete('/:id',pedidoController.delete) //Llama el metodo delete de module.exports del controller

 //  '/:id' 
// los dos puntos definen un parametro y solo aquí se definen
//Los parametros deben ir mas abajo
router.get('/:id', pedidoController.getById)

module.exports=router;