module.exports = {
	name: "big_ass",
	description: "Get random big_ass image.",
	botChannelPermissions: ["EMBED_LINKS", "MANAGE_MESSAGES", "SEND_MESSAGES", "READ_MESSAGE_HISTORY"],
	cooldown: 5,
	category: "nsfw",
	nsfw: true,
	run: async (interaction, client) => {
		client.porn.porn2.nsfw.big_ass().then((i) => {
			var embed = new client.discord.MessageEmbed({
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
				embeds: [embed]
			});
		}).catch((e) => {
			var embed = new client.discord.MessageEmbed({
					author: {
					name: interaction.member.user.tag
				},
				timestamp: new Date(),
				footer: {
					text: interaction.member.user.id,
					icon_url: interaction.member.user.displayAvatarURL()
				},
				color: client.config.color.error,
				description: `\`\`\`\n${client.config.emoji.error} Error while executing command!\`\`\``
			});
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