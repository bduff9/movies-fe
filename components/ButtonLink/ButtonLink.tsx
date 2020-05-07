import { Button } from 'bloomer';
import { useRouter } from 'next/router';
import React, { FC, MouseEvent, MouseEventHandler, ReactElement } from 'react';

type ButtonLinkProps = {
	isColor?: string;
	to: string;
	onClick?: MouseEventHandler<HTMLButtonElement>;
};

const ButtonLink: FC<ButtonLinkProps> = ({
	onClick,
	to,
	...rest
}): ReactElement => {
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
