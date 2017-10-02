module.exports = () => {
	const mongoose     = require('mongoose'); //Adiciona a biblioteca para realizar operacoes no bando de dados mongoDB
	const Schema       = mongoose.Schema; //Adiciona o esquema de uso da biblioteca mongoose

	var tweet  = new Schema({//Cria uma variavel Tweet 
        texto	   : String, //Esta variavel tweet ira possui atributos como texto
        hashTag    : String, //Um atributo hashtag
        internauta : String,// Um atributo para saber quem foi o usuario que escreveu o tweet
		cadastro: {type: Date, default: Date.now}// Um cadastro para pegar a data para se ter referencia de quando foi coletado esse tweet
	});

	return mongoose.model('tweet', tweet); //Retorna a variavel tweet que foi criado, pois esse script sera acessado para se requisitar uma variavel tweet para ser preenchida e armazenada na base de dados
}
