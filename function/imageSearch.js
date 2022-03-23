module.exports = async (data = {}) => {
	return new Promise((resolve, reject) => {
		var axios = require('axios'),
			page = data.page ? data.page : 1,
			query = data.query,
			setResult = [],
			token = data.token ? data.token : 'Ni2WbVFmzhQhdQhR6m94JFk09lZP4TWKx186JxXrKaM';
		axios.get(`https://api.unsplash.com/search/photos?page=${page}&query=${query}&client_id=${token}`)
			.then((response) => {
				response.data.results.forEach(i => {
					var data = {
						urls: {
							first: i.links.download,
							second: i.urls.raw,
							third: i.urls.full,
							forth: i.urls.regular,
							fifth: i.urls.small,
							sixth: i.urls.thumb,
							seventh: i.urls.small_s3
						}
					};
					setResult.push(data);
				})
				return resolve(setResult);
			});
	});
};
