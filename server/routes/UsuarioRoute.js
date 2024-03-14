const express = require('express');
const router = express.Router();


const usuarioController = require('../controllers/UsuarioController');

router.get('/', usuarioController.get) //Llama el metodo get de module.exports del controller

router.post('/', usuarioController.create) //Llama el metodo post de module.exports del controller

router.put('/:id', usuarioController.update) //Llama el metodo put de module.exports del controller

router.delete('/:id', usuarioController.delete) //Llama el metodo delete de module.exports del controller
router.get('/loginUser/:id', usuarioController.loginUser) //Llama el metodo get de module.exports del controller



//  '/:id' 
// los dos puntos definen un parametro y solo aquí se definen
//Los parametros deben ir mas abajo
router.get('/:id', usuarioController.getById)

module.exports = router