// src/structural/Sponsors/body/Upcoming/DynamicTop5Sponsors.js

import React from 'react';
import {Series} from 'remotion';
import {calculateImageDimensions, groupSponsors} from '../../Utils/utils';
import {ContainerFooterHeight} from '../../../assets/common/Containers/ContainerFooterHeight';
import SponsorLogo from '../components/SponsorLogo';
import SponsorRow from '../components/SponsorRow';
import styled from 'styled-components';
import {useLayoutContext} from '../../../../context/LayoutContext';

const SponsorImg = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	padding: 10px;
`;

const DynamicTop5Sponsors = ({groupedSponsors}) => {
	const {TIMINGS, SponsorPositionAndAnimations} = useLayoutContext();

	const {FPS_MAIN} = TIMINGS;

	if (!groupedSponsors) {
		console.error('Invalid data structure for grouped sponsors');
		return null;
	}

	const animationType = 'FromTop';
	const groupedSponsorsByRow = groupSponsors(groupedSponsors);
	const imgSize = [110, 110, 110];

	return (
		<Series>
			<Series.Sequence layout="none" durationInFrames={FPS_MAIN}>
				<ContainerFooterHeight>
					{groupedSponsorsByRow.map((row, rowIndex) => (
						<SponsorRow
							key={rowIndex}
							align={SponsorPositionAndAnimations.alignSponsors}
						>
							{row.map((s, index) => (
								<SponsorImg key={index}>
									<SponsorLogo
										IMGStyles={calculateImageDimensions(s.logo, imgSize)}
										src={s.logo.url}
										FPS={FPS_MAIN}
										delay={(index + 1) * 5}
										animationType={animationType}
									/>
								</SponsorImg>
							))}
						</SponsorRow>
					))}
				</ContainerFooterHeight>
			</Series.Sequence>
		</Series>
	);
};

export default DynamicTop5Sponsors;
