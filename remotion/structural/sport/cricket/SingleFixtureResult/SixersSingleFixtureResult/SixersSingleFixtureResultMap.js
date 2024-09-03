import React from 'react';
import {Series} from 'remotion';
import {SixersFixtureBuild} from './components/SixersFixtureBuild';
import {
	ContainerBodyHeight,
	ContainerInnerBodyHeight,
} from '../../../../assets/common/Containers/ContainerBodyHeight';
import {useLayoutContext} from '../../../../../context/LayoutContext';

export const SixersSingleFixtureResultMap = (props) => {
	const {groupedFixtures} = props;
	const {TIMINGS} = useLayoutContext();
	return (
		<ContainerBodyHeight>
			<Series>
				{groupedFixtures.map((item, index) => {
					return (
						<Series.Sequence durationInFrames={TIMINGS.FPS_SCORECARD}>
							<ContainerInnerBodyHeight>
								{item.map((game, i) => (
									<SixersFixtureBuild
										key={`${index}_${i}`}
										INT={i}
										matchData={game}
									/>
								))}
							</ContainerInnerBodyHeight>
						</Series.Sequence>
					);
				})}
			</Series>
		</ContainerBodyHeight>
	);
};
