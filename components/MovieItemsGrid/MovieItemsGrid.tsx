import { ApolloQueryResult } from 'apollo-boost';
import {
	Card,
	CardContent,
	CardFooter,
	CardFooterItem,
	CardHeader,
	CardHeaderTitle,
	CardImage,
	Column,
	Columns,
	Image,
	Media,
	MediaContent,
	MediaLeft,
} from 'bloomer';
import React, { FC, memo, ReactElement } from 'react';

import { MovieItem } from '../../graphql/output';
import { getFormattedDate } from '../../utils/dates';
import { getCaseIcon, getFormatImage, getStatusIcon } from '../../utils/icons';
import Loading from '../Loading/Loading';
import MovieItemPlaceholder from '../MovieItemPlaceholder/MovieItemPlaceholder';
import {
	MovieItemsContainerData,
	QueryMovieItemsArgs,
} from '../MovieItemsContainer/MovieItemsContainer';
import MovieItemGridContainer from '../styled-components/MovieItemGridContainer';
import ToggleMovieItemWatched from '../ToggleMovieItemWatched/ToggleMovieItemWatched';

import styles from './MovieItemsGrid.module.scss';

type MovieItemGridProps = {
	movieItem: MovieItem;
	refetch: (
		variables?: QueryMovieItemsArgs | undefined,
	) => Promise<ApolloQueryResult<MovieItemsContainerData>>;
};

const MovieItemGrid: FC<MovieItemGridProps> = ({
	movieItem,
	refetch,
}): ReactElement => (
	<Column className="is-one-fifth-desktop" isSize={{ mobile: 6, tablet: 4 }}>
		<Card className={styles.movieItemCard}>
			<CardHeader>
				<CardHeaderTitle className="item-title" title={movieItem.itemName}>
					{movieItem.itemName}
				</CardHeaderTitle>
			</CardHeader>
			<CardImage className="item-image">
				{movieItem.itemURL ? (
					<Image className="is-3by4" src={movieItem.itemURL} />
				) : (
					<MovieItemPlaceholder title={movieItem.itemName} />
				)}
			</CardImage>
			<CardContent className={styles.movieItemContent}>
				<Media>
					<MediaLeft>
						<Image
							isSize="48x48"
							src={getFormatImage(movieItem.formatType, movieItem.is3D)}
						/>
					</MediaLeft>
					<MediaContent>
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
						<span
							className="item-attribute has-text-centered"
							title={movieItem.caseType}
						>
							{getCaseIcon(movieItem.caseType)}
						</span>
						<span
							className="item-attribute has-text-centered"
							title={movieItem.itemStatus}
						>
							{getStatusIcon(movieItem.itemStatus)}
						</span>
					</MediaContent>
				</Media>
				<small>{getFormattedDate(movieItem.releaseDate)}</small>
			</CardContent>
			<CardFooter style={{ height: 71 }}>
				<CardFooterItem>
					<a href={`/item/${movieItem.itemID}`}>Edit</a>
				</CardFooterItem>
				{movieItem.itemID && (
					<ToggleMovieItemWatched
						isWatched={movieItem.isWatched === 'Y'}
						itemID={movieItem.itemID}
						refetch={refetch}
					/>
				)}
			</CardFooter>
		</Card>
	</Column>
);

type MovieItemsGridProps = {
	isFilterOpen?: boolean;
	loading: boolean;
	movieItems: MovieItem[];
	refetch: (
		variables?: QueryMovieItemsArgs | undefined,
	) => Promise<ApolloQueryResult<MovieItemsContainerData>>;
};

const MovieItemsGrid: FC<MovieItemsGridProps> = ({
	isFilterOpen = false,
	loading,
	movieItems,
	refetch,
}): ReactElement => (
	<MovieItemGridContainer isFluid offset={isFilterOpen ? '287px' : '104px'}>
		<Columns isGrid isMobile isMultiline>
			{loading ? (
				<Column isSize="full">
					<Loading />
				</Column>
			) : (
				movieItems.map(
					(movieItem): ReactElement => (
						<MovieItemGrid
							key={`movie-item-${movieItem.itemID}`}
							movieItem={movieItem}
							refetch={refetch}
						/>
					),
				)
			)}
		</Columns>
	</MovieItemGridContainer>
);

MovieItemsGrid.whyDidYouRender = true;

export default memo(MovieItemsGrid);
