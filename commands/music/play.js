module.exports = {
	name: "play",
	description: "play music with name or spotify link.",
	botChannelPermissions: ["EMBED_LINKS", "SEND_MESSAGES"],
	cooldown: 3,
	vc: true,
	run: async (client, message, args) => {
		let {
			channel
		} = message.member.voice,
			embed = new client.discord.MessageEmbed({
				author: {
					name: message.author.tag
				},
				timestamp: new Date(),
				footer: {
					text: message.author.id,
					icon_url: message.author.displayAvatarURL()
				}
			});
	}
};
