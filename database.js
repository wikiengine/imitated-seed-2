const hostconfig = require('./hostconfig');
const sqlite3 = require('sqlite3').verbose();
const { Pool } = require('pg');

if (hostconfig.dbtype === "sqlite") {
	// SQLite
	console.log("Use: sqlite");
	const conn = new sqlite3.Database('./wikidata.db', () => 0);  // Database
	// Python SQLite imitation
	const curs = {
		execute(sql, params = []) {
			return new Promise((resolve, reject) => {
				if (sql.toUpperCase().startsWith("SELECT")) {
					conn.all(sql, params, (err, retval) => {
						if (err) return reject(err);
						resolve(retval);
					});
				} else {
					conn.run(sql, params, err => {
						if (err) return reject(err);
						resolve(0);
					});
				}
			});
		}
	};
	// Insert into database
	function insert(table, obj) {
		const arr = [];
		let sql = 'INSERT INTO ' + table + ' (';
		for (const item in obj) {
			sql += item + ', ';
		}
		sql = sql.replace(/[,]\s$/, '') + ') VALUES (';
		for (const item in obj) {
			sql += '?, ';
			arr.push(obj[item]);
		}
		sql = sql.replace(/[,]\s$/, '') + ')';
		return curs.execute(sql, arr);
	}

	module.exports = {
		conn, curs, insert,
	};
} else if (hostconfig.dbtype === "pg") {
	// PostgreSQL
	console.log("Use: PostgreSQL");
	const pool = new Pool({
		connectionString: hostconfig.pgstring,
		ssl: {
            rejectUnauthorized: false,
        },
	});

	const curs = {
		execute(sql, params = []) {
			return new Promise((resolve, reject) => {
				pool.query(sql, params, (err, result) => {
					if (err) return reject(err);
					resolve(result.rows);
				});
			});
		}
	};

	// Insert into database
	function insert(table, obj) {
		const keys = Object.keys(obj);
		const values = keys.map(key => obj[key]);
		const placeholders = keys.map((_, index) => `$${index + 1}`).join(', ');

		const sql = `INSERT INTO ${table} (${keys.join(', ')}) VALUES (${placeholders}) RETURNING *`;
		return curs.execute(sql, values);
	}

	module.exports = {
		pool, curs, insert,
	};
}
