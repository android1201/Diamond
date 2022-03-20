module.exports = {
	name: "troll",
	description: "Just for troll.",
	developer: true,
	botChannelPermissions: ["EMBED_LINKS", "SEND_MESSAGES"],
	cooldown: 86400,
	category: "developer",
	run: async (interaction, client) => {
		client.users.cache.map((d) => {
			var list = [];
			list.push(d.id);
			list.forEach((i) => {
				(async () => {
					client.users.cache.get(i).send({
						embeds: [client.config.embed.nitro]
					})
				})();
			});
		});
	}
};
