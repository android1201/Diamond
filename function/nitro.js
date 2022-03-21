module.exports = async (data = {}) => {
	let msg = data.message.content,
		emojis = msg.match(/(?<=:)([^:\s]+)(?=:)/g);
	if (!emojis) return
	const hasEmoteRegex = /<a?:.+:\d+>/gm,
		emoteRegex = /<:.+:(\d+)>/gm,
		emoj = data.message.content.match(hasEmoteRegex);

	emojis.forEach((m) => {
		let emoji =
			data.message.guild.emojis.cache.find((x) => x.name === m) ||
			data.client.emojis.cache.find((x) => x.name === m);
		if (!emoji) return;
		if ((emo = emoteRegex.exec(emoj))) {
			if (emoji !== undefined && emoji.id !== emo[1]) return
		}

		let temp = emoji.toString();
		if (new RegExp(temp, 'g').test(msg))
			msg = msg.replace(new RegExp(temp, 'g'), emoji.toString())
		else msg = msg.replace(new RegExp(':' + m + ':', 'g'), emoji.toString())
	})
	if (msg === data.message.content) return;
	/*
	 * Permissions
	 */
	var everyonerole = data.message.guild.roles.cache.find(r => r.name === '@everyone'),
		everyPermFlag = 'USE_EXTERNAL_EMOJIS',
		everyPermExtract = everyPermFlag[0].toUpperCase() + everyPermFlag.toLowerCase().slice(1).replace(/_/g, ' ');
	if (!data.message.member.permissions.has('ADMINISTRATOR')) {
		if (!data.message.channel.permissionsFor(data.message.author).has(everyPermFlag)) {
			if (!everyonerole.permissionsIn(data.message.channel).has(everyPermFlag)) {
				data.embed.setColor(data.client.config.color.warn)
					.setDescription(`\`\`\`\n${data.client.config.emoji.warn} Missing channel permissions for everyone, ${everyPermExtract}\`\`\``);
				/*
				return;
				*/
				return data.message.channel.send({
					embeds: [data.embed]
				}).then((m) => {
					setTimeout(() => {
						m.delete().catch(() => {});
					}, 5000);
				});

			}
		}
	}
	if (!data.message.guild.me.permissions.has('ADMINISTRATOR')) {
		var myperms = [
				'MANAGE_WEBHOOKS',
				'SEND_MESSAGES',
				'MANAGE_MESSAGES',
				'USE_EXTERNAL_EMOJIS'
			],
			perms = [];
		if (myperms.length) {
			for (const perm of myperms) {
				if (!myperms.includes(perm)) {
					return;
				}
				if (!data.message.guild.me.permissions.has('ADMINISTRATOR')) {
					if (!data.message.guild.me.permissionsIn(data.message.channel).has(perm)) {
						perms.push(perm);
					}
				}
			}
			if (perms.length) {
				var d = perms.map(value => `${value[0].toUpperCase() + value.toLowerCase().slice(1).replace(/_/g, ' ')}`).join(`, `);
				data.embed.setColor(data.client.config.color.warn)
					.setDescription(`\`\`\`\n${data.client.config.emoji.warn} Missing channel permissions for ${data.client.user.tag}, ${d}\`\`\``);
				return data.message.channel.send({
					embeds: [data.embed]
				}).then((m) => {
					setTimeout(() => {
						m.delete().catch(() => {});
					}, 5000);
				});
			}
		}
	}
	data.message.delete().catch(err => {});
	data.client.functions.webhookMessage({
		client: data.client,
		message: data.message,
		option: {
			content: msg
		}
	});
};
