module.exports = async (search) => {
	const {
		Utils
	} = require("discord-music-player");
	return Utils.regexList.SpotifyPlaylist.test(search) ||
		Utils.regexList.YouTubePlaylist.test(search) ||
		Utils.regexList.ApplePlaylist.test(search);
};
