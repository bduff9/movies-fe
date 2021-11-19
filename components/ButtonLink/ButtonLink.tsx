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
import { Button } from 'bloomer';
import { useRouter } from 'next/router';
import React, { FC, MouseEvent, MouseEventHandler, ReactElement } from 'react';

type ButtonLinkProps = {
	isColor?: string;
	to: string;
	onClick?: MouseEventHandler<HTMLButtonElement>;
};

const ButtonLink: FC<ButtonLinkProps> = ({ onClick, to, ...rest }): ReactElement => {
	const router = useRouter();

	return (
		<Button
			{...rest}
			onClick={(ev: MouseEvent<HTMLButtonElement>): void => {
				onClick && onClick(ev);
				router.push(to);
			}}
		/>
	);
};

ButtonLink.whyDidYouRender = true;

export default ButtonLink;
