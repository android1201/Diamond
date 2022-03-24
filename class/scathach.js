const {
	get
} = require('https'), {
		URL,
		URLSearchParams
	} = require('url'),
	endpoints = require('../endpoint/scathach.js');

function getContent(url) {
	return new Promise((resolve, reject) => {
		get(url, (res) => {
			const {
				statusCode
			} = res;
			if (statusCode !== 200) {
				res.resume();
				reject(`Uh oh, Request failed. ${statusCode}`);
			}
			res.setEncoding('utf8');
			let rawData = '';
			res.on('data', (chunk) => {
				rawData += chunk
			});
			res.on('end', () => {
				try {
					const parsedData = JSON.parse(rawData);
					resolve(parsedData);
				} catch (e) {
					reject(`Error: ${e.message}`);
				}
			});
		}).on('error', (err) => {
			reject(`Error: ${err.message}`);
		})
	});
};
module.exports = class scathach {
	constructor(data = {}) {
		var baseURL = data.url ? data.url : 'https://scathach.redsplit.org/v3';
		this.nsfw = {};
		this.sfw = {};
		Object.keys(endpoints.nsfw).forEach(async (endpoint) => {
			this.nsfw[endpoint] = async function(queryParams = '') {
				let url = new URL(`${baseURL}${endpoints.nsfw[endpoint]}`);
				queryParams !== '' ? url.search = new URLSearchParams(queryParams) : '';
				return await getContent(url.toString());
			};
		});
		Object.keys(endpoints.sfw).forEach(async (endpoint) => {
			this.sfw[endpoint] = async function(queryParams = '') {
				let url = new URL(`${baseURL}${endpoints.sfw[endpoint]}`);
				queryParams !== '' ? url.search = new URLSearchParams(queryParams) : '';
				return await getContent(url.toString());
			};
		});
	}
};
