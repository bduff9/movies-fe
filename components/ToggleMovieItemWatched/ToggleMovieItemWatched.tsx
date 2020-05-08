import { useMutation } from '@apollo/react-hooks';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { CardFooterItem } from 'bloomer';
import gql from 'graphql-tag';
import React, { FC, memo, ReactElement } from 'react';

import { MutationMarkMovieWatchedArgs, YesNo } from '../../graphql/output';

const TOGGLE_WATCHED = gql`
	mutation markMovieWatched($itemID: Int!, $isWatched: YesNo!) {
		markMovieWatched(itemID: $itemID, isWatched: $isWatched) {
			__typename
			itemID
			isWatched
		}
	}
`;

interface ToggleMovieItemWatchedData {
	__typename: 'Mutation';
	markMovieWatched: {
		__typename: 'MovieItem';
		itemID: number;
		isWatched: YesNo;
	};
}

interface ToggleMovieItemWatchedProps {
	isWatched: boolean;
	itemID: number;
}

const ToggleMovieItemWatched: FC<ToggleMovieItemWatchedProps> = ({
	isWatched,
	itemID,
}): ReactElement => {
	const [toggleWatched, { error, loading }] = useMutation<
		ToggleMovieItemWatchedData,
		MutationMarkMovieWatchedArgs
	>(TOGGLE_WATCHED);
	let newWatched: YesNo = YesNo.N;
	let text = 'Watched';
	let textColor: string | undefined = 'success';

	if (!isWatched) {
		newWatched = YesNo.Y;
		text = 'Mark Watched';
		textColor = undefined;
	}

	return (
		<CardFooterItem
			hasTextColor={textColor}
			href="#"
			onClick={(): void => {
				//TODO: this is not working
				toggleWatched({
					optimisticResponse: {
						__typename: 'Mutation',
						markMovieWatched: {
							__typename: 'MovieItem',
							itemID,
							isWatched: newWatched,
						},
					},
					variables: {
						itemID,
						isWatched: newWatched,
					},
				});
			}}
		>
			{loading ? (
				<FontAwesomeIcon icon="spinner" spin />
			) : error ? (
				'Error!'
			) : (
				text
			)}
		</CardFooterItem>
	);
};

ToggleMovieItemWatched.whyDidYouRender = true;

export default memo(ToggleMovieItemWatched);
