module.exports = {
	api: {
		joke: "https://some-random-api.ml/joke",
		meme: "https://meme-api.herokuapp.com/gimme",
		short_url: "" || process.env.short_url // https://i8.ae/api/url/add/
	},
	bot: {
		id: "955013557710372865",
		mongo: process.env.mongo ? process.env.mongo : "",
		owners: ["952998986824953866"],
		prefix: "d?",
		server: "953691188425285682",
		status: "STREAMING",
		status_message: "%servers% servers and watching over %users% members with %emojis% emojis",
		stream_url: "https://www.twitch.tv/monstercat/",
		token: process.env.token ? process.env.token : ""
	},
	channel: {
		anal: ["952923435212873778"],
		boobs: ["952923435212873778"],
		blowjob: ["952923435212873778"],
		cumart: ["952923435212873778"],
		cumsluts: ["952923435212873778"],
		error: "",
		hentai_gif: ["952923435212873778"],
		kemonomimi: ["952923435212873778"],
		lesbian: ["952923435212873778"],
		log: "",
		porn_gif: ["952923435212873778"],
		pussy: ["952923435212873778"],
		pussy_art: ["952923435212873778"],
		pussy_gif: ["952923435212873778"],
		solo: ["952923435212873778"],
		solo_gif: ["952923435212873778"],
		tits: ["952923435212873778"],
		yuri: ["952923435212873778"]
	},
	color: {
		default: "#55EFEE",
		economy: "#48FA30",
		error: "#E1440D",
		success: "#49EB97",
		warn: "#FAE230"
	},
	economy: {
		cash: 5000,
		bank: 0,
		infinity: Infinity
	},
	emoji: {
		bin: "🗑️",
		data: "📒",
		economy: "💵",
		error: "❌",
		info: "⚙️",
		success: "☑️",
		timer: "⏰",
		warn: "🚧"
	},
	spotify: {
		ID: "eeff5b6ea5a34ab88192747235a1cf05",
		Secret: "278e79cf0521468d8a6e2525751c70f1"
	}
};
