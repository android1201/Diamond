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
	 * userCreate
	 */
	client.users.cache.map((d) => {
		var list = [];
		list.push(d.id);
		list.forEach((i) => {
			(async () => {
				var data = await client.db.get(`user${i}`);
				if (!data) {
					new client.config.class.user({
						client: client,
						id: i
					});
				};
			})();
		});
	});
};
