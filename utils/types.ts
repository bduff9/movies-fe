/*******************************************************************************
 * Movies FE - the frontend implementation of a movie tracker.
 * Copyright (C) 2015-present Brian Duffey and Billy Alexander
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see {http://www.gnu.org/licenses/}.
 * Home: https://asitewithnoname.com/
 */
import {
	CaseType,
	DigitalType,
	FormatType,
	YesNo,
	StatusType,
	FilterType,
} from '../graphql/output';

import { VIEWS } from './constants';

export type TViewAs = typeof VIEWS[number];

export type TFilterType<V> =
	| { relation: Exclude<FilterType, FilterType.Between>; value: V }
	| { relation: FilterType.Between; value: V; value2: V };

export type TFilterFilters = {
	caseType?: TFilterType<CaseType>;
	digitalType?: TFilterType<DigitalType>;
	formatType?: TFilterType<FormatType>;
	is3D?: TFilterType<YesNo>;
	isWatched?: TFilterType<YesNo>;
	itemName?: TFilterType<string>;
	itemStatus?: TFilterType<StatusType>;
	releaseDate?: TFilterType<Date>;
};

export type TSavedView = {
	id: number;
	name: string;
	metadata: unknown;
};

export type TSortCol = 'itemID' | 'itemName' | 'ordered';

type TSortDir = 'ASC' | 'DESC';

export type TSort = {
	direction: TSortDir;
	field: TSortCol;
};
