const { db } = require('./auth.json');
const { Sequelize } = require('sequelize');

const sql = {
    connection : new Sequelize(db.db, db.un, db.pw, {
        host: 'localhost',
        dialect: 'mariadb',
        dialectOptions: {
            // Your mariadb options here
            connectTimeout: 1000
        }
    }),

    async attemptConnect (db) {
        console.log('Hi!');
        try {
            await db.authenticate();
            console.log('Connection worked!');
        } catch (error) {
            console.log('Unable to connect ot the database: '+error);
        }
    }
}

module.exports = sql;
