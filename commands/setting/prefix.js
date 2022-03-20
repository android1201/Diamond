module.exports = {
	name: "prefix",
	description: "update own prefix.",
	botChannelPermissions: ["EMBED_LINKS", "SEND_MESSAGES"],
	cooldown: 5,
	run: async (client, message, args) => {
		var argData = args[0],
			embed = new client.discord.MessageEmbed({
				author: {
					name: message.author.tag
				},
				timestamp: new Date(),
				footer: {
					text: message.author.id,
					icon_url: message.author.displayAvatarURL()
				}
			}),
			defaultPrefix = client.config.bot.prefix,
			prefix,
			schemaData = await client.db.get(`user${message.author.id}`);
		if (!argData) {
			if (schemaData) {
				if (schemaData.prefix) {
					prefix = schemaData.prefix;
				} else {
					prefix = defaultPrefix;
				}
			} else {
				prefix = defaultPrefix;
			}
			embed.setColor(client.config.color.default)
				.setDescription(`\`\`\`\n${client.config.emoji.data} Hey buddy, your prefix is ${prefix}\`\`\``);
			return message.channel.send({
				embeds: [embed]
			});
		}
		if (argData.length > 3) {
			embed.setColor(client.config.color.error)
				.setDescription(`\`\`\`\n${client.config.emoji.error} New prefix length must be 3\`\`\``);
			return message.channel.send({
				embeds: [embed]
			});
		}
		if (argData) {
			new client.config.class.user({
				client: client,
				id: message.author.id,
				prefix: argData
			});
			embed.setColor(client.config.color.success)
				.setDescription(`\`\`\`\n${client.config.emoji.success} Hey buddy, your prefix successfully updated to ${argData}\`\`\``);
			message.channel.send({
				embeds: [embed]
			});
		}
	}
};
