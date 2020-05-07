// eslint-disable-next-line import/named
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	Input,
	Navbar,
	NavbarDropdown,
	NavbarEnd,
	NavbarItem,
	NavbarLink,
	NavbarMenu,
	NavbarStart,
} from 'bloomer';
import React, { CSSProperties, FormEvent, FC, ReactElement } from 'react';

import { VIEWS } from '../../utils/constants';
import { TSortCol, TSort, TViewAs, TSavedView } from '../../utils/types';

interface ToolbarProps {
	maxPage: number;
	page: number;
	savedViews?: TSavedView[];
	selectedView?: string;
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
	selectedView = '',
	sortBy,
	sortItems,
	toggleFilters,
	viewAs,
}): ReactElement => {
	const { direction: sortDir, field: sortCol } = sortBy[0] || {
		direction: 'DESC',
		field: 'itemID',
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

	const styles: { [k: string]: CSSProperties } = {
		disabled: {
			opacity: 0.5,
			pointerEvents: 'none',
		},
	};

	return (
		<Navbar isTransparent>
			<NavbarMenu>
				<NavbarStart>
					<NavbarItem>
						<select
							value={selectedView}
							onChange={(): void => console.log('changed saved view')}
						>
							<option value="">-- Select a Saved View --</option>
							{savedViews.map(
								({ id, name }): ReactElement => (
									<option value={id} key={`view-${id}`}>
										{name}
									</option>
								),
							)}
						</select>
					</NavbarItem>
				</NavbarStart>
				<NavbarEnd>
					<NavbarItem
						style={page < 2 ? styles.disabled : undefined}
						title="Go to first"
						href="#"
						onClick={(): void => paginate(1, maxPage)}
					>
						<FontAwesomeIcon icon={['far', 'chevron-double-left']} />
					</NavbarItem>
					<NavbarItem
						style={page < 2 ? styles.disabled : undefined}
						title="Go to previous"
						href="#"
						onClick={(): void => paginate(page - 1, maxPage)}
					>
						<FontAwesomeIcon icon={['far', 'chevron-left']} />
					</NavbarItem>
					<NavbarItem title="Jump to...">
						<Input
							isSize="small"
							type="number"
							value={page}
							onChange={(ev: FormEvent<HTMLInputElement>): void =>
								paginate(ev.currentTarget.value, maxPage)
							}
						/>
					</NavbarItem>
					<NavbarItem
						style={page >= maxPage ? styles.disabled : undefined}
						title="Go to next"
						href="#"
						onClick={(): void => paginate(page + 1, maxPage)}
					>
						<FontAwesomeIcon icon={['far', 'chevron-right']} />
					</NavbarItem>
					<NavbarItem
						style={page >= maxPage ? styles.disabled : undefined}
						title="Go to last"
						href="#"
						onClick={(): void => paginate(maxPage, maxPage)}
					>
						<FontAwesomeIcon icon={['far', 'chevron-double-right']} />
					</NavbarItem>
					<NavbarItem>
						<a href="/item/add">
							<FontAwesomeIcon icon="plus" />
						</a>
					</NavbarItem>
					<NavbarItem hasDropdown isHoverable>
						<NavbarLink href="#">
							<FontAwesomeIcon icon={getViewIcon()} />
						</NavbarLink>
						<NavbarDropdown>
							{VIEWS.map(view => (
								<NavbarItem
									href="#"
									onClick={(): void => changeView(view)}
									key={`view-${view}`}
								>
									{view === viewAs ? <b>{view}</b> : view}
								</NavbarItem>
							))}
						</NavbarDropdown>
					</NavbarItem>
					<NavbarItem href="#" onClick={toggleFilters}>
						<FontAwesomeIcon icon="search" />
					</NavbarItem>
					<NavbarItem hasDropdown isHoverable>
						<NavbarLink href="#">
							<FontAwesomeIcon icon="sort" />
						</NavbarLink>
						<NavbarDropdown>
							<NavbarItem href="#" onClick={(): void => sortItems('ordered')}>
								{displayCurrentSort('ordered')}
								&nbsp;Order
							</NavbarItem>
							<NavbarItem href="#" onClick={(): void => sortItems('itemID')}>
								{displayCurrentSort('itemID')}
								&nbsp;ID
							</NavbarItem>
							<NavbarItem href="#" onClick={(): void => sortItems('itemName')}>
								{displayCurrentSort('itemName')}
								&nbsp;Title
							</NavbarItem>
						</NavbarDropdown>
					</NavbarItem>
				</NavbarEnd>
			</NavbarMenu>
		</Navbar>
	);
};

Toolbar.whyDidYouRender = true;

export default Toolbar;
