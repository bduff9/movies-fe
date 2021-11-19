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
import { ApolloClient, InMemoryCache } from '@apollo/client';
import type { NormalizedCacheObject } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { createHttpLink } from '@apollo/client/link/http';
import { persistCache, LocalStorageWrapper } from 'apollo3-cache-persist';
import fetch from 'isomorphic-unfetch';
import { getSession } from 'next-auth/client';

import { NEXT_PUBLIC_API_URL } from './constants';

const GRAPHQL_URL = NEXT_PUBLIC_API_URL;
const isBrowser = !!process.browser;

if (!isBrowser) global.fetch = fetch;

export const getApolloClient = async (): Promise<ApolloClient<NormalizedCacheObject>> => {
	const authLink = setContext(
		async (_, { headers }): Promise<unknown> => {
			const session = await getSession({});

			if (!headers) {
				headers = {} as HeadersInit;
			}

			if (session) {
				headers.authorization = `Bearer ${session.accessToken}`;
			}

			return {
				headers: {
					...headers,
				},
			};
		},
	);

	const httpLink = createHttpLink({
		credentials: 'include',
		fetch,
		uri: GRAPHQL_URL,
	});

	const link = authLink.concat(httpLink);
	const cache = new InMemoryCache();

	await persistCache({
		cache,
		storage: new LocalStorageWrapper(window.localStorage),
	});

	return new ApolloClient({
		cache,
		connectToDevTools: isBrowser,
		link,
		ssrMode: !isBrowser,
	});
};
