module.exports = async (client) => {
	client.functions.botStatus({
		client: client
	});
	client.functions.pornSend({
		client: client
	});
	client.functions.dbUpdater({
		client: client
	});
};
/*
{
	color: 0x0099ff,
	title: '',
	url: '',
	author: {
		name: '',
		icon_url: '',
		url: '',
	},
	description: '',
	thumbnail: {
		url: '',
	},
	fields: [
		{
			name: '',
			value: '',
		},
		{
			name: '',
			value: '',
			inline: false,
		}
	],
	image: {
		url: '',
	},
	timestamp: new Date(),
	footer: {
		text: '',
		icon_url: '',
	},
}
*/
