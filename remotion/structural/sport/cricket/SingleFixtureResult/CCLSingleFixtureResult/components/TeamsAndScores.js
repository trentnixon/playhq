import styled, {css} from 'styled-components';
import {splitSocreByRunsAndOvers} from '../../../../../../utils/copy';

import {EraseFromMiddle} from '../../../../../../Animation/ClipWipe';

import {InningsPerformance} from './Performances';
import {
	DisplayInningsScore,
	DisplayTeamName,
	FirstInningsScore,
} from '../../../../../../templates/CoastalCricketLeague/Components/Common/DEPRECATED_CommonVariables';
import {calculateImageDimensions} from '../../../../../../utils/global/calculateImageDimensions';
import {TeamLogoCCL} from '../../../../../../templates/CoastalCricketLeague/Components/Common/TeamLogo';
import {useStylesContext} from '../../../../../../context/StyleContext';
// NEW
// Styled component for the main content area
const StructureMainBlock = styled.div`
	display: flex;
	flex-wrap: wrap;
	width: 100%; // Takes full width of the container
	height: 270px;
	margin-bottom: 10px;
`;

const StructureSidebarBlock = styled.div`
	width: 15%; // Takes 25% width of the container
	display: flex;
	justify-content: center;
	align-items: flex-start;
`;
// Styled component for the content block
const StructureContentBlock = styled.div`
	width: 85%; // Takes remaining width of the container
	justify-content: space-between;
	display: flex;
	flex-direction: column;
`;

const TeamAndScores = styled.div`
	width: 100%;
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
	background-color: ${(props) => props.BackgroundColor};
	padding: 5px 0px;
	border: 5px solid ${(props) => props.BorderColor};
	border-radius: 100px;
	padding: 15px 5px;
`;

const TeamNameContainer = styled.div`
	width: 70%;
`;
const TeamScoreContainer = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
	width: 100%;
	margin-bottom: 10px;
`;

const ScoreIntContainer = styled.div`
	background-color: ${(props) => props.BG};
	border-radius: 100px;
	width: 30%;
	margin: 5px;
	padding: 5px 5px;
	color: black;
	text-align: center;
`;

const animatedStyle = css`
	animation: ${EraseFromMiddle} 1s forwards;
`;

const ScoreIntContainerAnimated = styled(ScoreIntContainer)`
	${(props) => props.animateOut && animatedStyle}
	display: flex;
	align-items: center;
	justify-content: center;
	padding: 0px;
	margin: 0 5px;
`;

export const TeamsAndScores = (props) => {
	const {matchData} = props;
	const {homeTeam, awayTeam, teamHomeLogo, teamAwayLogo} = matchData;

	const [HomeScore, HomeOvers] = splitSocreByRunsAndOvers(homeTeam.score);
	const [AwayScore, AwayOvers] = splitSocreByRunsAndOvers(awayTeam.score);

	const IMGSIZING = [190, 240, 180];
	const teamHomeLogoStyles = calculateImageDimensions(teamHomeLogo, IMGSIZING);
	const teamAwayLogoStyles = calculateImageDimensions(teamAwayLogo, IMGSIZING);

	return (
		<>
			<StructureMainBlock>
				<StructureSidebarBlock>
					<TeamLogoCCL FPS_SCORECARD={200} />
				</StructureSidebarBlock>
				<StructureContentBlock>
					<TeamDetails
						DATA={{
							team: {name: homeTeam.name, logo: teamHomeLogo},
							score: HomeScore,
							FirstInnings: homeTeam.HomescoresFirstInnings,
							overs: HomeOvers,
							Type: matchData.type,
						}}
						imgStyles={teamHomeLogoStyles}
					/>
					<InningsPerformance {...props} innings="home" />
				</StructureContentBlock>
			</StructureMainBlock>
			<StructureMainBlock>
				<StructureSidebarBlock>
					<TeamLogoCCL FPS_SCORECARD={200} />
				</StructureSidebarBlock>
				<StructureContentBlock>
					<TeamScoreContainer>
						<TeamDetails
							DATA={{
								team: {name: awayTeam.name, logo: teamAwayLogo},
								score: AwayScore,
								FirstInnings: awayTeam.AwayscoresFirstInnings,
								overs: AwayOvers,
								Type: matchData.type,
							}}
							imgStyles={teamAwayLogoStyles}
						/>
					</TeamScoreContainer>
					<InningsPerformance {...props} innings="away" />
				</StructureContentBlock>
			</StructureMainBlock>
		</>
	);
};

export const TeamDetails = ({DATA}) => {
	const {StyleConfig} = useStylesContext();
	const {Font, Color} = StyleConfig;
	const {team, score, overs, Type, FirstInnings} = DATA;
	const teamNameCustomStyles = {
		...Font.TitleAlt,
		color: Color.Primary.Contrast,
		fontWeight: '400',
		fontSize: '1.8rem',
		lineHeight: '1.2em',
	};
	const RunsStyles = {
		...Font.TitleAlt,
		color: Color.Primary.Contrast,
		fontSize: '2rem',
		lineHeight: '1em',
		fontWeight: '400',
		margin: '0',
		padding: '5px 0',
		textAlign: 'center',
		textTransform: 'uppercase',
	};
	return (
		<TeamScoreContainer BG={Color.Secondary.Main}>
			<TeamAndScores
				BorderColor={Color.Secondary.Main}
				BackgroundColor={Color.Primary.Main}
			>
				<TeamNameContainer>
					<DisplayTeamName
						name={team.name}
						customStyles={teamNameCustomStyles}
					/>
				</TeamNameContainer>
				<ScoreIntContainerAnimated
					BG={Color.Primary.Darken}
					FPS_SCORECARD={180}
				>
					<FirstInningsScore
						FirstInnings={FirstInnings}
						Type={Type}
						customStyles={RunsStyles}
					/>{' '}
					<DisplayInningsScore
						score={score}
						overs={overs}
						customStyles={RunsStyles}
					/>
				</ScoreIntContainerAnimated>
			</TeamAndScores>
		</TeamScoreContainer>
	);
};
