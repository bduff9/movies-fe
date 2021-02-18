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
