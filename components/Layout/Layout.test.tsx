import { shallow } from 'enzyme';
import React from 'react';

import Layout from './Layout';

describe('Layout', () => {
	it('renders children passed to it', () => {
		const layout = shallow(
			<Layout isLoading>
				<h1>Title</h1>
			</Layout>,
		);

		expect(layout.find('h1').text()).toEqual('Title');
	});
});
