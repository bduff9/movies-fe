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
import { ApolloQueryResult, useMutation } from '@apollo/client';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
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
