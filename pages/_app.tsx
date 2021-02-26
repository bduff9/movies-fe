import {
	ApolloClient,
	ApolloProvider,
	NormalizedCacheObject,
} from '@apollo/client';
import { config } from '@fortawesome/fontawesome-svg-core';
import * as Sentry from '@sentry/browser';
import whyDidYouRender from '@welldone-software/why-did-you-render';
import { Provider } from 'next-auth/client';
import { AppProps } from 'next/app';
import Head from 'next/head';
import { useRouter } from 'next/router';
import React, { useEffect, useState, FC } from 'react';

import Layout from '../components/Layout/Layout';
import { getApolloClient } from '../utils/apollo-client';

import '../styles.scss';
import '../utils/icons';
import '@fortawesome/fontawesome-svg-core/styles.css';

config.autoAddCss = false;

if (typeof window !== 'undefined' && process.env.NODE_ENV === 'development') {
	whyDidYouRender(React);
}

if (process.env.NEXT_PUBLIC_SENTRY_DSN) {
	Sentry.init({
		enabled: process.env.NODE_ENV === 'production',
		dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
	});
}

type SentryProps = { err: unknown };

const MoviesApp: FC<AppProps & SentryProps> = ({
	Component,
	err,
	pageProps,
}): JSX.Element => {
	const router = useRouter();
	const [client, setClient] = useState<ApolloClient<NormalizedCacheObject>>();
	const [isLoading, setIsLoading] = useState<boolean>(false);

	useEffect((): void => {
		const initApollo = async (): Promise<void> => {
			const apolloClient = await getApolloClient();

			setClient(apolloClient);
		};

		initApollo().catch(console.error);
	}, []);

	useEffect((): (() => void) => {
		let mounted = true;

		const handleStart = (url: string): void => {
			if (url !== router.pathname && mounted) {
				setIsLoading(true);
			}
		};

		const handleComplete = (url: string): void => {
			if (url !== router.pathname && mounted) {
				setIsLoading(false);
			}
		};

		router.events.on('routeChangeStart', handleStart);
		router.events.on('routeChangeComplete', handleComplete);
		router.events.on('routeChangeError', handleComplete);

		return (): void => {
			mounted = false;
			router.events.off('routeChangeStart', handleStart);
			router.events.off('routeChangeComplete', handleComplete);
			router.events.off('routeChangeError', handleComplete);
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	if (!client) {
		return <h2>Initializing app...</h2>;
	}

	return (
		<Provider session={pageProps.session}>
			<Head>
				<meta charSet="utf-8" />
				<meta httpEquiv="X-UA-Compatible" content="IE=edge" />
				<meta
					name="viewport"
					content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no"
				/>
				<meta name="description" content="Description" />
				<meta name="keywords" content="Keywords" />
				<link rel="manifest" href="/manifest.json" />
				<link
					href="/favicon-16x16.png"
					rel="icon"
					type="image/png"
					sizes="16x16"
				/>
				<link
					href="/favicon-32x32.png"
					rel="icon"
					type="image/png"
					sizes="32x32"
				/>
				<link rel="apple-touch-icon" href="/apple-icon.png"></link>
				<meta name="theme-color" content="#53b3ea" />
			</Head>
			<ApolloProvider client={client}>
				<Layout isLoading={isLoading}>
					<Component {...pageProps} err={err} />
				</Layout>
			</ApolloProvider>
		</Provider>
	);
};

// ts-prune-ignore-next
export default MoviesApp;
