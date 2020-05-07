import { InMemoryCache, NormalizedCacheObject } from 'apollo-cache-inmemory';
import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import fetch from 'isomorphic-unfetch';

const createApolloClient = (
	initialState: NormalizedCacheObject,
	ctx: unknown,
): ApolloClient<NormalizedCacheObject> => {
	// The `ctx` (NextPageContext) will only be present on the server.
	// use it to extract auth headers (ctx.req) or similar.
	return new ApolloClient({
		ssrMode: Boolean(ctx),
		link: new HttpLink({
			uri: 'https://api.graph.cool/simple/v1/cixmkt2ul01q00122mksg82pn', // Server URL (must be absolute)
			credentials: 'same-origin', // Additional fetch() options like `credentials` or `headers`
			fetch,
		}),
		cache: new InMemoryCache().restore(initialState),
	});
};

export default createApolloClient;
