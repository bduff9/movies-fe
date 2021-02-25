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
