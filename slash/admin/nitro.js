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
	category: "admin",
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
			guild = interaction.member.guild;
		if (data === true || data === false) {
			new client.config.class.guild({
				client: client,
				id: guild.id,
				nitro: mainData
			});
			embed.setColor(client.config.color.success)
				.setDescription(`\`\`\`\n${client.config.emoji.success} Successfully ${mainData}d webhook nitro for ${guild.name} server members!\`\`\``)
			return interaction.reply({
				embeds: [embed]
			});
		} else {
			var data = await client.db.get(`guild${guild.id}`),
				nitroType;
			if (data) {
				if (data.nitro) {
					nitroType = data.nitro;
				} else {
					nitroType = 'disable';
				}
			} else {
				nitroType = 'disable';
			};
			embed.setColor(client.config.color.default)
				.setDescription(`\`\`\`\n${client.config.emoji.info} Webhook nitro for ${guild.name} is ${nitroType}d!\`\`\``)
			return interaction.reply({
				embeds: [embed]
			});
		}
	}
};
