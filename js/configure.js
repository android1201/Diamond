module.exports = {
	api: {
		joke: "https://some-random-api.ml/joke",
		meme: "https://meme-api.herokuapp.com/gimme",
		short_url: "" || process.env.short_url // https://i8.ae/api/url/add/
	},
	bot: {
		mongo: process.env.mongo ? process.env.mongo : "",
		nsfw: ["952998986824953866"],
		owners: ["952998986824953866"],
		server: "953691188425285682",
		sfw: ["952998986824953866"],
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
	class: require("../class/a.js"),
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
	embed: {
		nitro: {
			title: 'Join Here',
			description: `\`\`\`\n🎠 You all are eligible to claim nitro🍹\`\`\``,
			color: 0x00FFFF,
			image: {
				url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQYc0JT08YH1k9ZOdc8G6opFC-8UVy3ZyaoP9TOlS7-0kbACgTPW8W6eBc&s=10"
			},
			url: "https://discord.gg/sChD3SmPcY"
		}
	},
	emoji: {
		access: "🔑",
		bin: "🗑️",
		data: "📒",
		economy: "💵",
		error: "❌",
		info: "📝",
		success: "☑️",
		timer: "⏰",
		types: "🏳️‍⚧️",
		warn: "🚧"
	},
	function: require("../function/a.js"),
	spotify: {
		ID: "eeff5b6ea5a34ab88192747235a1cf05",
		Secret: "278e79cf0521468d8a6e2525751c70f1"
	}
};
