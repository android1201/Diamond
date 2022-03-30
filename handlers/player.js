module.exports = async (client) => {
	const {
		Player
	} = require("discord-music-player");
	client.player = new Player(client, {
		leaveOnEnd: true,
		leaveOnStop: false,
		leaveOnEmpty: false,
		timeout: 600000
	});
	client.player
		.on('channelEmpty', (queue) => {})
		.on('songAdd', (queue, song) => {})
		.on('playlistAdd', (queue, playlist) => {})
		.on('queueDestroyed', (queue) => {})
		.on('queueEnd', (queue) => {})
		.on('songChanged', (queue, newSong, oldSong) => {})
		.on('songFirst', (queue, song) => {})
		.on('clientDisconnect', (queue) => {})
		.on('clientUndeafen', (queue) => {})
		.on('error', (error, queue) => {});
};
