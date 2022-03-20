module.exports = class guild {
	constructor(data = {}) {
		const list = [],
			listData;
		if (data.joinrole) {
			list.push(data.joinrole);
			listData = list;
		} else {
			listData = list;
		};
		const params = {
			joinrole: listData,
			logchannel: data.logchannel ? data.logchannel : data.client.config.channel.log,
			nitro: data.nitro ? data.nitro : 'disable'
		};
		(async () => {
			await data.client.db.set(`guild${data.id}`, params);
		})();
	}
};
