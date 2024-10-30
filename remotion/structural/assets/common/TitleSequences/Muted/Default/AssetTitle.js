import {useCurrentFrame} from 'remotion';
import {useLayoutContext} from '../../../../../../context/LayoutContext';
import {useStylesContext} from '../../../../../../context/StyleContext';
import {FromRightToLeft} from '../../../../../../Animation/ClipWipe';
import {interpolateOpacityByFrame} from '../../../../../../Animation/interpolate';
import {PresentationalAssetType} from '../../../../../../common/components/presentational/AssetType';
import {SpringToFrom} from '../../../../../../Animation/RemotionSpring';

export const AssetTitle = ({start = 15}) => {
	const {StyleConfig, TextStyles, BuildProps} = useStylesContext();
	const {TIMINGS} = useLayoutContext();
	const {Font} = StyleConfig;

	const frame = useCurrentFrame();
	const {FPS_MAIN} = TIMINGS;
	const {TemplateVariation} = BuildProps;
	const styleObj = {
		...Font?.Copy,
		...TextStyles.assetTitle,
		color: TemplateVariation.useMutedColor,
		height: 'auto',
		textAlign: 'left',
		textTransform: 'uppercase',
	};

	const animationObj = {
		clipPath: FromRightToLeft(start, 'Wobbly'),
		opacity: interpolateOpacityByFrame(frame, FPS_MAIN - 30, FPS_MAIN, 1, 0),
		transform: `translateX(${SpringToFrom(0, -1000, 1, 'Wobbly')}px)`,
	};

	return (
		<PresentationalAssetType styleObj={styleObj} animationObj={animationObj} />
	);
};

export const AssetTitleSmall = () => {
	const {StyleConfig, TextStyles, BuildProps} = useStylesContext();
	const {TIMINGS} = useLayoutContext();
	const {Font} = StyleConfig;

	const frame = useCurrentFrame();
	const {FPS_MAIN} = TIMINGS;
	const {TemplateVariation} = BuildProps;
	const styleObj = {
		...Font?.Copy,
		...TextStyles.assetSubtitle,
		color: TemplateVariation.useMutedColor,
		height: 'auto',
		textAlign: 'left',
		textTransform: 'uppercase',
	};

	const animationObj = {
		clipPath: FromRightToLeft(15, 'Wobbly'),
		opacity: interpolateOpacityByFrame(frame, FPS_MAIN - 30, FPS_MAIN, 1, 0),
		transform: `translateX(${SpringToFrom(0, -1000, 1, 'Wobbly')}px)`,
	};

	return (
		<PresentationalAssetType styleObj={styleObj} animationObj={animationObj} />
	);
};

// No Animation

export const AssetTitleNoAnimation = () => {
	const {StyleConfig, TextStyles, BuildProps} = useStylesContext();
	const {Font} = StyleConfig;
	const {TemplateVariation} = BuildProps;
	const styleObj = {
		...Font?.Copy,
		...TextStyles.assetTitle,
		color: TemplateVariation.useMutedColor,
		height: 'auto',
		textAlign: 'left',
		textTransform: 'uppercase',
	};

	return <PresentationalAssetType styleObj={styleObj} />;
};
