module.exports = {
	name: "nsfw",
	description: "Get nsfw image.",
	botChannelPermissions: ["EMBED_LINKS", "SEND_MESSAGES"],
	cooldown: 5,
	category: "nsfw",
	nsfw: true,
	options: {
		name: 'type',
		description: 'Type of nsfw to show.',
		type: 3,
		required: true,
		choices: [{
			name: 'Ahegao',
			value: 'ahegao'
		}, {
			name: 'Animated',
			value: 'animated'
		}, {
			name: 'Jav',
			value: 'jav'
		}, {
			name: 'Porngif',
			value: 'porngif'
		}, {
			name: 'Realbooru',
			value: 'realbooru'
		}, {
			name: 'Blowjob',
			value: 'blowjob'
		}, {
			name: 'Missionary',
			value: 'missionary'
		}, {
			name: 'Cowgirl',
			value: 'cowgirl'
		}, {
			name: 'Doggy_style',
			value: 'doggy_style'
		}, {
			name: 'Slut',
			value: 'slut'
		}, {
			name: 'Porn_star',
			value: 'porn_star'
		}, {
			name: 'Anal',
			value: 'anal'
		}, {
			name: 'Anal_penetration',
			value: 'anal_penetration'
		}, {
			name: 'Areolae',
			value: 'areolae'
		}, {
			name: 'Asian',
			value: 'asian'
		}, {
			name: 'Ass',
			value: 'ass'
		}, {
			name: 'Big_ass',
			value: 'big_ass'
		}, {
			name: 'Bra',
			value: 'bra'
		}, {
			name: 'Brunette',
			value: 'brunette'
		}, {
			name: 'Bondage',
			value: 'bondage'
		}, {
			name: 'Cleavage',
			value: 'cleavage'
		}, {
			name: 'Cum_on_face',
			value: 'cum_on_face'
		}, {
			name: 'Cumshot',
			value: 'cumshot'
		}, {
			name: 'Doggystyle',
			value: 'doggystyle'
		}, {
			name: 'From_behind',
			value: 'from_behind'
		}, {
			name: 'Huge_breasts',
			value: 'huge_breasts'
		}, {
			name: 'Large_penis',
			value: 'large_penis'
		}, {
			name: 'Milf',
			value: 'milf'
		}, {
			name: 'Nipples',
			value: 'nipples'
		}, {
			name: 'Nude',
			value: 'nude'
		}, {
			name: 'Oral',
			value: 'oral'
		}, {
			name: 'Open_mouth',
			value: 'open_mouth'
		}, {
			name: 'Brazzers',
			value: 'brazzers'
		}, {
			name: 'Panties',
			value: 'panties'
		}, {
			name: 'Penetration',
			value: 'penetration'
		}, {
			name: 'Penis',
			value: 'penis'
		}, {
			name: 'Removing_panties',
			value: 'removing_panties'
		}, {
			name: 'Sexy',
			value: 'sexy'
		}, {
			name: 'Sideboob',
			value: 'sideboob'
		}, {
			name: 'Stockings',
			value: 'stockings'
		}, {
			name: 'Balls',
			value: 'balls'
		}, {
			name: 'Handjob',
			value: 'handjob'
		}, {
			name: 'Oil',
			value: 'oil'
		}, {
			name: 'Sucking_balls',
			value: 'sucking_balls'
		}, {
			name: 'Bdsm',
			value: 'bdsm'
		}, {
			name: 'Finger_in_mouth',
			value: 'finger_in_mouth'
		}, {
			name: 'Deepthroat',
			value: 'deepthroat'
		}, {
			name: 'Bbc',
			value: 'bbc'
		}]
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