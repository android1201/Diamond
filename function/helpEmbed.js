module.exports = async (data = {}) => {
	var command = data.command,
		nme = command.name ? command.name[0].toUpperCase() + command.name.toLowerCase().slice(1) : 'Name not given',
		dsn = command.description ? command.description : 'Description not given',
		usg = command.usage ? command.usage : 'Usage not given',
		cld = command.cooldown ? command.cooldown : 'Cooldown not given',
		ctg = command.category ? command.category : 'Category not given',
		vic = command.vc ? 'Yes' : 'No',
		mod = command.mod ? 'Yes' : 'No',
		admin = command.admin ? 'Yes' : 'No',
		dvp = command.developer ? 'Yes' : 'No',
		onr = command.guildOwner ? 'Yes' : 'No',
		nsfw = command.nsfw ? 'Yes' : 'No',
		sfw = command.sfw ? 'Yes' : 'No',
		bcp = 'Not given',
		brp = 'Not given',
		ucp = 'Not given',
		urp = 'Not given';
	if (command.botChannelPermissions) {
		if (command.botChannelPermissions.length) {
			bcp = command.botChannelPermissions.map(value => `${value[0].toUpperCase() + value.toLowerCase().slice(1).replace(/_/g, ' ')}`).join(`, `);
		}
	}
	if (command.botRolePermissions) {
		if (command.botRolePermissions.length) {
			brp = command.botRolePermissions.map(value => `${value[0].toUpperCase() + value.toLowerCase().slice(1).replace(/_/g, ' ')}`).join(`, `);
		}
	}
	if (command.userChannelPermissions) {
		if (command.userChannelPermissions.length) {
			ucp = command.userChannelPermissions.map(value => `${value[0].toUpperCase() + value.toLowerCase().slice(1).replace(/_/g, ' ')}`).join(`, `);
		}
	}
	if (command.userRolePermissions) {
		if (command.userRolePermissions.length) {
			urp = command.userRolePermissions.map(value => `${value[0].toUpperCase() + value.toLowerCase().slice(1).replace(/_/g, ' ')}`).join(`, `);
		}
	}
	data.embed.setColor(data.client.config.color.default)
		.setDescription(`\`\`\`${data.client.config.emoji.info} General:\n	Name: ${nme}\n	Description: ${dsn}\n	Usage: ${usg}\n	Cooldown: ${cld}\n	Category: ${ctg}\n${data.client.config.emoji.access} Permissions:\n	BCP: ${bcp}\n	BRP: ${brp}\n	UCP: ${ucp}\n	URP: ${urp}\n	Admin: ${admin}\n	Mod: ${mod}\n	Owner: ${onr}\n	Developer: ${dvp}\n${data.client.config.emoji.types} Types:\n	NSFW: ${nsfw}\n	Vc: ${vic}\n	SFW: ${sfw}\`\`\``);
	data.channel.reply({
		embeds: [data.embed],
		ephemeral: true
	});
};
