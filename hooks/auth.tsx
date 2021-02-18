import { CognitoUser } from '@aws-amplify/auth';
import { Auth } from 'aws-amplify';
import React, {
	FC,
	MouseEvent,
	ReactElement,
	useEffect,
	useReducer,
} from 'react';
import Cookies from 'universal-cookie';

import { displayToastMessage } from '../utils/notifications';

interface IAuthContext {
	forgotPassword: (email: string) => Promise<string>;
	isSignedIn: boolean;
	loading: boolean;
	login: (args: {
		email: string;
		password: string;
		remember: boolean;
	}) => Promise<string>;
	logout: (ev: MouseEvent) => void;
	user: null | CognitoUser;
}

interface IAuthContextState {
	isSignedIn: boolean;
	loading: boolean;
	user: CognitoUser | null;
}

interface ILoginParams {
	email: string;
	password: string;
	remember: boolean;
}

export const AuthContext = React.createContext<Partial<IAuthContext>>({});

enum AuthActionType {
	AUTH_SUCCESS = 'AUTH_SUCCESS',
	AUTH_ERROR = 'AUTH_ERROR',
	UNAUTH_SUCCESS = 'UNAUTH_SUCCESS',
}

interface IAuthSucceed {
	type: AuthActionType.AUTH_SUCCESS;
	payload: CognitoUser;
}

interface IAuthFailure {
	type: AuthActionType.AUTH_ERROR | AuthActionType.UNAUTH_SUCCESS;
}

type AuthActions = IAuthFailure | IAuthSucceed;
//type AuthProviderProps = Record<string, never>;

export const COOKIE_NAME = 'authentication';

export const AuthProvider: FC = ({ children }): ReactElement => {
	const initialState: IAuthContextState = {
		isSignedIn: false,
		loading: true,
		user: null,
	};
	const cookies = new Cookies();

	const reducer = (
		state: IAuthContextState,
		action: AuthActions,
	): IAuthContextState => {
		switch (action.type) {
			case AuthActionType.AUTH_ERROR:
			case AuthActionType.UNAUTH_SUCCESS:
				return { ...state, isSignedIn: false, loading: false, user: null };
			case AuthActionType.AUTH_SUCCESS:
				return {
					...state,
					isSignedIn: true,
					loading: false,
					user: action.payload,
				};
			default:
				return state;
		}
	};

	const [state, dispatch] = useReducer(reducer, initialState);

	const setCookie = async (): Promise<void> => {
		const session = await Auth.currentSession();
		const idToken = session.getIdToken().getJwtToken();

		cookies.set(COOKIE_NAME, idToken, { path: '/' });
	};

	useEffect((): (() => void) => {
		let mounted = true;

		(async (): Promise<void> => {
			try {
				const user = await Auth.currentAuthenticatedUser();

				await setCookie();

				if (mounted) {
					dispatch({ type: AuthActionType.AUTH_SUCCESS, payload: user });
				}
			} catch ({ message }) {
				if (message !== 'not authenticated')
					displayToastMessage(message, { type: 'error' });

				dispatch({ type: AuthActionType.AUTH_ERROR });
			}
		})();

		return (): void => {
			mounted = false;
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const forgotPassword = (email: string): Promise<string> =>
		Auth.forgotPassword(email);

	/**
	 * @param {{ email: string, password: string, remember: boolean }} args
	 * @returns Promise<string>
	 */
	const login = async ({ email, password }: ILoginParams): Promise<string> => {
		try {
			const user: CognitoUser = await Auth.signIn(email, password);
			let loggedUser: CognitoUser;
			const code = '';

			// eslint-disable-next-line @typescript-eslint/ban-ts-comment
			// @ts-ignore
			switch (user.challengeName) {
				case 'SMS_MFA':
				case 'SOFTWARE_TOKEN_MFA':
					// eslint-disable-next-line @typescript-eslint/ban-ts-comment
					// @ts-ignore
					loggedUser = await Auth.confirmSignIn(user, code, user.challengeName);

					await setCookie();
					dispatch({ payload: loggedUser, type: AuthActionType.AUTH_SUCCESS });

					return user.getUsername();
				case 'NEW_PASSWORD_REQUIRED':
					loggedUser = await Auth.completeNewPassword(user, password, {
						email,
						family_name: 'Duffey',
						given_name: 'Brian',
					});

					await setCookie();
					dispatch({ payload: loggedUser, type: AuthActionType.AUTH_SUCCESS });

					return user.getUsername();
				case 'MFA_SETUP':
					return Auth.setupTOTP(user);
				default:
					await setCookie();
					dispatch({ payload: user, type: AuthActionType.AUTH_SUCCESS });

					return user.getUsername();
			}
		} catch (err) {
			switch (err.code) {
				case 'UserNotConfirmedException':
					// The error happens if the user didn't finish the confirmation step when signing up
					// In this case you need to resend the code and confirm the user
					// About how to resend the code and confirm the user, please check the signUp part
					console.log('TODO: ', err);

					return Promise.reject(err.message);
				case 'PasswordResetRequiredException':
					// The error happens when the password is reset in the Cognito console
					// In this case you need to call forgotPassword to reset the password
					// Please check the Forgot Password part.
					console.log('TODO: ', err);

					return Promise.reject(err.message);
				default:
					console.log('TODO: ', err);

					return Promise.reject(err.message || err);
			}
		}
	};

	const logout = async (ev: MouseEvent): Promise<false> => {
		ev.preventDefault();

		await Auth.signOut();
		cookies.remove(COOKIE_NAME);

		dispatch({ type: AuthActionType.UNAUTH_SUCCESS });

		return false;
	};

	const authContext: IAuthContext = {
		...state,
		forgotPassword,
		login,
		logout,
	};

	return (
		<AuthContext.Provider value={authContext}>{children}</AuthContext.Provider>
	);
};
