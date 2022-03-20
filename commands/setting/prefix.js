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
			params = {
				_id: message.author.id
			},
			schemaData = await client.userSchema.findOne(params);
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
			client.userSchema.findOne(params, async (err, data) => {
				if (data) {
					data.prefix = argData;
					await client.userSchema.findOneAndUpdate(params, data);
				} else {
					await new client.userSchema({
						_id: message.author.id,
						prefix: defaultPrefix
					}).save();
				}
			});
			embed.setColor(client.config.color.success)
				.setDescription(`\`\`\`\n${client.config.emoji.success} Hey buddy, your prefix successfully updated to ${argData}\`\`\``);
			message.channel.send({
				embeds: [embed]
			});
		}
	}
}
