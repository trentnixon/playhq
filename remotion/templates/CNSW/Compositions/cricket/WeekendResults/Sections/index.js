import {MatchContainer} from './MatchContainer';
import {TeamDetail} from './TeamsAndScores';
import {PlayerPerformances} from './Performances';
import styled from 'styled-components';
import {parseScore} from '../../../../../../utils/copy';
import {DisplayMetaItem} from '../../../../Components/Body/MetaItem';
import {calculateImageDimensions} from '../../../../../../utils/global/calculateImageDimensions';

const TeamsAndScoresContainer = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	align-items: flex-start;
	
`;
const InningContainer = styled.div`
	margin-bottom: ${(props) => props.bottom};
	width: 100%;
	filter: drop-shadow(10px 10px 10px rgba(0, 0, 0, 0.25));
	
`;

export const Match = (props) => {
	const {
		matchData,
		THEME,
		fontFamily,
		FPS_SCORECARD,
		StyleConfig,
	} = props;
	const {homeTeam, awayTeam, teamHomeLogo, teamAwayLogo, gradeName, round} =
		matchData;

	//console.log(StyleConfig);

	const primaryColor = StyleConfig.Color.Primary.Main;

	const IMGSIZING = [80, 80, 80];
	const teamHomeLogoStyles = calculateImageDimensions(teamHomeLogo, IMGSIZING);
	const teamAwayLogoStyles = calculateImageDimensions(teamAwayLogo, IMGSIZING);

	const {score: homeScore, overs: homeOvers} = parseScore(homeTeam.score);
	const {score: awayScore, overs: awayOvers} = parseScore(awayTeam.score);

	return (
		<MatchContainer fontFamily={fontFamily}>
			<DisplayMetaItem
				fontFamily={fontFamily}
				VALUE={gradeName}
				StyleConfig={StyleConfig}
				FPS_SCORECARD={FPS_SCORECARD}
			/>
			<TeamsAndScoresContainer>
				<InningContainer bottom='70px'>
					<TeamDetail 
						team={{logo: teamHomeLogo}}
						fontFamily={fontFamily}
						imgStyles={teamHomeLogoStyles}
						score={homeScore}
						overs={homeOvers}
						FirstInnings={homeTeam.HomescoresFirstInnings}
						Name={homeTeam.name}
						FPS_SCORECARD={FPS_SCORECARD}
						primaryColor={primaryColor}
						THEME={THEME}
						StyleConfig={StyleConfig}
						Type={matchData.type}
						gradeName={gradeName}
					/>

					<PlayerPerformances
						{...props}
						Batting={homeTeam.battingPerformances}
						Bowling={homeTeam.bowlingPerformances}
					/>
				</InningContainer>
				<InningContainer bottom='0px'>
					<TeamDetail
						Name={awayTeam.name}
						team={{logo: teamAwayLogo}}
						fontFamily={fontFamily}
						imgStyles={teamAwayLogoStyles}
						FirstInnings={awayTeam.AwayscoresFirstInnings}
						score={awayScore}
						overs={awayOvers}
						Type={matchData.type}
						FPS_SCORECARD={FPS_SCORECARD}
						primaryColor={primaryColor}
						THEME={THEME}
						StyleConfig={StyleConfig}
						direction="row-reverse"
						justifyContent="flex-end"
						textAlign="left"
					/>
					<PlayerPerformances
						{...props}
						Batting={awayTeam.battingPerformances}
						Bowling={awayTeam.bowlingPerformances}
					/>
				</InningContainer>
				<DisplayMetaItem
					fontFamily={fontFamily}
					VALUE={`${matchData.type} | ${round}`}
					StyleConfig={StyleConfig}
					FPS_SCORECARD={FPS_SCORECARD}
				/>
			</TeamsAndScoresContainer>
		</MatchContainer>
	);
};
