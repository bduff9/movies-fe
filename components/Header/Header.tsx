import { Hero, HeroHeader, Navbar, NavbarBrand, NavbarItem } from 'bloomer';
import React, { FC, ReactElement, useContext } from 'react';

import { AuthContext } from '../../hooks/auth';

import styles from './Header.module.scss';

type HeaderProps = Record<string, never>;

const Header: FC<HeaderProps> = (): ReactElement => {
	const { isSignedIn, logout } = useContext(AuthContext);

	return (
		<Hero>
			<HeroHeader>
				<Navbar>
					<NavbarBrand className={styles.navbarBrand}>
						<NavbarItem className={styles.expandItem}>Media Tracker</NavbarItem>
						{isSignedIn && (
							<NavbarItem href="#" onClick={logout}>
								Log out
							</NavbarItem>
						)}
					</NavbarBrand>
				</Navbar>
			</HeroHeader>
		</Hero>
	);
};

Header.whyDidYouRender = true;

export default Header;
