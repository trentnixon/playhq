import React from 'react';
import { Series} from 'remotion';

// Components

import {Results} from './Results';
import { LogoClubTitleHeader } from '../../Components/SectionHeader';


export const WeekendResults = ({DATA, theme, FPS_MAIN,FPS_SCORECARD}) => {

	return (
		<Series>
			<Series.Sequence durationInFrames={FPS_MAIN} layout="none">
				<LogoClubTitleHeader THEME={theme}  DATA={DATA.VIDEOMETA} FPS_MAIN={FPS_MAIN}/>
				<Results 
					THEME={theme}
					DATA={DATA.DATA}
					FPS_MAIN={FPS_MAIN}
					FPS_SCORECARD={FPS_SCORECARD}
				/>
			</Series.Sequence>   
		</Series>
	); 
};