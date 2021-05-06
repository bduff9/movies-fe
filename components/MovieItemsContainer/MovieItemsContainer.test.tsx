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
import { MockedProvider, MockedResponse } from '@apollo/client/testing';
import { shallow, ShallowWrapper } from 'enzyme';
import React from 'react';

import MovieItemsContainer from './MovieItemsContainer';

describe('MovieItemsContainer', (): void => {
	const mocks: MockedResponse[] = [];
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	let wrapper: ShallowWrapper<any, any, any>;

	beforeEach((): void => {
		wrapper = shallow(
			<MockedProvider mocks={mocks}>
				<MovieItemsContainer
					changeView={jest.fn()}
					filterOpen={false}
					filters={{}}
					page={1}
					paginate={jest.fn()}
					sortBy={[]}
					sortItems={jest.fn()}
					toggleFilters={jest.fn()}
					updateFilters={jest.fn()}
					viewAs="Grid"
				/>
			</MockedProvider>,
		);
	});

	it('exists', (): void => {
		expect(wrapper.exists()).toBe(true);
	});
});
