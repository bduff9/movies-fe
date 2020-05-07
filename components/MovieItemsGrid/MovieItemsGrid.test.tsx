import { shallow, ShallowWrapper } from 'enzyme';
import React from 'react';

import MovieItemsGrid from './MovieItemsGrid';

describe('MovieItemsGrid', (): void => {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	let wrapper: ShallowWrapper<any, any, any>;

	beforeEach((): void => {
		wrapper = shallow(<MovieItemsGrid loading movieItems={[]} />);
	});

	it('exists', (): void => {
		expect(wrapper.exists()).toBe(true);
	});
});
