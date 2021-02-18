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
