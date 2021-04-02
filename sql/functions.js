const { db } = require('./auth.json');
const { Sequelize } = require('sequelize');

const sql = {
    connection : new Sequelize(db.db, db.un, db.pw, {
        host: 'localhost',
        dialect: 'mariadb',
        dialectOptions: {
            // Mariadb options here
            connectTimeout: 1000
        }
    }),
    async test (db) {
        try {
            await db.authenticate();
            return 'TRUE';
        } catch (error) {
            return error;
        }
    }
}

module.exports = sql;
