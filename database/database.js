const Sequelize = require("sequelize");
const userHeroku = "bf1fb496c0d7ca";
const passwordHeroku = "2e305c55";
const hostHeroku = "us-cdbr-east-03.cleardb.com";
const herokuDatabase = "heroku_96be19fccdb63e1";
const connection = new Sequelize(herokuDatabase, userHeroku, passwordHeroku, { //db_krekBot, root, 25062001
    host: hostHeroku, // host - onde esta rodando o db -> localhost
    dialect: 'mysql', // qual banco de dados estamos utilizando
    logging: false
});

module.exports = connection;