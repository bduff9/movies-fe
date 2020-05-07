export const convertGQLValueForDisplay = <T extends string>(
	value: T,
): string => {
	switch (value) {
		case 'BluRay':
			return 'Blu-ray';
		case 'DCUV':
			return 'DC+UV';
		case 'UltraHD':
			return 'Ultra HD';
		default:
			return value;
	}
};
