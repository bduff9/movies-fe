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
// eslint-disable-next-line import/named
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	Button,
	Dropdown,
	DropdownContent,
	DropdownItem,
	DropdownMenu,
	DropdownTrigger,
	Input,
	Navbar,
} from 'bloomer';
import clsx from 'clsx';
import React, {
	FormEvent,
	FC,
	memo,
	MouseEvent,
	ReactElement,
	ReactText,
	useState,
} from 'react';

import { VIEWS } from '../../utils/constants';
import { TSortCol, TSort, TViewAs, TSavedView } from '../../utils/types';

import styles from './Toolbar.module.scss';

interface ToolbarProps {
	maxPage: number;
	page: number;
	savedViews?: TSavedView[];
	selectedViewID?: number;
	sortBy: TSort[];
	viewAs: string;
	changeView: (newView: TViewAs) => void;
	paginate: (newPage: number | string, maxPage: number) => void;
	sortItems: (col: TSortCol) => void;
	toggleFilters: (ev: React.MouseEvent<HTMLElement>) => void;
}

const Toolbar: FC<ToolbarProps> = ({
	changeView,
	maxPage,
	page,
	paginate,
	savedViews = [],
	selectedViewID,
	sortBy,
	sortItems,
	toggleFilters,
	viewAs,
}): ReactElement => {
	const [isSavedViewActive, setIsSavedViewActive] = useState<boolean>(false);
	const [isViewActive, setIsViewActive] = useState<boolean>(false);
	const [isSortActive, setIsSortActive] = useState<boolean>(false);
	const { direction: sortDir, field: sortCol } = sortBy[0] || {
		direction: 'DESC',
		field: 'itemID',
	};

	const changeSavedView = (savedViewID: number): void => {
		console.log('TODO: saved view changed', { savedViewID });

		setIsSavedViewActive(false);
	};

	const changeViewWrapper = (newView: TViewAs): void => {
		setIsViewActive(false);
		changeView(newView);
	};

	const displayCurrentSort = (col: TSortCol): ReactElement => {
		if (sortCol !== col) return <FontAwesomeIcon icon={['far', 'sort']} />;

		if (sortDir === 'ASC') return <FontAwesomeIcon icon="sort-up" />;

		return <FontAwesomeIcon icon="sort-down" />;
	};

	const getViewIcon = (): IconProp => {
		if (viewAs === 'Grid') return 'th-large';

		if (viewAs === 'List') return ['far', 'list'];

		if (viewAs === 'Detail') return ['far', 'table'];

		return 'question-square';
	};

	const goToPage = (page: ReactText, ev: MouseEvent): false => {
		ev.preventDefault();

		paginate(page, maxPage);

		return false;
	};

	return (
		<Navbar isTransparent>
			<div className={styles.toolbar}>
				<div className={styles.toolbarStart}>
					<div className={styles.toolbarItem}>
						<Dropdown isActive={isSavedViewActive}>
							<DropdownTrigger>
								<Button
									aria-controls="dropdown-menu"
									aria-haspopup="true"
									isOutlined
									onClick={(): void =>
										setIsSavedViewActive((isActive): boolean => !isActive)
									}
								>
									<span>-- Select a Saved View --</span>
									&nbsp;
									<FontAwesomeIcon icon={['far', 'angle-down']} size="1x" />
								</Button>
							</DropdownTrigger>
							<DropdownMenu>
								<DropdownContent>
									{savedViews.map(
										({ id, name }): ReactElement => (
											<DropdownItem
												href="#"
												isActive={id === selectedViewID}
												key={`saved-view-${id}`}
												onClick={(): void => changeSavedView(id)}
											>
												{name}
											</DropdownItem>
										),
									)}
								</DropdownContent>
							</DropdownMenu>
						</Dropdown>
					</div>
				</div>
				<div className={styles.toolbarEnd}>
					<a
						className={clsx(styles.toolbarItem, page < 2 ? styles.disabled : undefined)}
						href="#"
						onClick={(ev): false => goToPage(1, ev)}
						title="Go to first"
					>
						<FontAwesomeIcon icon={['far', 'chevron-double-left']} />
					</a>
					<a
						className={clsx(styles.toolbarItem, page < 2 ? styles.disabled : undefined)}
						title="Go to previous"
						href="#"
						onClick={(ev): false => goToPage(page - 1, ev)}
					>
						<FontAwesomeIcon icon={['far', 'chevron-left']} />
					</a>
					<div className={styles.toolbarItem} title="Jump to...">
						<Input
							isSize="small"
							type="number"
							value={page}
							onChange={(ev: FormEvent<HTMLInputElement>): false =>
								goToPage(ev.currentTarget.value, (ev as unknown) as MouseEvent)
							}
						/>
					</div>
					<a
						className={clsx(
							styles.toolbarItem,
							page >= maxPage ? styles.disabled : undefined,
						)}
						title="Go to next"
						href="#"
						onClick={(): void => paginate(page + 1, maxPage)}
					>
						<FontAwesomeIcon icon={['far', 'chevron-right']} />
					</a>
					<a
						className={clsx(
							styles.toolbarItem,
							page >= maxPage ? styles.disabled : undefined,
						)}
						title="Go to last"
						href="#"
						onClick={(): void => paginate(maxPage, maxPage)}
					>
						<FontAwesomeIcon icon={['far', 'chevron-double-right']} />
					</a>
					<div className={styles.toolbarBreak}></div>
					<div className={styles.toolbarItem}>
						<Button href="/item/add" isOutlined>
							<FontAwesomeIcon icon="plus" />
						</Button>
					</div>
					<div className={styles.toolbarItem}>
						<Button href="#" isOutlined onClick={toggleFilters}>
							<FontAwesomeIcon icon="search" />
						</Button>
					</div>
					<div className={styles.toolbarItem}>
						<Dropdown isActive={isViewActive}>
							<DropdownTrigger>
								<Button
									aria-controls="dropdown-menu"
									aria-haspopup="true"
									isOutlined
									onClick={(): void => setIsViewActive((isActive): boolean => !isActive)}
								>
									<FontAwesomeIcon icon={getViewIcon()} />
									&nbsp;
									<FontAwesomeIcon icon={['far', 'angle-down']} size="1x" />
								</Button>
							</DropdownTrigger>
							<DropdownMenu>
								<DropdownContent>
									{VIEWS.map(
										(view): ReactElement => (
											<DropdownItem
												href="#"
												isActive={view === viewAs}
												key={`view-${view}`}
												onClick={(): void => changeViewWrapper(view)}
											>
												{view}
											</DropdownItem>
										),
									)}
								</DropdownContent>
							</DropdownMenu>
						</Dropdown>
					</div>
					<div className={styles.toolbarItem}>
						<Dropdown isActive={isSortActive}>
							<DropdownTrigger>
								<Button
									aria-controls="dropdown-menu"
									aria-haspopup="true"
									isOutlined
									onClick={(): void => setIsSortActive((isActive): boolean => !isActive)}
								>
									<FontAwesomeIcon icon="sort" />
									&nbsp;
									<FontAwesomeIcon icon={['far', 'angle-down']} size="1x" />
								</Button>
							</DropdownTrigger>
							<DropdownMenu>
								<DropdownContent>
									<DropdownItem
										href="#"
										isActive={sortCol === 'ordered'}
										key="sort-ordered"
										onClick={(): void => sortItems('ordered')}
									>
										{displayCurrentSort('ordered')}
										&nbsp;Order
									</DropdownItem>
									<DropdownItem
										href="#"
										isActive={sortCol === 'itemID'}
										key="sort-itemID"
										onClick={(): void => sortItems('itemID')}
									>
										{displayCurrentSort('itemID')}
										&nbsp;ID
									</DropdownItem>
									<DropdownItem
										href="#"
										isActive={sortCol === 'itemName'}
										key="sort-itemName"
										onClick={(): void => sortItems('itemName')}
									>
										{displayCurrentSort('itemName')}
										&nbsp;Title
									</DropdownItem>
								</DropdownContent>
							</DropdownMenu>
						</Dropdown>
					</div>
				</div>
			</div>
		</Navbar>
	);
};

Toolbar.whyDidYouRender = true;

export default memo(Toolbar);
