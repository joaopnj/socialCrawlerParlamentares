module.exports = (app) => { 
    
    const mongoose = require('mongoose'); //Adiciona a biblioteca mongoose para se realizar operacoes no banco de dados mongoDB
    
    var MongoDbMiddleware = { //Cria uma variavel que ira possuir os dados da conexao com o bando de dados 
        connect : () => {//Funcao que ira realizar a conexao com o banco de dados
            mongoose.connect('mongodb://localhost/trabalhoBD', (err) => { //Pega o endereco do servidor de dados e cria a conexao com ele
                if(err){ console.log('Erro ao conectar no mongodb '+err); } //Caso ocorra erro na conexao, exibe ao desenvolvedor o erro ocorrido
            });
        }
    }
    
    return MongoDbMiddleware; //Retorna a variavel que possuira os dados da conexao com o banco de dados
}
