module.exports = () => {
	const mongoose     = require('mongoose');
	const Schema       = mongoose.Schema;

	var tweet  = new Schema({
        texto	   : String,
        hashTag   : String,
        internauta : String,
		cadastro: {type: Date, default: Date.now}
	});

	return mongoose.model('tweet', tweet);
}