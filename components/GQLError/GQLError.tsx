import { ApolloError } from 'apollo-boost';
import React, { FC, ReactElement } from 'react';

interface GQLErrorProps {
	debugMessage?: string;
	error: ApolloError | Error | undefined;
	hasData?: boolean;
	message?: string;
}

const GQLError: FC<GQLErrorProps> = ({
	debugMessage,
	error,
	hasData = true,
	message = 'Something went wrong, please try again',
}): ReactElement => {
	if (debugMessage) console.error(debugMessage, { error, hasData });

	return (
		<div>
			{message}
			{error && `: ${error}`}
			{!hasData && 'Data failed to load'}
		</div>
	);
};

GQLError.whyDidYouRender = true;

export default GQLError;
