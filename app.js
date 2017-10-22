const express         = require('express'); 
const favicon         = require('serve-favicon');
const load            = require('express-load');
const logger          = require('morgan');
const cookieParser    = require('cookie-parser');
const bodyParser      = require('body-parser');
const port            = 3000; //Seta a porta que o servidor ira conectar
var   congressHashTag = 0; //Variavel usada na leitura da lista de congressistas, comecando na primeira posicao da lista
var   congressName    = 0;

var app = express();

load('models').then("dao").then('middleware').then("service").into(app);

var mongodb = app.middleware.mongodb; //Variavel que ira receber a conexao do banco de dados em mongoDB que foi criada no script middleware.mongoDB
var service = app.service.service; //Variavel que ira receber o servico que foi criado no script service.service

// view engine setup
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(__dirname + '/public'));

mongodb.connect();//Estabelece a conexao com o banco de dados MongoDB
service.saveParlamentar(); //Salva o congressitas 

if(congressHashTag < 594){
    setInterval( () => { //Adiciona um intervalo entre cada busca, pois a API possui um limite de requisicoes que pdoem ser feitas nela
        service.getParlamentarByHashTag(congressHashTag++); //Pula para a proxima posicao da lista de congressistas a serem pesquisados os tweets
    },5000); //seta o intervalo de 5000 milisegundos (5 segundo)
    if(congressHashTag = 593) { congressName = 1; }
}

if(congressName > 0 && congressName < 594){
    setInterval( () => { //Adiciona um intervalo entre cada busca, pois a API possui um limite de requisicoes que pdoem ser feitas nela
        service.getParlamentarByName(congressName++); //Pula para a proxima posicao da lista de congressistas a serem pesquisados os tweets
    },5000);
}

app.listen(port, () => { //Faz a aplicacao escutar a porta e ver se ela esta disponivel
    console.log("Servidor rodando na porta "+port); //Exibe ao desenvolvedor a porta ao qual o servidor esta conectado
});
