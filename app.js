const express         = require('express'); 
const favicon         = require('serve-favicon');
const load            = require('express-load');
const logger          = require('morgan');
const cookieParser    = require('cookie-parser');
const bodyParser      = require('body-parser');
const port            = 3001; //Seta a porta que o servidor ira conectar
var   congressHashTag = 0;
var   congressArroba;
var   congressName;

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

if(congressHashTag < 1920){
    setInterval( () => { 
       service.getParlamentarByHashTag(congressHashTag++); 
    },5000);
    if(congressHashTag == 1919){
        congressArroba = 0;
    }
}

if(congressArroba < 1920){
    setInterval( () => { 
        service.getParlamentarByArroba(congressArroba++); 
     },5000);
     if(congressArroba == 1919){
        congressName = 0;
     }
}

if(congressName < 1920){
    setInterval( () => { 
        service.getParlamentarByName(congressName++); 
     },5000);
     if(congressName == 1919){
        congressHashTag = 0;
     }
}

app.listen(port, () => { //Faz a aplicacao escutar a porta e ver se ela esta disponivel
    console.log("Servidor rodando na porta "+port); //Exibe ao desenvolvedor a porta ao qual o servidor esta conectado
});
