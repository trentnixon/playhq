import React from 'react';
import styled from 'styled-components';

const MatchContainerStyles = styled.div`
	display: flex;
	flex-direction: column;
	width: 100%;
	height: auto;
	max-width: 100%;
	margin: 0em auto;

	justify-content: space-around;
`;

export const ContainerQLDCAsset = (props) => {
	const {children} = props;

	return <MatchContainerStyles>{children}</MatchContainerStyles>;
};
