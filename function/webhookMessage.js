module.exports = async ({
	bot: client,
	message: message,
	option: option
}) => {
	let webhook = await message.channel.fetchWebhooks();
	webhook = webhook.find((x) => x.name === client.user.id);

	if (!webhook) {
		webhook = await message.channel.createWebhook(client.user.id, {
			avatar: client.user.displayAvatarURL({
				format: 'png'
			})
		})
	}
	await webhook.edit({
		name: message.member.nickname ?
			message.member.nickname : message.author.username,
		avatar: message.author.displayAvatarURL({
			format: 'png'
		})
	})
	await webhook.send(option).catch(err => {});
	await webhook.edit({
		name: client.user.id,
		avatar: client.user.displayAvatarURL({
			format: 'png'
		})
	});
};
