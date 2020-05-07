import { shallow, ShallowWrapper } from 'enzyme';
import React from 'react';

import ToggleMovieItemWatched from './ToggleMovieItemWatched';

describe('ToggleMovieItemWatched', (): void => {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	let wrapper: ShallowWrapper<any, any, any>;

	beforeEach((): void => {
		wrapper = shallow(<ToggleMovieItemWatched isWatched={false} itemID={1} />);
	});

	it('exists', (): void => {
		expect(wrapper.exists()).toBe(true);
	});
});
