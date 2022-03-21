module.exports = async (data = {}) => {
	min = Math.ceil(data.min);
	max = Math.floor(data.max);
	return Math.floor(Math.random() * (max - min + 1)) + min;
};
