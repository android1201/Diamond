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
			name: "Abigail",
			value: "abigail"
		}, {
			name: "Amber",
			value: "amber"
		}, {
			name: "Anastasia",
			value: "anastasia"
		}, {
			name: "Artoria",
			value: "artoria"
		}, {
			name: "Atago",
			value: "atago"
		}, {
			name: "Azur_lane",
			value: "azur_lane"
		}, {
			name: "Barbara",
			value: "barbara"
		}, {
			name: "Bb",
			value: "bb"
		}, {
			name: "Beidou",
			value: "beidou"
		}, {
			name: "Belfast",
			value: "belfast"
		}, {
			name: "Bremerton",
			value: "bremerton"
		}, {
			name: "Consort_yu",
			value: "consort_yu"
		}, {
			name: "Davinci",
			value: "davinci"
		}, {
			name: "Dido",
			value: "dido"
		}, {
			name: "Dota",
			value: "dota_2"
		}, {
			name: "Enterprise",
			value: "enterprise"
		}, {
			name: "Ereshkigal",
			value: "ereshkigal"
		}, {
			name: "Fgo",
			value: "fgo"
		}, {
			name: "Formidable",
			value: "formidable"
		}, {
			name: "Furry",
			value: "furry"
		}, {
			name: "Genshin_impact",
			value: "genshin_impact"
		}, {
			name: "Girls_frontline",
			value: "girls_frontline"
		}, {
			name: "Gudako",
			value: "gudako"
		}, {
			name: "Himiko",
			value: "himiko"
		}, {
			name: "Hood",
			value: "hood"
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
