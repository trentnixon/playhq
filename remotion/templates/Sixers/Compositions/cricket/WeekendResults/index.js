import React from 'react';
import {Series} from 'remotion';
// Components
import {Results} from './Results';
import SponsorMatcher from '../../../../../structural/Sponsors/Utils/SponsorMatcher';
import {useLayoutContext} from '../../../../../context/LayoutContext';
import {useVideoDataContext} from '../../../../../context/VideoDataContext';
import {SixersLeagueDefaultTitle} from '../../../../../structural/assets/common/TitleSequences/SixersLeague/Default';
import FooterAccountLogoOnly from '../../../../../structural/Sponsors/body/Upcoming/FooterAccountLogoOnly';

export const WeekendResults = () => {
	const {Club, TIMINGS} = useLayoutContext();
	const {DATA} = useVideoDataContext();
	const {FPS_MAIN} = TIMINGS;

	const sponsorMatcher = new SponsorMatcher(DATA.DATA, Club.Sponsors);
	const {groupedFixtures, groupedSponsors} = sponsorMatcher.matchSponsors();
	return (
		<Series>
			<Series.Sequence
				durationInFrames={FPS_MAIN}
				style={{flexDirection: 'column'}}
			>
				<SixersLeagueDefaultTitle />
				<Results groupedFixtures={groupedFixtures} />
				<FooterAccountLogoOnly />
			</Series.Sequence>
		</Series>
	);
};
