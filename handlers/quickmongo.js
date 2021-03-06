module.exports = (
	client
) => {
	/*
	 * Quickmongo
	 */
	const {
		Database
	} = require('quickmongo');
	const db = new Database(client.config.bot.mongo);
	db.on('ready', () => {
		console.log("Quickmongo Database Connected!");
	});
	(async () => {
		await db.connect();
	})();
	client.db = db;
	/*
	setInterval(() => {
		(async () => {
			await client.db.connect();
		})();
	}, 30000);
	*/
};
