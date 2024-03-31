const express=require('express');
const router= express.Router();


const subCategoriaController =require('../controllers/SubCategoriaController');

router.get('/',subCategoriaController.get) //Llama el metodo get de module.exports del controller

 //  '/:id' 
// los dos puntos definen un parametro y solo aquí se definen
//Los parametros deben ir mas abajo
router.get('/:id', subCategoriaController.getById)

module.exports=router