const {
	ShardingManager
} = require('discord.js'),
	config = require('./configure.js'),
	path = require('path'),
	file = path.resolve(__dirname, './diamond.js');

const shards = new ShardingManager(file, {
	token: config.bot.token,
	totalShards: "auto"
});
shards.on("shardCreate", shard => {
	console.log(`[READY] ${new Date().toString().split(" ",5).join(" ")} Launched Shard #${shard.id}`);
});
shards.spawn(shards.totalShards, 30000);
/*
const path = require('path'),
	file = path.resolve(__dirname, './diamond.js');
require(file);
*/
