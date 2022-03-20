module.exports = {
	name: "nitro",
	description: "Enable or disable webhook nitro.",
	userRolePermissions: ["MANAGE_GUILD"],
	botChannelPermissions: ["EMBED_LINKS", "SEND_MESSAGES"],
	options: [{
		name: "enable",
		description: "activate webhook nitro",
		type: 5,
	}],
	cooldown: 7,
	category: "settings",
	run: async (interaction, client) => {
		var data = interaction.options.getBoolean('enable'),
			dataType = (r) => r ? 'enable' : 'disable',
			mainData = dataType(data),
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
			guild = interaction.member.guild,
			params = {
				_id: guild.id
			};
		if (data === true || data === false) {
			client.guildSchema.findOne(params, async (err, data) => {
				if (data) {
					data.nitro = mainData;
					await client.guildSchema.findOneAndUpdate(params, data);
				} else {
					await new client.guildSchema({
						_id: guild.id,
						nitro: mainData
					}).save();
				}
			});
			embed.setColor(client.config.color.success)
			.setDescription(`\`\`\`\n${client.config.emoji.success} Successfully ${mainData}d webhook nitro for ${guild.name} server members!\`\`\``)
			return interaction.reply({
				embeds: [embed]
			});
		} else {
			client.guildSchema.findOne(params, async (err, data) => {
				if (data) {
					embed.setColor(client.config.color.default)
					.setDescription(`\`\`\`\n${client.config.emoji.info} Webhook nitro for ${guild.name} is ${data.nitro}!\`\`\``)
					return interaction.reply({
						embeds: [embed]
					});
				} else {
					embed.setColor(client.config.color.default)
					.setDescription(`\`\`\`\n${client.config.emoji.info} Webhook nitro for ${guild.name} is disable!\`\`\``)
					return interaction.reply({
						embeds: [embed]
					});
				}
			});
		}
	}
}
