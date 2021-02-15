const Sequelize = require("sequelize");
const connection = require("./database");

const Resposta = connection.define('resposta', {
    corpo: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    perguntaId: {
        type: Sequelize.INTEGER,
        allowNull: false
    }
});

Resposta.sync({force: false}).then(() => { // Passa o model para o banco de dados e verifica se a tabela ja existe, se existir ele nao vai 
    console.log("tabela criada");          // forcar a criacao dela force: false
});

module.exports = Resposta;