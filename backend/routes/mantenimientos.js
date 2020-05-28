const express = require('express');
const router = express.Router();

/*Enruta todos los controladores,creando los endpoints.*/
const {
	postMantenimiento,
	getMantenimiento,
	getMantenimientos,
	putMantenimiento,
	deleteMantenimiento,
	eliminarMantenimientosMecanico
} = require('../controllers/mantenimientos');

router
	.post('/mantenimientos', postMantenimiento)

	.get('/mantenimientos', getMantenimientos)

	.get('/mantenimientos/:id', getMantenimiento)

	.put('/mantenimientos', putMantenimiento)

	.put('/mantenimientosEliminar', deleteMantenimiento)

	.delete('/mantenimientosMecanicoEliminar/:id', eliminarMantenimientosMecanico)

module.exports = router;
