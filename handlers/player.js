module.exports = async (client) => {
	const HttpsProxyAgent = require("https-proxy-agent"),
		proxy = "http://111.111.111.111:8080",
		agent = HttpsProxyAgent(proxy),
		{
			Player
		} = require("discord-player");
	client.player = new Player(client, {
		leaveOnEmpty: false,
		leaveOnFinish: false,
		leaveOnStop: false,
		ytdlOptions: {
			requestOptions: {
				agent
			}
		}
	});
	client.player.on("error", (queue, error) => {
		console.log(`[${queue.guild.name}] Error emitted from the queue: ${error.message}`);
	}).on("connectionError", (queue, error) => {
		console.log(`[${queue.guild.name}] Error emitted from the connection: ${error.message}`);
	}).on("trackStart", (queue, track) => {
		queue.metadata.send(`🎶 | Started playing: **${track.title}** in **${queue.connection.channel.name}**!`);
	}).on("trackAdd", (queue, track) => {
		queue.metadata.send(`🎶 | Track **${track.title}** queued!`);
	}).on("botDisconnect", (queue) => {
		queue.metadata.send("❌ | I was manually disconnected from the voice channel, clearing queue!");
	}).on("channelEmpty", (queue) => {
		queue.metadata.send("❌ | Nobody is in the voice channel, leaving...");
	}).on("queueEnd", (queue) => {
		queue.metadata.send("✅ | Queue finished!");
	});
};
