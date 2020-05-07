import { shallow, ShallowWrapper } from 'enzyme';
import React from 'react';

import MovieItemPlaceholder from './MovieItemPlaceholder';

describe('MovieItemPlaceholder', (): void => {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	let wrapper: ShallowWrapper<any, any, any>;

	beforeEach((): void => {
		wrapper = shallow(<MovieItemPlaceholder title="Test Title" />);
	});

	it('contains an svg', (): void => {
		expect(wrapper.find('svg').length).toEqual(1);
	});
});
