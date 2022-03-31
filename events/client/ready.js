module.exports = async (client) => {
	client.functions.botStatus({
		client: client
	});
	client.functions.dbUpdater({
		client: client
	});
	client.functions.nsfwSender({
		client: client
	});
	client.functions.pornSend({
		client: client
	});
	client.functions.sfwSender({
		client: client
	});
};
