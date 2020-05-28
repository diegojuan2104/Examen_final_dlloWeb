const express = require('express');
const router = express.Router();

const { getUsuarios, postUsuario, putUsuario, deleteUsuario, getUsuario } = require('../controllers/usuarios');

/*Enruta todos los controladores,creando los endpoints.

pd: Me parece más cómodo aplicar 
toda la lógica en los controladores y acá simplemente enrutar
*/
router

	.get('/usuarios', getUsuarios)

	.get('/usuarios/:id', getUsuario)

	.post('/usuarios', postUsuario)

	.put('/usuarios/:id', putUsuario)

	.delete('/usuarios/:id', deleteUsuario);

module.exports = router;
