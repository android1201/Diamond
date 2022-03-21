module.exports = async (client,
	guild) => {
	var guild = await client.db.get(`guild${guild.id}`);
	if (!guild) {
		new client.config.class.guild({
			client: client,
			id: guild.id
		});
	}
};
