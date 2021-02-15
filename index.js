const express = require("express");
const app = express();
const bodyParser = require("body-parser"); //para pegar conteudo do post
const connection = require("./database/database");
const PerguntaSchema = require("./database/PerguntaSchema");
const RespostaSchema = require("./database/RespostaSchema");
const PORT = process.env.PORT || 5000

//--- Database

connection // tenta fazer a conecao com o db
    .authenticate()
    .then(() => {
        console.log("conexao com banco de daos bem sucedida");
    })
    .catch((msgErro) => {
        console.log(msgErro);
    })


//--- configurando o ejs
app.set('view engine', 'ejs');

//--- configurando arquivos estaticos
app.use(express.static('public'));

//--- configura o body-parser
app.use(bodyParser.urlencoded({extended: false})); //decodifica os dados enviados pelo formulario
app.use(bodyParser.json()); //decodifica dados enviados no formato json

//--- Rotas
app.get("/", (req, res) => {
    PerguntaSchema.findAll({ // SELECT * FROM PERGUNTA
        raw: true,
        order: [['id', 'DESC']] // Ordenar como o select e feito ORDER BY column asc/desc
    }).then(perguntas => { // Se a selecao for bem sucedida
        res.render("index", { 
            perguntas: perguntas // Passagem de variavel
        });
    }); 
    
});

app.get("/perguntar", (req, res) => {
    res.render("perguntar");
});

app.post("/salvarpergunta", (req, res) => {
    var titulo = req.body.titulo;
    var descricao = req.body.descricao;

    PerguntaSchema.create({ // insere elemento na tabela, igual ao INSERT INTO ...
        title: titulo,
        description: descricao
    }).then(() => {
        res.redirect("/") // redireciona pra uma url
    }); 
});

app.get("/pergunta/:id", (req, res) => {
    var id = req.params.id;

    PerguntaSchema.findOne({
        where: {id: id}
    }).then(pergunta => {
        if(pergunta != undefined) { // Pergunta encontrada
            RespostaSchema.findAll({
                where: {perguntaId: pergunta.id},
                order: [
                    ['id', 'DESC']
                ]
            }).then(respostas => {
                res.render("pergunta", {
                    pergunta: pergunta,
                    respostas: respostas
                });
            });
     
        }
        else { // nao foi encontrada
            res.redirect("/");
        }
    })
});

app.post("/responder", (req, res) => {
    var corpo = req.body.corpo;
    var perguntaId = req.body.perguntaId;

    RespostaSchema.create({
        corpo: corpo,
        perguntaId: perguntaId
    }).then(() => {
        res.redirect("/pergunta/"+ perguntaId);
    });

});

//--- Server

app.listen(PORT, (erro) => {
    if(erro) {
        console.log("Erro ao inicializar servidor!");
    }
    else{
        console.log("Servidor inicializado com sucesso!");
    }
});