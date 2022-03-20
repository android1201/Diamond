module.exports = async (client,
	member) => {
	var user = await client.db.get(`user${member.user.id}`);
	if (!user) {
		new client.config.class.user({
			client: client,
			id: member.user.id
		});
	}
};
