var config = require('../js/configure.js'),
	mongoose = require('mongoose'),
	reqString = {
		type: String,
		required: true
	},
	Schema = new mongoose.Schema({
		_id: reqString,
		cash: {
			type: Number,
			default: config.economy.cash
		},
		bank: {
			type: Number,
			default: config.economy.bank
		},
		prefix: {
			type: String,
			default: config.bot.prefix
		}
	});
module.exports = mongoose.model('user', Schema);
