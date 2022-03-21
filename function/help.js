module.exports = async (data = {}) => {
	if (data.interaction.isSelectMenu()) {
		const commandsCustomIDs = [],
			fs = require('fs'),
			path = require('path');
		fs.readdirSync(path.resolve(__dirname, "../../slash/")).map(async (dir) => {
			commandsCustomIDs.push(dir);
		});
		if (commandsCustomIDs.includes(data.interaction.customId)) {
			const selectedValues = data.interaction.values;
			const command = data.client.slash.find(r => r.name === selectedValues[0]);
			if (selectedValues.includes(data.command.name)) {
				var nme = data.command.name ? data.command.name[0].toUpperCase() + data.command.name.toLowerCase().slice(1) : 'Name not given',
					dsn = data.command.description ? data.command.description : 'Description not given',
					usg = data.command.usage ? data.command.usage : 'Usage not given',
					cld = data.command.cooldown ? data.command.cooldown : 'Usage not given',
					ctg = data.command.category ? data.command.category : 'Category not given',
					vic = data.command.vc ? 'Yes' : 'No',
					mod = data.command.mod ? 'Yes' : 'No',
					admin = data.command.admin ? 'Yes' : 'No',
					dvp = data.command.developer ? 'Yes' : 'No',
					onr = data.command.guildOwner ? 'Yes' : 'No',
					bcp = 'Not given',
					brp = 'Not given',
					ucp = 'Not given',
					urp = 'Not given';
				if (data.command.botChannelPermissions) {
					if (data.command.botChannelPermissions.length) {
						bcp = data.command.botChannelPermissions.map(value => `${value[0].toUpperCase() + value.toLowerCase().slice(1).replace(/_/g, ' ')}`).join(`, `);
					}
				}
				if (data.command.botRolePermissions) {
					if (data.command.botRolePermissions.length) {
						brp = data.command.botRolePermissions.map(value => `${value[0].toUpperCase() + value.toLowerCase().slice(1).replace(/_/g, ' ')}`).join(`, `);
					}
				}
				if (data.command.userChannelPermissions) {
					if (data.command.userChannelPermissions.length) {
						ucp = data.command.userChannelPermissions.map(value => `${value[0].toUpperCase() + value.toLowerCase().slice(1).replace(/_/g, ' ')}`).join(`, `);
					}
				}
				if (data.command.userRolePermissions) {
					if (data.command.userRolePermissions.length) {
						urp = data.command.userRolePermissions.map(value => `${value[0].toUpperCase() + value.toLowerCase().slice(1).replace(/_/g, ' ')}`).join(`, `);
					}
				}
				data.embed.setColor(data.client.config.color.default)
					.setDescription(`\`\`\`\nName: ${nme}\nDescription: ${dsn}\nUsage: ${usg}\nCooldown: ${cld}\nCategory: ${ctg}\nPermission:\n	BCP: ${bcp}\n	BRP: ${brp}\n	UCP: ${ucp}\n	URP: ${urp}\n	Admin: ${admin}\n	Mod: ${mod}\n	Owner: ${onr}\n	Developer: ${dvp}\nType:\n	Vc: ${vic}\`\`\``);
				data.interaction.reply({
					embeds: [data.embed],
					ephemeral: true
				});
			}
		}
	};
};
