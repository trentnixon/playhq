import {useCurrentFrame} from 'remotion';
import {FromTopToBottom} from '../../../../Animation/ClipWipe';
import {interpolateOpacityByFrame} from '../../../../Animation/interpolate';
import styled from 'styled-components';
import {useStylesContext} from '../../../../context/StyleContext';
import {useLayoutContext} from '../../../../context/LayoutContext';

const YetToBat = styled.h3`
	color: ${(props) => props.color};
	margin: 0;
	text-transform: uppercase;
`;

const generateTeamStyle = (FPS_SCORECARD) => {
	const frame = useCurrentFrame();
	return {
		clipPath: FromTopToBottom(35, 'Slow'),
		opacity: interpolateOpacityByFrame(
			frame,
			FPS_SCORECARD - 30,
			FPS_SCORECARD,
			1,
			0
		),
	};
};

export const DisplayYetToBat = ({score}) => {
	const {StyleConfig, TextStyles, BuildProps} = useStylesContext();
	const {TemplateVariation} = BuildProps;
	const {TIMINGS} = useLayoutContext();
	const {Font} = StyleConfig;
	return (
		<YetToBat
			color={(TemplateVariation, useMutedColor)}
			style={{
				...generateTeamStyle(TIMINGS.FPS_SCORECARD),
				...Font.Copy,
				...TextStyles.copySmall,
			}}
		>
			{score}
		</YetToBat>
	);
};
