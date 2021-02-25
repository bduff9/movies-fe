import { ReactText } from 'react';
import { toast, ToastOptions } from 'react-toastify';

// ts-prune-ignore-next
export const displayToastMessage = (
	messageContent: string,
	opts: ToastOptions = {
		autoClose: 5000,
		position: 'top-center',
		type: 'success',
	},
): ReactText | null => {
	if (!messageContent) return null;

	return toast(messageContent, opts);
};
