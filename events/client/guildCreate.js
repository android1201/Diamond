module.exports = async (client,
	guild) => {
	var guildSchemaData = await client.guildSchema
		.findOne({
			_id: guild.id
		})
	if (!guildSchemaData) {
		client.functions.guildCreate({
			bot: client,
			id: guild.id
		});
	}
};
