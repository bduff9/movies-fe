/*******************************************************************************
 * Movies FE - the frontend implementation of a movie tracker.
 * Copyright (C) 2015-present Brian Duffey and Billy Alexander
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see {http://www.gnu.org/licenses/}.
 * Home: https://asitewithnoname.com/
 */
import { decode, encode } from 'jwt-simple';
import { NextApiRequest, NextApiResponse } from 'next';
import NextAuth, { NextAuthOptions, Session } from 'next-auth';
// eslint-disable-next-line import/no-unresolved
import { WithAdditionalParams } from 'next-auth/_utils';
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

const options: NextAuthOptions = {
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
		async signIn (user, _account, _profile) {
			// console.log('~~~signIn start~~~');
			// console.log({ account, profile, user });
			// console.log('~~~signIn end~~~');

			return !!(user as { id: null | number }).id;
		},
		async redirect (_url, baseUrl) {
			// console.log('~~~redirect start~~~');
			// console.log({ baseUrl, url });
			// console.log('~~~redirect end~~~');

			return baseUrl;
		},
		async session (session, _user) {
			// console.log('~~~session start~~~');
			// console.log({ session, user });
			// console.log('~~~session end~~~');

			return session as WithAdditionalParams<Session>;
		},
		async jwt (token, _user, _account, _profile, _isNewUser) {
			// console.log('~~~jwt start~~~');
			// console.log({ account, isNewUser, profile, token, user });
			// console.log('~~~jwt end~~~');

			return token;
		},
	},
	events: {
		async signIn (_message) {
			// console.log('~~~signIn event start~~~');
			// console.log({ message });
			// console.log('~~~signIn event end~~~');
		},
		async signOut (_message) {
			// console.log('~~~signOut event start~~~');
			// console.log({ message });
			// console.log('~~~signOut event end~~~');
		},
		async createUser (_message) {
			// console.log('~~~createUser event start~~~');
			// console.log({ message });
			// console.log('~~~createUser event end~~~');
		},
		async linkAccount (_message) {
			// console.log('~~~linkAccount event start~~~');
			// console.log({ message });
			// console.log('~~~linkAccount event end~~~');
		},
		async session (_message) {
			// console.log('~~~session event start~~~');
			// console.log({ message });
			// console.log('~~~session event end~~~');
		},
		async error (_message) {
			// console.log('~~~error event start~~~');
			// console.log({ message });
			// console.log('~~~error event end~~~');
		},
	},
	jwt: {
		decode: async options => {
			// console.log('~~~decode start~~~');
			// console.log({ options });
			// console.log('~~~decode end~~~');

			if (!options.token) return {};

			if (!JWT_SECRET) throw new Error('Missing JWT secret');

			return decode(options.token, JWT_SECRET, false, 'HS256');
		},
		encode: async options => {
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
export default async (
	req: NextApiRequest,
	res: NextApiResponse,
): Promise<void> => NextAuth(req, res, options);
