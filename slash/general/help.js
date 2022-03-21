module.exports = {
	name: 'help',
	description: 'Get list of all slash commands',
	options: [{
		name: 'command',
		description: 'Command you need help for',
		type: 3,
	}, ],
	category: 'general',
	run: async (interaction, client) => {
		const {
			MessageEmbed,
			MessageActionRow,
			MessageSelectMenu
		} = client.discord,
			embed = new client.discord.MessageEmbed({
				author: {
					name: interaction.member.user.tag
				},
				color: client.config.color.default,
				timestamp: new Date(),
				footer: {
					text: interaction.member.user.id,
					icon_url: interaction.member.user.displayAvatarURL()
				},
			}),
			humanizeDuration = require('humanize-duration');
		try {
			const command = interaction.options.getString('command');
			if (command) {
				const cmd = client.slash.get(command.toLowerCase());
				if (!cmd) {
					embed.setColor(client.config.color.error)
						.setDescription(`\`\`\`${client.config.emoji.error} I can't find ${command} command!\`\`\``)
					return interaction.reply({
						embeds: [embed],
						ephemeral: true
					});
				};
				if (cmd) {
					var nme = cmd.name ? cmd.name[0].toUpperCase() + cmd.name.toLowerCase().slice(1) : 'Name not given',
						dsn = cmd.description ? cmd.description : 'Description not given',
						usg = cmd.usage ? cmd.usage : 'Usage not given',
						cld = cmd.cooldown ? cmd.cooldown : 'Usage not given',
						ctg = cmd.category ? cmd.category : 'Category not given',
						vic = cmd.vc ? 'Yes' : 'No',
						mod = cmd.mod ? 'Yes' : 'No',
						admin = cmd.admin ? 'Yes' : 'No',
						dvp = cmd.developer ? 'Yes' : 'No',
						onr = cmd.guildOwner ? 'Yes' : 'No',
						bcp = 'Not given',
						brp = 'Not given',
						ucp = 'Not given',
						urp = 'Not given';
					if (cmd.botChannelPermissions) {
						if (cmd.botChannelPermissions.length) {
							bcp = cmd.botChannelPermissions.map(value => `${value[0].toUpperCase() + value.toLowerCase().slice(1).replace(/_/g, ' ')}`).join(`, `);
						}
					}
					if (cmd.botRolePermissions) {
						if (cmd.botRolePermissions.length) {
							brp = cmd.botRolePermissions.map(value => `${value[0].toUpperCase() + value.toLowerCase().slice(1).replace(/_/g, ' ')}`).join(`, `);
						}
					}
					if (cmd.userChannelPermissions) {
						if (cmd.userChannelPermissions.length) {
							ucp = cmd.userChannelPermissions.map(value => `${value[0].toUpperCase() + value.toLowerCase().slice(1).replace(/_/g, ' ')}`).join(`, `);
						}
					}
					if (cmd.userRolePermissions) {
						if (cmd.userRolePermissions.length) {
							urp = cmd.userRolePermissions.map(value => `${value[0].toUpperCase() + value.toLowerCase().slice(1).replace(/_/g, ' ')}`).join(`, `);
						}
					}
					embed.setColor(client.config.color.default)
						.setDescription(`\`\`\`{client.config.emoji.info} General:\n	Name: ${nme}\n	Description: ${dsn}\n	Usage: ${usg}\n	Cooldown: ${cld}\n	Category: ${ctg}\n{client.config.emoji.access} Permissions:\n	BCP: ${bcp}\n	BRP: ${brp}\n	UCP: ${ucp}\n	URP: ${urp}\n	Admin: ${admin}\n	Mod: ${mod}\n	Owner: ${onr}\n	Developer: ${dvp}\n{client.config.emoji.types} Types:\n	Vc: ${vic}\`\`\``);
					interaction.reply({
						embeds: [embed],
						ephemeral: true
					});
				};
			};
			const row = new MessageActionRow().addComponents(
				new MessageSelectMenu()
				.setCustomId('help_menu')
				.setPlaceholder('Select Command Category.')
				.setMinValues(1)
				.setMaxValues(1)
				.addOptions([{
						label: 'Fun',
						description: 'Show all commands in fun category.',
						emoji: '😂',
						value: 'fun',
					},
					{
						label: 'General',
						description: 'Show all commands in general category.',
						emoji: '🔎',
						value: 'general',
					},
					{
						label: 'Mod',
						description: 'Show all commands in mod category.',
						emoji: '🔨',
						value: 'mod',
					},
				]),
			);
			embed.setColor(client.config.color.default)
				.setDescription(`\`\`\`${client.config.emoji.data} Select category you need help for!\`\`\``);
			interaction.reply({
				embeds: [embed],
				components: [row]
			});
			const filter = (i) => i.customId === 'help_menu' || ('selected_command' && i.user.id === interaction.user.id);
			const collector = interaction.channel.createMessageComponentCollector({
				filter: filter,
				max: 2,
				componentType: 'SELECT_MENU',
			});
			collector.on('collect', async (i) => {
				if (i.values.includes('fun')) {
					await i.deferUpdate();
					const loopArray = [];
					const funCommands = client.slash.filter((r) => r.category === 'fun');
					if (funCommands.size > 25) {
						loopArray.slice(0, 25);
					}
					funCommands.forEach((cmd) => {
						loopArray.push({
							label: cmd.name,
							value: cmd.name,
							description: cmd.description,
							emoji: '😂',
						});
					});
					const commandRow = row.setComponents(
						new MessageSelectMenu()
						.setCustomId('fun_cmd')
						.setPlaceholder('Info Commands')
						.setMinValues(1)
						.setMaxValues(1)
						.addOptions(loopArray),
					);
					return i.editReply({
						content: '**😂 Select what command you need help for.**',
						components: [commandRow],
					});
				}
				if (i.values.includes('general')) {
					await i.deferUpdate();
					const loopGeneralCommands = [];
					const generalCommands = client.slash.filter((r) => r.category === 'general');
					if (generalCommands.size > 25) {
						loopGeneralCommands.slice(0, 25);
					}
					generalCommands.forEach((cmd) => {
						loopGeneralCommands.push({
							label: cmd.name,
							value: cmd.name,
							description: cmd.description,
							emoji: '🔎',
						});
					});
					const commandRow = row.setComponents(
						new MessageSelectMenu()
						.setCustomId('general')
						.setPlaceholder('General Commands')
						.setMinValues(1)
						.setMaxValues(1)
						.addOptions(loopGeneralCommands),
					);
					return i.editReply({
						content: '**🔎 Select what command you need help for.**',
						components: [commandRow],
					});
				}
				if (i.values.includes('mod')) {
					await i.deferUpdate();
					const loopModCommands = [];
					const modCommands = client.slash.filter((r) => r.category === 'mod');
					if (modCommands.size > 25) {
						loopModCommands.slice(0, 25);
					}
					modCommands.forEach((cmd) => {
						loopModCommands.push({
							label: cmd.name,
							value: cmd.name,
							description: cmd.description,
							emoji: '🔨',
						});
					});
					const commandRow = row.setComponents(
						new MessageSelectMenu()
						.setCustomId('mod_cmd')
						.setPlaceholder('Mod Commands')
						.setMinValues(1)
						.setMaxValues(1)
						.addOptions(loopModCommands),
					);
					return i.editReply({
						content: '**🔨 Select what command you need help for.**',
						components: [commandRow],
					});
				}
			});
		} catch (e) {
			console.error(e);
			return false;
		}
	},
};
