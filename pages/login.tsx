import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	Button,
	Card,
	Content,
	CardHeader,
	Control,
	Field,
	Input,
	Label,
	Level,
	LevelLeft,
	LevelRight,
	Title,
} from 'bloomer';
import clsx from 'clsx';
import { NextPage, NextPageContext } from 'next';
import Head from 'next/head';
import React, { FormEvent, ReactElement, useContext, useState } from 'react';

import Unauthenticated from '../components/Unauthenticated/Unauthenticated';
import { AuthContext } from '../hooks/auth';
import { ensureUnauthenticated } from '../utils/auth';

import styles from './login.module.scss';

type LoginProps = {};

const Login: NextPage<LoginProps> = (): ReactElement => {
	const { forgotPassword, login } = useContext(AuthContext);
	const [email, setEmail] = useState<string>('');
	const [error, setError] = useState<string>('');
	const [loading, setLoading] = useState<boolean>(false);
	const [password, setPassword] = useState<string>('');
	const [remember, setRemember] = useState<boolean>(false);
	const [viewPassword, setViewPassword] = useState<boolean>(false);

	return (
		<Unauthenticated>
			<div className={styles.loginPage}>
				<Head>
					<title>Movies - Login</title>
					<link rel="icon" href="/favicon.ico" />
				</Head>

				<Card className={styles.loginCard}>
					<CardHeader className={styles.cardHeader} hasTextAlign="centered">
						<Title hasTextColor="white">Please Sign In</Title>
					</CardHeader>
					<Content className={styles.content}>
						<form
							onSubmit={async (ev): Promise<false> => {
								ev.preventDefault();

								if (!login) {
									setError('No login function found!');

									return false;
								}

								setLoading(true);
								await login({ email, password, remember }).catch(
									(err): void => {
										setLoading(false);
										setError(err);
									},
								);

								return false;
							}}
						>
							{error && (
								<Title isSize={5} hasTextColor="danger">
									{error}
								</Title>
							)}
							<Field>
								<Control hasIcons="left">
									<Input
										autoComplete="email"
										autoFocus
										className={styles.input}
										id="email"
										name="email"
										onChange={(ev: FormEvent<HTMLInputElement>): void =>
											setEmail(ev.currentTarget.value)
										}
										placeholder="Email"
										required
										title="email"
										type="email"
									/>
									<span className="icon is-left is-small">
										<FontAwesomeIcon icon="envelope" />
									</span>
								</Control>
							</Field>
							<Field hasAddons>
								<Control hasIcons="left">
									<Input
										autoComplete="current-password"
										className={styles.input}
										id="password"
										name="password"
										onChange={(ev: FormEvent<HTMLInputElement>): void =>
											setPassword(ev.currentTarget.value)
										}
										placeholder="Password"
										required
										title="password"
										type={viewPassword ? 'text' : 'password'}
									/>
									<span className="icon is-left is-small">
										<FontAwesomeIcon icon="lock" />
									</span>
								</Control>
								<Control>
									<Button
										className={styles.togglePassword}
										onClick={(): void => setViewPassword(!viewPassword)}
									>
										{viewPassword ? (
											<FontAwesomeIcon icon="eye-slash" />
										) : (
											<FontAwesomeIcon icon="eye" />
										)}
									</Button>
								</Control>
							</Field>
							<Level className={styles.level}>
								<LevelLeft className={styles.levelLeft}>
									<Input
										className={clsx('checkbox', styles.checkbox)}
										id="checkbox"
										onChange={(ev: FormEvent<HTMLInputElement>): void =>
											setRemember(ev.currentTarget.checked)
										}
										type="checkbox"
									/>
									<Label htmlFor="checkbox" />
									<span>Remember me</span>
								</LevelLeft>
								<LevelRight>
									<a
										href="#"
										className={styles.loginLink}
										onClick={(): void => {
											if (!forgotPassword) {
												setError('No forgot password function found');

												return;
											}

											forgotPassword(email).catch(setError);
										}}
									>
										Forgot Password?
									</a>
								</LevelRight>
							</Level>
							<Field>
								<Control>
									<Button
										type="submit"
										className={styles.loginButton}
										isColor="primary"
										isOutlined
										isLoading={loading}
									>
										Login
									</Button>
								</Control>
							</Field>
						</form>
					</Content>
				</Card>
			</div>
		</Unauthenticated>
	);
};

Login.getInitialProps = ({ req, res }: NextPageContext): LoginProps => {
	if (req && res) {
		ensureUnauthenticated(req, res);
	}

	return {};
};

Login.whyDidYouRender = true;

export default Login;
