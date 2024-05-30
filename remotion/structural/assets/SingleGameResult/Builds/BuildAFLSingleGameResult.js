import {BestPlayersAsString} from '../../../sport/afl/BestPlayers/BestPlayersAsString';
import {AFLMatchContainer} from '../../../sport/afl/Containers/AFLMatchContainer';
import {DisplayBothQuartersAsRows} from '../../../sport/afl/DisplayQuaters/DisplayBothQuartersAsRows';
import {GoalScorersTwoListsHomeAwayStatic} from '../../../sport/afl/GoalScorers/GoalScorersTwoListsHomeAwayStatic';
import { ScoreLogoTeamNameLARGE } from '../../../sport/afl/TeamsAndScores/ScoreLogoTeamNameLARGE';
import {ThreeMetaPoints} from '../../common/FixtureMetadata/ThreeMetaPoints/ThreeMetaPoints';
import {AFLResultStatment} from '../../common/ResultStatments/AFLResultStatment';

export const BuildAFLSingleGameResult = (props) => {
	console.log('props ', props.TemplateVariation);
	const ComponentFPS = {
		Display: {
			Start: 15,
			End: props.FPS_SCORECARD,
		},
		Players: {
			Start: 0,
			End: props.FPS_SCORECARD,
		}, 
	};

	return (
		<AFLMatchContainer>
			<ScoreLogoTeamNameLARGE {...props} ComponentFPS={ComponentFPS} />
			<AFLResultStatment {...props} />
			<DisplayBothQuartersAsRows
				{...props}
				ComponentFPS={ComponentFPS.Display}
			/>
			<ThreeMetaPoints {...props} MetaPoints={['round', '', 'ground']} />
			<GoalScorersTwoListsHomeAwayStatic {...props} />
			<BestPlayersAsString {...props} />
		</AFLMatchContainer>
	);
};
