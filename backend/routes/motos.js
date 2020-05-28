const express = require('express');
const router = express.Router();

const { postMoto, getMoto, getMotos, putMoto, deleteMoto, actualizarEstadoMoto } = require('../controllers/motos');

/*Enruta todos los controladores,creando los endpoints.*/
router

	.get('/motos', getMotos)

	.get('/motos/:id', getMoto)

	.post('/motos', postMoto)

	.put('/motos/:id', putMoto)

	.put('/actualizarEstadoMoto/:id', actualizarEstadoMoto)

	.delete('/motos/:id', deleteMoto);

module.exports = router;
