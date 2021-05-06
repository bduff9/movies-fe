/*
Movies FE - the frontend implementation of a movie tracker.
Copyright (C) 2015-present Brian Duffey and Billy Alexander
This program is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.
This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.
You should have received a copy of the GNU General Public License
along with this program.  If not, see {http://www.gnu.org/licenses/}.
Home: https://asitewithnoname.com/
*/
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
