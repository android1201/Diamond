class user {
	constructor(data = {}) {
		const params = {
				logchannel: data.logchannel ? data.logchannel : data.client.config.channel.log,
				nitro: data.nitro ? data.nitro : 'disable'
			};
		await client.db.set(`guild${id}`, params);
	}
};
