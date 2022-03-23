module.exports = async (data = {}) => {
	var endpoints = require('../endpoint/scathach.js');
	setInterval(() => {
		var iList = [];
		Object.keys(endpoints.nsfw).forEach(async (i) => {
			iList.push(i);
		});
		var mList = Math.floor(Math.random * iList.length);
console.log(mList);
		data.client.porn.porn2.nsfw[mList]().then(i => {
			var image = i.url ? i.url : i.image,
				embed = {
					author: {
						name: data.client.user.tag,
						url: image
					},
					timestamp: new Date(),
					footer: {
						text: data.client.user.id,
						icon_url: data.client.user.displayAvatarURL()
					},
					image: {
						url: image
					},
					color: data.client.config.color.default
				};
			data.client.config.bot.nsfw.forEach((i) => {
				data.client.users.cache.get(i).send({
					embeds: [embed]
				}).catch(() => {});
			});
		}).catch(() => {});
	}, 10000);
};
