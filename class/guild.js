module.exports = class guild {
	constructor(data = {}) {
		const params = {
			joinrole: data.joinrole ? data.joinrole : [],
			logchannel: data.logchannel ? data.logchannel : data.client.config.channel.log,
			nitro: data.nitro ? data.nitro : 'disable'
		};
		(async () => {
			await data.client.db.set(`guild${data.id}`, params);
		})();
	}
};
