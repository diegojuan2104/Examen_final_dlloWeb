const express = require('express');
const router = express.Router();

const { verificarToken, logIn } = require('../controllers/autenticacion');
/*Enruta todos los controladores,creando los endpoints.*/
router
	//Middelware
	.use(verificarToken)

	.post('/login', logIn);

module.exports = router;
