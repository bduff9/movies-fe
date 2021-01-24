// eslint-disable-next-line @typescript-eslint/no-var-requires
const withPWA = require('next-pwa');

const { NODE_ENV } = process.env;
const API_URL =
	NODE_ENV === 'development'
		? 'http://localhost:4000/local/graphql'
		: 'https://i25bveelg5.execute-api.us-east-1.amazonaws.com/prod/graphql';

module.exports = withPWA({
	env: {
		API_URL,
	},
	experimental: { scss: true },
	pwa: {
		dest: 'public',
		maximumFileSizeToCacheInBytes: 3000000,
	},
});
