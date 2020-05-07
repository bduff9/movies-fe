import { Box } from 'bloomer';
import { shallow, ShallowWrapper } from 'enzyme';
import React from 'react';

import Filters from './Filters';

describe('Filters', (): void => {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	let wrapper: ShallowWrapper<any, any, any>;

	beforeEach((): void => {
		wrapper = shallow(<Filters filters={{}} updateFilters={jest.fn()} />);
	});

	it('exists', (): void => {
		expect(wrapper.exists()).toBe(true);
	});

	it('contains a Box', (): void => {
		expect(wrapper.find(Box).length).toEqual(1);
	});
});
