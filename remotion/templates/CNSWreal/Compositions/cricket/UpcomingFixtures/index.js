import React from 'react';
import {Series} from 'remotion';

// Components
import {FixturesMain} from './Fixtures';
import SponsorMatcherUpcomingFixtures from '../../../../../structural/Sponsors/Utils/SponsorMatcherUpcomingFixtures';
import {useLayoutContext} from '../../../../../context/LayoutContext';
import {useVideoDataContext} from '../../../../../context/VideoDataContext';
import {CNSWREALDefaultTitle} from '../../../../../structural/assets/common/TitleSequences/CNSWREALAssetTitles/Default';
import DynamicFixtureSponsors from '../../../../../structural/Sponsors/body/Upcoming/DynamicFixtureSponsors';

export const Fixtures = () => {
	const {Club, TIMINGS} = useLayoutContext();
	const {DATA} = useVideoDataContext();
	const {FPS_MAIN} = TIMINGS;

	const sponsorMatcher = new SponsorMatcherUpcomingFixtures(
		DATA.DATA,
		Club.Sponsors
	);
	const {groupedFixtures, groupedSponsors} = sponsorMatcher.matchSponsors();
	return (
		<Series>
			<Series.Sequence
				durationInFrames={FPS_MAIN}
				style={{flexDirection: 'column'}}
			>
				<CNSWREALDefaultTitle />
				<FixturesMain groupedFixtures={groupedFixtures} />
				<DynamicFixtureSponsors groupedSponsors={groupedSponsors} />
			</Series.Sequence>
		</Series>
	);
};
