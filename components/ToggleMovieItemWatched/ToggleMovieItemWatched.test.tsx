import { MockedProvider, MockedResponse } from '@apollo/client/testing';
import { shallow, ShallowWrapper } from 'enzyme';
import React from 'react';

import ToggleMovieItemWatched from './ToggleMovieItemWatched';

describe('ToggleMovieItemWatched', (): void => {
	const mocks: MockedResponse[] = [];
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	let wrapper: ShallowWrapper<any, any, any>;

	beforeEach((): void => {
		wrapper = shallow(
			<MockedProvider mocks={mocks}>
				<ToggleMovieItemWatched
					isWatched={false}
					itemID={1}
					refetch={jest.fn()}
				/>
			</MockedProvider>,
		);
	});

	it('exists', (): void => {
		expect(wrapper.exists()).toBe(true);
	});
});
