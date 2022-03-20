module.exports = async (client,
	member) => {
	var userSchemaData = await client.userSchema
		.findOne({
			_id: member.user.id
		});
	if (!userSchemaData) {
		client.functions.userCreate({
			bot: client,
			id: member.user.id
		});
	}
};
