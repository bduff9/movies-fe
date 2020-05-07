import { Container } from 'bloomer';
import { NextPage, NextPageContext } from 'next';
import Head from 'next/head';
import React, { ReactElement, useEffect, useState } from 'react';

import Authenticated from '../components/Authenticated/Authenticated';
import MovieItemsContainer from '../components/MovieItemsContainer/MovieItemsContainer';
import { ensureAuthenticated } from '../utils/auth';
import { TFilterFilters, TSort, TSortCol, TViewAs } from '../utils/types';

type HomeProps = {
	filterOpen: boolean;
	filters: TFilterFilters;
	limit: number;
	page: number;
	skip: number;
	sortBy: TSort[];
	viewAs: TViewAs;
};

const SAVED_STATE_KEY = 'MovieItemsDisplayPageState';

const Home: NextPage<HomeProps> = (props): ReactElement => {
	const [filterOpen, setFilterOpen] = useState<boolean>(props.filterOpen);
	const [filters, setFilters] = useState<TFilterFilters>(props.filters);
	const [limit] = useState<number>(props.limit);
	const [page, setPage] = useState<number>(props.page);
	const [sortBy, setSortBy] = useState<TSort[]>(props.sortBy);
	const [viewAs, setViewAs] = useState<TViewAs>(props.viewAs);

	useEffect((): void => {
		const newState: HomeProps = {
			filterOpen,
			filters,
			limit,
			page,
			skip: props.skip,
			sortBy,
			viewAs,
		};

		localStorage.setItem(SAVED_STATE_KEY, JSON.stringify(newState));
	}, [filterOpen, filters, limit, page, props.skip, sortBy, viewAs]);

	const paginate = (newPage: number | string, maxPage: number): void => {
		if (typeof newPage === 'string') newPage = parseInt(newPage, 10);

		if (newPage < 1 || newPage === page || newPage > maxPage) return;

		setPage(newPage);
	};

	const sortItems = (col: TSortCol): void => {
		const currentSort = sortBy[0];
		let newSort: TSort;

		if (currentSort.field === col) {
			newSort = {
				...currentSort,
				direction: currentSort.direction === 'ASC' ? 'DESC' : 'ASC',
			};
		} else {
			newSort = { direction: 'ASC', field: col };
		}

		setSortBy([newSort]);
	};

	const toggleFilters = (): void => {
		setFilterOpen((prevFilterOpen): boolean => !prevFilterOpen);
	};

	const changeView = (newView: TViewAs): void => setViewAs(newView);

	const updateFilters = (filters: TFilterFilters): void => {
		setFilters(filters);
		setPage(1);
	};

	return (
		<Authenticated>
			<Head>
				<title>Movies</title>
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<Container>
				<MovieItemsContainer
					filterOpen={filterOpen}
					filters={filters}
					page={page}
					sortBy={sortBy}
					viewAs={viewAs}
					changeView={changeView}
					paginate={paginate}
					sortItems={sortItems}
					toggleFilters={toggleFilters}
					updateFilters={updateFilters}
					key="movie-items-container"
				/>
			</Container>
		</Authenticated>
	);
};

Home.getInitialProps = ({ req, res }: NextPageContext): HomeProps => {
	if (req && res) {
		ensureAuthenticated(req, res);
	}

	let initialState: HomeProps;

	try {
		const savedState = localStorage.getItem(SAVED_STATE_KEY);

		initialState = savedState && JSON.parse(savedState);

		if (!initialState) throw new Error('Missing saved state');
	} catch (err) {
		initialState = {
			filterOpen: false,
			filters: {},
			limit: 25,
			page: 1,
			skip: 0,
			sortBy: [{ direction: 'DESC', field: 'itemID' }],
			viewAs: 'Grid',
		};
	}

	return initialState;
};

Home.whyDidYouRender = true;

export default Home;
