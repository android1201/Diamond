module.exports = {
	name: "nsfw",
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
			name: "Ahegao",
			value: "ahegao"
		}, {
			name: "Anal",
			value: "anal"
		}, {
			name: "Anal_penetration",
			value: "anal_penetration"
		}, {
			name: "Animated",
			value: "animated"
		}, {
			name: "Areolae",
			value: "areolae"
		}, {
			name: "Asian",
			value: "asian"
		}, {
			name: "Ass",
			value: "ass"
		}, {
			name: "Balls",
			value: "balls"
		}, {
			name: "Bbc",
			value: "bbc"
		}, {
			name: "Bdsm",
			value: "bdsm"
		}, {
			name: "Big_ass",
			value: "big_ass"
		}, {
			name: "Blowjob",
			value: "blowjob"
		}, {
			name: "Bondage",
			value: "bondage"
		}, {
			name: "Bra",
			value: "bra"
		}, {
			name: "Brazzers",
			value: "brazzers"
		}, {
			name: "Brunette",
			value: "brunette"
		}, {
			name: "Cleavage",
			value: "cleavage"
		}, {
			name: "Cowgirl",
			value: "cowgirl"
		}, {
			name: "Cum_on_face",
			value: "cum_on_face"
		}, {
			name: "Cumshot",
			value: "cumshot"
		}, {
			name: "Deepthroat",
			value: "deepthroat"
		}, {
			name: "Doggy_style",
			value: "doggy_style"
		}, {
			name: "Doggystyle",
			value: "doggystyle"
		}, {
			name: "Finger_in_mouth",
			value: "finger_in_mouth"
		}, {
			name: "From_behind",
			value: "from_behind"
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
