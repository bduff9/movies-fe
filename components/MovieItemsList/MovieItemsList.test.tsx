import { shallow, ShallowWrapper } from 'enzyme';
import React from 'react';

import MovieItemsList from './MovieItemsList';

describe('MovieItemsList', (): void => {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	let wrapper: ShallowWrapper<any, any, any>;

	beforeEach((): void => {
		wrapper = shallow(<MovieItemsList loading movieItems={[]} />);
	});

	it('exists', (): void => {
		expect(wrapper.exists()).toBe(true);
	});
});
