import React from 'react';
import { Series} from 'remotion';

// Components
import {LogoClubTitleHeader} from './Title';
import {Top5PlayersMap} from './Top5Map';

export const Top5LeaderRunScorers = ({AUDIO, DATA, theme, fontFamily}) => {

	return (
		<>
		<LogoClubTitleHeader THEME={theme} fontFamily={fontFamily} />
				<Top5PlayersMap
					THEME={theme}
					DATA={DATA.RunScorers}
					fontFamily={fontFamily} 
				/>
				</>
	);
};


export default Top5LeaderRunScorers