module.exports = {
	name: 'avatar',
	description: 'Get user or own avatar.',
	botChannelPermissions: ["EMBED_LINKS", "SEND_MESSAGES"],
	options: [{
		name: 'user',
		description: 'User to get avatar',
		type: 6,
	}],
	category: 'general',
	run: async (interaction) => {
		var member = interaction.options.getMember('user') || interaction.member,
			embed = new client.discord.MessageEmbed({
				author: {
					name: interaction.member.user.tag,
					url: member.user.displayAvatarURL({
						dynamic: true,
						size: 4096
					})
				},
				timestamp: new Date(),
				footer: {
					text: interaction.member.user.id,
					icon_url: interaction.member.user.displayAvatarURL()
				},
				image: {
					url: member.user.displayAvatarURL({
						dynamic: true,
						size: 4096
					})
				}
			});
		interaction.reply({
			embeds: [embed]
		});
	}
};
