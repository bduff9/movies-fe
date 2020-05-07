import { shallow, ShallowWrapper } from 'enzyme';
import React from 'react';

import MovieItemMoviesContainer from './MovieItemMoviesContainer';

describe('MovieItemMoviesContainer', (): void => {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	let wrapper: ShallowWrapper<any, any, any>;

	beforeEach((): void => {
		wrapper = shallow(<MovieItemMoviesContainer movieItemID={1} />);
	});

	it('exists', (): void => {
		expect(wrapper.exists()).toBe(true);
	});
});
