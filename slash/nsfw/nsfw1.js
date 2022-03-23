module.exports = {
	name: "nsfw1",
	description: "Get nsfw image.",
	botChannelPermissions: ["EMBED_LINKS", "SEND_MESSAGES"],
	cooldown: 5,
	category: "nsfw",
	nsfw: true,
	options: [{
		name: "type",
		description: "Type of nsfw to show.",
		type: 3,
		required: true,
		choices: [{
			name: "Handjob",
			value: "handjob"
		}, {
			name: "Huge_breasts",
			value: "huge_breasts"
		}, {
			name: "Jav",
			value: "jav"
		}, {
			name: "Large_penis",
			value: "large_penis"
		}, {
			name: "Milf",
			value: "milf"
		}, {
			name: "Missionary",
			value: "missionary"
		}, {
			name: "Nipples",
			value: "nipples"
		}, {
			name: "Nude",
			value: "nude"
		}, {
			name: "Oil",
			value: "oil"
		}, {
			name: "Open_mouth",
			value: "open_mouth"
		}, {
			name: "Oral",
			value: "oral"
		}, {
			name: "Panties",
			value: "panties"
		}, {
			name: "Penetration",
			value: "penetration"
		}, {
			name: "Penis",
			value: "penis"
		}, {
			name: "Porn_star",
			value: "porn_star"
		}, {
			name: "Porngif",
			value: "porngif"
		}, {
			name: "Realbooru",
			value: "realbooru"
		}, {
			name: "Removing_panties",
			value: "removing_panties"
		}, {
			name: "Sexy",
			value: "sexy"
		}, {
			name: "Sideboob",
			value: "sideboob"
		}, {
			name: "Slut",
			value: "slut"
		}, {
			name: "Stockings",
			value: "stockings"
		}, {
			name: "Sucking_balls",
			value: "sucking_balls"
		}]
	}],
	run: async (interaction, client) => {
		const type = interaction.options.getString('type');
		client.porn.porn2.nsfw[type]().then((i) => {
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
