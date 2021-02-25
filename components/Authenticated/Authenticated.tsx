import { useSession } from 'next-auth/client';
import { useRouter } from 'next/router';
import React, { FC } from 'react';

//import styles from './Authenticated.module.scss';

//type AuthenticatedProps = Record<string, never>;

const Authenticated: FC = ({ children }): JSX.Element => {
	const [session, loading] = useSession();
	const router = useRouter();

	if (loading) return <div>Loading...</div>;

	if (!session) {
		router.push('/auth/login');

		return <></>;
	}

	return <>{children}</>;
};

Authenticated.whyDidYouRender = true;

export default Authenticated;
