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
import type { ApolloQueryResult } from '@apollo/client';
import {
	Column,
	Columns,
	Content,
	Image,
	Media,
	MediaContent,
	MediaLeft,
	MediaRight,
} from 'bloomer';
import React, { FC, ReactElement } from 'react';

import { MovieItem } from '../../graphql/output';
import { getFormattedDate } from '../../utils/dates';
import { getCaseIcon, getFormatImage, getStatusIcon } from '../../utils/icons';
import Loading from '../Loading/Loading';
import MovieItemPlaceholder from '../MovieItemPlaceholder/MovieItemPlaceholder';
import {
	QueryMovieItemsArgs,
	MovieItemsContainerData,
} from '../MovieItemsContainer/MovieItemsContainer';
import MovieItemGridContainer from '../styled-components/MovieItemGridContainer';
import ToggleMovieItemWatched from '../ToggleMovieItemWatched/ToggleMovieItemWatched';

type MovieItemDetailProps = {
	movieItem: MovieItem;
	refetch: (
		variables?: QueryMovieItemsArgs | undefined,
	) => Promise<ApolloQueryResult<MovieItemsContainerData>>;
};

const MovieItemList: FC<MovieItemDetailProps> = ({ movieItem, refetch }): ReactElement => (
	<Column isSize="full">
		<Media>
			<MediaLeft>
				{movieItem.itemURL ? (
					<Image
						alt={`Case for ${movieItem.itemName}`}
						className="is-3by4"
						src={movieItem.itemURL}
					/>
				) : (
					<MovieItemPlaceholder title={movieItem.itemName} />
				)}
			</MediaLeft>
			<MediaContent>
				<Content>
					<p>
						<strong>{movieItem.itemName}</strong>
						<small>
							{movieItem.releaseDate && getFormattedDate(movieItem.releaseDate)}
						</small>
						<br />
						<Image
							alt={`Item is in ${movieItem.formatType} format`}
							isSize="48x48"
							src={getFormatImage(movieItem.formatType, movieItem.is3D)}
						/>
						<span
							className="item-attribute has-text-centered item-uv"
							title={movieItem.digitalType}
						>
							{movieItem.digitalType.indexOf('UV') > -1 ? 'UV' : null}
						</span>
						<span
							className="item-attribute has-text-centered item-dc"
							title={movieItem.digitalType}
						>
							{movieItem.digitalType.indexOf('DC') > -1 ? 'DC' : null}
						</span>
						<span className="item-attribute has-text-centered" title={movieItem.caseType}>
							{getCaseIcon(movieItem.caseType)}
						</span>
						<span className="item-attribute has-text-centered" title={movieItem.itemStatus}>
							{getStatusIcon(movieItem.itemStatus)}
						</span>
					</p>
				</Content>
			</MediaContent>
			<MediaRight>
				<a href={`/item/${movieItem.itemID}`}>Edit</a>
				{movieItem.itemID && (
					<ToggleMovieItemWatched
						isWatched={movieItem.isWatched === 'Y'}
						itemID={movieItem.itemID}
						refetch={refetch}
					/>
				)}
			</MediaRight>
		</Media>
	</Column>
);

type MovieItemsDetailProps = {
	isFilterOpen?: boolean;
	loading: boolean;
	movieItems: MovieItem[];
	refetch: (
		variables?: QueryMovieItemsArgs | undefined,
	) => Promise<ApolloQueryResult<MovieItemsContainerData>>;
};

const MovieItemsList: FC<MovieItemsDetailProps> = ({
	isFilterOpen = false,
	loading,
	movieItems,
	refetch,
}): ReactElement => (
	<MovieItemGridContainer isFluid offset={isFilterOpen ? '287px' : '104px'}>
		<Columns isGrid isMultiline>
			{loading ? (
				<Column isSize="full">
					<Loading />
				</Column>
			) : (
				movieItems &&
				movieItems.map(movieItem => (
					<MovieItemList
						key={`movie-item-${movieItem.itemID}`}
						movieItem={movieItem}
						refetch={refetch}
					/>
				))
			)}
		</Columns>
	</MovieItemGridContainer>
);

MovieItemsList.whyDidYouRender = true;

export default MovieItemsList;
