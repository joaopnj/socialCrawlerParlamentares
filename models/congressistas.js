module.exports = () => {//Funcao que ira criar variaveis do tipo congressista para serem armazenados no banco de dados
	const mongoose     = require('mongoose'); //Adiciona a biblioteca necessaria para realizar operacoes no banco de dados MongoDB
	const Schema       = mongoose.Schema; //Adiciona o esquema da biblioteca mongoose para realizar as operacoes

	var congressistas  = new Schema({ //Cria uma variavel congressistas que possuira alguns atributos
		nome	: String,//Atributo nome da variavel congressista, usado para identificar quem e o congressista
		cadastro: {type: Date, default: Date.now} //Variavel de cadastro usada para identificar a data de quando foi coletado esse congressista
	});

	return mongoose.model('congressistas', congressistas); //Cria um modelo no banco de dados do tipo congressista
}
