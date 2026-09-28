const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const Produto = require("./models/Produtos");
const Produtos = require("./models/Produtos");

//configurar parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post("/cadastro",function(req,res){
  Produto.create({
     nome: req.body.nome,
     preco: req.body.preco,
     descricao: req.body.descricao
}).then(function(){
    res.send("Produto cadastrado com sucesso!");
}).catch(function(erro){
    res.send("Erro ao cadastrar produto: " + erro);
});
});

app.get("/", function(req,res){
    Produtos.findAll().then(function(produtos){
        res.send(produtos)
    }).catch(function(erro){
        res.send("Erro ao buscar os dados: " + erro);
    });
});

app.get("/:nome",function(req,res){
    Produtos.findAll({where: {"nome": req.params.nome}}).then(function(produto){
        res.send(produto);
    }).catch(function(erro){
        res.send("produto não encontrado: " + erro);
    });
});

app.patch("/atualizar/:id", function(req,res){
    Produtos.update({
        nome: req.body.nome,
        preco: req.body.preco,
        descricao: req.body.descricao},
        {where: {"id": req.params.id}}
    ).then(function(){
        res.send("Produto atualizado com sucesso!");
    }).catch(function(erro){
        res.send("Erro ao atualizar produto: " + erro);
    });
});

app.delete("/deletar/:id", function(req,res){
    Produtos.destroy({where: {"id": req.params.id}}).then(function(){
        res.send("Produto deletado com sucesso!");
    }).catch(function(erro){
        res.send("Erro ao deletar produto: " + erro);
    });
});


const PORT = process.env.PORT || 8081;
app.listen(PORT,"0.0.0.0", function () {
    console.log("servidor rodaando...");
});