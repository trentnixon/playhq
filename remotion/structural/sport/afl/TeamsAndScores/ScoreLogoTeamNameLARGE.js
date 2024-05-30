import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types'; // Importing PropTypes for prop validation
import {useCurrentFrame} from 'remotion';
import {FromTopToBottom} from '../../../../Animation/ClipWipe';
import {interpolateOpacityByFrame} from '../../../../Animation/interpolate';
import {ImageWithFallback} from '../../../../utils/global/ImageWithFallback';
import {calculateImageDimensions} from '../../../../utils/global/calculateImageDimensions';
import {restrictString} from '../../../../utils/copy';

// Centralized styling for containers for easier maintenance and readability.
const TeamsAndScoresContainer = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: stretch;
	padding: 0px;
	margin-top: 40px;
	margin-bottom: 20px;
`;

const TeamScoreContainer = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: space-around;
	align-items: center;
	width: 100%;
	padding: 0;
`;

// Utilized template literal for consistent styling & to facilitate potential theme integration.
const teamScoreStyles = `
  line-height: 1em;
  margin: 0;
  text-align: right;
  letter-spacing: 0em;
  text-transform: uppercase;
`;

const TeamName = styled.h3`
	${teamScoreStyles}
	font-size: 2.4em;
	font-weight: 200 !important;
`;
const Points = styled.h3`
	${teamScoreStyles}
	font-size: 8em;
	letter-spacing: -5px;
`;

const LogoHolder = styled.div`
	margin: 0 2em;
`;

// Enhanced readability and reuse of style generation functions.
const generateTeamStyle = (FPS_SCORECARD, textAlign, Font, Color, frame) => ({
	...Font,
	textAlign,
	color: Color,
	clipPath: FromTopToBottom(15, 'Slow'),
	opacity: interpolateOpacityByFrame(
		frame,
		FPS_SCORECARD - 15,
		FPS_SCORECARD,
		1,
		0
	),
});

const generateLogoStyle = (FPS_SCORECARD, frame) => ({
	left: 0,
	top: 0,
	clipPath: FromTopToBottom(10, 'Slow'),
	opacity: interpolateOpacityByFrame(
		frame,
		FPS_SCORECARD - 15,
		FPS_SCORECARD,
		1,
		0
	),
});

// Future improvement: Consider extracting inline styles into styled components for better performance and cleaner code.
const TeamDetail = ({
	team,
	imgStyles,
	score,
	FPS_SCORECARD,
	direction,
	justifyContent,
	Name,
	textAlign,
	StyleConfig,
}) => {
	const frame = useCurrentFrame();
	const {Font, Color} = StyleConfig;
	const createStyle = generateTeamStyle(
		FPS_SCORECARD,
		textAlign,
		Font.Title,
		Color.Primary.BackgroundContractColor,
		frame
	);

	// Error handling: Prop validation
	TeamDetail.propTypes = {
		team: PropTypes.object.isRequired,
		imgStyles: PropTypes.object,
		score: PropTypes.number.isRequired,
		FPS_SCORECARD: PropTypes.number.isRequired,
		direction: PropTypes.string.isRequired,
		justifyContent: PropTypes.string.isRequired,
		Name: PropTypes.string.isRequired,
		textAlign: PropTypes.string.isRequired,
		StyleConfig: PropTypes.object.isRequired,
	};

	const isScoreANumber = () => {
		if (isNaN(score)) {
			return 0;
		}
		return score;
	};

	return (
		<TeamScoreContainer style={{flexDirection: direction, justifyContent}}>
			<div>
				<Points style={createStyle}>{isScoreANumber(score)}</Points>
				<TeamName style={createStyle}>{restrictString(Name, 40)}</TeamName>
			</div>
			<LogoHolder style={generateLogoStyle(FPS_SCORECARD, frame)}>
				<ImageWithFallback
					src={team.logo}
					style={{
						...imgStyles,
						borderRadius: '100%',
						height: '100px',
						width: '100px',
						objectFit: 'cover',
					}}
				/>
			</LogoHolder>
		</TeamScoreContainer>
	);
};

// Enhance error handling by validating props to ensure required data is present.
export const ScoreLogoTeamNameLARGE = ({
	matchData,
	FPS_SCORECARD,
	StyleConfig,
}) => {
	const {teams} = matchData;
	const {home, away} = teams;
	const IMGSIZING = [80, 80, 80]; // Consider moving this to a constants file if used across multiple components.
	const teamHomeLogoStyles = calculateImageDimensions(home.logo, IMGSIZING);
	const teamAwayLogoStyles = calculateImageDimensions(away.logo, IMGSIZING);

	const homeScore = parseInt(home.scores, 10);
	const awayScore = parseInt(away.scores, 10);

	// Error handling: Prop validation
	ScoreLogoTeamNameLARGE.propTypes = {
		matchData: PropTypes.object.isRequired,
		FPS_SCORECARD: PropTypes.number.isRequired,
		StyleConfig: PropTypes.object.isRequired,
	};

	return (
		<TeamsAndScoresContainer>
			<TeamDetail
				StyleConfig={StyleConfig}
				team={{logo: home.logo}}
				imgStyles={teamHomeLogoStyles}
				score={homeScore}
				Name={home.name}
				FPS_SCORECARD={FPS_SCORECARD}
				direction="row"
				justifyContent="flex-end"
				textAlign="right"
			/>
			<TeamDetail
				StyleConfig={StyleConfig}
				team={{logo: away.logo}}
				imgStyles={teamAwayLogoStyles}
				score={awayScore}
				Name={away.name}
				FPS_SCORECARD={FPS_SCORECARD}
				direction="row-reverse"
				justifyContent="flex-end"
				textAlign="left"
			/>
		</TeamsAndScoresContainer>
	);
};

// Dev notes:
// - Improved code readability and maintainability through the use of styled-components.
// - Introduced PropTypes for enhanced error handling and to ensure that necessary props are received by components.
// - Suggested future improvement to extract inline styles into styled components for cleaner code and potential performance benefits.

// LLM Notes:
// This file defines a React component used to display teams and scores in a sports match context.
// It utilizes styled-components for styling, remotion for animation, and custom hooks for image dimensions.
// The components are structured to support different match types and innings, with conditional rendering based on match data.
// It is part of a larger sports analytics and visualization application, located under /src/components/match/TeamsAndScores in the project structure.
