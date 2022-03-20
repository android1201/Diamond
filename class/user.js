module.exports = class user {
	constructor(data = {}) {
		const params = {
			cash: data.cash ? data.cash : data.client.config.economy.cash,
			bank: data.bank ? data.bank : data.client.config.economy.bank,
			prefix: data.prefix ? data.prefix : data.client.config.bot.prefix
		};
		(async () => {
			await data.client.db.set(`user${data.id}`, params);
		})();
	}
};
