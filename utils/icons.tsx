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
import {
	faAngleDown as farAngleDown,
	faBook as farBook,
	faChevronDoubleLeft as farChevronDoubleLeft,
	faChevronDoubleRight as farChevronDoubleRight,
	faChevronLeft as farChevronLeft,
	faChevronRight as farChevronRight,
	faClipboard as farClipboard,
	faList as farList,
	faSort as farSort,
	faSquare as farSquare,
	faTable as farTable,
} from '@bduff9/pro-regular-svg-icons';
import {
	faBook,
	faBox,
	faCheck,
	faEnvelope,
	faEye,
	faEyeSlash,
	faLock,
	faPlus,
	faQuestionSquare,
	faSearch,
	faSort,
	faSortDown,
	faSortUp,
	faSpinner,
	faSquare,
	faThLarge,
	faTruck,
} from '@bduff9/pro-solid-svg-icons';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faMoneyBillAlt as farMoneyBillAlt } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';

import { CaseType, FormatType, YesNo, StatusType } from '../graphql/output';

library.add(
	faBook,
	faBox,
	faCheck,
	faEnvelope,
	faEye,
	faEyeSlash,
	faLock,
	faPlus,
	faQuestionSquare,
	faSearch,
	faSort,
	faSortDown,
	faSortUp,
	faSpinner,
	faSquare,
	faThLarge,
	faTruck,
	farAngleDown,
	farBook,
	farChevronDoubleLeft,
	farChevronDoubleRight,
	farChevronLeft,
	farChevronRight,
	farClipboard,
	farList,
	farMoneyBillAlt,
	farSort,
	farSquare,
	farTable,
);

export const formatForGraphQL = (str: string): string => str.replace(/[^a-zA-Z0-9]/g, '');

export const getCaseIcon = (caseType: CaseType): JSX.Element => {
	switch (caseType) {
		case 'Plain':
			return (
				<FontAwesomeIcon icon="square" className="has-text-primary" title={caseType} />
			);
		case 'Box':
			return <FontAwesomeIcon icon="box" className="has-text-primary" title={caseType} />;
		case 'Slipcover':
			return (
				<FontAwesomeIcon
					icon={['far', 'square']}
					className="has-text-primary"
					title={caseType}
				/>
			);
		case 'Digibook':
			return (
				<FontAwesomeIcon
					icon={['far', 'book']}
					className="has-text-primary"
					title={caseType}
				/>
			);
		case 'Steelbook':
			return <FontAwesomeIcon icon="book" className="has-text-primary" title={caseType} />;
		default:
			console.error('Invalid case type passed', caseType);

			return <></>;
	}
};

export const getFormatImage = (format: FormatType, is3D: YesNo): string => {
	let image = `/images/${format}`;

	if (is3D === 'Y') image += '3D';

	return `${image}.png`;
};

export const getStatusIcon = (status: StatusType): JSX.Element => {
	switch (status) {
		case 'Owned':
			return <FontAwesomeIcon icon="check" className="has-text-success" title={status} />;
		case 'Selling':
			return (
				<FontAwesomeIcon
					icon={['far', 'money-bill-alt']}
					className="has-text-success"
					title={status}
				/>
			);
		case 'Wanted':
			return <FontAwesomeIcon icon={['far', 'clipboard']} className="" title={status} />;
		case 'Waiting':
			return <FontAwesomeIcon icon="truck" className="" title={status} />;
		default:
			console.error('Invalid status passed', status);

			return <></>;
	}
};
