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
import { useQuery } from '@apollo/client';
import { Button, Column, Heading } from 'bloomer';
import gql from 'graphql-tag';
import React, { FC, ReactElement } from 'react';

import { Movie } from '../../graphql/output';
import Loading from '../Loading/Loading';

const MOVIES_BY_MOVIE_ITEM_ID = gql`
	query MoviesByMovieItemID($movieItemID: Int!) {
		movies(itemID: $movieItemID) {
			movieID
			itemID
			movieTitle
			movieURL
		}
	}
`;

interface GetMovieItemsData {
	movies: Movie[];
}

interface GetMovieItemsVars {
	movieItemID: number;
}

interface MovieItemMoviesContainerProps {
	movieItemID: number;
}

const MovieItemMoviesContainer: FC<MovieItemMoviesContainerProps> = ({
	movieItemID,
}): ReactElement => {
	const { data, error, loading } = useQuery<
		GetMovieItemsData,
		GetMovieItemsVars
	>(MOVIES_BY_MOVIE_ITEM_ID, {
		fetchPolicy: 'cache-and-network',
		variables: {
			movieItemID,
		},
	});
	const movies = data?.movies;

	if (error) {
		console.error('Error in GQL', { error });

		return <></>;
	}

	return (
		<Column>
			{loading ? (
				<Loading />
			) : (
				<>
					{/*TODO: Create component to show/hide based on count > 0 */}
					<Heading>Movies</Heading>
					{movies && movies.length ? (
						<>
							<br />
							{JSON.stringify(movies)}
						</>
					) : (
						<small>No movies found</small>
					)}
					<br />
					<Button
						isColor="primary"
						onClick={(): void => {
							console.warn('TODO: add "add" logic');
						}}
					>
						Add Movie
					</Button>
				</>
			)}
		</Column>
	);
};

MovieItemMoviesContainer.whyDidYouRender = true;

export default MovieItemMoviesContainer;
