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
import React, { FC, ReactElement } from 'react';

import { MovieItem } from '../../graphql/output';
import { getFormattedDate } from '../../utils/dates';
import { getCaseIcon, getFormatImage, getStatusIcon } from '../../utils/icons';
import Loading from '../Loading/Loading';
import MovieItemPlaceholder from '../MovieItemPlaceholder/MovieItemPlaceholder';
import MovieItemGridContainer from '../styled-components/MovieItemGridContainer';
import ToggleMovieItemWatched from '../ToggleMovieItemWatched/ToggleMovieItemWatched';

interface MovieItemsGridProps {
	isFilterOpen?: boolean;
	loading: boolean;
	movieItems: MovieItem[];
}

const MovieItemGrid: FC<{ movieItem: MovieItem }> = ({
	movieItem,
}): ReactElement => (
	<Column className="is-one-fifth-desktop" isSize={{ mobile: 6, tablet: 4 }}>
		<Card>
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
			<CardContent>
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
					/>
				)}
			</CardFooter>
		</Card>
	</Column>
);

const MovieItemsGrid: FC<MovieItemsGridProps> = ({
	isFilterOpen = false,
	loading,
	movieItems,
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
							movieItem={movieItem}
							key={`movie-item-${movieItem.itemID}`}
						/>
					),
				)
			)}
		</Columns>
	</MovieItemGridContainer>
);

MovieItemsGrid.whyDidYouRender = true;

export default MovieItemsGrid;
