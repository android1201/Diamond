const {
	glob
} = require("glob");
const {
	promisify
} = require("util");
const {
	Client
} = require("discord.js");
const globPromise = promisify(glob);

/**
 * @param {Client} client
 */
module.exports = async (client) => {
	const slash = await globPromise(
		`${process.cwd()}/slash/*/*.js`
	);

	const arrayOfslash = [];
	slash.map((value) => {
		const file = require(value);
		if (!file?.name) return;
		client.slash.set(file.name, file);

		if (["MESSAGE", "USER"].includes(file.type)) delete file.description;
		arrayOfslash.push(file);
	});
	client.on("ready", async () => {
		// Register for a single guild
		/* await client.guilds.cache
		  .get("replace this with your guild id")
		  .commands.set(arrayOfslash);
		*/

		// Register for all the guilds the bot is in
		async function glob_slash() {
			await client.application.commands.set(arrayOfslash);
		}
		glob_slash();
	});
};