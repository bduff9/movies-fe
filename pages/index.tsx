import { Container } from 'bloomer';
import { GetServerSideProps, NextPage } from 'next';
import { getSession } from 'next-auth/client';
import Head from 'next/head';
import React, { ReactElement, useEffect, useState } from 'react';

import Authenticated from '../components/Authenticated/Authenticated';
import MovieItemsContainer from '../components/MovieItemsContainer/MovieItemsContainer';
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

// ts-prune-ignore-next
export const getServerSideProps: GetServerSideProps<HomeProps> = async context => {
	const session = await getSession(context);
	const { res } = context;

	if (!session) {
		res.writeHead(302, { Location: '/auth/login' });
		res.end();

		return { props: {} as HomeProps };
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

	return { props: initialState };
};

Home.whyDidYouRender = true;

// ts-prune-ignore-next
export default Home;
