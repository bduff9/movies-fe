import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { FC, ReactElement } from 'react';

const Loading: FC<{}> = (): ReactElement => (
	<>
		<FontAwesomeIcon icon="spinner" spin />
		&nbsp; Loading...
	</>
);

Loading.whyDidYouRender = true;

export default Loading;
