const pgService = require('../services/pg');
const _pg = new pgService();

/**CONTROLLERS */

//GET: obtiene todos las motos de manera general
let getMotos = async (req, res) => {
	try {
		let sql = 'SELECT * FROM motos order by id_propietario';
		const data = await _pg.executeQuery(sql);
		res.status(200).send(data.rows);
	} catch (error) {
		console.log(error);
		res.status(404).send(error);
	}
};

//GET: obtiene una moto
let getMoto = async (req, res) => {
	try {
		const id = req.params.id;
		let sql = 'SELECT * FROM motos WHERE placa = $1 order by id_propietario';
		let values = [id];
		const data = await _pg.executeQuery(sql, values);
		res.status(200).send(data.rows);
	} catch (error) {
		console.log(error);
		res.status(404).send(error);
	}
};

//POST : Registra una moto
let postMoto = async (req, res) => {
	try {
		const info = req.body;
		console.log(info);
		validarInformacion(info);
		let sql =
			'INSERT INTO motos(placa, estado, clase, marca, modelo, color, cilindraje, id_propietario, nro_soat, vencimiento_soat, nro_tecnomecanica, vencimiento_tecnomecanica)VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12);';
		let values = [
			info.placa,
			info.estado,
			info.clase,
			info.marca,
			info.modelo,
			info.color,
			info.cilindraje,
			info.id_propietario,
			info.nro_soat,
			info.vencimiento_soat,
			info.nro_tecnomecanica,
			info.vencimiento_tecnomecanica,
		];
		await _pg.executeQuery(sql, values);
		res.status(200).send('Moto registrada');
	} catch (error) {
		console.log(error);
		res.status(404).send(error);
	}
};

//DELETE: Elimina una moto
let deleteMoto = async (req, res) => {
	try {
		const info = req.body;
		const id = req.params.id;
		console.log(info);
		let sql = 'DELETE FROM motos WHERE placa = $1;';
		let values = [id];
		await _pg.executeQuery(sql, values);
		res.status(200).send('Moto Eliminada');
	} catch (error) {
		res.status(404).send(error);
	}
};

//PUT: Actualiza una moto
let putMoto = async (req, res) => {
	try {
		const info = req.body;
		const id = req.params.id;
		console.log(info);
		let sql =
			'UPDATE motos SET placa=$1, estado=$2, clase=$3, marca=$4, modelo=$5, color=$6, cilindraje=$7, id_propietario=$8, nro_soat=$9, vencimiento_soat=$10, nro_tecnomecanica=$11, vencimiento_tecnomecanica=$12 WHERE placa = $13';
		let values = [
			info.placa,
			info.estado,
			info.clase,
			info.marca,
			info.modelo,
			info.color,
			info.cilindraje,
			info.id_propietario,
			info.nro_soat,
			info.vencimiento_soat,
			info.nro_tecnomecanica,
			info.vencimiento_tecnomecanica,
			id,
		];
		await _pg.executeQuery(sql, values);
		res.status(200).send('Moto Actualizada');
	} catch (error) {
		res.status(404).send(error);
	}
};

//PUT: Actualiza el estado de una moto
let actualizarEstadoMoto = async (req, res) => {
	try {
		const info = req.body;
		const id = req.params.id;
		console.log(info);
		let sql =
			'UPDATE motos SET estado=$1 WHERE placa = $2';
		let values = [
			info.estado,
			id,
		];
		await _pg.executeQuery(sql, values);
		res.status(200).send('Estado moto actualizada');
	} catch (error) {
		res.status(404).send(error);
	}
};

/**VALIDACIONES */

//Valida los atributos necesarios para registrar una moto
let validarInformacion = (info) => {
	if (
		!info.placa ||
		!info.estado ||
		!info.clase ||
		!info.marca ||
		!info.modelo ||
		!info.color ||
		!info.cilindraje ||
		!info.id_propietario ||
		!info.nro_soat ||
		!info.vencimiento_soat ||
		!info.nro_tecnomecanica ||
		!info.vencimiento_tecnomecanica
	) {
		throw {
			ok: false,
			mensaje: 'Todos los campos son obligatorios',
		};
	}
};

module.exports = { postMoto, getMotos, getMoto, deleteMoto, putMoto, actualizarEstadoMoto };
