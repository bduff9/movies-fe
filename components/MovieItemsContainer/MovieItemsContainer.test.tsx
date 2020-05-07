import { shallow, ShallowWrapper } from 'enzyme';
import React from 'react';

import MovieItemsContainer from './MovieItemsContainer';

describe('MovieItemsContainer', (): void => {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	let wrapper: ShallowWrapper<any, any, any>;

	beforeEach((): void => {
		wrapper = shallow(
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
			/>,
		);
	});

	it('exists', (): void => {
		expect(wrapper.exists()).toBe(true);
	});
});
