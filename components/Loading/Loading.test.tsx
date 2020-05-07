import { shallow, ShallowWrapper } from 'enzyme';
import React from 'react';

import Loading from './Loading';

describe('Loading', (): void => {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	let wrapper: ShallowWrapper<any, any, any>;

	beforeEach((): void => {
		wrapper = shallow(<Loading />);
	});

	it('exists', (): void => {
		expect(wrapper.exists()).toBe(true);
	});
});
