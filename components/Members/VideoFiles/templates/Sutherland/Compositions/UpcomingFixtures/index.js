import React from 'react';
import { Series} from 'remotion';

// Components

import {FixturesMain} from './Fixtures';
import { LogoClubTitleHeader } from '../../Components/SectionHeader';

export const  Fixtures = ({DATA, theme, fontFamily, FPS_MAIN,FPS_SCORECARD}) => {

	return (
		<Series>
			<Series.Sequence durationInFrames={FPS_MAIN} layout="none">
				<LogoClubTitleHeader THEME={theme} fontFamily={fontFamily} DATA={DATA.VIDEOMETA} FPS_MAIN={FPS_MAIN}/>
				<FixturesMain 
					THEME={theme}
					DATA={DATA.DATA}
					fontFamily={fontFamily}
					FPS_MAIN={FPS_MAIN}
					FPS_SCORECARD={FPS_SCORECARD}
				/>
			</Series.Sequence> 
		</Series> 
	);
};