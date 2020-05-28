const pgService = require('../services/pg');
const _pg = new pgService();

/**CONTROLLERS */

//GET: obtiene todos los usuarios de manera general
let getUsuarios = async (req, res) => {
	try {
		let sql = 'SELECT * FROM usuarios order by documento';
		const data = await _pg.executeQuery(sql);
		res.status(200).send(data.rows);
	} catch (error) {
		console.log(error);
		res.status(404).send(error);
	}
};

//GET: obtiene un solo usuario
let getUsuario = async (req, res) => {
	try {
		const id = req.params.id;
		let sql = 'SELECT * FROM usuarios WHERE documento = $1 order by documento';
		let values = [id];
		const data = await _pg.executeQuery(sql, values);
		res.status(200).send(data.rows);
	} catch (error) {
		console.log(error);
		res.status(404).send(error);
	}
};

//POST : Crea un usuario
let postUsuario = async (req, res) => {
	try {
		const info = req.body;
		console.log(info);
		validarInformacion(info);
		let sql =
			'INSERT INTO usuarios(tipo_documento,documento,nombre,apellidos,celular,correo,rol,clave) VALUES ($1,$2,$3,$4,$5,$6,$7,md5($8));';
		let values = [
			info.tipo_documento,
			info.documento,
			info.nombre,
			info.apellidos,
			info.celular,
			info.correo,
			info.rol,
			info.clave,
		];
		await _pg.executeQuery(sql, values);
		res.status(200).send('Usuario Creado');
	} catch (error) {
		res.status(404).send(error);
	}
};

//PUT: Actualiza un usuario
let putUsuario = async (req, res) => {
	try {
		const info = req.body;
		const id = req.params.id;
		let sql =
			'UPDATE usuarios SET tipo_documento = $1, nombre = $2,apellidos = $3, celular = $4, correo = $5, rol = $6 WHERE documento = $7;';
		let values = [
			info.tipo_documento,
			info.nombre,
			info.apellidos,
			info.celular,
			info.correo,
			info.rol,
			id,
		];
		await _pg.executeQuery(sql, values);
		res.status(200).send('Usuario Actualizado');
	} catch (error) {
		res.status(404).send(error);
	}
};

//DELETE: Elimina un usuario
let deleteUsuario = async (req, res) => {
	try {
		const info = req.body;
		const id = req.params.id;
		console.log(info);
		let sql = 'DELETE FROM usuarios WHERE documento = $1;';
		let values = [id];
		await _pg.executeQuery(sql, values);
		res.status(200).send('Usuario Eliminado');
	} catch (error) {
		res.status(404).send(error);
	}
};

/*VALIDACIONES
 */

//Valida los atributos necesarios para crear un usuario
let validarInformacion = (info) => {
	if (
		!info.tipo_documento ||
		!info.documento ||
		!info.nombre ||
		!info.apellidos ||
		!info.celular ||
		!info.correo ||
		!info.rol ||
		!info.clave
	) {
		throw {
			ok: false,
			mensaje: 'Todos los campos son obligatorios',
		};
	}
};

module.exports = { getUsuarios, postUsuario, putUsuario, deleteUsuario, getUsuario };
