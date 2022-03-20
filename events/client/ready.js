module.exports = async (client) => {
	require('colors');
	var express = require("express"),
		app = express(),
		clientID = client.config.spotify.ID,
		clientSecret = client.config.spotify.Secret,
		{
			MessageEmbed
		} = require("discord.js");
	/*
	 *Bot status
	 */
	setInterval(() => {
		var totalusers = client.guilds.cache.reduce((c, g) => c + g.memberCount, 0),
			totalservers = client.guilds.cache.size,
			totalemojis = client.emojis.cache.size,
			statusm = client.config.bot.status_message,
			status =
			statusm.replace(/%servers%/g, totalservers).replace(/%users%/g, totalusers).replace(/%emojis%/g, totalemojis);
		client.user.setActivity(status, {
			type: client.config.bot.status,
			url: client.config.bot.stream_url
		});
	}, 1000);
	console.log(`[Discord API] Logged in as ${client.user.tag}`.magenta);
	/*
	 *Porn images
	 */
	client.functions.pornSend({
		bot: client
	});
};
/*
{
	color: 0x0099ff,
	title: '',
	url: '',
	author: {
		name: '',
		icon_url: '',
		url: '',
	},
	description: '',
	thumbnail: {
		url: '',
	},
	fields: [
		{
			name: '',
			value: '',
		},
		{
			name: '',
			value: '',
			inline: false,
		}
	],
	image: {
		url: '',
	},
	timestamp: new Date(),
	footer: {
		text: '',
		icon_url: '',
	},
}
*/
