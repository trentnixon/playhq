import React from 'react';
import { Series} from 'remotion';

// Components
import {LogoClubTitleHeader} from './Title';
import {Top5PlayersMap} from './Top5Map';
const Top5LeaderRunScorers = ({AUDIO, DATA, theme, fontFamily}) => {

	return (
		<Series>
			<Series.Sequence durationInFrames={300} layout="none">
				<LogoClubTitleHeader THEME={theme} fontFamily={fontFamily} />
				<Top5PlayersMap
					THEME={theme}
					DATA={DATA.RunScorers}
					fontFamily={fontFamily} 
				/>
			</Series.Sequence>
		</Series>
	);
};


export default Top5LeaderRunScorers