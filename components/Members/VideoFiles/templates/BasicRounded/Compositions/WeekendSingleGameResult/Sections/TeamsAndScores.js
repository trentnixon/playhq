import styled from 'styled-components';
import {getContrastColor} from '../../../../../utils/colors';

import {splitSocreByRunsAndOvers} from '../../../../../utils/copy';

const TeamsAndScoresContainer = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: flex-start;
	padding: 0 10px;
	margin: 30px 0 60px;
`;

const TeamScoreContainer = styled.div`
	display: flex;
	flex-direction: column;
	width: 100%;
	padding: 10px 0 0;
`;

const TeamScore = styled.h3`
	font-size: 6em;
	font-weight: 900;
	margin: 0;
	text-align: left;
	letter-spacing: -0.1em;
	margin: 0;
	line-height: 1em;
	text-transform: uppercase;
	font-family: ${(props) => props.fontFamily};
`;
const TeamName = styled.h2`
	font-style: normal;
	font-weight: 400;
	font-size: 2.8em;
	line-height: 0.95em;
	letter-spacing: -0.085em;
	text-transform: uppercase;
	margin: 0;
	text-align: left;
	font-family: ${(props) => props.fontFamily};
`;

const TeamOvers = styled.span`
	font-size: 0.5em;
	letter-spacing: -0.095em;
	font-weight: 600;
`;
const GradeName = styled.h2`
	font-style: normal;
	font-weight: 400;
	font-size: 3em;
	line-height: 1em;
	letter-spacing: -0.085em;
	text-transform: uppercase;
	margin: 10px 0;
	text-align: center;
	font-family: ${(props) => props.fontFamily};
`;
export const TeamsAndScores = (props) => {
	const {homeTeam, awayTeam, fontFamily, gradeName} = props;

	const [HomeScore, HomeOvers] = splitSocreByRunsAndOvers(homeTeam.score);
	const [AwayScore, AwayOvers] = splitSocreByRunsAndOvers(awayTeam.score);
	return (
		<>
			<GradeName fontFamily={fontFamily}>{gradeName}</GradeName>

			<TeamsAndScoresContainer>
				<TeamScoreContainer>
					<TeamScore
						fontFamily={fontFamily}
						style={{
							color: getContrastColor(props.THEME.primary),
							textAlign: 'left',
						}}
					>
						{HomeScore}
						{HomeOvers && <TeamOvers>{` (${HomeOvers}`}</TeamOvers>}
					</TeamScore>
					<TeamName
						fontFamily={fontFamily}
						style={{
							color: getContrastColor(props.THEME.primary),
							textAlign: 'left',
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
						}}
					>
						{AwayScore}
						{AwayOvers && <TeamOvers>{` (${AwayOvers}`}</TeamOvers>}
					</TeamScore>
					<TeamName
						fontFamily={fontFamily}
						style={{
							textAlign: 'right',
							color: getContrastColor(props.THEME.primary),
						}}
					>
						{awayTeam.name}
					</TeamName>
				</TeamScoreContainer>
			</TeamsAndScoresContainer>
		</>
	);
};
