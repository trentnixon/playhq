/* eslint-disable camelcase */
import {ThemeProvider} from 'styled-components';
import {Series, AbsoluteFill, Audio, interpolate} from 'remotion';
// Import {RemotionThemes} from '../../theme/themes'
import {loadFont} from '@remotion/google-fonts/Heebo';

// Import Design Templates for MATCHDAYRESULT.
// Add new deisng patterns below
// Componnets
import {TitleSequenceFrame} from './Sequences/Title';
import {OutroSequenceFrame} from './Sequences/Outro/index';
// Assets
import {Top5List} from './Compositions/Top5List/index';
import {NoiseComp} from './Sequences/Common/niose3D';

// END

export const Template_Basic_Sqaure = (props) => {
	const {DATA} = props;
	const {fontFamily} = loadFont();

	const {TIMINGS} = DATA;
	const TEMPLATE = DATA.VIDEOMETA.Video.CompositionID;
	const THEME = DATA.VIDEOMETA.Video.Theme;

	const TEMPLATES = {
		Top5BattingList: (
			<Top5List
				DATA={DATA}
				theme={THEME}
				TYPE="BATTING"
				fontFamily={fontFamily}
				FPS_MAIN={TIMINGS.FPS_MAIN}
			/>
		)
		
	};

	const CompositionLength = (DATA) => {
		return [
			DATA.TIMINGS.FPS_INTRO,
			(DATA.TIMINGS.FPS_OUTRO-DATA.TIMINGS.FPS_OUTRO),
			DATA.TIMINGS.FPS_MAIN,
		].reduce((a, b) => a + b, 0); 
	};
 
	return (
		<ThemeProvider theme={THEME}>
			<AbsoluteFill style={{backgroundColor: THEME.primary}}>
				<Series>
					<Series.Sequence durationInFrames={TIMINGS.FPS_INTRO}>
						<TitleSequenceFrame
							theme={THEME}
							fontFamily={fontFamily}
							FPS={TIMINGS.FPS_INTRO}
							DATA={DATA}
						/>
					</Series.Sequence>
					<Series.Sequence durationInFrames={TIMINGS.FPS_MAIN}>
						{TEMPLATES[TEMPLATE]}
					</Series.Sequence>
				{/* 	<Series.Sequence durationInFrames={TIMINGS.FPS_OUTRO}>
						<OutroSequenceFrame
							theme={THEME}
							fontFamily={fontFamily}
							FPS={TIMINGS.FPS_OUTRO}
							DATA={DATA}
						/>
					</Series.Sequence> */}
				</Series>
				<NoiseComp speed={0.01} circleRadius={50} maxOffset={60} />
				<Audio
					volume={(f) =>
						interpolate(
							f,
							[CompositionLength(DATA) - 30, CompositionLength(DATA)],
							[0.7, 0],
							{extrapolateLeft: 'clamp'}
						)
					}
					src={`${DATA.VIDEOMETA.Video.audio_option}`}
				/>
			</AbsoluteFill>
		</ThemeProvider>
	);
};

// {TEMPLATES[RENDER.THEME.VideoTemplate]}
