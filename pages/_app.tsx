import { ApolloProvider } from '@apollo/react-hooks';
import { config } from '@fortawesome/fontawesome-svg-core';
import whyDidYouRender from '@welldone-software/why-did-you-render';
import { NormalizedCacheObject } from 'apollo-cache-inmemory';
import ApolloClient from 'apollo-client';
import { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import React, { useEffect, useState, FC } from 'react';

import Layout from '../components/Layout/Layout';
import { AuthProvider } from '../hooks/auth';
import withData from '../utils/apollo-client';

import '../styles.scss';
import '../utils/aws-exports';
import '../utils/icons';
import '@fortawesome/fontawesome-svg-core/styles.css';

config.autoAddCss = false;

if (typeof window !== 'undefined' && process.env.NODE_ENV === 'development') {
	whyDidYouRender(React);
}

const MoviesApp: FC<AppProps & {
	apollo: ApolloClient<NormalizedCacheObject>;
}> = ({ apollo, Component, pageProps }): JSX.Element => {
	const router = useRouter();
	const [isLoading, setIsLoading] = useState<boolean>(false);

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

	return (
		<AuthProvider>
			<ApolloProvider client={apollo}>
				<Layout isLoading={isLoading}>
					<Component {...pageProps} />
				</Layout>
			</ApolloProvider>
		</AuthProvider>
	);
};

export default withData(MoviesApp);
