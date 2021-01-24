import { useRouter } from 'next/router';
import React, { FC, useContext } from 'react';

import { AuthContext } from '../../hooks/auth';

//import styles from './Authenticated.module.scss';

type AuthenticatedProps = Record<string, never>;

const Authenticated: FC<AuthenticatedProps> = ({ children }): JSX.Element => {
	const { isSignedIn, loading } = useContext(AuthContext);
	const router = useRouter();

	if (loading) return <div>Loading...</div>;

	if (!isSignedIn) {
		router.push('/login');

		return <></>;
	}

	return <>{children}</>;
};

Authenticated.whyDidYouRender = true;

export default Authenticated;
