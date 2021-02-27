import {
	ApolloClient,
	InMemoryCache,
	NormalizedCacheObject,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { createHttpLink } from '@apollo/client/link/http';
import { persistCache, LocalStorageWrapper } from 'apollo3-cache-persist';
import fetch from 'isomorphic-unfetch';

const GRAPHQL_URL = process.env.NEXT_PUBLIC_API_URL;
const isBrowser = !!process.browser;

if (!isBrowser) global.fetch = fetch;

export const getApolloClient = async (): Promise<
	ApolloClient<NormalizedCacheObject>
> => {
	const authLink = setContext(
		async (_, { headers }): Promise<unknown> => {
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
