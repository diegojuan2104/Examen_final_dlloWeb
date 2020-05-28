const { Pool } = require('pg');

class servicioPG {
	constructor() {
		this.pool = new Pool({
			user: 'postgres',
			host: 'localhost',
			database: 'el-taller',
			password: 'admin',
			port: 5432,
		});

		//console.log('Conectado a la base de datos');
	}

	async executeQuery(sql, data) {
		let res = this.pool.query(sql, data);
		return res;
	}
}

module.exports = servicioPG;
