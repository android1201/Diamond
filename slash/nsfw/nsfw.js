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
		/*
		choices: [{
			name: "Ahegao",
			value: "ahegao"
		}, {
			name: "Animated",
			value: "animated"
		}, {
			name: "Jav",
			value: "jav"
		}, {
			name: "Porngif",
			value: "porngif"
		}, {
			name: "Realbooru",
			value: "realbooru"
		}, {
			name: "Blowjob",
			value: "blowjob"
		}, {
			name: "Missionary",
			value: "missionary"
		}, {
			name: "Cowgirl",
			value: "cowgirl"
		}, {
			name: "Doggystyle",
			value: "doggystyle"
		}, {
			name: "Slut",
			value: "slut"
		}, {
			name: "Pornstar",
			value: "pornstar"
		}, {
			name: "Anal",
			value: "anal"
		}, {
			name: "Analpenetration",
			value: "analpenetration"
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
			name: "Bigass",
			value: "bigass"
		}, {
			name: "Bra",
			value: "bra"
		}, {
			name: "Brunette",
			value: "brunette"
		}, {
			name: "Bondage",
			value: "bondage"
		}, {
			name: "Cleavage",
			value: "cleavage"
		}, {
			name: "Cumonface",
			value: "cumonface"
		}, {
			name: "Cumshot",
			value: "cumshot"
		}, {
			name: "Doggystyle",
			value: "doggystyle"
		}, {
			name: "Frombehind",
			value: "frombehind"
		}, {
			name: "Hugebreasts",
			value: "hugebreasts"
		}, {
			name: "Largepenis",
			value: "largepenis"
		}, {
			name: "Milf",
			value: "milf"
		}, {
			name: "Nipples",
			value: "nipples"
		}, {
			name: "Nude",
			value: "nude"
		}, {
			name: "Oral",
			value: "oral"
		}, {
			name: "Openmouth",
			value: "openmouth"
		}, {
			name: "Brazzers",
			value: "brazzers"
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
			name: "Removingpanties",
			value: "removingpanties"
		}, {
			name: "Sexy",
			value: "sexy"
		}, {
			name: "Sideboob",
			value: "sideboob"
		}, {
			name: "Stockings",
			value: "stockings"
		}, {
			name: "Balls",
			value: "balls"
		}, {
			name: "Handjob",
			value: "handjob"
		}, {
			name: "Oil",
			value: "oil"
		}, {
			name: "Suckingballs",
			value: "suckingballs"
		}, {
			name: "Bdsm",
			value: "bdsm"
		}, {
			name: "Fingerinmouth",
			value: "fingerinmouth"
		}, {
			name: "Deepthroat",
			value: "deepthroat"
		}, {
			name: "Bbc",
			value: "bbc"
		}]
		*/
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
