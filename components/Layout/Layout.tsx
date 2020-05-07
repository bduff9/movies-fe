import React, { FC, ReactElement } from 'react';

import Header from '../Header/Header';

import styles from './Layout.module.scss';

type LayoutProps = {
	isLoading: boolean;
};

const Layout: FC<LayoutProps> = ({
	children /* , isLoading */,
}): ReactElement => {
	return (
		<div className={styles.fullCoverage}>
			<Header />
			{children}
		</div>
	);
};

Layout.whyDidYouRender = true;

export default Layout;
