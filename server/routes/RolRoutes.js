const express=require('express');
const router= express.Router();

//Controlador
const rolController =require('../controllers/RolController');

router.get("/", rolController.get);

router.get("/:id", rolController.getById);

module.exports = router;