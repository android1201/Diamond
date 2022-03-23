module.exports = {
	name: "sfw",
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
			name: "Safebooru",
			value: "safebooru"
		}, {
			name: "Twitter",
			value: "twitter"
		}, {
			name: "Waifu",
			value: "waifu"
		}, {
			name: "Fgo",
			value: "fgo"
		}, {
			name: "Azur_lane",
			value: "azur_lane"
		}, {
			name: "Genshin_impact",
			value: "genshin_impact"
		}, {
			name: "Girls_frontline",
			value: "girls_frontline"
		}, {
			name: "League_of_legends",
			value: "league_of_legends"
		}, {
			name: "Dota_2",
			value: "dota_2"
		}, {
			name: "Scathach",
			value: "scathach"
		}, {
			name: "Raikou",
			value: "raikou"
		}, {
			name: "Jeanne",
			value: "jeanne"
		}, {
			name: "Ereshkigal",
			value: "ereshkigal"
		}, {
			name: "Artoria",
			value: "artoria"
		}, {
			name: "Okita",
			value: "okita"
		}, {
			name: "Kama",
			value: "kama"
		}, {
			name: "Davinci",
			value: "davinci"
		}, {
			name: "Anastasia",
			value: "anastasia"
		}, {
			name: "Saint_martha",
			value: "saint_martha"
		}, {
			name: "Gudako",
			value: "gudako"
		}, {
			name: "Mashu",
			value: "mashu"
		}, {
			name: "Abigail",
			value: "abigail"
		}, {
			name: "Ushiwakamaru",
			value: "ushiwakamaru"
		}, {
			name: "Consort_yu",
			value: "consort_yu"
		}, {
			name: "Mordred",
			value: "mordred"
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
