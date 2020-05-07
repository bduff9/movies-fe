import { shallow, ShallowWrapper } from 'enzyme';
import React from 'react';

import GQLError from './GQLError';

describe('GQLError', (): void => {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	let wrapper: ShallowWrapper<any, any, any>;

	beforeEach((): void => {
		wrapper = shallow(<GQLError error={undefined} />);
	});

	it('exists', (): void => {
		expect(wrapper.exists()).toBe(true);
	});

	test.todo('add tests for GQLError');
});
