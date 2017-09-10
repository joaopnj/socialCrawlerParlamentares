module.exports = () => {
	const mongoose     = require('mongoose');
	const Schema       = mongoose.Schema;

	var congressistas  = new Schema({
		nome	: String,
		cadastro: {type: Date, default: Date.now}
	});

	return mongoose.model('congressistas', congressistas);
}