module.exports = async (data = {}) => {
	if (data.interaction.isSelectMenu()) {
		var commandsCustomIDs = [],
			fs = require('fs'),
			path = require('path');
		fs.readdirSync(path.resolve(__dirname, "../slash/")).map(async (dir) => {
			commandsCustomIDs.push(dir);
		});
		if (commandsCustomIDs.includes(data.interaction.customId)) {
			const selectedValues = data.interaction.values,
				command = data.client.slash.find(r => r.name === selectedValues[0]);
			if (selectedValues.includes(command.name)) {
				client.config.function.helpEmbed({
					command: command,
					embed: data.embed
				});
			}
		}
	};
};
