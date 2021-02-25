import { Hero, HeroHeader, Navbar, NavbarBrand, NavbarItem } from 'bloomer';
import { signOut, useSession } from 'next-auth/client';
import React, { FC, ReactElement } from 'react';

import styles from './Header.module.scss';

type HeaderProps = Record<string, never>;

const Header: FC<HeaderProps> = (): ReactElement => {
	const [session] = useSession();

	return (
		<Hero>
			<HeroHeader>
				<Navbar>
					<NavbarBrand className={styles.navbarBrand}>
						<NavbarItem className={styles.expandItem}>Media Tracker</NavbarItem>
						{!!session && (
							<NavbarItem href="#" onClick={(): Promise<void> => signOut()}>
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
