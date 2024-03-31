const express=require('express');
const router= express.Router();


const productoController =require('../controllers/ProductoController');

router.get('/',productoController.get) //Llama el metodo get de module.exports del controller

router.post('/',productoController.create) //Llama el metodo post de module.exports del controller

router.put('/:id',productoController.update) //Llama el metodo put de module.exports del controller

router.delete('/:id',productoController.delete) //Llama el metodo delete de module.exports del controller



 //  '/:id' 
// los dos puntos definen un parametro y solo aquí se definen
//Los parametros deben ir mas abajo
router.get('/:id', productoController.getById)

module.exports=router