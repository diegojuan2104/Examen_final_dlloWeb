const jwt = require('jsonwebtoken');
const pgService = require('../services/pg');
const _pg = new pgService();

//Clave para generar el token
const secret_key = '2783815c5c6fadfcb4d79d92adeca7ad';

// Valida que los campos de login sean ingresados
let validarLogin = (info) => {
	if (!info.documento || !info.clave) {
		throw {
			ok: false,
			mensaje: 'Todos los campos son obligatorios',
		};
	}
};

//LOGIN : Permite ingresar al usuario autenticandolo y retornandole un token
let logIn = async (req, res) => {
	const info = req.body;
	validarLogin(info);

	let sql = 'SELECT * FROM usuarios WHERE documento = $1 AND clave = md5($2)';
	let values = [info.documento, info.clave];
	const data = await _pg.executeQuery(sql, values);

	if (data.rowCount > 0) {
		let token = generarToken(data.rows[0]);
		res.status(200).send({
			ok: true,
			mensaje: 'Usuario Autenticado',
			token: token,
			usuario: { id: data.rows[0].documento, rol: data.rows[0].rol },
		});
	} else {
		res.status(400).send({ ok: false, mensaje: 'Usuario y/o contraseña incorrecta' });
	}
};

// VERIFICACIÓN: Verifica que el token que se le pase en los headers sea correcto
let verificarToken = (req, res, next) => {
	try {
		let url = req.url;
		if (url != '/login') {
			let token = req.headers.token;
			jwt.verify(token, secret_key);
		}
		next();
	} catch (error) {
		console.log(error);
		res.status(401).send({ ok: false, mensaje: 'No autenticado', info: error });
	}
};

//Genera un token, con la la clave secreta establecida
let generarToken = (usuario) => {
	delete usuario.contraseña;
	let token = jwt.sign(usuario, secret_key);
	return token;
};

module.exports = { verificarToken, logIn };
