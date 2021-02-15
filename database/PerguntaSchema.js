const sequelize = require("sequelize");
const connection = require("./database");

const Pergunta = connection.define('pergunta', {
    title: {
        type: sequelize.STRING,
        allowNull: false
    },
    description: {
        type: sequelize.TEXT,
        allowNull: false
    }
});

Pergunta.sync({force: false}).then(() => { // Passa o model para o banco de dados e verifica se a tabela ja existe, se existir ele nao vai 
    console.log("tabela criada");          // forcar a criacao dela force: false
}); 

module.exports = Pergunta;