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
