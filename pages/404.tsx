import { NextPage } from 'next';
import React from 'react';

const Custom404: NextPage = () => {
	return <h1>404 - Page Not Found</h1>;
};

Custom404.whyDidYouRender = true;

// ts-prune-ignore-next
export default Custom404;
