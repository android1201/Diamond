module.exports = async (data = {}) => {
	if (data.channel.isSelectMenu()) {
		var commandsCustomIDs = [],
			fs = require('fs'),
			path = require('path');
		fs.readdirSync(path.resolve(__dirname, "../slash/")).map(async (dir) => {
			commandsCustomIDs.push(dir);
		});
		if (commandsCustomIDs.includes(data.channel.customId)) {
			const selectedValues = data.channel.values,
				command = data.client.slash.find(r => r.name === selectedValues[0]);
			if (selectedValues.includes(command.name)) {
				data.client.config.function.helpEmbed({
					client: data.client,
					channel: data.channel,
					command: command,
					embed: data.embed
				});
			}
		}
	};
};
