const express = require('express');
const router = express.Router();

const ordenController =require('../controllers/detalleController');

//// detalle/////
router.get('/',ordenController.getDetalle) //Llama el metodo get de module.exports del controller

router.post('/',ordenController.createDetalle) //Llama el metodo post de module.exports del controller

 router.put('/:id',ordenController.updateDetalle) //Llama el metodo put de module.exports del controller

router.delete('/:id',ordenController.deleteDetalle) //Llama el metodo delete de module.exports del controller

 //  '/:id' 
// los dos puntos definen un parametro y solo aquí se definen
//Los parametros deben ir mas abajo
router.get('/:id', ordenController.getDetalleById)

module.exports=router 