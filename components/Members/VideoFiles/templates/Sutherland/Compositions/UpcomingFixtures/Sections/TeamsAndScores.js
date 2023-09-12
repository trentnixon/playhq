import styled from 'styled-components';

import {
	getContrastColor,
	darkenColor,
	setOpacity,
} from '../../../../../utils/colors';
import {useCurrentFrame} from 'remotion';
import {interpolateOpacityByFrame} from '../../../../../Animation/interpolate';
import {
	FromTopToBottom,
	FromLeftToRight,
	FromRightToLeft,
} from '../../../../../Animation/ClipWipe';

const TeamsAndScoresContainer = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: flex-start;
	padding: 0px;
	width: 85%;
	flex-direction: row;
	background-color: ${(props) => props.bgColor};
`;

const TeamScoreContainer = styled.div`
	display: flex;
	flex-direction: column;
	padding: 20px 0;
	width: 100%;
	background-color: ${(props) => props.bgColor};
`;

const TeamName = styled.h2`
	font-family: Anton;
	font-style: normal;
	font-weight: 400;
	font-size: 2.5em;
	line-height: 1.2em;
	letter-spacing: 0.05em;
	text-transform: uppercase;
	margin: 0;
	padding: 0 10px;
	text-align: center;
	font-family: ${(props) => props.fontFamily};
`;

const TeamScore = styled.h3`
	font-family: Anton;
	font-size: 2em;
	line-height: 1.1em;
	font-weight: 600;
	text-align: center;
	margin: 0;
	padding: 0;
	width: 100%;
	letter-spacing: 0.05em;
	text-transform: uppercase;
	font-family: ${(props) => props.fontFamily};
`;

export const TeamsAndScores = (props) => {
	const {
		homeTeam,
		awayTeam,
		fontFamily,
		FPS_SCORECARD,
		time,
		gradeName,
		THEME,
		ground,
	} = props;
	console.log(homeTeam);
	const frame = useCurrentFrame();
	return (
		<TeamsAndScoresContainer
			bgColor={setOpacity(darkenColor(THEME.primary), 0.7)}
		>
			<TeamScoreContainer
				style={{
					clipPath: FromLeftToRight(7, 'Wobbly'),
					opacity: interpolateOpacityByFrame(
						frame,
						FPS_SCORECARD - 30,
						FPS_SCORECARD,
						1,
						0
					),
				}}
			>
				<TeamName
					fontFamily={fontFamily}
					style={{
						textAlign: 'left',
						color: getContrastColor(darkenColor(THEME.primary)),
						clipPath: FromTopToBottom(30, 'Slow'),
						opacity: interpolateOpacityByFrame(
							frame,
							FPS_SCORECARD - 30,
							FPS_SCORECARD,
							1,
							0
						),
					}}
				>
					{homeTeam}
				</TeamName>
			</TeamScoreContainer>
			<TeamScoreContainer style={{width: '50px'}}>
				<TeamScore
					fontFamily={fontFamily}
					style={{
						color: getContrastColor(props.THEME.primary),
						clipPath: FromTopToBottom(30, 'Slow'),
						opacity: interpolateOpacityByFrame(
							frame,
							FPS_SCORECARD - 30,
							FPS_SCORECARD,
							1,
							0
						),
					}}
				>
					vs
				</TeamScore>
			</TeamScoreContainer>
			<TeamScoreContainer
				/* bgColor={THEME.secondary} */
				style={{
					clipPath: FromRightToLeft(7, 'Wobbly'),
					opacity: interpolateOpacityByFrame(
						frame,
						FPS_SCORECARD - 30,
						FPS_SCORECARD,
						1,
						0
					),
				}}
			>
				<TeamName
					fontFamily={fontFamily}
					style={{
						textAlign: 'right',
						color: getContrastColor(THEME.primary),
						clipPath: FromTopToBottom(30, 'Slow'),
						opacity: interpolateOpacityByFrame(
							frame,
							FPS_SCORECARD - 30,
							FPS_SCORECARD,
							1,
							0
						),
					}}
				>
					{awayTeam}
				</TeamName>
			</TeamScoreContainer>
		</TeamsAndScoresContainer>
	);
};

/* <TeamScoreContainer>
				<TeamScore
					fontFamily={fontFamily}
					style={{
						color: getContrastColor(props.THEME.primary),
						clipPath: FromTopToBottom(30, 'Slow'),
						opacity: interpolateOpacityByFrame(
							frame,
							FPS_SCORECARD - 30,
							FPS_SCORECARD,
							1,
							0
						),
					}}
				>
					{gradeName}
				</TeamScore>
			</TeamScoreContainer> */
