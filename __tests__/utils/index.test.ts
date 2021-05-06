/*******************************************************************************
 * Movies FE - the frontend implementation of a movie tracker.
 * Copyright (C) 2015-present Brian Duffey and Billy Alexander
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see {http://www.gnu.org/licenses/}.
 * Home: https://asitewithnoname.com/
 */
import { convertGQLValueForDisplay } from '../../utils';

describe('convertGQLValueForDisplay', () => {
	it('handles digital copy', () => {
		const value = convertGQLValueForDisplay('DCUV');

		expect(value).toEqual('DC+UV');
	});

	it('handles Blu-ray', () => {
		const value = convertGQLValueForDisplay('BluRay');

		expect(value).toEqual('Blu-ray');
	});

	it('handles Ultra HD', () => {
		const value = convertGQLValueForDisplay('UltraHD');

		expect(value).toEqual('Ultra HD');
	});

	it('handles base case', () => {
		const value = convertGQLValueForDisplay('OtherValue');

		expect(value).toEqual('OtherValue');
	});
});
