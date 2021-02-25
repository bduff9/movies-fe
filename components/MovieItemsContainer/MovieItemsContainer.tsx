import { useQuery } from '@apollo/client';
import gql from 'graphql-tag';
import React, { FC, MouseEvent, ReactElement } from 'react';

import {
	Query,
	CaseType,
	DigitalType,
	YesNo,
	FormatType,
	StatusType,
} from '../../graphql/output';
import { ITEMS_PER_PAGE } from '../../utils/constants';
import {
	TFilterFilters,
	TSort,
	TViewAs,
	TSortCol,
	TFilterType,
} from '../../utils/types';
import Filters from '../Filters/Filters';
import MovieItemsDetail from '../MovieItemsDetail/MovieItemsDetail';
import MovieItemsGrid from '../MovieItemsGrid/MovieItemsGrid';
import MovieItemsList from '../MovieItemsList/MovieItemsList';
import Toolbar from '../Toolbar/Toolbar';

const ALL_MOVIE_ITEMS = gql`
	query MovieItemsForDisplay(
		$itemName: StringFilterInput
		$caseType: CaseTypeFilterInput
		$digitalType: DigitalTypeFilterInput
		$is3D: YesNoFilterInput
		$isWatched: YesNoFilterInput
		$formatType: FormatTypeFilterInput
		$itemStatus: StatusTypeFilterInput
		$releaseDate: DateFilterInput
		$limit: Int
		$skip: Int
		$order: [OrderBy!]
	) {
		movieItems(
			itemName: $itemName
			caseType: $caseType
			digitalType: $digitalType
			is3D: $is3D
			isWatched: $isWatched
			formatType: $formatType
			itemStatus: $itemStatus
			releaseDate: $releaseDate
			limit: $limit
			skip: $skip
			order: $order
		) {
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
		countMovieItems(
			itemName: $itemName
			caseType: $caseType
			digitalType: $digitalType
			is3D: $is3D
			isWatched: $isWatched
			formatType: $formatType
			itemStatus: $itemStatus
			releaseDate: $releaseDate
		)
	}
`;

export type QueryMovieItemsArgs = {
	itemName?: TFilterType<string>;
	caseType?: TFilterType<CaseType>;
	digitalType?: TFilterType<DigitalType>;
	is3D?: TFilterType<YesNo>;
	isWatched?: TFilterType<YesNo>;
	formatType?: TFilterType<FormatType>;
	itemStatus?: TFilterType<StatusType>;
	releaseDate?: TFilterType<Date>;
	limit?: number;
	skip?: number;
	order?: TSort[];
};

export type MovieItemsContainerData = {
	countMovieItems: Query['countMovieItems'];
	movieItems: Query['movieItems'];
};

interface MovieItemsContainerProps {
	filterOpen: boolean;
	filters: TFilterFilters;
	page: number;
	sortBy: TSort[];
	viewAs: TViewAs;
	changeView: (newView: TViewAs) => void;
	paginate: (newPage: number | string, maxPage: number) => void;
	sortItems: (col: TSortCol) => void;
	toggleFilters: (ev: MouseEvent<HTMLElement>) => void;
	updateFilters: (filters: TFilterFilters) => void;
}

const MovieItemsContainer: FC<MovieItemsContainerProps> = ({
	filterOpen,
	filters,
	page,
	viewAs,
	updateFilters,
	...rest
}): ReactElement => {
	const { data, error, loading, refetch } = useQuery<
		MovieItemsContainerData,
		QueryMovieItemsArgs
	>(ALL_MOVIE_ITEMS, {
		fetchPolicy: 'cache-and-network',
		pollInterval: 10000,
		variables: {
			...filters,
			limit: ITEMS_PER_PAGE,
			skip: (page - 1) * ITEMS_PER_PAGE,
			order: rest.sortBy,
		},
	});
	const { countMovieItems, movieItems } = data || {
		countMovieItems: 0,
		movieItems: [],
	};
	const maxPage = !data ? page : Math.ceil(countMovieItems / ITEMS_PER_PAGE);

	return (
		<main>
			<Toolbar
				{...rest}
				maxPage={maxPage}
				page={page}
				viewAs={viewAs}
				key="toolbar"
			/>
			{filterOpen && (
				<Filters
					filters={filters}
					updateFilters={updateFilters}
					key="filters"
				/>
			)}
			{!error && data ? (
				<>
					{viewAs === 'Grid' && (
						<MovieItemsGrid
							isFilterOpen={filterOpen}
							key="movieItemsGrid"
							loading={loading && !data}
							movieItems={movieItems}
							refetch={refetch}
						/>
					)}
					{viewAs === 'List' && (
						<MovieItemsList
							isFilterOpen={filterOpen}
							key="movieItemsList"
							loading={loading && !data}
							movieItems={movieItems}
							refetch={refetch}
						/>
					)}
					{viewAs === 'Detail' && (
						<MovieItemsDetail
							isFilterOpen={filterOpen}
							key="movieItemsDetail"
							loading={loading && !data}
							movieItems={movieItems}
							refetch={refetch}
						/>
					)}
				</>
			) : (
				<>
					TODO: QUERY ERROR
					{console.error('GQL error', { data, error, loading })}
				</>
			)}
		</main>
	);
};

MovieItemsContainer.whyDidYouRender = true;

export default MovieItemsContainer;
