module.exports = {
	name: 'play',
	description: 'Searches for a song or playlist plays it in voice.',
	botChannelPermissions: ["EMBED_LINKS", "SEND_MESSAGES"],
	options: [{
		name: 'search',
		description: 'The song or playlist name that you want to search for.',
		type: 3,
		required: true
	}],
	category: 'music',
	cooldown: 5,
	vc: true,
	run: async (interaction, client) => {
		const {
			MessageEmbed
		} = client.discord, {
			QueryType
		} = require('discord-player')
		embed = new client.discord.MessageEmbed({
				author: {
					name: interaction.member.user.tag
				},
				color: client.config.color.default,
				timestamp: new Date(),
				footer: {
					text: interaction.member.user.id,
					icon_url: interaction.member.user.displayAvatarURL()
				},
			}),
			voiceChannel = interaction.member.voice.channel,
			query = interaction.options.getString('search'),
			guild = interaction.guild,
			channel = interaction.channel,
			member = interaction.member;
		const searchResult = await client.player
			.search(query, {
				requestedBy: interaction.member,
				searchEngine: QueryType.AUTO
			})
			.catch(() => {});
		if (!searchResult || !searchResult.tracks.length) return interaction.reply({
			content: 'No results were found!'
		});

		const queue = await client.player.createQueue(guild, {
			ytdlOptions: {
				filter: 'audioonly',
				highWaterMark: 1 << 30,
				dlChunkSize: 0,
			},
			metadata: channel
		});
		try {
			if (!queue.connection) await queue.connect(member.voice.channel);
		} catch {
			void client.player.deleteQueue(interaction.guild.id);
			return interaction.reply({
				content: 'Could not join your voice channel!'
			});
		}
		await interaction.reply({
			content: `⏱ | Loading your ${searchResult.playlist ? 'playlist' : 'track'}...`
		});
		searchResult.playlist ? queue.addTracks(searchResult.tracks) : queue.addTrack(searchResult.tracks[0]);
		if (!queue.playing) await queue.play();
	},
};
