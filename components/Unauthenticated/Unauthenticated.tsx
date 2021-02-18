import { useRouter } from 'next/router';
import React, { FC, useContext } from 'react';

import { AuthContext } from '../../hooks/auth';

//import styles from './Unauthenticated.module.scss';

//type UnauthenticatedProps = Record<string, never>;

const Unauthenticated: FC = ({ children }): JSX.Element => {
	const { isSignedIn, loading } = useContext(AuthContext);
	const router = useRouter();

	if (loading) return <div>Loading...</div>;

	if (isSignedIn) {
		router.push('/');

		return <></>;
	}

	return <>{children}</>;
};

Unauthenticated.whyDidYouRender = true;

export default Unauthenticated;
