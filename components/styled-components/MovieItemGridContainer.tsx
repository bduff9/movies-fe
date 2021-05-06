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
import { Container } from 'bloomer';
import styled from 'styled-components';

type MovieItemGridContainerProps = {
	offset?: string;
};

const MovieItemGridContainer = styled(Container)<MovieItemGridContainerProps>`
	height: ${({ offset = '104px' }): string => `calc(100vh - ${offset});`}
	overflow-y: auto;
	padding: 1px 13px;
`;

export default MovieItemGridContainer;
