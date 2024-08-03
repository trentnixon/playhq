// Import necessary dependencies from remotion and local files
import {useCurrentFrame} from 'remotion';
import {useVideoDataContext} from '../../../context/VideoDataContext';
import {useStylesContext} from '../../../context/StyleContext';
import {useLayoutContext} from '../../../context/LayoutContext';
import {getDynamicFontSize} from '../../../templates/Basic/utils/Copy';
import {interpolateOpacityByFrame} from '../../../Animation/interpolate';
import {FromLeftToRight, FromTopToBottom} from '../../../Animation/ClipWipe';
import {PresentationalOrganisationName} from '../../../common/components/presentational/OrganisationName';
import {PresentationalAssetType} from '../../../common/components/presentational/AssetType';

// Define a functional component to display asset titles
export const AssetTitle = () => {
	// Destructuring props is not used to maintain flexibility and prop forwarding
	return (
		<>
			<VideoAssetTitle />
			<OrganisationTitle />
		</>
	);
};

// Define a functional component to display video titles with animations
const VideoAssetTitle = () => {
	const frame = useCurrentFrame(); // Get the current frame for animations
	const {DATA} = useVideoDataContext();
	const {StyleConfig} = useStylesContext();
	const {TIMINGS} = useLayoutContext();

	const {grouping_category} = DATA.VIDEOMETA;
	const {FPS_INTRO} = TIMINGS;

	// Style configuration for the video title
	const styleObj = {
		...StyleConfig.Font.Title,
		fontSize: getDynamicFontSize(grouping_category),
		color: StyleConfig.Color.Primary.BackgroundContractColor,
		width: '100%',
		margin: 0,
		padding: 0,
		lineHeight: '0.8em',
		textAlign: 'center',
		letterSpacing: '-0.02em',
		textTransform: 'uppercase',
		zIndex: 2000,
	};

	// Animation configuration for the video title
	const animationObj = {
		opacity: interpolateOpacityByFrame(
			frame,
			FPS_INTRO - 30,
			FPS_INTRO - 15,
			1,
			0
		),
		clipPath: FromTopToBottom(7, 'Wobbly'),
	};

	return (
		<PresentationalAssetType
			as="p"
			animationObj={animationObj}
			styleObj={styleObj}
		/>
	);
};

// Define a functional component to display account titles with animations
const OrganisationTitle = () => {
	const frame = useCurrentFrame(); // Get the current frame for animations
	const {StyleConfig} = useStylesContext();
	const {TIMINGS} = useLayoutContext();
	const {FPS_INTRO} = TIMINGS;

	console.log('StyleConfig ', StyleConfig);

	// Style configuration for the account title
	const styleObj = {
		...StyleConfig.Font.TitleAlt,
		fontSize: '2em',
		color: StyleConfig.Color.Background.Contrast,
		width: '100%',
		marginTop: '10px',
		marginBottom: '0',
		padding: '0',
		lineHeight: '1em',
		textAlign: 'center',
		letterSpacing: '-0.02em',
		textTransform: 'uppercase',
		zIndex: 2000,
	};

	// Animation configuration for the account title
	const animationObj = {
		opacity: interpolateOpacityByFrame(
			frame,
			FPS_INTRO - 30,
			FPS_INTRO - 15,
			1,
			0
		),
		clipPath: FromLeftToRight(7, 'Wobbly'),
	};

	return (
		<PresentationalOrganisationName
			animationObj={animationObj}
			styleObj={styleObj}
		/>
	);
};
