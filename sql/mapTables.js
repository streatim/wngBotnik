const { connection } = require('./functions.js');
const { Sequelize } = require('sequelize');

const tables = {
    Campaigns : connection.define(
        'Campaigns', {
            // Model attributes are defined here
            campaignID: {
                type: Sequelize.INTEGER(11),
                allowNull: false,
                autoIncrement: true,
                primaryKey: true
            },
            campaignToken: {
                type: Sequelize.STRING(10),
                allowNull: false
            },
            adminID: {
                type: Sequelize.STRING(100),
                allowNull: false
            }
        }, {
            // Other model options go here
            timestamps: false,
            tableName: 'Campaigns'
        }
    )
}

module.exports = tables;