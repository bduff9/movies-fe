import jwkToPem from 'jwk-to-pem';

const jwks = {
	keys: [
		{
			alg: 'RS256',
			e: 'AQAB',
			kid: 'K/4TvOO5xcxcLwy1+mCDo0o3kM7LawnRbOVyBPVwNyc=',
			kty: 'RSA',
			n:
				'vl_zIWwAi9RjKiDTRVPw9vTxswQZSOV-gVRVfwcWbfO6IoqVAcDouC9lu-esRmy_QFy2j2T8m5ayT5igH5L1mKvU_pVEDm_DqIt0Z7yr6CtV7NYA8siEL8Ho_YqAglyTJMQRgnrN9EOZaaCMX5pbIy67aU6LiYdYYLW4Jrl1PLQXHXXABNcMvF-gKrIlrBpmdhj_9E_PA06YpTUp2ZxeIYJ4s9NaLtQ6YEpxeqCZSmBvqI-7hWS3h_WGS1BEbwkBAgavxGJFAG3oMm9iKC5-6gvcqdoXiX05R2volkIHvPv2EAIbR37TJBUJqia3zWqFwguu_47gqXWyctHYneQTYw',
			use: 'sig',
		} as jwkToPem.RSA,
		{
			alg: 'RS256',
			e: 'AQAB',
			kid: 'UtXxBwQ+NnWxZAEJT9ojLvkxaglBUz1B88e84oZmJTk=',
			kty: 'RSA',
			n:
				'vtWtWG2luTjA1CgKXnpRGtjcpIzJgHIW2W5dyPVN-nGi8Ev7ZmNBmWP_bsATmAUlto5aUmBLtS2-y-9bzgxh0NtZq8e68inuFhepEdoWASE24oRTPuyPFn9FDbHy3NTA81FSUSufqKiTSmYUQFCqRSTdyflCMYuiKaaqSIhKluw4OfWy-flGaE4gnyd-zEJBUY-RHLGFIglgTqVt46K8RY_3fxYZIsyrYeULNgtDaqjYVbGawQxBr9Klg8bKNepsn4egTidGJnhoLmRcLT5I5lcPsUdtzKXwplxBDYisMxqtLP658k68cKN2a4HdoIBVJ8lhVnZpIuWaDfBSmqI5Qw',
			use: 'sig',
		} as jwkToPem.RSA,
	],
};

export default jwks;
