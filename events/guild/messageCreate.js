module.exports = async (client,
	message) => {
	/*
	 * Variables
	 */
	var {
		MessageEmbed
	} = require('discord.js'),
		channel = message.channel,
		embed = new MessageEmbed({
			timestamp: new Date(),
			author: {
				name: message.author.tag
			},
			footer: {
				text: message.author.id,
				icon_url: message.author.displayAvatarURL()
			}
		}),
		guild = message.guild,
		humanizeDuration = require("humanize-duration"),
		member = message.member,
		ms = require('ms'),
		permissionFlags = Object.keys(client.discord.Permissions.FLAGS),
		server = message.guild,
		cooldown = new Set(),
		user = message.author;
	/*
	 * MessageCreate
	 */
	if (message.author.bot) return;
	/*
	 * Dm
	 */
	if (message.channel.type === "dm") {
		return;
	}
	/*
	 * schemaData
	 */
	var prefix;
	var guildData = await client.db.get(`guild${message.guild.id}`),
		userData = await client.db.get(`user${message.author.id}`);
	/*
	 * guildSchema
	 */
	if (guildData) {} else {};
	/*
	 * userSchema
	 */
	if (userData) {
		if (userData.prefix) {
			prefix = userData.prefix;
		}
	} else {
		prefix = client.config.bot.prefix;
	}
	/*
	 * MentionMessage
	 */
	if (message.content === `<@!${client.user.id}>` || message.content === `<@${client.user.id}>`) {
		embed.setColor(client.config.color.default)
			.setDescription(`\`\`\`\n${client.config.emoji.data} Hey, buddy your forget your prefix again don't worry, your prefix is ${prefix}\`\`\``);
		return message.channel.send({
			embeds: [embed]
		});
	}
	/*
	 * MentionablePrefix
	 */
	var escapeRegex = (str) => str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'),
		prefixRegex = new RegExp(`^(<@!?${client.user.id}>|${escapeRegex(prefix)})\\s*`);
	if (!prefixRegex.test(message.content)) {
		/*
		if (!message.content.toLowerCase().startsWith(prefix)) {
		*/
		/*
		 * Nitro function
		 */
		if (guildData) {
			if (guildData.nitro === "enable") {
				return client.config.function.nitro({
					client: client,
					embed: embed,
					message: message
				});
			} else {
				return;
			}
		} else {
			if (!guildData) {
				new client.config.class.guild({
					client: client,
					id: message.guild.id
				});
			}
			if (!userData) {
				new client.config.class.user({
					client: client,
					id: message.author.id
				});
			};
			return;
		}
	}
	var [, matchedPrefix] = message.content.match(prefixRegex);
	if (!message.member) message.member = await message.guild.members.fetch(message.author.id);
	if (!message.guild) return;
	/*
	 * Args && cmds
	 */
	var args = message.content.slice(matchedPrefix.length).trim().split(/ +/g),
		cmd = args.shift().toLowerCase();
	if (cmd.length === 0) return;
	var command = client.commands.get(cmd) || client.commands.find((x) => x.aliases && x.aliases.includes(cmd));
	/*
	 * Nitro
	 */
	async function nitro() {
		let msg = message.content,
			emojis = msg.match(/(?<=:)([^:\s]+)(?=:)/g);
		if (!emojis) return
		const hasEmoteRegex = /<a?:.+:\d+>/gm,
			emoteRegex = /<:.+:(\d+)>/gm,
			emoj = message.content.match(hasEmoteRegex);

		emojis.forEach((m) => {
			let emoji =
				message.guild.emojis.cache.find((x) => x.name === m) ||
				client.emojis.cache.find((x) => x.name === m);
			if (!emoji) return;
			if ((emo = emoteRegex.exec(emoj))) {
				if (emoji !== undefined && emoji.id !== emo[1]) return
			}

			let temp = emoji.toString();
			if (new RegExp(temp, 'g').test(msg))
				msg = msg.replace(new RegExp(temp, 'g'), emoji.toString())
			else msg = msg.replace(new RegExp(':' + m + ':', 'g'), emoji.toString())
		})
		if (msg === message.content) return;
		/*
		 * Permissions
		 */
		var everyonerole = message.guild.roles.cache.find(r => r.name === '@everyone'),
			everyPermFlag = 'USE_EXTERNAL_EMOJIS',
			everyPermExtract = everyPermFlag[0].toUpperCase() + everyPermFlag.toLowerCase().slice(1).replace(/_/g, ' ');
		if (!message.member.permissions.has('ADMINISTRATOR')) {
			if (!message.channel.permissionsFor(message.author).has(everyPermFlag)) {
				if (!everyonerole.permissionsIn(message.channel).has(everyPermFlag)) {
					/*
						embed.setColor(client.config.color.warn)
							.setDescription(`\`\`\`\n${client.config.emoji.warn} Missing channel permissions for everyone, ${everyPermExtract}\`\`\``);
					*/
					return;
					/* 
							return channel.send({
								embeds: [embed]
							}).then((m) => {
								setTimeout(() => {
									m.delete().catch(() => {});
								}, 5000);
							});
					*/
				}
			}
		}
		if (!message.guild.me.permissions.has('ADMINISTRATOR')) {
			var myperms = [
					'MANAGE_WEBHOOKS',
					'SEND_MESSAGES',
					'MANAGE_MESSAGES',
					'USE_EXTERNAL_EMOJIS'
				],
				perms = [];
			if (myperms.length) {
				for (const perm of myperms) {
					if (!myperms.includes(perm)) {
						return;
					}
					if (!message.guild.me.permissions.has('ADMINISTRATOR')) {
						if (!message.guild.me.permissionsIn(message.channel).has(perm)) {
							perms.push(perm);
						}
					}
				}
				if (perms.length) {
					var d = invalidPermissions.map(value => `${value[0].toUpperCase() + value.toLowerCase().slice(1).replace(/_/g, ' ')}`).join(`, `);
					embed.setColor(client.config.color.warn)
						.setDescription(`\`\`\`\n${client.config.emoji.warn} Missing channel permissions for ${client.user.tag}, ${d}\`\`\``);
					return channel.send({
						embeds: [embed]
					}).then((m) => {
						setTimeout(() => {
							m.delete().catch(() => {});
						}, 5000);
					});
				}
			}
		}
		message.delete().catch(err => {});
		client.functions.webhookMessage({
			bot: client,
			message: message,
			option: {
				content: msg
			}
		});
	}
	/*
	 * CommandRun
	 */
	if (command) {
		/*
		 * bot Channel Permissions
		 */
		try {
			embed.setColor(client.config.color.warn);
			/*
			 * User Channel Permissions
			 */
			if (command.userChannelPermissions) {
				if (command.userChannelPermissions.length) {
					if (!member.permissions.has('ADMINISTRATOR')) {
						var invalidPermissions = [];
						for (const perm of command.userChannelPermissions) {
							if (!permissionFlags.includes(perm)) {
								return console.log(`Invalid Permission: ${perm}`);
							}
							if (!member.permissions.has('ADMINISTRATOR')) {
								if (!channel.permissionsFor(member).has(perm)) {
									invalidPermissions.push(perm);
								}
							}
						}
						if (invalidPermissions.length) {
							var d = invalidPermissions.map(value => `${value[0].toUpperCase() + value.toLowerCase().slice(1).replace(/_/g, ' ')}`).join(`, `);
							embed.setDescription(`\`\`\`\n${client.config.emoji.warn} Missing channel permissions for ${user.tag}, ${d}\`\`\``);
							return channel.send({
								embeds: [embed]
							}).then((m) => {
								setTimeout(() => {
									m.delete().catch(() => {});
								}, 5000);
							});
						}
					}
				}
			}
			/*
			 * User Role Permissions
			 */
			if (command.userRolePermissions) {
				if (command.userRolePermissions.length) {
					if (!member.permissions.has('ADMINISTRATOR')) {
						var invalidPermissions = [];
						for (const perm of command.userRolePermissions) {
							if (!permissionFlags.includes(perm)) {
								return console.log(`Invalid Permission: ${perm}`);
							}
							if (!member.permissions.has('ADMINISTRATOR')) {
								if (!member.permissions.has(perm)) {
									invalidPermissions.push(perm);
								}
							}
						}
						if (invalidPermissions.length) {
							var d = invalidPermissions.map(value => `${value[0].toUpperCase() + value.toLowerCase().slice(1).replace(/_/g, ' ')}`).join(`, `);
							embed.setDescription(`\`\`\`\n${client.config.emoji.warn} Missing role permissions for ${user.tag}, ${d}\`\`\``);
							return channel.send({
								embeds: [embed]
							}).then((m) => {
								setTimeout(() => {
									m.delete().catch(() => {});
								}, 5000);
							});
						}
					}
				}
			}
			/*
			 * bot Channel Permissions
			 */
			if (command.botChannelPermissions) {
				if (command.botChannelPermissions.length) {
					if (!guild.me.permissions.has('ADMINISTRATOR')) {
						var invalidPermissions = [];
						for (const perm of command.botChannelPermissions) {
							if (!permissionFlags.includes(perm)) {
								return console.log(`Invalid Permission: ${perm}`);
							}
							if (!guild.me.permissions.has('ADMINISTRATOR')) {
								if (!guild.me.permissionsIn(channel).has(perm)) {
									invalidPermissions.push(perm);
								}
							}
						}
						if (invalidPermissions.length) {
							var d = invalidPermissions.map(value => `${value[0].toUpperCase() + value.toLowerCase().slice(1).replace(/_/g, ' ')}`).join(`, `);
							embed.setDescription(`\`\`\`\n${client.config.emoji.warn} Missing channel permissions for ${client.user.tag}, ${d}\`\`\``);
							return channel.send({
								embeds: [embed]
							}).then((m) => {
								setTimeout(() => {
									m.delete().catch(() => {});
								}, 5000);
							});
						}
					}
				}
			}
			/*
			 * Bot Role Permissions
			 */
			if (command.botRolePermissions) {
				if (command.botRolePermissions.length) {
					if (!guild.me.permissions.has('ADMINISTRATOR')) {
						var invalidPermissions = [];
						for (const perm of command.botRolePermissions) {
							if (!permissionFlags.includes(perm)) {
								return console.log(`Invalid Permission: ${perm}`);
							}
							if (!guild.me.permissions.has('ADMINISTRATOR')) {
								if (!guild.me.permissions.has(perm)) {
									invalidPermissions.push(perm);
								}
							}
						}
						if (invalidPermissions.length) {
							var d = invalidPermissions.map(value => `${value[0].toUpperCase() + value.toLowerCase().slice(1).replace(/_/g, ' ')}`).join(`, `);
							embed.setDescription(`\`\`\`\n${client.config.emoji.warn} Missing role permissions for ${client.user.tag}, ${d}\`\`\``);
							return channel.send({
								embeds: [embed]
							}).then((m) => {
								setTimeout(() => {
									m.delete().catch(() => {});
								}, 5000);
							});
						}
					}
				}
			}
			/*
			 * developer
			 */
			if (command.developer) {
				if (!client.config.bot.owners.includes(message.author.id)) {
					embed.setDescription(`\`\`\`\n${client.config.emoji.warn} You can't use developer commands, only developers can use this commands!\`\`\``);
					return channel.send({
						embeds: [embed]
					}).then((m) => {
						setTimeout(() => {
							m.delete().catch(() => {});
						}, 5000);
					});
				}
			}
			/*
			 * Guild Owner
			 */
			if (command.guildOwner) {
				if (message.author.id !== message.guild.ownerId) {
					embed.setDescription(`\`\`\`\n${client.config.emoji.warn} You can't use guild owner commands, only guild owner can use this commands!\`\`\``);
					return channel.send({
						embeds: [embed]
					}).then((m) => {
						setTimeout(() => {
							m.delete().catch(() => {});
						}, 5000);
					});
				}
			}
			/*
			 * vc
			 */
			if (command.vc) {
				const {
					channel
				} = message.member.voice;
				if (!channel) {
					embed.setDescription(`\`\`\`\n${client.config.emoji.warn} You have to be connected to a voice channel before you can use this command!\`\`\``);
					return channel.send({
						embeds: [embed]
					}).then((m) => {
						setTimeout(() => {
							m.delete().catch(() => {});
						}, 5000);
					});
				}
			}
			/*
			 * Command Cooldown
			 */
			if (command.cooldown) {
				var lastUse = await client.db.fetch(`${message.author.id}${command.name}`);
				if (lastUse) {
					var {
						created
					} = await client.db.get(`${message.author.id}${command.name}`);
					if (created) {
						var rd = humanizeDuration(command.cooldown * 1000 - (Date.now() - created), {
							round: true
						});
						embed.setDescription(`\`\`\`\n${client.config.emoji.timer} You need to wait ${rd} to use command again!\`\`\``);
						return channel.send({
							embeds: [embed]
						}).then((m) => {
							setTimeout(() => {
								m.delete().catch(() => {});
							}, 5000);
						});
					}
				} else {
					await client.db.set(`${message.author.id}${command.name}`, {
						name: command.name,
						created: Date.now()
					}, command.cooldown);
					command.run(client, message, args);
				}
			} else {
				command.run(client, message, args)
			}
		} catch (error) {
			console.log(error)
			embed.setColor(client.config.color.error)
				.setDescription(`\`\`\`\n${client.config.emoji.error} There was an error while executing this command!\`\`\``);
			return channel.send({
				embeds: [embed]
			}).then((m) => {
				setTimeout(() => {
					m.delete().catch(() => {});
				}, 5000);
			});
		}
	}
};
