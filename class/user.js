module.exports = class user {
	constructor(data = {}) {
		async function oldData() {
			return await data.client.db.get(`user${data.id}`);
		}
		oldData().then((d) => {
			var params = d;
			if (d) {
				if (data.cash) {
					params['cash'] = data.cash ? data.cash : d.cash;
				}
				if (data.bank) {
					params['bank'] = data.bank ? data.bank : d.bank;
				}
				if (data.prefix) {
					params['prefix'] = data.prefix ? data.prefix : d.prefix;
				}
			} else {
				params = {
					cash: data.cash ? data.cash : data.client.config.economy.cash,
					bank: data.bank ? data.bank : data.client.config.economy.bank,
					prefix: data.prefix ? data.prefix : data.client.config.bot.prefix
				};
			};
			(async () => {
				await data.client.db.set(`user${data.id}`, params);
			})();
		});
	}
};
