const express = require('express');
const router = express.Router();

const encabezadoController =require('../controllers/EncabezadoController');

//// detalle/////
router.get('/',encabezadoController.getEncabezado) //Llama el metodo get de module.exports del controller

router.post('/',encabezadoController.createEncabezado) //Llama el metodo post de module.exports del controller

  router.put('/:id',encabezadoController.updateEncabezado) //Llama el metodo put de module.exports del controller

 router.delete('/:id',encabezadoController.deleteEncabezado) //Llama el metodo delete de module.exports del controller

//  //  '/:id' 
// los dos puntos definen un parametro y solo aquí se definen
//Los parametros deben ir mas abajo
router.get('/:id', encabezadoController.getEncabezadoById)

module.exports=router