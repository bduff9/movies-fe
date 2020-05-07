import { shallow, ShallowWrapper } from 'enzyme';
import React from 'react';

import MovieItemForm from './MovieItemForm';

describe('MovieItemForm', (): void => {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	let wrapper: ShallowWrapper<any, any, any>;

	beforeEach((): void => {
		wrapper = shallow(
			<MovieItemForm
				movieItem={{
					caseType: 'Plain',
					digitalType: 'UV',
					formatType: 'Ultra HD',
					id: 1,
					is3D: 'N',
					isWatched: 'N',
					itemName: '',
					itemNotes: '',
					itemStatus: 'Owned',
					itemURL: '',
					releaseDate: '1970-01-01',
				}}
				onSubmit={jest.fn()}
			/>,
		);
	});

	it('exists', (): void => {
		expect(wrapper.exists()).toBe(true);
	});
});
