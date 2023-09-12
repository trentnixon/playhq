import styled from 'styled-components';
import {
	getContrastColor,
	darkenColor,
	lightenColor,
} from '../../../../../utils/colors';

import {useCurrentFrame} from 'remotion';
import {interpolateOpacityByFrame} from '../../../../../Animation/interpolate';
import {
	FromRightToLeft,
	EraseFromMiddle,
} from '../../../../../Animation/ClipWipe';
const LadderPositionContainer = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-content: center;
	align-items: center;
	margin: 0px auto;
	padding: 50x 0px;
	width: 100%;
	height: ${(props) => props.Height}px;
	background-color: white;
	font-family: ${(props) => props.fontFamily};
	background-color: ${(props) => props.bgColor};
`;

const Name = styled.span`
	font-size: 25px;
	font-weight: 400;
	color: ${(props) => props.color};
	width: 60%;
`;

const Performance = styled.span`
font-size: 45px;
font-weight: 100;
color: ${(props) => props.color};
text-align: center;
width: 20%;
`;

const PerformanceContainer = styled.span`
	width: 30%;
	display: flex;
	justify-content: space-evenly;
	align-items: center;
	padding: 0 10px;
	height: ${(props) => props.Height}px;
`;


export const LadderHeader = ({THEME, fontFamily, NumTeams, FPS_LADDER}) => {
	const frame = useCurrentFrame();
	console.log(NumTeams);
	const ContainerHeight = 1500;
	return (
		<LadderPositionContainer
			style={{
        fontFamily: 'Anton',
				clipPath: FromRightToLeft(30, 'Slow'),
				opacity: interpolateOpacityByFrame(
					frame,
					FPS_LADDER - 30,
					FPS_LADDER,
					1,
					0
				),
			}}
			fontFamily={fontFamily}
			bgColor="transparent"
			Height={ContainerHeight / NumTeams - 4}
		>
			<Name color={darkenColor(THEME.secondary)}>{` `}</Name>
			<PerformanceContainer>
				<Performance color={darkenColor(THEME.secondary)}>P</Performance>
				<Performance color={darkenColor(THEME.secondary)}>W</Performance>
				<Performance color={darkenColor(THEME.secondary)}>L</Performance>
				<Performance color={darkenColor(THEME.secondary)}>D</Performance>
				<Performance color={darkenColor(THEME.secondary)}>PTS</Performance>
			</PerformanceContainer>
		</LadderPositionContainer>
	);
};
