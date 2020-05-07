import { IncomingMessage, ServerResponse } from 'http';

import jwt from 'jsonwebtoken';
import jwkToPem from 'jwk-to-pem';
import Cookies from 'universal-cookie';

import { COOKIE_NAME } from '../hooks/auth';

import jwks from './jwks';

const isAuthed = (idToken: null | string): boolean => {
	if (idToken) {
		try {
			const pem = jwkToPem(jwks.keys[0]);
			const user = jwt.verify(idToken, pem);

			if (user) return true;
		} catch (err) {
			console.error('Failed to auth server side', err.message);
		}
	}

	return false;
};

export const ensureAuthenticated = (
	request: IncomingMessage,
	response: ServerResponse,
): boolean => {
	const cookies = new Cookies(request?.headers?.cookie);
	const idToken = cookies.get(COOKIE_NAME);

	if (isAuthed(idToken)) return true;

	if (response) {
		response.writeHead(302, {
			Location: '/login',
		});
		response.end();
	}

	return false;
};

export const ensureUnauthenticated = (
	request: IncomingMessage,
	response: ServerResponse,
): boolean => {
	const cookies = new Cookies(request?.headers?.cookie);
	const idToken = cookies.get(COOKIE_NAME);

	if (!isAuthed(idToken)) return true;

	if (response) {
		response.writeHead(302, {
			Location: '/',
		});
		response.end();
	}

	return false;
};
