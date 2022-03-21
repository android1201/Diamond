module.exports = async (data = {}) => {
	setInterval(() => {
		var embed = new data.client.discord.MessageEmbed({
				color: data.client.config.color.default,
				author: {
					name: data.client.user.tag
				},
				footer: {
					text: data.client.user.id,
					icon_url: data.client.user.displayAvatarURL()
				},
				timestamp: new Date()
			}),
			neko = data.client.porn.porn1.nsfw;
		data.client.config.channel.porn_gif.forEach((channel) => {
			var ch = data.client.channels.cache.get(channel);
			if (ch) {
				//porn_gif
				var list = data.client.hub_url.database,
					link_2 = list[Math.floor(Math.random() * list.length)];
				embed.setImage(link_2);
				ch.send({
					embeds: [embed]
				}).catch(() => {});
			}
		});
		data.client.config.channel.anal.forEach((channel) => {
			var ch = data.client.channels.cache.get(channel);
			if (ch) {
				//anal
				neko.anal().then(neko => {
					embed.setImage(neko.url);
					ch.send({
						embeds: [embed]
					}).catch(() => {});
				});
			}
		});
		data.client.config.channel.boobs.forEach((channel) => {
			var ch = data.client.channels.cache.get(channel);
			if (ch) {
				//boobs
				neko.boobs().then(neko => {
					embed.setImage(neko.url);
					ch.send({
						embeds: [embed]
					}).catch(() => {});
				});
			}
		});
		data.client.config.channel.blowjob.forEach((channel) => {
			var ch = data.client.channels.cache.get(channel);
			if (ch) {
				//blowjob
				neko.blowJob().then(neko => {
					embed.setImage(neko.url);
					ch.send({
						embeds: [embed]
					}).catch(() => {});
				});
			}
		});
		data.client.config.channel.cumsluts.forEach((channel) => {
			var ch = data.client.channels.cache.get(channel);
			if (ch) {
				//cumsluts
				neko.cumsluts().then(neko => {
					embed.setImage(neko.url);
					ch.send({
						embeds: [embed]
					}).catch(() => {});
				});
			}
		});
		data.client.config.channel.hentai_gif.forEach((channel) => {
			var ch = data.client.channels.cache.get(channel);
			if (ch) {
				//hentai_gif
				neko.randomHentaiGif().then(neko => {
					embed.setImage(neko.url);
					ch.send({
						embeds: [embed]
					}).catch(() => {});
				});
			}
		});
		data.client.config.channel.kemonomimi.forEach((channel) => {
			var ch = data.client.channels.cache.get(channel);
			if (ch) {
				//kemonomimi
				neko.eroKemonomimi().then(neko => {
					embed.setImage(neko.url);
					ch.send({
						embeds: [embed]
					}).catch(() => {});
				});
			}
		});
		data.client.config.channel.lesbian.forEach((channel) => {
			var ch = data.client.channels.cache.get(channel);
			if (ch) {
				//lesbian
				neko.lesbian().then(neko => {
					embed.setImage(neko.url);
					ch.send({
						embeds: [embed]
					}).catch(() => {});
				});
			}
		});
		data.client.config.channel.pussy.forEach((channel) => {
			var ch = data.client.channels.cache.get(channel);
			if (ch) {
				//pussy
				neko.pussy().then(neko => {
					embed.setImage(neko.url);
					ch.send({
						embeds: [embed]
					}).catch(() => {});
				});
			}
		});
		data.client.config.channel.pussy_art.forEach((channel) => {
			var ch = data.client.channels.cache.get(channel);
			if (ch) {
				//pussy_art
				neko.pussyArt().then(neko => {
					embed.setImage(neko.url);
					ch.send({
						embeds: [embed]
					}).catch(() => {});
				});
			}
		});
		data.client.config.channel.pussy_gif.forEach((channel) => {
			var ch = data.client.channels.cache.get(channel);
			if (ch) {
				//pussy_gif
				neko.pussyWankGif().then(neko => {
					embed.setImage(neko.url);
					ch.send({
						embeds: [embed]
					}).catch(() => {});
				});
			}
		});
		data.client.config.channel.solo.forEach((channel) => {
			var ch = data.client.channels.cache.get(channel);
			if (ch) {
				//solo
				neko.girlSolo().then(neko => {
					embed.setImage(neko.url);
					ch.send({
						embeds: [embed]
					}).catch(() => {});
				});
			}
		});
		data.client.config.channel.solo_gif.forEach((channel) => {
			var ch = data.client.channels.cache.get(channel);
			if (ch) {
				//solo_gif
				neko.girlSoloGif().then(neko => {
					embed.setImage(neko.url);
					ch.send({
						embeds: [embed]
					}).catch(() => {});
				});
			}
		});
		data.client.config.channel.tits.forEach((channel) => {
			var ch = data.client.channels.cache.get(channel);
			if (ch) {
				//tits
				neko.tits().then(neko => {
					embed.setImage(neko.url);
					ch.send({
						embeds: [embed]
					}).catch(() => {});
				});
			}
		});
		data.client.config.channel.yuri.forEach((channel) => {
			var ch = data.client.channels.cache.get(channel);
			if (ch) {
				//yuri
				neko.eroYuri().then(neko => {
					embed.setImage(neko.url);
					ch.send({
						embeds: [embed]
					}).catch(() => {});
				});
			}
		});
		data.client.config.channel.cumart.forEach((channel) => {
			var ch = data.client.channels.cache.get(channel);
			if (ch) {
				//cumart
				neko.cumArts().then(neko => {
					embed.setImage(neko.url);
					ch.send({
						embeds: [embed]
					}).catch(() => {});
				});
			}
		});
	}, 1000 * 30);
};
