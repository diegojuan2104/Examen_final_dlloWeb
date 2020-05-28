const pgService = require('../services/pg');
const _pg = new pgService();

/**CONTROLLERS */

//GET: obtiene todos los mantenimientos de manera general
let getMantenimientos = async (req, res) => {
	try {
		let sql = 'SELECT * FROM mantenimientos order by id_mecanico';
		const data = await _pg.executeQuery(sql);
		res.status(200).send(data.rows);
	} catch (error) {
		console.log(error);
		res.status(404).send(error);
	}
};

//GET: obtiene un mantenimiento
let getMantenimiento = async (req, res) => {
	try {
		const id = req.params.id;
		let sql = 'SELECT * FROM mantenimientos WHERE placa = $1 order by id_mecanico';
		let values = [id];
		const data = await _pg.executeQuery(sql, values);
		res.status(200).send(data.rows);
	} catch (error) {
		console.log(error);
		res.status(404).send(error);
	}
};

//POST : Registra un mantenimiento
let postMantenimiento = async (req, res) => {
	try {
		const info = req.body;
		console.log(req);

		let sql =
			'INSERT INTO public.mantenimientos(id_mecanico, placa, fecha, trabajos_realizados, horas_invertidas) VALUES ($1, $2, $3, $4, $5)';
		let values = [info.id_mecanico, info.placa, info.fecha, info.trabajos_realizados, info.horas_invertidas];
		await _pg.executeQuery(sql, values);
		res.status(200).send('Mantenimiento registrado');
	} catch (error) {
		console.log(error);
		res.status(404).send(error);
	}
};

//PUT: Actualiza un mantenimiento
let putMantenimiento = async (req, res) => {
	try {
		const info = req.body;
		console.log(info);
		let sql =
			'UPDATE  mantenimientos SET id_mecanico=$1, placa=$2, fecha=$3, trabajos_realizados=$4, horas_invertidas=$5 WHERE placa = $2 AND fecha = $3 AND id_mecanico =$6;';
		let values = [
			info.id_mecanico,
			info.placa,
			info.fecha,
			info.trabajos_realizados,
			info.horas_invertidas,
			info.id
		];
		await _pg.executeQuery(sql, values);
		res.status(200).send('Mantenimiento actualizado');
	} catch (error) {
		res.status(404).send(error);
	}
};

//DELETE: Elimina un mantenimiento
let deleteMantenimiento = async (req, res) => {
	try {
		const info = req.body;
		console.log(info);
		let sql = 'DELETE FROM mantenimientos WHERE placa = $1 AND id_mecanico = $2 AND fecha = $3;';
		let values = [info.placa, info.id_mecanico, info.fecha];
		await _pg.executeQuery(sql, values);
		res.status(200).send('Mantenimiento Eliminado');
	} catch (error) {
		res.status(404).send(error);
	}
};


//Elimina los mantenimientos de un mecánico en específico

let eliminarMantenimientosMecanico = async (req, res) => {
	try {
		const id = req.params.id;
		let sql = 'DELETE FROM mantenimientos WHERE id_mecanico = $1;';
		let values = [id];
		await _pg.executeQuery(sql, values);
		res.status(200).send('Mantenimientos Eliminados');
	} catch (error) {
		res.status(404).send(error);
	}
}

/**VALIDACIONES */

//Valida los atributos necesarios para registrar un mantenimiento
let validarInformacion = (info) => {
	if (!info.id_mecanico || !info.placa || !info.fecha || !info.trabajos_realizados || !info.horas_invertidas) {
		throw {
			ok: false,
			mensaje: 'Todos los campos son obligatorios',
		};
	}
};

module.exports = { postMantenimiento, getMantenimiento, getMantenimientos, putMantenimiento, deleteMantenimiento, eliminarMantenimientosMecanico };
