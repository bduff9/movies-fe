import { decode, encode } from 'jwt-simple';
import { NextApiRequest, NextApiResponse } from 'next';
import NextAuth, { InitOptions } from 'next-auth';
// eslint-disable-next-line import/no-unresolved
import { SessionBase } from 'next-auth/_utils';
import Adapters from 'next-auth/adapters';
import Providers from 'next-auth/providers';

import Models from '../../../models';

const {
	DATABASE_URL,
	EMAIL_FROM,
	EMAIL_PASSWORD,
	EMAIL_USERNAME,
	JWT_SECRET,
	NEXTAUTH_URL,
} = process.env;

if (!DATABASE_URL) throw new Error('Missing database URL');

if (!EMAIL_PASSWORD) throw new Error('Missing email server password');

if (!EMAIL_USERNAME) throw new Error('Missing email server username');

const options: InitOptions = {
	adapter: Adapters.TypeORM.Adapter(
		{
			type: 'mysql',
			url: DATABASE_URL,
		},
		{
			models: { ...Models },
		},
	),
	callbacks: {
		async signIn (user, _account, _profile): Promise<boolean> {
			// console.log('~~~signIn start~~~');
			// console.log({ account, profile, user });
			// console.log('~~~signIn end~~~');

			return !!(user as { id: null | number }).id;
		},
		async redirect (_url, baseUrl): Promise<string> {
			// console.log('~~~redirect start~~~');
			// console.log({ baseUrl, url });
			// console.log('~~~redirect end~~~');

			return baseUrl;
		},
		async session (session, _user): Promise<SessionBase> {
			// console.log('~~~session start~~~');
			// console.log({ session, user });
			// console.log('~~~session end~~~');

			return session;
		},
		async jwt (
			token,
			_user,
			_account,
			_profile,
			_isNewUser,
		): Promise<Record<string, unknown>> {
			// console.log('~~~jwt start~~~');
			// console.log({ account, isNewUser, profile, token, user });
			// console.log('~~~jwt end~~~');

			return token;
		},
	},
	events: {
		async signIn (_message): Promise<void> {
			// console.log('~~~signIn event start~~~');
			// console.log({ message });
			// console.log('~~~signIn event end~~~');
		},
		async signOut (_message): Promise<void> {
			// console.log('~~~signOut event start~~~');
			// console.log({ message });
			// console.log('~~~signOut event end~~~');
		},
		async createUser (_message): Promise<void> {
			// console.log('~~~createUser event start~~~');
			// console.log({ message });
			// console.log('~~~createUser event end~~~');
		},
		async linkAccount (_message): Promise<void> {
			// console.log('~~~linkAccount event start~~~');
			// console.log({ message });
			// console.log('~~~linkAccount event end~~~');
		},
		async session (_message): Promise<void> {
			// console.log('~~~session event start~~~');
			// console.log({ message });
			// console.log('~~~session event end~~~');
		},
		async error (_message): Promise<void> {
			// console.log('~~~error event start~~~');
			// console.log({ message });
			// console.log('~~~error event end~~~');
		},
	},
	jwt: {
		decode: async (options): Promise<Record<string, string>> => {
			// console.log('~~~decode start~~~');
			// console.log({ options });
			// console.log('~~~decode end~~~');

			if (!options.token) return {};

			if (!JWT_SECRET) throw new Error('Missing JWT secret');

			return decode(options.token, JWT_SECRET, false, 'HS256');
		},
		encode: async (options): Promise<string> => {
			// console.log('~~~encode start~~~');
			// console.log({ options });
			// console.log('~~~encode end~~~');

			if (!JWT_SECRET) throw new Error('Missing JWT secret');

			return encode(options.token, JWT_SECRET, 'HS256');
		},
	},
	pages: {
		newUser: null,
		signIn: '/auth/login',
		signOut: '/auth/login',
	},
	providers: [
		Providers.Email({
			server: `smtps://${EMAIL_USERNAME}:${EMAIL_PASSWORD}@email-smtp.us-east-1.amazonaws.com:465`,
			from: EMAIL_FROM,
		}),
	],
	secret: 'The ASWNN Movies application',
	session: {
		jwt: true,
		maxAge: 30 * 24 * 60 * 60, // 30 days
	},
	// eslint-disable-next-line @typescript-eslint/ban-ts-comment
	// @ts-ignore
	site: NEXTAUTH_URL,
};

// ts-prune-ignore-next
export default (req: NextApiRequest, res: NextApiResponse): Promise<void> =>
	NextAuth(req, res, options);
