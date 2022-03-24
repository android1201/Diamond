var {
	Client,
	Intents
} = require('discord.js'),
	Discord = require("discord.js"),
	DiscordLogger = require("discordjs-logger"), {
		readdirSync
	} = require("fs"),
	client = new Client({
		allowedMentions: {
			parse: [
				'users',
				'roles'
			],
			repliedUser: true
		},
		messageCacheMaxSize: 10,
		messageCacheLifetime: 60,
		disableEveryone: true,
		disableMentions: 'all',
		fetchAllMembers: false,
		shards: 'auto',
		shardCount: 5,
		restTimeOffset: 0,
		partials: [
			'MESSAGE',
			'CHANNEL',
			'REACTION',
			'GUILD_MEMBER'
		],
		intents: [
			Discord.Intents.FLAGS.GUILDS,
			Discord.Intents.FLAGS.GUILD_MEMBERS,
			Discord.Intents.FLAGS.GUILD_BANS,
			Discord.Intents.FLAGS.GUILD_EMOJIS_AND_STICKERS,
			Discord.Intents.FLAGS.GUILD_INTEGRATIONS,
			Discord.Intents.FLAGS.GUILD_WEBHOOKS,
			Discord.Intents.FLAGS.GUILD_INVITES,
			Discord.Intents.FLAGS.GUILD_VOICE_STATES,
			Discord.Intents.FLAGS.GUILD_PRESENCES,
			Discord.Intents.FLAGS.GUILD_MESSAGES,
			Discord.Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
			Discord.Intents.FLAGS.GUILD_MESSAGE_TYPING,
			Discord.Intents.FLAGS.DIRECT_MESSAGES,
			Discord.Intents.FLAGS.DIRECT_MESSAGE_REACTIONS,
			Discord.Intents.FLAGS.DIRECT_MESSAGE_TYPING
		],
		/*
		intents: 32767,
		*/
	}),
	{
		Player
	} = require("discord-music-player"),
	player = new Player(client, {
		leaveOnEmpty: false,
	});
/*
 * Variables
 */
var neko = require('nekos.life'),
	{
		scathach
	} = require('../class/a.js');
/*
 * client database
 */
/*
client.aliases = new Discord.Collection();
client.categories = new Discord.Collection();
client.commands = new Discord.Collection();
*/
client.config = require('./configure.js');
client.discord = Discord;
client.events = new Discord.Collection();
client.functions = client.config.function;
client.hub_url = require('./hub_url.js');
client.player = player;
client.porn = {
	porn1: new neko(),
	porn2: new scathach()
};
client.slash = new Discord.Collection();
/*
 * Discord Audit logging
 */
require('discord-logs')(client);
const logger = new DiscordLogger.CDiscordEvent(client);

require('colors');

readdirSync("./handlers/").map((d) => {
	if (typeof(i = require("../handlers/" + d)) === "function") {
		i(client);
	}
});

client.setMaxListeners(0);
/*
 * client login
 */
client.login(client.config.bot.token);
/*
 * Error handling
 */
process.on('unhandledRejection', (err) => {
	console.error(`Unhandled Rejection: ${err}`);
});
process.on('uncaughtException', (err) => {
	console.error(`Uncaught Exception: ${err}`);
});
/*
 * Schema
 */
/*
client.guildSchema = require('../schema/guild.js');
client.userSchema = require('../schema/user.js');
*/
/*
 * Client init variables
 */
/*
 * Variables
 */
/*
 * Export client
 */
module.exports = {
	client
};
