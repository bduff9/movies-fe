import { InMemoryCache, NormalizedCacheObject } from 'apollo-cache-inmemory';
import { persistCacheSync } from 'apollo-cache-persist-dev';
import {
	PersistentStorage,
	PersistedData,
} from 'apollo-cache-persist-dev/types';
import { ApolloClient } from 'apollo-client';
import { setContext } from 'apollo-link-context';
import { createHttpLink } from 'apollo-link-http';
import fetch from 'isomorphic-unfetch';
import withApollo from 'next-with-apollo';
import Cookies from 'universal-cookie';

import { COOKIE_NAME } from '../hooks/auth';

const GRAPHQL_URL = process.env.API_URL;
const cookies = new Cookies();
const isBrowser = !!process.browser;

if (!isBrowser) global.fetch = fetch;

const authLink = setContext((_, { headers }): unknown => {
	const token = cookies.get(COOKIE_NAME);

	return {
		headers: {
			...headers,
			authorization: token || '',
		},
	};
});

const httpLink = createHttpLink({
	fetch,
	uri: GRAPHQL_URL,
});

const link = authLink.concat(httpLink);

export default withApollo(
	({ initialState }): ApolloClient<NormalizedCacheObject> => {
		const cache = new InMemoryCache({
			cacheRedirects: {
				Query: {
					movieItem: (_, args, { getCacheKey }): unknown =>
						getCacheKey({ __typename: 'MovieItem', itemID: args.itemID }),
					movieItems: (_, args, { getCacheKey }): unknown =>
						args.itemIDs.map((itemID: unknown): unknown =>
							getCacheKey({ __typename: 'MovieItems', itemID }),
						),
				},
			},
		}).restore(initialState || {});

		if (typeof window !== 'undefined') {
			persistCacheSync({
				cache,
				storage: window.localStorage as PersistentStorage<
					PersistedData<NormalizedCacheObject>
				>,
			});
		}

		return new ApolloClient({
			cache,
			connectToDevTools: isBrowser,
			link,
			ssrMode: !isBrowser,
		});
	},
);
