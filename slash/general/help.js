module.exports = {
	name: 'help',
	description: 'Get list of all slash commands',
	botChannelPermissions: ["EMBED_LINKS", "SEND_MESSAGES"],
	options: [{
		name: 'command',
		description: 'Command you need help for',
		type: 3,
	}, ],
	category: 'general',
	cooldown: 5,
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
					return client.config.function.helpEmbed({
						client: client,
						channel: interaction,
						command: cmd,
						embed: embed
					});
				};
			};
			var emoji = {
				e1: '⚙️',
				e2: '🧑‍💻',
				e3: '💵',
				e4: '🎠',
				e5: '🍹',
				e6: '🏳️‍⚧️',
				e7: '🔨',
				e8: '🎶',
				e9: '🔞'
			};
			const row = new MessageActionRow().addComponents(
				new MessageSelectMenu()
				.setCustomId('help_menu')
				.setPlaceholder('Select Command Category!')
				.setMinValues(1)
				.setMaxValues(1)
				.addOptions([{
					label: 'Admin',
					description: 'Show all commands in Admin category.',
					emoji: emoji.e1,
					value: 'admin',
				}, {
					label: 'Developer',
					description: 'Show all commands in Developer category.',
					emoji: emoji.e2,
					value: 'developer',
				}, {
					label: 'Economy',
					description: 'Show all commands in Economy category.',
					emoji: emoji.e3,
					value: 'economy',
				}, {
					label: 'Fun',
					description: 'Show all commands in fun category.',
					emoji: emoji.e4,
					value: 'fun',
				}, {
					label: 'General',
					description: 'Show all commands in General category.',
					emoji: emoji.e5,
					value: 'general',
				}, {
					label: 'Misc',
					description: 'Show all commands in Misc category.',
					emoji: emoji.e6,
					value: 'misc',
				}, {
					label: 'Mod',
					description: 'Show all commands in Mod category.',
					emoji: emoji.e7,
					value: 'mod',
				}, {
					label: 'Music',
					description: 'Show all commands in Music category.',
					emoji: emoji.e8,
					value: 'music',
				}, {
					label: 'NSFW',
					description: 'Show all commands in NSFW category.',
					emoji: emoji.e9,
					value: 'nsfw',
				}]),
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
				if (i.values.includes('admin')) {
					var name = 'admin',
						emo = emoji.e1;
					await i.deferUpdate();
					const loopArray = [];
					const Commands = client.slash.filter((r) => r.category === name);
					if (Commands.size > 25) {
						loopArray.slice(0, 25);
					}
					Commands.forEach((cmd) => {
						loopArray.push({
							label: cmd.name,
							value: cmd.name,
							description: cmd.description,
							emoji: emo,
						});
					});
					const commandRow = row.setComponents(
						new MessageSelectMenu()
						.setCustomId(name)
						.setPlaceholder(name[0].toUpperCase() + name.toLowerCase().slice(1) + ' commands.')
						.setMinValues(1)
						.setMaxValues(1)
						.addOptions(loopArray),
					);
					embed.setColor(client.config.color.default)
						.setDescription(`\`\`\`${emo} Select what command you need help for!\`\`\``);
					return i.editReply({
						embeds: [embed],
						components: [commandRow],
					});
				};
				if (i.values.includes('developer')) {
					var name = 'developer',
						emo = emoji.e2;
					await i.deferUpdate();
					const loopArray = [];
					const Commands = client.slash.filter((r) => r.category === name);
					if (Commands.size > 25) {
						loopArray.slice(0, 25);
					}
					Commands.forEach((cmd) => {
						loopArray.push({
							label: cmd.name,
							value: cmd.name,
							description: cmd.description,
							emoji: emo,
						});
					});
					const commandRow = row.setComponents(
						new MessageSelectMenu()
						.setCustomId(name)
						.setPlaceholder(name[0].toUpperCase() + name.toLowerCase().slice(1) + ' commands.')
						.setMinValues(1)
						.setMaxValues(1)
						.addOptions(loopArray),
					);
					embed.setColor(client.config.color.default)
						.setDescription(`\`\`\`${emo} Select what command you need help for!\`\`\``);
					return i.editReply({
						embeds: [embed],
						components: [commandRow],
					});
				};
				if (i.values.includes('economy')) {
					var name = 'economy',
						emo = emoji.e3;
					await i.deferUpdate();
					const loopArray = [];
					const Commands = client.slash.filter((r) => r.category === name);
					if (Commands.size > 25) {
						loopArray.slice(0, 25);
					}
					Commands.forEach((cmd) => {
						loopArray.push({
							label: cmd.name,
							value: cmd.name,
							description: cmd.description,
							emoji: emo,
						});
					});
					const commandRow = row.setComponents(
						new MessageSelectMenu()
						.setCustomId(name)
						.setPlaceholder(name[0].toUpperCase() + name.toLowerCase().slice(1) + ' commands.')
						.setMinValues(1)
						.setMaxValues(1)
						.addOptions(loopArray),
					);
					embed.setColor(client.config.color.default)
						.setDescription(`\`\`\`${emo} Select what command you need help for!\`\`\``);
					return i.editReply({
						embeds: [embed],
						components: [commandRow],
					});
				};
				if (i.values.includes('fun')) {
					var name = 'fun',
						emo = emoji.e4;
					await i.deferUpdate();
					const loopArray = [];
					const Commands = client.slash.filter((r) => r.category === name);
					if (Commands.size > 25) {
						loopArray.slice(0, 25);
					}
					Commands.forEach((cmd) => {
						loopArray.push({
							label: cmd.name,
							value: cmd.name,
							description: cmd.description,
							emoji: emo,
						});
					});
					const commandRow = row.setComponents(
						new MessageSelectMenu()
						.setCustomId(name)
						.setPlaceholder(name[0].toUpperCase() + name.toLowerCase().slice(1) + ' commands.')
						.setMinValues(1)
						.setMaxValues(1)
						.addOptions(loopArray),
					);
					embed.setColor(client.config.color.default)
						.setDescription(`\`\`\`${emo} Select what command you need help for!\`\`\``);
					return i.editReply({
						embeds: [embed],
						components: [commandRow],
					});
				};
				if (i.values.includes('general')) {
					var name = 'general',
						emo = emoji.e5;
					await i.deferUpdate();
					const loopArray = [];
					const Commands = client.slash.filter((r) => r.category === name);
					if (Commands.size > 25) {
						loopArray.slice(0, 25);
					}
					Commands.forEach((cmd) => {
						loopArray.push({
							label: cmd.name,
							value: cmd.name,
							description: cmd.description,
							emoji: emo,
						});
					});
					const commandRow = row.setComponents(
						new MessageSelectMenu()
						.setCustomId(name)
						.setPlaceholder(name[0].toUpperCase() + name.toLowerCase().slice(1) + ' commands.')
						.setMinValues(1)
						.setMaxValues(1)
						.addOptions(loopArray),
					);
					embed.setColor(client.config.color.default)
						.setDescription(`\`\`\`${emo} Select what command you need help for!\`\`\``);
					return i.editReply({
						embeds: [embed],
						components: [commandRow],
					});
				};
				if (i.values.includes('misc')) {
					var name = 'misc',
						emo = emoji.e6;
					await i.deferUpdate();
					const loopArray = [];
					const Commands = client.slash.filter((r) => r.category === name);
					if (Commands.size > 25) {
						loopArray.slice(0, 25);
					}
					Commands.forEach((cmd) => {
						loopArray.push({
							label: cmd.name,
							value: cmd.name,
							description: cmd.description,
							emoji: emo,
						});
					});
					const commandRow = row.setComponents(
						new MessageSelectMenu()
						.setCustomId(name)
						.setPlaceholder(name[0].toUpperCase() + name.toLowerCase().slice(1) + ' commands.')
						.setMinValues(1)
						.setMaxValues(1)
						.addOptions(loopArray),
					);
					embed.setColor(client.config.color.default)
						.setDescription(`\`\`\`${emo} Select what command you need help for!\`\`\``);
					return i.editReply({
						embeds: [embed],
						components: [commandRow],
					});
				};
				if (i.values.includes('mod')) {
					var name = 'mod',
						emo = emoji.e7;
					await i.deferUpdate();
					const loopArray = [];
					const Commands = client.slash.filter((r) => r.category === name);
					if (Commands.size > 25) {
						loopArray.slice(0, 25);
					}
					Commands.forEach((cmd) => {
						loopArray.push({
							label: cmd.name,
							value: cmd.name,
							description: cmd.description,
							emoji: emo,
						});
					});
					const commandRow = row.setComponents(
						new MessageSelectMenu()
						.setCustomId(name)
						.setPlaceholder(name[0].toUpperCase() + name.toLowerCase().slice(1) + ' commands.')
						.setMinValues(1)
						.setMaxValues(1)
						.addOptions(loopArray),
					);
					embed.setColor(client.config.color.default)
						.setDescription(`\`\`\`${emo} Select what command you need help for!\`\`\``);
					return i.editReply({
						embeds: [embed],
						components: [commandRow],
					});
				};
				if (i.values.includes('music')) {
					var name = 'music',
						emo = emoji.e8;
					await i.deferUpdate();
					const loopArray = [];
					const Commands = client.slash.filter((r) => r.category === name);
					if (Commands.size > 25) {
						loopArray.slice(0, 25);
					}
					Commands.forEach((cmd) => {
						loopArray.push({
							label: cmd.name,
							value: cmd.name,
							description: cmd.description,
							emoji: emo,
						});
					});
					const commandRow = row.setComponents(
						new MessageSelectMenu()
						.setCustomId(name)
						.setPlaceholder(name[0].toUpperCase() + name.toLowerCase().slice(1) + ' commands.')
						.setMinValues(1)
						.setMaxValues(1)
						.addOptions(loopArray),
					);
					embed.setColor(client.config.color.default)
						.setDescription(`\`\`\`${emo} Select what command you need help for!\`\`\``);
					return i.editReply({
						embeds: [embed],
						components: [commandRow],
					});
				};
				if (i.values.includes('nsfw')) {
					var name = 'nsfw',
						emo = emoji.e9;
					await i.deferUpdate();
					const loopArray = [];
					const Commands = client.slash.filter((r) => r.category === name);
					if (Commands.size > 25) {
						loopArray.slice(0, 25);
					}
					Commands.forEach((cmd) => {
						loopArray.push({
							label: cmd.name,
							value: cmd.name,
							description: cmd.description,
							emoji: emo,
						});
					});
					const commandRow = row.setComponents(
						new MessageSelectMenu()
						.setCustomId(name)
						.setPlaceholder(name[0].toUpperCase() + name.toLowerCase().slice(1) + ' commands.')
						.setMinValues(1)
						.setMaxValues(1)
						.addOptions(loopArray),
					);
					embed.setColor(client.config.color.default)
						.setDescription(`\`\`\`${emo} Select what command you need help for!\`\`\``);
					return i.editReply({
						embeds: [embed],
						components: [commandRow],
					});
				};
			});
		} catch (e) {
			console.error(e);
			return false;
		}
	},
};
