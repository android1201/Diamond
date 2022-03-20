module.exports = async (client) => {
	const mongoURL = client.config.bot.mongo,
		mongoose = require('mongoose');
	await mongoose.connect(mongoURL).then(() => {
		console.log('Successfully Connected to MongoDB')
	}).catch((err) => {
		console.log('Unable to connect to MongoDB Database.\nError: ' + err)
	});
}
