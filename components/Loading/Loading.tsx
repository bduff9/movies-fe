import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { FC, ReactElement } from 'react';

type LoadingProps = Record<string, never>;

const Loading: FC<LoadingProps> = (): ReactElement => (
	<>
		<FontAwesomeIcon icon="spinner" spin />
		&nbsp; Loading...
	</>
);

Loading.whyDidYouRender = true;

export default Loading;
