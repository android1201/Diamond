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
	(async () => {
		await client.db.connect();
	})();
	setInterval(() => {
		(async () => {
			await client.db.connect();
		})();
	}, 1000);
};
