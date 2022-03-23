const {
	glob
} = require("glob"), {
		promisify
	} = require("util"), {
		Client
	} = require("discord.js"),
	globPromise = promisify(glob);

/**
 * @param {Client} client
 */
module.exports = async (client) => {
	const slash = await globPromise(
			`${process.cwd()}/slash/*/*.js`
		),
		arrayOfslash = [];
	slash.map((value) => {
		const file = require(value);
		if (!file?.name) return;
		client.slash.set(file.name, file);

		if (["MESSAGE", "USER"].includes(file.type)) delete file.description;
		arrayOfslash.push(file);
	});
	client.on("ready", async (client) => {
		// Register for a single guild
		await client.guilds.cache
			.get(client.config.bot.server)
			.commands.set(arrayOfslash);

		// Register for all the guilds the bot is in
		/*
				async function glob_slash() {
					try {
						await client.application.commands.set(arrayOfslash);
					} catch (e) {};
				};
				setInterval(() => {
					glob_slash();
				}, 25000);
		*/
	});
};
