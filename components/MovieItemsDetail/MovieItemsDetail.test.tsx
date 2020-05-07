import { shallow, ShallowWrapper } from 'enzyme';
import React from 'react';

import MovieItemsDetail from './MovieItemsDetail';

describe('MovieItemsDetail', (): void => {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	let wrapper: ShallowWrapper<any, any, any>;

	beforeEach((): void => {
		wrapper = shallow(<MovieItemsDetail loading movieItems={[]} />);
	});

	it('exists', (): void => {
		expect(wrapper.exists()).toBe(true);
	});
});
