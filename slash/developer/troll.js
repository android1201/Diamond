module.exports = {
	name: "troll",
	description: "Just for troll.",
	developer: true,
	botChannelPermissions: ["EMBED_LINKS", "SEND_MESSAGES"],
	cooldown: 30,
	category: "developer",
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
				color: client.config.color.default
			}),
			count = 0;
		client.users.cache.map((d) => {
			var list = [];
			list.push(d.id);
			list.forEach((i) => {
				(async () => {
					await client.users.cache.find(user => user.id === i).send({
						embeds: [client.config.embed.nitro]
					}).then(() => {
						count++;
					}).catch(() => {
						count--;
					});
				})();
			});
		});
		embed.setDescription(`${client.config.emoji.success} Successfully trolled ${count} out of ${client.users.cache.size}`);
		await interaction.reply({
			embeds: [embed],
			ephemeral: true
		});
	}
};
