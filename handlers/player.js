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
};
