import React, { FC, ReactElement } from 'react';

interface MovieItemPlaceholderProps {
	title: string;
}

const MovieItemPlaceholder: FC<MovieItemPlaceholderProps> = ({
	title,
}): ReactElement => {
	if (title.length > 10) title = title.substr(0, 10);

	return (
		<svg width="114" height="152" xmlns="http://www.w3.org/2000/svg">
			<rect
				x="2"
				y="2"
				width="110"
				height="148"
				style={{ fill: '#dedede', stroke: '#dedede', strokeWidth: 2 }}
			/>
			<text
				x="50%"
				y="50%"
				fontSize="18"
				textAnchor="middle"
				alignmentBaseline="middle"
				fontFamily="monospace, sans-serif"
				fill="#999"
			>
				{title}
			</text>
		</svg>
	);
};

MovieItemPlaceholder.whyDidYouRender = true;

export default MovieItemPlaceholder;
