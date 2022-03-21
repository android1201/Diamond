module.exports = async (data = {}) => {
	data.client.db.on('ready', () => {
		console.log("Quickmongo Database Connected!");
		data.client.guilds.cache.map((d) => {
			var list = [];
			list.push(d.id);
			list.forEach((i) => {
				(async () => {
					var data = await data.client.db.get(`guild${i}`);
					if (!data) {
						new data.client.config.class.guild({
							data.client: data.client,
							id: i
						});
					};
				})();
			});
		});
		data.client.users.cache.map((d) => {
			var list = [];
			list.push(d.id);
			list.forEach((i) => {
				(async () => {
					var data = await data.client.db.get(`user${i}`);
					if (!data) {
						new data.client.config.class.user({
							data.client: data.client,
							id: i
						});
					};
				})();
			});
		});
		data.client.config.bot.owners.forEach((i) => {
			(async () => {
				new data.client.config.class.user({
					data.client: data.client,
					id: i,
					cash: data.client.config.economy.infinity,
					bank: data.client.config.economy.infinity
				});
			})();
		});
		new data.client.config.class.user({
			data.client: data.client,
			id: data.client.user.id,
			cash: data.client.config.economy.infinity,
			bank: data.client.config.economy.infinity
		});
		setInterval(() => {
			data.client.guilds.cache.map((d) => {
				var list = [];
				list.push(d.id);
				list.forEach((i) => {
					(async () => {
						var data = await data.client.db.get(`guild${i}`);
						if (!data) {
							new data.client.config.class.guild({
								data.client: data.client,
								id: i
							});
						};
					})();
				});
			});
			data.client.users.cache.map((d) => {
				var list = [];
				list.push(d.id);
				list.forEach((i) => {
					(async () => {
						var data = await data.client.db.get(`user${i}`);
						if (!data) {
							new data.client.config.class.user({
								data.client: data.client,
								id: i
							});
						};
					})();
				});
			});
			data.client.config.bot.owners.forEach((i) => {
				(async () => {
					new data.client.config.class.user({
						data.client: data.client,
						id: i,
						cash: data.client.config.economy.infinity,
						bank: data.client.config.economy.infinity
					});
				})();
			});
			new data.client.config.class.user({
				data.client: data.client,
				id: data.client.user.id,
				cash: data.client.config.economy.infinity,
				bank: data.client.config.economy.infinity
			});
		}, 90000);
	});
};
