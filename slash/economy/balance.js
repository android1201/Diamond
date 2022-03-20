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
			user = interaction.options.getMember('user') ? interaction.options.getMember('user') : interaction.member.user,
			params = {
				_id: user.id
			};
		client.userSchema.findOne(params, async (err, data) => {
			if (!data) {
				new client.userSchema({
					_id: user.id,
					cash: client.config.economy.cash,
					bank: client.config.economy.bank
				}).save();
			}
		});
		client.userSchema.findOne(params, async (err, data) => {
			if (data) {
				var total = data.cash + data.bank;
				embed.setDescription(`\`\`\`\n${client.config.emoji.economy} Cash: ${data.cash}\n${client.config.emoji.economy} Bank: ${data.bank}\n${client.config.emoji.economy} Total: ${total}\`\`\``);
				return interaction.reply({
					embeds: [embed]
				});
			}
		});
	}
};
