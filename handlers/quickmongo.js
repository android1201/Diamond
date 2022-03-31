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
	client.db = db;
	db.on('ready', () => {
		console.log("Quickmongo Database Connected!");
	});
	(async () => {
		await db.connect();
	})();
	/*
	setInterval(() => {
		(async () => {
			await client.db.connect();
		})();
	}, 30000);
	*/
};
