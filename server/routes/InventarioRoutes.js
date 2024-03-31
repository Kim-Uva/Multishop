const express=require('express');
const router= express.Router();


const inventarioController =require('../controllers/InventarioController');

router.get('/',inventarioController.getInventarios) //Llama el metodo get de module.exports del controller

router.post('/',inventarioController.createInventario) //Llama el metodo post de module.exports del controller

router.put('/:id/:id',inventarioController.updateInventario) //Llama el metodo put de module.exports del controller




 //  '/:id' 
// los dos puntos definen un parametro y solo aquí se definen
//Los parametros deben ir mas abajo
router.get('/:id', inventarioController.getInventarioByIdBodega)
router.get('/:id', inventarioController.getInventarioByIdProducto)


module.exports=router