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
console.log(client.porn.porn2.sfw);
		client.porn.porn2.sfw.waifu().then((i) => {
			embed.setImage(i.url)
				.setColor(client.config.color.default);
			return interaction.reply({
				embeds: [embed]
			});
		}).catch((e) => {
			console.log(e);
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
