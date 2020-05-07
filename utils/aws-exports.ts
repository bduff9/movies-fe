import Amplify from 'aws-amplify';

Amplify.configure({
	Auth: {
		// REQUIRED - Amazon Cognito Region
		region: 'us-east-1',

		// OPTIONAL - Amazon Cognito User Pool ID
		userPoolId: 'us-east-1_bYrllLUHr',

		// OPTIONAL - Amazon Cognito Web Client ID (26-char alphanumeric string)
		userPoolWebClientId: '5hirvjlsk699etgpcegq4rr2bj',

		// OPTIONAL - Enforce user authentication prior to accessing AWS resources or not
		mandatorySignIn: true,

		// OPTIONAL - Manually set the authentication flow type. Default is 'USER_SRP_AUTH'
		authenticationFlowType: 'USER_PASSWORD_AUTH',
	},
});
