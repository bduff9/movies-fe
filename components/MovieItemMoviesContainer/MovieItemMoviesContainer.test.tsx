import { MockedProvider, MockedResponse } from '@apollo/client/testing';
import { shallow, ShallowWrapper } from 'enzyme';
import React from 'react';

import MovieItemMoviesContainer from './MovieItemMoviesContainer';

describe('MovieItemMoviesContainer', (): void => {
	const mocks: MockedResponse[] = [];
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	let wrapper: ShallowWrapper<any, any, any>;

	beforeEach((): void => {
		wrapper = shallow(
			<MockedProvider mocks={mocks}>
				<MovieItemMoviesContainer movieItemID={1} />
			</MockedProvider>,
		);
	});

	it('exists', (): void => {
		expect(wrapper.exists()).toBe(true);
	});
});
