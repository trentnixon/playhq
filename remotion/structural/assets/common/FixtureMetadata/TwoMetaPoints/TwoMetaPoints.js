import {useCurrentFrame} from 'remotion';
import {FromMiddle} from '../../../../../Animation/ClipWipe';
import {interpolateOpacityByFrame} from '../../../../../Animation/interpolate';
import {restrictString} from '../../../../../utils/copy';
import {FixtureMetaDataPoint} from './components/FixtureMetaDataPoint';
import {HeaderContainerStyles} from './components/sharedStyles';
import {useStylesContext} from '../../../../../context/StyleContext';
import {useLayoutContext} from '../../../../../context/LayoutContext';

export const TwoMetaPoints = (props) => {
	const {matchData, MetaPoints, CustomStyle} = props;
	const {teamHome, teamAway} = matchData;
	matchData.gradeName = matchData?.grade?.gradeName;
	const {StyleConfig, BuildProps} = useStylesContext();
	const {TIMINGS} = useLayoutContext();
	const {TemplateVariation} = BuildProps;
	const {FPS_SCORECARD} = TIMINGS;
	const {Color} = StyleConfig;

	const frame = useCurrentFrame();
	if (teamHome === 'Bye' || teamAway === 'Bye') return false;

	const MetaDataPoints = [
		{
			type: restrictString(matchData[MetaPoints[0]] || '', 30),
			width: '50%',
			style: {
				textAlign: 'left',
			},
		},
		{
			type: restrictString(matchData[MetaPoints[1]] || '', 30),
			width: '50%',
			style: {
				textAlign: 'right',
			},
		},
	];

	return (
		<HeaderContainerStyles
			BackgroundColor={Color.Primary.Darken}
			borderRadius={TemplateVariation.borderRadius}
			style={{
				...CustomStyle,
				clipPath: FromMiddle(7, 'Wobbly'),
				opacity: interpolateOpacityByFrame(
					frame,
					FPS_SCORECARD - 30,
					FPS_SCORECARD,
					1,
					0
				),
			}}
		>
			{MetaDataPoints.map((point, i) => {
				return (
					<FixtureMetaDataPoint
						key={i}
						Value={point.type}
						{...props}
						width={point.width}
						pointStyle={point.style}
					/>
				);
			})}
		</HeaderContainerStyles>
	);
};
