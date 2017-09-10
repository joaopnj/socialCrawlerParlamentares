module.exports = () => {
	const mongoose     = require('mongoose');
	const Schema       = mongoose.Schema;

	var internalta  = new Schema({
		nome	: String,
		cadastro: {type: Date, default: Date.now}
	});

	return mongoose.model('congressistas', internalta);
}