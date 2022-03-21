module.exports = async (data = {}) => {
	require('colors');
	setInterval(() => {
		var totalusers = data.client.users.cache.size,
			totalservers = data.client.guilds.cache.size,
			totalemojis = data.client.emojis.cache.size,
			statusm = data.client.config.bot.status_message,
			status =
			statusm.replace(/%servers%/g, totalservers).replace(/%users%/g, totalusers).replace(/%emojis%/g, totalemojis);
		data.client.user.setActivity(status, {
			type: data.client.config.bot.status,
			url: data.client.config.bot.stream_url
		});
	}, 1000);
	console.log(`[Discord API] Logged in as ${data.client.user.tag}`.magenta);
};
