const Sequelize = require("sequelize");
const connection = new Sequelize('db_krekBot', 'root', '25062001', {
    host: 'localhost', // host - onde esta rodando o db
    dialect: 'mysql', // qual banco de dados estamos utilizando
    logging: false
});

module.exports = connection;