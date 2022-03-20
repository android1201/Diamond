module.exports = class guild {
	constructor(data = {}) {
		async function oldData() {
			return await data.client.db.get(`guild${data.id}`);
		}
		oldData().then((d) => {
			var params = d;
			if (d) {
				if (data.joinrole) {
					params['joinrole'] = data.joinrole ? data.joinrole : d.joinrole;
				}
				if (data.logchannel) {
					params['logchannel'] = data.logchannel ? data.logchannel : d.logchannel;
				}
				if (data.nitro) {
					params['nitro'] = data.nitro ? data.nitro : d.nitro;
				}
			} else {
				params = {
					joinrole: data.joinrole ? data.joinrole : [],
					logchannel: data.logchannel ? data.logchannel : data.client.config.channel.log,
					nitro: data.nitro ? data.nitro : 'disable'
				};
			}
			(async () => {
				await data.client.db.set(`guild${data.id}`, params);
			})();
		});
	}
};
