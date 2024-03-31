const express=require('express');
const router= express.Router();


const categoriaController =require('../controllers/CategoriaController');

router.get('/',categoriaController.get) //Llama el metodo get de module.exports del controller

 //  '/:id' 
// los dos puntos definen un parametro y solo aquí se definen
//Los parametros deben ir mas abajo
router.get('/:id', categoriaController.getById)

module.exports=router