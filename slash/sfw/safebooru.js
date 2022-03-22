module.exports = {
	name: "safebooru",
	description: "Get random safebooru image.",
	botChannelPermissions: ["EMBED_LINKS", "MANAGE_MESSAGES", "SEND_MESSAGES", "READ_MESSAGE_HISTORY"],
	cooldown: 5,
	category: "sfw",
	sfw: true,
	run: async (interaction, client) => {
		var embed = new client.discord.MessageEmbed({
			author: {
				name: interaction.member.user.tag
			},
			timestamp: new Date(),
			footer: {
				text: interaction.member.user.id,
				icon_url: interaction.member.user.displayAvatarURL()
			}
		});
		client.porn.porn2.sfw.safebooru().then((i) => {
			var embed2 = new client.discord.MessageEmbed({
				author: {
					name: interaction.member.user.tag,
					url: i.url
				},
				timestamp: new Date(),
				footer: {
					text: interaction.member.user.id,
					icon_url: interaction.member.user.displayAvatarURL()
				},
				image: {
					url: i.url
				},
				color: client.config.color.default
			});
			return interaction.reply({
				embeds: [embed2]
			});
		}).catch((e) => {
			embed.setColor(client.config.color.error)
				.setDescription(`\`\`\`\n${client.config.emoji.error} Error while executing command!\`\`\``);
			return interaction.reply({
				embeds: [embed]
			}).then(() => {
				setTimeout(() => {
					interaction.deleteReply().catch(() => {});
				}, 5000);
			});
		});
	}
};
