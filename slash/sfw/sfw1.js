module.exports = {
	name: "sfw1",
	description: "Get sfw image.",
	botChannelPermissions: ["EMBED_LINKS", "SEND_MESSAGES"],
	cooldown: 5,
	category: "sfw",
	sfw: true,
	options: [{
		name: "type",
		description: "Type of sfw to show.",
		type: 3,
		required: true,
		choices: [{
			name: "Jean",
			value: "jean"
		}, {
			name: "Jeanne",
			value: "jeanne"
		}, {
			name: "Kama",
			value: "kama"
		}, {
			name: "Kiara",
			value: "kiara"
		}, {
			name: "Klee",
			value: "klee"
		}, {
			name: "League_of_legends",
			value: "league_of_legends"
		}, {
			name: "Lisa",
			value: "lisa"
		}, {
			name: "Lumine",
			value: "lumine"
		}, {
			name: "Mashu",
			value: "mashu"
		}, {
			name: "Mona",
			value: "mona"
		}, {
			name: "Mordred",
			value: "mordred"
		}, {
			name: "Nero",
			value: "nero"
		}, {
			name: "Okita",
			value: "okita"
		}, {
			name: "Raikou",
			value: "raikou"
		}, {
			name: "Safebooru",
			value: "safebooru"
		}, {
			name: "Saint_martha",
			value: "saint_martha"
		}, {
			name: "Scathach",
			value: "scathach"
		}, {
			name: "Sirius",
			value: "sirius"
		}, {
			name: "St_louis",
			value: "st_louis"
		}, {
			name: "Taihou",
			value: "taihou"
		}, {
			name: "Takao",
			value: "takao"
		}, {
			name: "Ushiwakamaru",
			value: "ushiwakamaru"
		}, {
			name: "Xuanzang",
			value: "xuanzang"
		}]
	}],
	run: async (interaction, client) => {
		const type = interaction.options.getString('type');
		client.porn.porn2.sfw[type]().then((i) => {
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
