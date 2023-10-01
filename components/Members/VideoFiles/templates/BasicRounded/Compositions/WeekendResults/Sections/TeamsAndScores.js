import styled from 'styled-components';
import {getContrastColor} from '../../../../../utils/colors';

import {useCurrentFrame} from 'remotion';
import {interpolateOpacityByFrame} from '../../../../../Animation/interpolate';
import {FromTopToBottom} from '../../../../../Animation/ClipWipe';

const TeamsAndScoresContainer = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: flex-start;
	padding: 0 10px;
`;

const TeamScoreContainer = styled.div`
	display: flex;
	flex-direction: column;
	width: 100%;
	padding: 10px 0;
`;

const TeamName = styled.h2`
	font-style: normal;
	font-weight: 400;
	font-size: 2.1em;
	line-height: 1.15em;
	letter-spacing: -0.05em;
	text-transform: uppercase;
	margin: 0;
	text-align: left;
	font-family: ${(props) => props.fontFamily};
`;

const TeamScore = styled.h3`
	font-size: 3em;
	line-height: 1em;
	font-weight: 900;
	margin: 0;
	text-align: left;
	letter-spacing: -0.015em;
	text-transform: uppercase;
	font-family: ${(props) => props.fontFamily};
`;

export const TeamsAndScores = (props) => {
	const {homeTeam, awayTeam, fontFamily, FPS_SCORECARD} = props;
	const frame = useCurrentFrame();
	return (
		<TeamsAndScoresContainer> 
			<TeamScoreContainer>
				<TeamScore
					fontFamily={fontFamily}
					style={{
						color: getContrastColor(props.THEME.primary),
						clipPath: FromTopToBottom(35, 'Slow'),
						opacity: interpolateOpacityByFrame(
							frame,
							FPS_SCORECARD - 30,
							FPS_SCORECARD,
							1,
							0
						),
					}}
				>
					{homeTeam.score}
				</TeamScore>
				<TeamName
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
					{homeTeam.name}
				</TeamName>
			</TeamScoreContainer>
			<TeamScoreContainer>
				<TeamScore
					fontFamily={fontFamily}
					style={{
						textAlign: 'right',
						color: getContrastColor(props.THEME.primary),
						clipPath: FromTopToBottom(35, 'Slow'),
						opacity: interpolateOpacityByFrame(
							frame,
							FPS_SCORECARD - 30,
							FPS_SCORECARD,
							1,
							0
						),
					}}
				>
					{awayTeam.score}
				</TeamScore>
				<TeamName
					fontFamily={fontFamily}
					style={{
						textAlign: 'right',
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
					{awayTeam.name}
				</TeamName>
			</TeamScoreContainer>
		</TeamsAndScoresContainer>
	);
};
