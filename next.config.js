/* eslint-disable @typescript-eslint/no-var-requires */
const withOffline = require('next-offline');

module.exports = withOffline({
	env: {
		API_URL: 'http://localhost:4000/dev/graphql',
	},
	experimental: { scss: true },
});
