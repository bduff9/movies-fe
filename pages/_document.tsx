/*
Movies FE - the frontend implementation of a movie tracker.
Copyright (C) 2015-present Brian Duffey and Billy Alexander
This program is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.
This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.
You should have received a copy of the GNU General Public License
along with this program.  If not, see {http://www.gnu.org/licenses/}.
Home: https://asitewithnoname.com/
*/
import Document, { Html, Head, Main, NextScript } from 'next/document';
import React from 'react';

import { NEXT_PUBLIC_ENV, NEXT_PUBLIC_SITE_URL } from '../utils/constants';

const appTitle = 'Movie Tracker';
const appDescription = 'A movie tracker application';
const appColor = '#2fa4e7';
const safariTabColor = '#000';
const siteName = 'A Site With No Name';
const ogImage = `https://asitewithnoname.com/img/apps/movies.png`;
const twitterAccount = '@Duffmaster33';

class MyDocument extends Document {
	render (): JSX.Element {
		return (
			<Html lang="en">
				<Head>
					<meta charSet="utf-8" />
					<meta httpEquiv="X-UA-Compatible" content="IE=edge" />
					<meta name="application-name" content={appTitle} />
					<meta name="apple-mobile-web-app-capable" content="yes" />
					<meta
						name="apple-mobile-web-app-status-bar-style"
						content="default"
					/>
					<meta name="apple-mobile-web-app-title" content={appTitle} />
					<meta name="description" content={appDescription} />
					<meta name="format-detection" content="telephone=no" />
					<meta name="mobile-web-app-capable" content="yes" />
					<meta name="msapplication-config" content="/browserconfig.xml" />
					<meta name="msapplication-TileColor" content={appColor} />
					<meta name="msapplication-tap-highlight" content="no" />
					<link
						rel="mask-icon"
						href="/safari-pinned-tab.svg"
						color={safariTabColor}
					/>
					<meta name="twitter:card" content="summary" />
					<meta name="twitter:url" content={NEXT_PUBLIC_SITE_URL} />
					<meta name="twitter:title" content={appTitle} />
					<meta name="twitter:description" content={appDescription} />
					<meta name="twitter:image" content={ogImage} />
					<meta name="twitter:creator" content={twitterAccount} />
					<meta property="og:title" content={appTitle} />
					<meta property="og:site_name" content={siteName} />
					<meta property="og:url" content={`${NEXT_PUBLIC_SITE_URL}/`} />
					<meta property="og:description" content={appDescription} />
					<meta property="og:type" content="website" />
					<meta property="og:image" content={ogImage} />
					<link rel="manifest" href="/manifest.json" />
					<meta property="theme-color" content={appColor} />
					<link rel="apple-touch-icon" href="/icon-192x192.png" />
					<meta name="apple-mobile-web-app-status-bar" content={appColor} />
					{/*<!-- Cloudflare Web Analytics -->*/}
					{NEXT_PUBLIC_ENV === 'production' ? (
						<script
							defer
							src="https://static.cloudflareinsights.com/beacon.min.js"
							data-cf-beacon='{"token": "330a3512492e41679e0a3edfc6eb7c46", "spa": true}'
						></script>
					) : NEXT_PUBLIC_ENV === 'preview' ? (
						<script
							defer
							src="https://static.cloudflareinsights.com/beacon.min.js"
							data-cf-beacon='{"token": "d7364f5535ad463f8c13ab36a26f5566", "spa": true}'
						></script>
					) : null}
					{/*<!-- End Cloudflare Web Analytics -->*/}
				</Head>
				<body>
					<Main />
					<NextScript />
				</body>
			</Html>
		);
	}
}

// ts-prune-ignore-next
export default MyDocument;
