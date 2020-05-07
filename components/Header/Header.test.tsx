import { shallow, ShallowWrapper } from 'enzyme';
import React from 'react';

import Header from './Header';

describe('Header', (): void => {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	let wrapper: ShallowWrapper<any, any, any>;

	beforeEach((): void => {
		wrapper = shallow(<Header />);
	});

	it('exists', (): void => {
		expect(wrapper.exists()).toBe(true);
	});
});
