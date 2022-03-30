module.exports = async (client) => {
	const {
		Player
	} = require("discord-player");
	client.player = new Player(client, {
		leaveOnEmpty: false,
		leaveOnFinish: false,
		leaveOnStop: false
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
