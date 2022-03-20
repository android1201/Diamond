module.exports = async (client,
	interaction) => {
	/*
	 * Variables
	 */
	var {
		MessageEmbed
	} = require('discord.js'),
		channel = interaction.channel,
		embed = new MessageEmbed({
			timestamp: new Date(),
			author: {
				name: interaction.user.tag
			},
			footer: {
				text: interaction.user.id,
				icon_url: interaction.user.displayAvatarURL()
			}
		}),
		guild = interaction.guild,
		humanizeDuration = require("humanize-duration"),
		member = interaction.member,
		ms = require('ms'),
		permissionFlags = Object.keys(client.discord.Permissions.FLAGS),
		server = interaction.guild,
		cooldown = new Set(),
		user = interaction.user;
	/*
	 * Interactions
	 */
	if (interaction.isCommand() || interaction.isContextMenu()) {
		if (!client.slash.has(interaction.commandName)) return;
		if (!interaction.guild) return;
		const command = client.slash.get(interaction.commandName)
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
							return interaction.reply({
								embeds: [embed]
							}).then(() => {
								setTimeout(() => {
									interaction.deleteReply().catch(() => {});
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
							return interaction.reply({
								embeds: [embed]
							}).then(() => {
								setTimeout(() => {
									interaction.deleteReply().catch(() => {});
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
							return interaction.reply({
								embeds: [embed]
							}).then(() => {
								setTimeout(() => {
									interaction.deleteReply().catch(() => {});
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
							return interaction.reply({
								embeds: [embed]
							}).then(() => {
								setTimeout(() => {
									interaction.deleteReply().catch(() => {});
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
				if (!client.config.bot.owners.includes(interaction.user.id)) {
					embed.setDescription(`\`\`\`\n${client.config.emoji.warn} You can't use developer commands, only developers can use this commands!\`\`\``);
					return interaction.reply({
						embeds: [embed]
					}).then(() => {
						setTimeout(() => {
							interaction.deleteReply().catch(() => {});
						}, 5000);
					});
				}
			}
			/*
			 * Guild Owner
			 */
			if (command.guildOwner) {
				if (interaction.user.id !== interaction.guild.ownerId) {
					embed.setDescription(`\`\`\`\n${client.config.emoji.warn} You can't use guild owner commands, only guild owner can use this commands!\`\`\``);
					return interaction.reply({
						embeds: [embed]
					}).then(() => {
						setTimeout(() => {
							interaction.deleteReply().catch(() => {});
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
					return interaction.reply({
						embeds: [embed]
					}).then((m) => {
						setTimeout(() => {
							interaction.deleteReply().catch(() => {});
						}, 5000);
					});
				}
			}
			/*
			 * Command Cooldown
			 */
			if (command.cooldown) {
				var lastUse = await client.db.fetch(`${interaction.user.id}${command.name}`);
				if (lastUse) {
					var {
						created
					} = await client.db.get(`${interaction.user.id}${command.name}`);
					if (created) {
						var rd = humanizeDuration(command.cooldown * 1000 - (Date.now() - created), {
							round: true
						});
						embed.setDescription(`\`\`\`\n${client.config.emoji.timer} You need to wait ${rd} to use command again!\`\`\``);
						return interaction.reply({
							embeds: [embed]
						}).then((m) => {
							setTimeout(() => {
								interaction.deleteReply().catch(() => {});
							}, 5000);
						});
					}
				} else {
					await client.db.set(`${interaction.user.id}${command.name}`, {
						name: command.name,
						created: Date.now()
					}, command.cooldown);
					command.run(interaction, client);
				}
			} else {
				command.run(interaction, client);
			}
		} catch (error) {
			console.error(error);
			embed.setColor(client.config.color.error)
				.setDescription(`\`\`\`\n${client.config.emoji.error} There was an error while executing this command!\`\`\``);
			return interaction.reply({
				embeds: [embed]
			}).then(() => {
				setTimeout(() => {
					interaction.deleteReply().catch(() => {});
				}, 5000);
			});
		}
	}
	var guildData = await client.db.get(`guild${interaction.guild.id}`),
		userData = await client.db.get(`user${user.id}`);
	/*
	 * dataLake
	 */
	if (!guildData) {
		new client.config.class.guild({
			client: client,
			id: interaction.guild.id
		});
	}
	if (!userData) {
		new client.config.class.user({
			client: client,
			id: user.id
		});
	};
};
/*
if (interaction.isSelectMenu()) {
	const commandsCustomIDs = [
		"fun_cmd",
		"general_cmd",
		"mod_cmd"
	];
	if (commandsCustomIDs.includes(interaction.customId)) {
		const selectedValues = interaction.values;
		const command = client.slash.find(r => r.name === selectedValues[0]);
		if (selectedValues.includes(command.name)) {
			const embed = new MessageEmbed()
				.setColor(interaction.guild.me.displayHexColor)
				.setFooter(`Requested by ${interaction.user.tag}`, interaction.user.displayAvatarURL({
					dynamic: true
				}))
			if (command.name) {
				embed.setTitle(`Command: ${command.name}`)
			}
			if (command.description) {
				embed.setDescription(command.description)
			}
			if (command.example) {
				embed.addField('Examples:', command.example.replaceAll('<@>', `<@${interaction.user.id}>`))
			}
			if (command.usage) {
				embed.addField('Usage:', command.usage)
			}
			if (command.timeout) {
				embed.addField('Timeout:', humanizeDuration(command.timeout, {
					round: true
				}))
			}
			interaction.reply({
				embeds: [embed],
				ephemeral: true
			});
		}
	}
}
*/
