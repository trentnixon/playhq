import {MatchContainer} from './MatchContainer';
import {HeaderContainer} from './HeaderContainer';
import {TeamsAndScores} from './TeamsAndScores';
import {PlayerPerformances} from './Performances';
import styled from 'styled-components';

/* Import {SpringToFrom} from '../../../../Animation/RemotionSpring';
import {interpolateOpacityByFrame} from '../../../../Animation/interpolate';
import {getContrastColor, darkenColor} from '../../../../utils/colors';
import {restrictString} from '../../../../utils/copy'; */

export const Match = ({matchData, THEME, fontFamily, FPS_SCORECARD}) => {
	const {
		homeTeam,
		awayTeam,
		type,
		ground,
		round,
		gradeName,
		teamHomeLogo,
		teamAwayLogo,
	} = matchData;
	return (
		<MatchContainer THEME={THEME} fontFamily={fontFamily}>
			<InningsContainer>
				<HeaderContainer
					type={type}
					ground={ground}
					gradeName={gradeName}
					round={round}
					THEME={THEME}
					fontFamily={'Oswald'}
					FPS_SCORECARD={FPS_SCORECARD}
				/>

				<TeamsAndScores
					homeTeam={homeTeam}
					awayTeam={awayTeam}
					THEME={THEME}
					fontFamily={'Oswald'}
					FPS_SCORECARD={FPS_SCORECARD}
					teamHomeLogo={teamHomeLogo}
					teamAwayLogo={teamAwayLogo}
				/>

				<PlayerPerformances
					THEME={THEME}
					homeTeam={homeTeam}
					awayTeam={awayTeam}
					fontFamily={'Oswald'}
					FPS_SCORECARD={FPS_SCORECARD}
				/>
			</InningsContainer>
		</MatchContainer>
	);
};

const InningsContainer = styled.div`
	display: flex;
	width: 100%;
	justify-content: space-evenly;
	align-items: center;
	margin-bottom: 50px;
	position: relative;
	
`;
