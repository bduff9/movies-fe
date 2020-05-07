import { format, parse } from 'date-fns';

export const getFormattedDate = (dateStr: string): string => {
	const date = parse(dateStr, 'yyyy-MM-dd', new Date());

	if (date.toString() === 'Invalid Date') return dateStr;

	if (dateStr === '1970-01-01') return '';

	return format(date, 'EEE MMM do, yyyy');
};
