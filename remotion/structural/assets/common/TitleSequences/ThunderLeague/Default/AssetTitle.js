import {useCurrentFrame} from 'remotion';
import {useLayoutContext} from '../../../../../../context/LayoutContext';
import {useStylesContext} from '../../../../../../context/StyleContext';
import {FromRightToLeft} from '../../../../../../Animation/ClipWipe';
import {interpolateOpacityByFrame} from '../../../../../../Animation/interpolate';
import {PresentationalAssetType} from '../../../../../../common/components/presentational/AssetType';
import {SpringToFrom} from '../../../../../../Animation/RemotionSpring';

export const ThunderAssetTitle = () => {
	const {StyleConfig} = useStylesContext();
	const {TIMINGS} = useLayoutContext();
	const {Font} = StyleConfig;

	const frame = useCurrentFrame();
	const {FPS_MAIN} = TIMINGS;

	const styleObj = {
		...Font?.Copy,
		color: 'black',
		height: 'auto',
		fontWeight: '400',
		textAlign: 'center',
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
