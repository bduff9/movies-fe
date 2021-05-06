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
