const {
	get
} = require('http'),
	{
	URL,
	URLSearchParams
} = require('url'),
	baseURL = 'http://192.145.238.5/~pasirm5/v3sca',
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
	constructor() {
		let self = this;
		self.animated = {};
		self.nsfw = {};
		self.sex = {};
		self.sfw = {};
		Object.keys(endpoints.animated).forEach(async (endpoint) => {
			self.animated[endpoint] = async function(queryParams = '') {
				let url = new URL(`${baseURL}${endpoints.animated[endpoint]}`);
				queryParams !== '' ? url.search = new URLSearchParams(queryParams) : '';
				return await getContent(url.toString());
			};
		});
		Object.keys(endpoints.nsfw).forEach(async (endpoint) => {
			self.nsfw[endpoint] = async function(queryParams = '') {
				let url = new URL(`${baseURL}${endpoints.nsfw[endpoint]}`);
				queryParams !== '' ? url.search = new URLSearchParams(queryParams) : '';
				return await getContent(url.toString());
			};
		});
		Object.keys(endpoints.sex).forEach(async (endpoint) => {
			self.sex[endpoint] = async function(queryParams = '') {
				let url = new URL(`${baseURL}${endpoints.sex[endpoint]}`);
				queryParams !== '' ? url.search = new URLSearchParams(queryParams) : '';
				return await getContent(url.toString());
			};
		});
		Object.keys(endpoints.sfw).forEach(async (endpoint) => {
			self.sfw[endpoint] = async function(queryParams = '') {
				let url = new URL(`${baseURL}${endpoints.sfw[endpoint]}`);
				queryParams !== '' ? url.search = new URLSearchParams(queryParams) : '';
				return await getContent(url.toString());
			};
		});
	}
};
