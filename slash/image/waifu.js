module.exports = {
	name: "waifu",
	description: "Get random waifu image.",
	botChannelPermissions: ["EMBED_LINKS", "MANAGE_MESSAGES", "SEND_MESSAGES", "READ_MESSAGE_HISTORY"],
	cooldown: 5,
	category: "image",
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
		client.porn.porn2.sfw.waifu().then((i) => {
			embed.setImage(i.image)
				.setColor(client.config.color.default)
		}).catch(() => {

		});
	}
};
