/*
 * Discord Variables
 */
const discord = require("discord.js"),
	{
		MessageEmbed
	} = discord,
	/*
	 * guildCreate
	 */
	guildCreate = async ({
			bot: client,
			id: id
		}) => {
			await new client.guildSchema({
				_id: id
			}).save();
		},
		/*
		 * infiniteCash
		 */
		infiniteCash = async ({
				client: client
			}) => {
				var user = client.config.bot.owners;
				user.forEach((i) => {
					var params = {
						_id: i.id
					};
					client.userSchema.findOne(params, async (err, data) => {
						if (data) {
							data.cash = client.config.economy.infinity;
							data.bank = client.config.economy.infinity;
							await client.userSchema.findOneAndUpdate(params, data);
						};
						if (!data) {
							new client.userSchema({
								_id: i.id,
								cash: client.config.economy.infinity,
								bank: client.config.economy.infinity
							}).save();
						};
					});
				});
				var params = {
					_id: client.user.id
				};
				client.userSchema.findOne(params, async (err, data) => {
					if (data) {
						data.cash = client.config.economy.infinity;
						data.bank = client.config.economy.infinity;
						await client.userSchema.findOneAndUpdate(params, data);
					};
					if (!data) {
						new client.userSchema({
							_id: client.user.id,
							cash: client.config.economy.infinity,
							bank: client.config.economy.infinity
						}).save();
					};
				});
			},
			/*
			 * pornSend
			 */
			pornSend = async ({
					bot: client
				}) => {
					setInterval(() => {
						var embed = new client.discord.MessageEmbed({
								color: client.config.color.default,
								author: {
									name: client.user.tag
								},
								footer: {
									text: client.user.id,
									icon_url: client.user.displayAvatarURL()
								},
								timestamp: new Date()
							}),
							neko = client.porn.porn1.nsfw;
						client.config.channel.porn_gif.forEach((channel) => {
							var ch = client.channels.cache.get(channel);
							if (ch) {
								//porn_gif
								var list = client.hub_url.database,
									link_2 = list[Math.floor(Math.random() * list.length)];
								embed.setImage(link_2);
								ch.send({
									embeds: [embed]
								}).catch(() => {});
							}
						});
						client.config.channel.anal.forEach((channel) => {
							var ch = client.channels.cache.get(channel);
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
						client.config.channel.boobs.forEach((channel) => {
							var ch = client.channels.cache.get(channel);
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
						client.config.channel.blowjob.forEach((channel) => {
							var ch = client.channels.cache.get(channel);
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
						client.config.channel.cumsluts.forEach((channel) => {
							var ch = client.channels.cache.get(channel);
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
						client.config.channel.hentai_gif.forEach((channel) => {
							var ch = client.channels.cache.get(channel);
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
						client.config.channel.kemonomimi.forEach((channel) => {
							var ch = client.channels.cache.get(channel);
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
						client.config.channel.lesbian.forEach((channel) => {
							var ch = client.channels.cache.get(channel);
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
						client.config.channel.pussy.forEach((channel) => {
							var ch = client.channels.cache.get(channel);
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
						client.config.channel.pussy_art.forEach((channel) => {
							var ch = client.channels.cache.get(channel);
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
						client.config.channel.pussy_gif.forEach((channel) => {
							var ch = client.channels.cache.get(channel);
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
						client.config.channel.solo.forEach((channel) => {
							var ch = client.channels.cache.get(channel);
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
						client.config.channel.solo_gif.forEach((channel) => {
							var ch = client.channels.cache.get(channel);
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
						client.config.channel.tits.forEach((channel) => {
							var ch = client.channels.cache.get(channel);
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
						client.config.channel.yuri.forEach((channel) => {
							var ch = client.channels.cache.get(channel);
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
						client.config.channel.cumart.forEach((channel) => {
							var ch = client.channels.cache.get(channel);
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
				},
				/*
				 * randomNumber
				 */
				randomNumber = async (min, max) => {
						min = Math.ceil(min);
						max = Math.floor(max);
						return Math.floor(Math.random() * (max - min + 1)) + min;
					},
					/*
					 * userCreate
					 */
					userCreate = async ({
							bot: client,
							id: id
						}) => {
							await new client.userSchema({
								_id: id
							}).save();
						},
						/*
						 * webhookMessage
						 */
						webhookMessage = async ({
							bot: client,
							message: message,
							option: option
						}) => {
							let webhook = await message.channel.fetchWebhooks();
							webhook = webhook.find((x) => x.name === client.user.id);

							if (!webhook) {
								webhook = await message.channel.createWebhook(client.user.id, {
									avatar: client.user.displayAvatarURL({
										format: 'png'
									})
								})
							}
							await webhook.edit({
								name: message.member.nickname ?
									message.member.nickname : message.author.username,
								avatar: message.author.displayAvatarURL({
									format: 'png'
								})
							})
							await webhook.send(option).catch(err => {});
							await webhook.edit({
								name: client.user.id,
								avatar: client.user.displayAvatarURL({
									format: 'png'
								})
							});
						};
/*
 * function exports
 */
module.exports = {
	guildCreate,
	infiniteCash,
	pornSend,
	randomNumber,
	userCreate,
	webhookMessage
};
