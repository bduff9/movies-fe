import { useMutation } from '@apollo/react-hooks';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ApolloQueryResult } from 'apollo-boost';
import { CardFooterItem } from 'bloomer';
import gql from 'graphql-tag';
import React, { FC, memo, ReactElement, useEffect, useState } from 'react';

import { MutationMarkMovieWatchedArgs, YesNo } from '../../graphql/output';
import {
	MovieItemsContainerData,
	QueryMovieItemsArgs,
} from '../MovieItemsContainer/MovieItemsContainer';

const TOGGLE_WATCHED = gql`
	mutation markMovieWatched($itemID: Int!, $isWatched: YesNo!) {
		markMovieWatched(itemID: $itemID, isWatched: $isWatched) {
			__typename
			itemID
			ordered
			isWatched
		}
	}
`;

type ToggleMovieItemWatchedData = {
	__typename: 'Mutation';
	markMovieWatched: {
		__typename: 'MovieItem';
		itemID: number;
		ordered: null | number;
		isWatched: YesNo;
	};
};

type ToggleMovieItemWatchedProps = {
	isWatched: boolean;
	itemID: number;
	refetch: (
		variables?: QueryMovieItemsArgs | undefined,
	) => Promise<ApolloQueryResult<MovieItemsContainerData>>;
};

const ToggleMovieItemWatched: FC<ToggleMovieItemWatchedProps> = ({
	isWatched,
	itemID,
	refetch,
}): ReactElement => {
	const [toggleWatched, { error, loading }] = useMutation<
		ToggleMovieItemWatchedData,
		MutationMarkMovieWatchedArgs
	>(TOGGLE_WATCHED);
	const [isWatchedState, setIsWatchedState] = useState<boolean>(isWatched);
	let newWatched: YesNo = YesNo.N;
	let text = 'Watched';
	let textColor: string | undefined = 'success';

	if (!isWatchedState) {
		newWatched = YesNo.Y;
		text = 'Mark Watched';
		textColor = undefined;
	}

	useEffect((): (() => void) => {
		let mounted = true;

		if (mounted) {
			setIsWatchedState(isWatched);
		}

		return (): void => {
			mounted = false;
		};
	}, [isWatched]);

	return (
		<CardFooterItem
			hasTextColor={textColor}
			href="#"
			onClick={async (): Promise<void> => {
				await toggleWatched({
					variables: {
						itemID,
						isWatched: newWatched,
					},
				});
				setIsWatchedState((oldState): boolean => !oldState);
				await refetch();
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
