module.exports = {
	name: "purge",
	description: "purge upto 100.",
	userRolePermissions: ["MANAGE_MESSAGES"],
	botChannelPermissions: ["EMBED_LINKS", "MANAGE_MESSAGES", "SEND_MESSAGES", "READ_MESSAGE_HISTORY"],
	cooldown: 5,
	options: [{
			name: "limit",
			description: "The amount of messages that going to be deleted.",
			type: 10
		},
		{
			name: "user",
			description: "The user of message that going to be deleted.",
			type: 6
		}
	],
	category: "moderator",
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
		const limit = interaction.options.getNumber("limit"),
			user = interaction.options.getMember('user');
		var amount = 1;
		if (!limit) {
			amount = 100;
		} else if (limit < 1) {
			amount = 1;
		} else if (limit > 100) {
			amount = 100;
		} else {
			amount = limit;
		}
		if (!user) {
			var messages = interaction.channel.messages.fetch({
					limit: amount
				}),
				filtered = (await messages).filter((m) => !m.pinned),
				data = await interaction.channel.bulkDelete(filtered, true),
				total,
				users = [];
			if (data.size <= 0 && data.size === undefined || data.size <= 0 || data.size === undefined || data.size === null) {
				embed.setColor(client.config.color.error)
					.setDescription(`\`\`\`\n${client.config.emoji.error} Error while deleting messages!\`\`\``);
				interaction.reply({
					embeds: [embed]
				}).then(() => {
					setTimeout(() => {
						interaction.deleteReply().catch(() => {});
					}, 4000);
				});
			} else {
				data.forEach((value) => {
					if (!users.includes(`${value.author.username}#${value.author.discriminator}`)) {
						users.push(`${value.author.username}#${value.author.discriminator}`);
					}
				});
				users.sort();
				var user_data = users.join(", ");
				if (data > 1) {
					total = "messages";
				} else {
					total = "message";
				}
				embed.setColor(client.config.color.success)
					.setDescription(`\`\`\`\n${client.config.emoji.success} Successfully purged ${data.size} ${total}\nUsers(${users.length}): ${user_data}\`\`\``);
				interaction.reply({
					embeds: [embed]
				}).then(() => {
					setTimeout(() => {
						interaction.deleteReply().catch(() => {});
					}, 3300);
				});
			}
		}
		if (user) {
			var messages = interaction.channel.messages.fetch({
					limit: amount
				}),
				filtered = (await messages).filter((m) => m.author.id === user.id && !m.pinned),
				data = await interaction.channel.bulkDelete(filtered, true),
				total,
				users = [];
			if (data.size <= 0 && data.size === undefined || data.size <= 0 || data.size === undefined || data.size === null) {
				embed.setColor(client.config.color.error)
					.setDescription(`\`\`\`\n${client.config.emoji.error} Error while deleting messages!\`\`\``);
				interaction.reply({
					embeds: [embed]
				}).then(() => {
					setTimeout(() => {
						interaction.deleteReply().catch(() => {});
					}, 4000);
				});
			} else {
				data.forEach((value) => {
					if (!users.includes(`${value.author.username}#${value.author.discriminator}`)) {
						users.push(`${value.author.username}#${value.author.discriminator}`);
					}
				});
				users.sort();
				var user_data = users.join(", ");
				if (data > 1) {
					total = "messages";
				} else {
					total = "message";
				}
				embed.setColor(client.config.color.success)
					.setDescription(`\`\`\`\n${client.config.emoji.success} Successfully purged ${data.size} ${total}\nUsers(${users.length}): ${user_data}\`\`\``);
				interaction.reply({
					embeds: [embed]
				}).then(() => {
					setTimeout(() => {
						interaction.deleteReply().catch(() => {});
					}, 3300);
				});
			}
		}
	}
};
