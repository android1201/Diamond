module.exports = {
	name: "logchannel",
	description: "Setup server log channel.",
	userRolePermissions: ["MANAGE_GUILD"],
	botChannelPermissions: ["EMBED_LINKS", "SEND_MESSAGES"],
	options: [{
		name: "channel",
		description: "log channel set",
		type: 7,
		channel_types: [0]
	}],
	cooldown: 7,
	category: "settings",
	run: async (interaction, client) => {
		var channel = interaction.options.getChannel('channel'),
			embed = new client.discord.MessageEmbed({
				author: {
					name: interaction.member.user.tag
				},
				timestamp: new Date(),
				footer: {
					text: interaction.member.user.id,
					icon_url: interaction.member.user.displayAvatarURL()
				}
			}),
			guild = interaction.member.guild;
		if (channel) {
			var channelID = channel.id,
				params = {
					_id: guild.id
				};
			client.guildSchema.findOne(params, async (err, data) => {
				if (data) {
					data.logchannel = channelID;
					await client.guildSchema.findOneAndUpdate(params, data);
				} else {
					new client.guildSchema({
						_id: guild.id,
						logchannel: channelID
					}).save();
				}
			});
			embed.setColor(client.config.color.success)
				.setDescription(`\`\`\`\n${client.config.emoji.success} Log channel successfully updated to ${channel.name}\`\`\``);
			return interaction.reply({
				embeds: [embed]
			});
		} else {
			var params = {
				_id: guild.id
			};
			client.guildSchema.findOne(params, async (err, data) => {
				if (data) {
					if (data.logchannel.length) {
						var logChann = client.channels.cache.get(data.logchannel);
						if (logChann) {
							embed.setColor(client.config.color.default)
								.setDescription(`\`\`\`\n${client.config.emoji.data} ${guild.name} current log channel is ${logChann.name}\`\`\``);
							return interaction.reply({
								embeds: [embed]
							});
						} else {
							embed.setColor(client.config.color.error)
								.setDescription(`\`\`\`\n${client.config.emoji.bin} ️${guild.name} log channel deleted yet!\`\`\``);
							return interaction.reply({
								embeds: [embed]
							});
						}
					}
					if (!data.logchannel.length) {
						embed.setColor(client.config.color.error)
							.setDescription(`\`\`\`\n${client.config.emoji.error} Log channel not seted yet!\`\`\``);
						return interaction.reply({
							embeds: [embed]
						});
					}
				} else {
					embed.setColor(client.config.color.error)
						.setDescription(`\`\`\`\n${client.config.emoji.error} Log channel not seted yet!\`\`\``);
					return interaction.reply({
						embeds: [embed]
					});
				}
			});
		}
	}
}
