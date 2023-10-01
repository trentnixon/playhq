import React from 'react';
import {Series} from 'remotion';
// Components

import {LadderMain} from './LadderMain';
import { LogoClubTitleHeader } from '../../Components/SectionHeader';

export const Ladder = ({DATA, theme, FPS_MAIN, FPS_LADDER}) => {
	return (
		<Series>
			<Series.Sequence durationInFrames={FPS_MAIN} layout="none">
				<LogoClubTitleHeader
					THEME={theme}
					DATA={DATA.VIDEOMETA}
					FPS_MAIN={FPS_MAIN}
				/>
				<LadderMain  
					THEME={theme}
					DATA={DATA.DATA}
					fontFamily={'Oswald'}
					FPS_MAIN={FPS_MAIN}
					FPS_LADDER={FPS_LADDER}
				/>
			</Series.Sequence>
		</Series>
	);
};
