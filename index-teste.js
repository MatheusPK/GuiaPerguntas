const express = require("express");
const app = express();

// Estou dizendo para o expresse usar o EJS como View Engine
app.set('view engine', 'ejs');

// Estou dizendo para o express qual pasta vou utilizar para colocar arquivos estaticos (css, imagens, ...)
app.use(express.static('public')); 


app.get("/:nome/:language", (req, res) =>  {
    var nome = req.params.nome;
    var language = req.params.language;
    var exibirMsg = false;

    var produtos = [
        {nome: "Doritos", preco: 3.14},
        {nome: "Coca-Cola", preco: 5.00},
        {nome: "Leite", preco: 7.50},
        {nome: "Maizena", preco: 2.50},
        {nome: "Feijão", preco: 1.99}
    ];

    res.render("index", {  //express renderiza o arquivo que esta na pasta views
        nome: nome,
        language: language,
        empresa: "Apple Developer Academy",
        msg: exibirMsg,
        produtos: produtos
    }); 
});

/*---- teste
app.get("/home", (req, res) => {
    res.render("home")
});

app.get("/perfil/:nome?", (req, res) => {
    var nome = req.params["nome"];
    
    if(nome) {
        console.log(nome);
    }
    else {
        console.log("nenhum nome foi passado");
    }

    res.render("principal/perfil");

});

---*/
app.listen(8080, (erro) => {
    if(erro) {
        console.log("Erro ao criar o servidor");
    }
    else {
        console.log("Servidor inicializado com sucesso");
    }
});