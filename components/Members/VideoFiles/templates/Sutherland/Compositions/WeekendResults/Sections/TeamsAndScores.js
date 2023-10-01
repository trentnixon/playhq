import React from 'react';
import styled from 'styled-components';
import {Img, useCurrentFrame} from 'remotion';
import {getContrastColor} from '../../../../../utils/colors';
import {interpolateOpacityByFrame} from '../../../../../Animation/interpolate';
import {
	FromLeftToRight,
	FromRightToLeft,
	FromTopToBottom,
} from '../../../../../Animation/ClipWipe';
import useImageDimensions from '../../../../../hooks/useImageDimensions';
import {parseScore} from '../../../../../utils/copy';

const TeamsAndScoresContainer = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: space-evenly;
	align-items: center;
	padding: 0px;
	width: 40%;
	height: 100%;
`;

const TeamScoreContainer = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: space-evenly;
	align-items: center;
	width: 100%;
	
	align-items: center;
    width: 100%;
    padding: 20px 1.2em 20px 115px;
}
`;

const TeamScore = styled.h3`
	font-size: 2.1em;
	line-height: 1em;
	font-weight: 600;
	margin: 0;
	text-align: left;
	letter-spacing: -0.05em;
	text-transform: uppercase;
	font-family: ${(props) => props.fontFamily};
`;

const Runs = styled(TeamScore)``;

const Overs = styled(TeamScore)`
	font-size: 1em;
	font-weight: 100;
	margin-top:10px;
	letter-spacing: -0.05em;
	text-align:center
`;

const LogoHolder = styled.div`
	margin: 0em;
`;

const generateTeamStyle = (FPS_SCORECARD, primaryColor) => {
	const frame = useCurrentFrame();
	return {
		color: getContrastColor(primaryColor),
		clipPath: FromLeftToRight(15, 'Slow'),
		//opacity: interpolateOpacityByFrame(frame, 20, 50, 0, 1),
	};
};

const generateLogoStyle = (FPS_SCORECARD) => {
	const frame = useCurrentFrame();
	return {
		left: 0,
		top: 0,
		opacity: interpolateOpacityByFrame(frame, 15, 45, 0, 1),
	};
};

const TeamDetail = ({
	team,
	fontFamily,
	imgStyles,
	score,
	overs,
	FPS_SCORECARD,
	primaryColor,
	direction,
	justifyContent,
}) => {
	return (
		<>
			<TeamScoreContainer
				style={{flexDirection: direction, justifyContent: justifyContent}}
			>
				<LogoHolder style={generateLogoStyle(FPS_SCORECARD)}>
					<Img src={team.logo} style={{...imgStyles}} />
				</LogoHolder>
				<TeamScore
					fontFamily={fontFamily}
					style={generateTeamStyle(FPS_SCORECARD, primaryColor)}
				>
					<Runs>{score}</Runs>
					{overs && <Overs>{`(${overs})`}</Overs>}
				</TeamScore>
			</TeamScoreContainer>
		</>
	);
};

export const TeamsAndScores = (props) => {
	const {
		homeTeam,
		awayTeam,
		fontFamily,
		FPS_SCORECARD,
		teamHomeLogo,
		teamAwayLogo,
	} = props;
	const primaryColor = props.THEME.primary;
	const frame = useCurrentFrame();
	const IMGSIZING = [80, 90, 80];
	const teamHomeLogoStyles = useImageDimensions(teamHomeLogo, IMGSIZING);
	const teamAwayLogoStyles = useImageDimensions(teamAwayLogo, IMGSIZING);

	const {score: homeScore, overs: homeOvers} = parseScore(homeTeam.score);
	const {score: awayScore, overs: awayOvers} = parseScore(awayTeam.score);
	console.log(homeTeam.name);
	return (
		<TeamsAndScoresContainer
			style={{
				opacity: interpolateOpacityByFrame(
					frame,
					FPS_SCORECARD - 30,
					FPS_SCORECARD,
					1,
					0
				),
			}}
		>
			<TeamDetail
				team={{logo: teamHomeLogo, Name: homeTeam.name}}
				fontFamily={fontFamily}
				imgStyles={teamHomeLogoStyles}
				score={homeScore}
				overs={homeOvers}
				FPS_SCORECARD={FPS_SCORECARD}
				primaryColor={primaryColor}
				direction="column"
				justifyContent="flex-start"
			/>
			<TeamDetail
				team={{logo: teamAwayLogo, Name: awayTeam.name}}
				fontFamily={fontFamily}
				imgStyles={teamAwayLogoStyles}
				score={awayScore}
				overs={awayOvers}
				FPS_SCORECARD={FPS_SCORECARD}
				primaryColor={primaryColor}
				direction="column"
				justifyContent="flex-start"
			/>
		</TeamsAndScoresContainer>
	);
};
