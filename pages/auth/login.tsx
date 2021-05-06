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
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	Button,
	Card,
	Content,
	CardHeader,
	Control,
	Field,
	Input,
	Title,
} from 'bloomer';
import { GetServerSideProps, NextPage } from 'next';
import { signIn, getSession } from 'next-auth/client';
import Head from 'next/head';
import React, { FormEvent, ReactElement, useState } from 'react';

import Unauthenticated from '../../components/Unauthenticated/Unauthenticated';

import styles from './login.module.scss';

type LoginProps = Record<string, never>;
type TFormState = 'READY' | 'LOADING' | 'ERRORED' | 'SUBMITTED';

const Login: NextPage<LoginProps> = (): ReactElement => {
	const [email, setEmail] = useState<string>('');
	const [error, setError] = useState<string>('');
	const [formState, setFormState] = useState<TFormState>('READY');

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
						{formState !== 'SUBMITTED' ? (
							<form
								onSubmit={async (ev): Promise<false> => {
									ev.preventDefault();
									setFormState('LOADING');

									try {
										const callbackUrl = undefined; //TODO: check localStorage for redirect url, and if found, clear it

										await signIn('email', {
											callbackUrl,
											email,
										});

										setFormState('SUBMITTED');
									} catch (error) {
										setError(error);
										setFormState('ERRORED');
									}

									return false;
								}}
							>
								{formState === 'ERRORED' && (
									<Title isSize={5} hasTextColor="danger">
										{error || 'Something went wrong, please try again'}
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
								<Field>
									<Control>
										<Button
											type="submit"
											className={styles.loginButton}
											isColor="primary"
											isOutlined
											isLoading={formState === 'LOADING'}
										>
											Login
										</Button>
									</Control>
								</Field>
							</form>
						) : (
							<>
								<h3>Please check your email to sign in</h3>
								<h5>You may close this window</h5>
							</>
						)}
					</Content>
				</Card>
			</div>
		</Unauthenticated>
	);
};

// ts-prune-ignore-next
export const getServerSideProps: GetServerSideProps = async context => {
	const session = await getSession(context);
	const { res } = context;

	if (session) {
		res.writeHead(302, { Location: '/' });
		res.end();
	}

	return { props: {} };
};

Login.whyDidYouRender = true;

// ts-prune-ignore-next
export default Login;
