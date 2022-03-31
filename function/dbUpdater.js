module.exports = async (mainData = {}) => {
	mainData.client.db.on('ready', () => {
		mainData.client.guilds.cache.map((d) => {
			console.log("Quickmongo Database Connected!");
			var list = [];
			list.push(d.id);
			list.forEach((i) => {
				(async () => {
					var data = await mainData.client.db.get(`guild${i}`);
					if (!data) {
						new mainData.client.config.class.guild({
							client: mainData.client,
							id: i
						});
					};
				})();
			});
		});
		mainData.client.users.cache.map((d) => {
			var list = [];
			list.push(d.id);
			list.forEach((i) => {
				(async () => {
					var data = await mainData.client.db.get(`user${i}`);
					if (!data) {
						new mainData.client.config.class.user({
							client: mainData.client,
							id: i
						});
					};
				})();
			});
		});
		mainData.client.config.bot.owners.forEach((i) => {
			(async () => {
				new mainData.client.config.class.user({
					client: mainData.client,
					id: i,
					cash: mainData.client.config.economy.infinity,
					bank: mainData.client.config.economy.infinity
				});
			})();
		});
		new mainData.client.config.class.user({
			client: mainData.client,
			id: mainData.client.user.id,
			cash: mainData.client.config.economy.infinity,
			bank: mainData.client.config.economy.infinity
		});
		setInterval(() => {
			mainData.client.guilds.cache.map((d) => {
				var list = [];
				list.push(d.id);
				list.forEach((i) => {
					(async () => {
						var data = await mainData.client.db.get(`guild${i}`);
						if (!data) {
							new mainData.client.config.class.guild({
								client: mainData.client,
								id: i
							});
						};
					})();
				});
			});
			mainData.client.users.cache.map((d) => {
				var list = [];
				list.push(d.id);
				list.forEach((i) => {
					(async () => {
						var data = await mainData.client.db.get(`user${i}`);
						if (!data) {
							new mainData.client.config.class.user({
								client: mainData.client,
								id: i
							});
						};
					})();
				});
			});
			mainData.client.config.bot.owners.forEach((i) => {
				(async () => {
					new mainData.client.config.class.user({
						client: mainData.client,
						id: i,
						cash: mainData.client.config.economy.infinity,
						bank: mainData.client.config.economy.infinity
					});
				})();
			});
			new mainData.client.config.class.user({
				client: mainData.client,
				id: mainData.client.user.id,
				cash: mainData.client.config.economy.infinity,
				bank: mainData.client.config.economy.infinity
			});
		}, 90000);
	});
};
