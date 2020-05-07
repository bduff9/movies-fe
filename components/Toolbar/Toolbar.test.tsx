import { shallow, ShallowWrapper } from 'enzyme';
import React from 'react';

import Toolbar from './Toolbar';

describe('Toolbar', (): void => {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	let wrapper: ShallowWrapper<any, any, any>;

	beforeEach((): void => {
		wrapper = shallow(
			<Toolbar
				changeView={jest.fn()}
				maxPage={1}
				page={1}
				paginate={jest.fn()}
				sortBy={[]}
				sortItems={jest.fn()}
				toggleFilters={jest.fn()}
				viewAs="Grid"
			/>,
		);
	});

	it('exists', (): void => {
		expect(wrapper.exists()).toBe(true);
	});
});
