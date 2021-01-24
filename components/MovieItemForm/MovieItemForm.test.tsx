import { shallow, ShallowWrapper } from 'enzyme';
import React from 'react';

import {
	CaseType,
	DigitalType,
	FormatType,
	StatusType,
	YesNo,
} from '../../graphql/output';

import MovieItemForm from './MovieItemForm';

describe('MovieItemForm', (): void => {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	let wrapper: ShallowWrapper<any, any, any>;

	beforeEach((): void => {
		wrapper = shallow(
			<MovieItemForm
				movieItem={{
					caseType: CaseType.Plain,
					digitalType: DigitalType.Uv,
					formatType: FormatType.UltraHd,
					itemID: 1,
					is3D: YesNo.N,
					isWatched: YesNo.N,
					itemName: '',
					itemNotes: '',
					itemStatus: StatusType.Owned,
					itemURL: '',
					releaseDate: '1970-01-01',
				}}
			/>,
		);
	});

	it('exists', (): void => {
		expect(wrapper.exists()).toBe(true);
	});
});
