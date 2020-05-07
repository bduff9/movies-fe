import { shallow, ShallowWrapper } from 'enzyme';
import React from 'react';

import ButtonLink from './ButtonLink';

describe('ButtonLink', (): void => {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	let wrapper: ShallowWrapper<any, any, any>;

	beforeEach((): void => {
		wrapper = shallow(<ButtonLink to="/" />);
	});

	it('exists', (): void => {
		expect(wrapper.exists()).toBe(true);
	});
});
