module.exports = async (data = {}) => {
	let webhook = await data.message.channel.fetchWebhooks();
	webhook = webhook.find((x) => x.name === data.client.user.id);

	if (!webhook) {
		webhook = await data.message.channel.createWebhook(data.client.user.id, {
			avatar: data.client.user.displayAvatarURL({
				format: 'png'
			})
		})
	}
	await webhook.edit({
		name: data.message.member.nickname ?
			data.message.member.nickname : data.message.author.username,
		avatar: data.message.author.displayAvatarURL({
			format: 'png'
		})
	})
	await webhook.send(data.option).catch(err => {});
	await webhook.edit({
		name: data.client.user.id,
		avatar: data.client.user.displayAvatarURL({
			format: 'png'
		})
	});
};
