/* eslint-disable camelcase */
// Remotion
import {Series, AbsoluteFill} from 'remotion';
// Setup
import fonts from '../../utils/global/init/fonts';
import {renderTemplate} from '../../utils/global/init/initialize';
// Context
import {GlobalProvider} from '../../context/GlobalProvider';
import {useVideoDataContext} from '../../context/VideoDataContext';
import {useLayoutContext} from '../../context/LayoutContext';
import {useStylesContext} from '../../context/StyleContext';
// Styled
import {ThemeProvider} from 'styled-components';
// Assets
import {TEMPLATES_COMPONENTS} from './AssetList';
// Components
import {FixturaIntroBasic} from '../../structural/Intros/Basic';
import {FixturaOutroBasic} from '../../structural/Outro/Basic';
import {BGImageAnimation} from './Components/Common/BGImageAnimation';
import {AssetFullAudioTrack} from '../../structural/assets/common/audio/AssetBackgroundAudio';
import {AlternativeOutro} from '../../structural/Outro/Basic/AlternativeOutro';

const settings = {
	fontConfig: fonts.impact,
	defaultCopyFontFamily: fonts.impact,
	gradientDegree: '0deg', // Set gradient degree specific to Basic
	heights: {
		AssetHeight: 1290,
		Header: 250,
		Footer: 110,
	},
	SponsorPositionAndAnimations: {
		animationType: 'FromTop',
		alignSponsors: 'center',
	},
};

export const Template_CaloundraCC = (props) => {
	return (
		<GlobalProvider settings={settings} DATA={props.DATA}>
			<MainTemplate />
		</GlobalProvider>
	);
};

const MainTemplate = () => {
	const {DATA, Video} = useVideoDataContext();
	const {THEME} = useStylesContext();
	const {hasPrimarySponsor} = useLayoutContext();
	const {TIMINGS} = DATA;
	return (
		<ThemeProvider theme={THEME}>
			<AbsoluteFill>
				<AbsoluteFill style={{zIndex: 1000}}>
					<Series>
						<Series.Sequence durationInFrames={TIMINGS.FPS_INTRO}>
							<FixturaIntroBasic />
						</Series.Sequence>
						<Series.Sequence durationInFrames={TIMINGS.FPS_MAIN}>
							{renderTemplate(TEMPLATES_COMPONENTS, Video.CompositionID)}
						</Series.Sequence>
						<Series.Sequence
							durationInFrames={hasPrimarySponsor ? TIMINGS.FPS_OUTRO : 30}
						>
							{hasPrimarySponsor ? <FixturaOutroBasic /> : <AlternativeOutro />}
						</Series.Sequence>
					</Series>
				</AbsoluteFill>
				<BGImageAnimation />
				<AssetFullAudioTrack />
			</AbsoluteFill>
		</ThemeProvider>
	);
};
