import { useMutation, useQuery } from '@apollo/react-hooks';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Column, Columns, Container } from 'bloomer';
import gql from 'graphql-tag';
import { NextPage, NextPageContext } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import React, { ReactElement } from 'react';

import Authenticated from '../../components/Authenticated/Authenticated';
import GQLError from '../../components/GQLError/GQLError';
import MovieItemForm from '../../components/MovieItemForm/MovieItemForm';
import MovieItemMoviesContainer from '../../components/MovieItemMoviesContainer/MovieItemMoviesContainer';
import {
	MutationUpdateMovieItemArgs,
	MovieItem,
	QueryMovieItemArgs,
} from '../../graphql/output';
import { ensureAuthenticated } from '../../utils/auth';

const MOVIE_ITEM_BY_ID = gql`
	query MovieItemToEdit($itemID: Int!) {
		movieItem(itemID: $itemID) {
			itemID
			ordered
			itemName
			caseType
			digitalType
			is3D
			isWatched
			formatType
			itemStatus
			releaseDate
			itemURL
			itemNotes
		}
	}
`;

const EDIT_MOVIE_ITEM = gql`
	mutation UpdateMovieItem(
		$itemID: Int!
		$itemName: String!
		$caseType: CaseType!
		$digitalType: DigitalType!
		$is3D: YesNo!
		$isWatched: YesNo!
		$formatType: FormatType!
		$itemStatus: StatusType!
		$releaseDate: DateType
		$itemURL: String!
		$itemNotes: String
	) {
		updateMovieItem(
			itemID: $itemID
			itemName: $itemName
			caseType: $caseType
			digitalType: $digitalType
			is3D: $is3D
			isWatched: $isWatched
			formatType: $formatType
			itemStatus: $itemStatus
			releaseDate: $releaseDate
			itemURL: $itemURL
			itemNotes: $itemNotes
		) {
			__typename
			itemID
			ordered
			itemName
			caseType
			digitalType
			is3D
			isWatched
			formatType
			itemStatus
			releaseDate
			itemURL
			itemNotes
		}
	}
`;

type EditMovieItemProps = {
	id: string;
};

const EditMovieItem: NextPage<EditMovieItemProps> = ({ id }): ReactElement => {
	const router = useRouter();
	const itemID = parseInt(id, 10);
	const [
		editMovieItem,
		{ error: editError, loading: editLoading },
	] = useMutation<MutationUpdateMovieItemArgs, MovieItem>(EDIT_MOVIE_ITEM, {
		awaitRefetchQueries: true,
		refetchQueries: ['MovieItemsForDisplay', 'MovieItems'],
	});
	const { data, error, loading } = useQuery<
		{ movieItem: MovieItem },
		QueryMovieItemArgs
	>(MOVIE_ITEM_BY_ID, {
		fetchPolicy: 'cache-and-network',
		variables: { itemID },
	});
	const movieItem = data?.movieItem;

	return (
		<Authenticated>
			<Head>
				<title>Movies - Edit Item {itemID}</title>
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<Container isFluid>
				<Columns isCentered isGrid isVCentered>
					{loading ? (
						<Column>
							<FontAwesomeIcon icon="spinner" spin />
							&nbsp; Loading...
						</Column>
					) : (
						<Column>
							{movieItem ? (
								<>
									<MovieItemForm
										movieItem={movieItem}
										onUpdateSubmit={async (
											movieItem: MutationUpdateMovieItemArgs,
										): Promise<void> => {
											await editMovieItem({ variables: movieItem });
											await router.push('/');
										}}
									/>
									{editLoading ? (
										<div>Saving...</div>
									) : (
										editError && <div>{editError}</div>
									)}
									{movieItem && movieItem.itemID != null && (
										<MovieItemMoviesContainer movieItemID={movieItem.itemID} />
									)}
								</>
							) : (
								<GQLError
									debugMessage="Error loading movie item for EditMovieItemPage"
									error={error}
									hasData={!!movieItem}
									message="Error loading movie item data"
								/>
							)}
						</Column>
					)}
				</Columns>
			</Container>
		</Authenticated>
	);
};

EditMovieItem.getInitialProps = ({
	query,
	req,
	res,
}: NextPageContext): EditMovieItemProps => {
	if (req && res) {
		ensureAuthenticated(req, res);
	}

	const { id } = query;

	if (typeof id !== 'string') {
		res?.writeHead(302, {
			Location: '/',
		});
		res?.end();

		return { id: 'MISSING' };
	}

	return {
		id,
	};
};

EditMovieItem.whyDidYouRender = true;

export default EditMovieItem;
