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
import { shallow, ShallowWrapper } from 'enzyme';
import React from 'react';

import { CaseType, DigitalType, FormatType, StatusType, YesNo } from '../../graphql/output';

import MovieItemForm from './MovieItemForm';

describe('MovieItemForm', (): void => {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	let wrapper: ShallowWrapper<any, any, any>;

	beforeEach((): void => {
		wrapper = shallow(
			<MovieItemForm
				movieItem={{
					caseType: CaseType.Plain,
					digitalType: DigitalType.Uv,
					formatType: FormatType.UltraHd,
					itemID: 1,
					is3D: YesNo.N,
					isWatched: YesNo.N,
					itemName: '',
					itemNotes: '',
					itemStatus: StatusType.Owned,
					itemURL: '',
					releaseDate: '1970-01-01',
				}}
			/>,
		);
	});

	it('exists', (): void => {
		expect(wrapper.exists()).toBe(true);
	});
});
