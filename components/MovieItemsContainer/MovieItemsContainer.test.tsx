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
