module.exports = () => {
	const mongoose     = require('mongoose');
	const Schema       = mongoose.Schema;

	var internauta  = new Schema({
		nome	: String,
		cadastro: {type: Date, default: Date.now}
	});

	return mongoose.model('internauta', internauta);
}