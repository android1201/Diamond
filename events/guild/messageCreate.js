module.exports = async (client,
	message) => {
	/*
	 * MessageCreate
	 */
	if (message.author.bot) return;
	/*
	 * schemaData
	 */
	var guildData = await client.db.get(`guild${message.guild.id}`),
		userData = await client.db.get(`user${message.author.id}`);
	/*
	 * Dm
	 */
	if (message.channel.type === "dm") {
		return;
	}
	/*
	 * Guild
	 */
	if (message.guild) {
		if (guildData) {
			if (guildData.nitro === "enable") {
				return client.config.function.nitro({
					client: client,
					embed: {
						timestamp: new Date(),
						author: {
							name: message.author.tag
						},
						footer: {
							text: message.author.id,
							icon_url: message.author.displayAvatarURL()
						}
					},
					message: message
				});
			} else {
				return;
			}
		} else {
			if (!guildData) {
				new client.config.class.guild({
					client: client,
					id: message.guild.id
				});
			}
			if (!userData) {
				new client.config.class.user({
					client: client,
					id: message.author.id
				});
			};
			return;
		}
	}
};
