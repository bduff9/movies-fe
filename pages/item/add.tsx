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
import { useMutation } from '@apollo/client';
import { Column, Columns, Container } from 'bloomer';
import gql from 'graphql-tag';
import { GetServerSideProps, NextPage } from 'next';
import { getSession } from 'next-auth/client';
import Head from 'next/head';
import { useRouter } from 'next/router';
import React, { ReactElement } from 'react';

import Authenticated from '../../components/Authenticated/Authenticated';
import MovieItemForm from '../../components/MovieItemForm/MovieItemForm';
import { MutationAddMovieItemArgs, MovieItem } from '../../graphql/output';

const ADD_MOVIE_ITEM = gql`
	mutation AddMovieItem(
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
		addMovieItem(
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

type AddMovieItemProps = Record<string, never>;

const AddMovieItem: NextPage<AddMovieItemProps> = (): ReactElement => {
	const router = useRouter();
	const [addMovieItem, { error, loading }] = useMutation<
		MovieItem,
		MutationAddMovieItemArgs
	>(ADD_MOVIE_ITEM, {
		awaitRefetchQueries: true,
		refetchQueries: ['MovieItemsForDisplay', 'MovieItems'],
	});

	return (
		<Authenticated>
			<Head>
				<title>Movies - Add Item</title>
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<Container isFluid>
				<Columns isCentered isGrid isVCentered>
					<Column>
						<MovieItemForm
							onAddSubmit={async (movieItem: MutationAddMovieItemArgs): Promise<void> => {
								await addMovieItem({ variables: movieItem });
								await router.push('/');
							}}
						/>
						{loading ? <div>Saving...</div> : error && <div>{error}</div>}
					</Column>
				</Columns>
			</Container>
		</Authenticated>
	);
};

// ts-prune-ignore-next
export const getServerSideProps: GetServerSideProps = async context => {
	const session = await getSession(context);
	const { res } = context;

	if (!session) {
		res.writeHead(302, { Location: '/auth/login' });
		res.end();
	}

	return { props: {} };
};

AddMovieItem.whyDidYouRender = true;

// ts-prune-ignore-next
export default AddMovieItem;
