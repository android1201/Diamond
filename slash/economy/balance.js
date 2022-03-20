module.exports = {
	name: "balance",
	description: "Check user or your main balance.",
	botChannelPermissions: ["EMBED_LINKS", "SEND_MESSAGES"],
	options: [{
		name: "user",
		description: "to check balance",
		type: 6
	}],
	cooldown: 7,
	category: "economy",
	run: async (interaction, client) => {
		var embed = new client.discord.MessageEmbed({
				author: {
					name: interaction.member.user.tag
				},
				timestamp: new Date(),
				footer: {
					text: interaction.member.user.id,
					icon_url: interaction.member.user.displayAvatarURL()
				},
				color: client.config.color.economy
			}),
			user = interaction.options.getMember('user') ? interaction.options.getMember('user').user : interaction.member.user,
			data = await client.db.get(`user${user.id}`);
		if (data) {
			var cash = data.cash === client.config.economy.infinity ? '∞' : data.cash,
				bank = data.bank === client.config.economy.infinity ? '∞' : data.bank,
				total = data.cash === client.config.economy.infinity || data.bank === client.config.economy.infinity ? '∞' : data.cash + data.bank,
				embed.setDescription(`\`\`\`\n${user.username}'s balance!\n\n${client.config.emoji.economy} Cash: ${cash}\n${client.config.emoji.economy} Bank: ${bank}\n${client.config.emoji.economy} Total: ${total}\`\`\``);
			return interaction.reply({
				embeds: [embed]
			});
		} else {
			var cash = client.config.economy.cash,
				bank = client.config.economy.bank,
				total = client.config.economy.cash + client.config.economy.bank;
			embed.setDescription(`\`\`\`\n${user.username}'s balance!\n\n${client.config.emoji.economy} Cash: ${cash}\n${client.config.emoji.economy} Bank: ${bank}\n${client.config.emoji.economy} Total: ${total}\`\`\``);
			return interaction.reply({
				embeds: [embed]
			});
		};
	}
};
