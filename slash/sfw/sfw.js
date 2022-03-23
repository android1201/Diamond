module.exports = {
	name: "sfw",
	description: "Get sfw image.",
	botChannelPermissions: ["EMBED_LINKS", "MANAGE_MESSAGES", "SEND_MESSAGES", "READ_MESSAGE_HISTORY"],
	cooldown: 5,
	category: "sfw",
	sfw: true,
	options: {
		name: 'type',
		description: 'Type of sfw to show.',
		type: 3,
		required: true,
		choices: [{
			name: 'Safebooru',
			value: 'safebooru'
		}, {
			name: 'Twitter',
			value: 'twitter'
		}, {
			name: 'Waifu',
			value: 'waifu'
		}, {
			name: 'Fgo',
			value: 'fgo'
		}, {
			name: 'Azur_lane',
			value: 'azur_lane'
		}, {
			name: 'Genshin_impact',
			value: 'genshin_impact'
		}, {
			name: 'Girls_frontline',
			value: 'girls_frontline'
		}, {
			name: 'League_of_legends',
			value: 'league_of_legends'
		}, {
			name: 'Dota_2',
			value: 'dota_2'
		}, {
			name: 'Scathach',
			value: 'scathach'
		}, {
			name: 'Raikou',
			value: 'raikou'
		}, {
			name: 'Jeanne',
			value: 'jeanne'
		}, {
			name: 'Ereshkigal',
			value: 'ereshkigal'
		}, {
			name: 'Artoria',
			value: 'artoria'
		}, {
			name: 'Okita',
			value: 'okita'
		}, {
			name: 'Kama',
			value: 'kama'
		}, {
			name: 'Davinci',
			value: 'davinci'
		}, {
			name: 'Anastasia',
			value: 'anastasia'
		}, {
			name: 'Saint_martha',
			value: 'saint_martha'
		}, {
			name: 'Gudako',
			value: 'gudako'
		}, {
			name: 'Mashu',
			value: 'mashu'
		}, {
			name: 'Abigail',
			value: 'abigail'
		}, {
			name: 'Ushiwakamaru',
			value: 'ushiwakamaru'
		}, {
			name: 'Consort_yu',
			value: 'consort_yu'
		}, {
			name: 'Mordred',
			value: 'mordred'
		}, {
			name: 'Himiko',
			value: 'himiko'
		}, {
			name: 'Kiara',
			value: 'kiara'
		}, {
			name: 'Xuanzang',
			value: 'xuanzang'
		}, {
			name: 'Bb',
			value: 'bb'
		}, {
			name: 'Nero',
			value: 'nero'
		}, {
			name: 'Atago',
			value: 'atago'
		}, {
			name: 'Takao',
			value: 'takao'
		}, {
			name: 'Bremerton',
			value: 'bremerton'
		}, {
			name: 'St_louis',
			value: 'st_louis'
		}, {
			name: 'Sirius',
			value: 'sirius'
		}, {
			name: 'Belfast',
			value: 'belfast'
		}, {
			name: 'Enterprise',
			value: 'enterprise'
		}, {
			name: 'Taihou',
			value: 'taihou'
		}, {
			name: 'Dido',
			value: 'dido'
		}, {
			name: 'Hood',
			value: 'hood'
		}, {
			name: 'Formidable',
			value: 'formidable'
		}, {
			name: 'Jean',
			value: 'jean'
		}, {
			name: 'Beidou',
			value: 'beidou'
		}, {
			name: 'Mona',
			value: 'mona'
		}, {
			name: 'Lumine',
			value: 'lumine'
		}, {
			name: 'Lisa',
			value: 'lisa'
		}, {
			name: 'Keqing',
			value: 'keqing'
		}, {
			name: 'Barbara',
			value: 'barbara'
		}, {
			name: 'Klee',
			value: 'klee'
		}, {
			name: 'Amber',
			value: 'amber'
		}, {
			name: 'Furry',
			value: 'furry'
		}],
	},
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
