import styled from 'styled-components';
import {
	getContrastColor,
	lightenColor,
	setOpacity,
} from '../../../../../utils/colors';
import {useCurrentFrame} from 'remotion';
import {interpolateOpacityByFrame} from '../../../../../Animation/interpolate';
import {FromLeftToRight} from '../../../../../Animation/ClipWipe';

const LadderPositionContainer = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-content: center;
	align-items: center;
	margin: 2px auto;
	padding: 0 0px 0 10px;
	width: 100%;
	height: ${(props) => props.Height}px;
	background-color: white;
	font-family: ${(props) => props.fontFamily};
	background-color: ${(props) => props.bgColor};
`;

const Name = styled.span`
	font-size: 45px;
	font-weight: 100;
	color: ${(props) => props.color};
	width: 60%;
	letter-spacing: 0.05em;
`;

const PerformanceContainer = styled.span`
	width: 30%;
	display: flex;
	justify-content: space-evenly;
	align-items: center;
	padding: 0 10px;
	height: ${(props) => props.Height}px;
`;

const Performance = styled.span`
	font-size: 45px;
	font-weight: 100;
	color: ${(props) => props.color};
	text-align: center;
	width: 20%;
`;

export const LadderPosition = ({
	LadderItem,
	THEME,
	fontFamily,
	NumTeams,
	INT,
	isTeam,
	FPS_LADDER,
}) => {
	const {TIE, L, W, P, position, PTS, teamName} = LadderItem;
	const frame = useCurrentFrame();

	console.log(LadderItem);
	const useTHEMECOLOR = isTeam ? 'secondary' : 'primary';
	const semiTransparent = setOpacity(THEME[useTHEMECOLOR], 0.5);
	const semiDataTransparent = setOpacity(THEME[useTHEMECOLOR], 0.75);
	const ContainerHeight = 1500;
	return (
		<LadderPositionContainer
			style={{
				fontFamily: 'Anton',
				clipPath: FromLeftToRight(30 + INT * 3, 'Slow'),
				opacity: interpolateOpacityByFrame(
					frame,
					FPS_LADDER - 30,
					FPS_LADDER,
					1,
					0
				),
			}}
			fontFamily={fontFamily}
			bgColor={semiTransparent}
			Height={ContainerHeight / NumTeams - 4}
		>
			<Name color={getContrastColor(lightenColor(THEME[useTHEMECOLOR]))}>
				{position}. {teamName}
			</Name>
			<PerformanceContainer
				Height={ContainerHeight / NumTeams - 4}
				style={{
					backgroundColor: semiDataTransparent,
				}}
			>
				<Performance
					color={getContrastColor(lightenColor(THEME[useTHEMECOLOR]))}
				>
					{P}
				</Performance>
				<Performance
					color={getContrastColor(lightenColor(THEME[useTHEMECOLOR]))}
				>
					{W}
				</Performance>
				<Performance
					color={getContrastColor(lightenColor(THEME[useTHEMECOLOR]))}
				>
					{L}
				</Performance>
				<Performance
					color={getContrastColor(lightenColor(THEME[useTHEMECOLOR]))}
				>
					{TIE}
				</Performance>
				<Performance
					color={getContrastColor(lightenColor(THEME[useTHEMECOLOR]))}
				>
					{PTS}
				</Performance>
			</PerformanceContainer>
		</LadderPositionContainer>
	);
};
