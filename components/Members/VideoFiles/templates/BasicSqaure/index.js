/* eslint-disable camelcase */
import {ThemeProvider} from 'styled-components';
import {Series, AbsoluteFill, Audio, interpolate} from 'remotion';
// Import {RemotionThemes} from '../../theme/themes'
import {loadFont} from '@remotion/google-fonts/Heebo';

// Import Design Templates for MATCHDAYRESULT.
// Add new deisng patterns below
// Componnets

// Assets
import {Top5List} from './Compositions/Top5List/index';
import {WeekendResults} from './Compositions/WeekendResults/index';
import {Fixtures} from './Compositions/UpcomingFixtures/index';
import {Ladder} from './Compositions/Ladder/index';
import {NoiseComp} from './Components/Common/niose3D';
import {WeekendSingleGameResult} from './Compositions/WeekendSingleGameResult';
import {TitleSequenceFrame} from './Components/Intro';
import {OutroSequenceFrame} from './Components/Outro';
import { getContrastColor } from '../../utils/colors';
import { BGImageAnimation } from './Components/Common/BGImageAnimation';

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
		),
		Top5BowlingList: (
			<Top5List
				DATA={DATA}
				TYPE="BOWLING"
				theme={THEME}
				fontFamily={fontFamily}
				FPS_MAIN={TIMINGS.FPS_MAIN}
			/>
		),
		WeekendResults: (
			<WeekendResults
				DATA={DATA}
				theme={THEME}
				fontFamily={fontFamily}
				FPS_MAIN={TIMINGS.FPS_MAIN}
				FPS_SCORECARD={TIMINGS.FPS_SCORECARD}
			/>
		),
		WeekendSingleGameResult: (
			<WeekendSingleGameResult
				DATA={DATA}
				theme={THEME}
				fontFamily={fontFamily}
				FPS_MAIN={TIMINGS.FPS_MAIN}
				FPS_SCORECARD={TIMINGS.FPS_SCORECARD}
			/>
		),
		UpComingFixtures: (
			<Fixtures
				DATA={DATA}
				theme={THEME}
				fontFamily={fontFamily}
				FPS_MAIN={TIMINGS.FPS_MAIN}
				FPS_SCORECARD={TIMINGS.FPS_SCORECARD}
			/>
		),
		Ladder: (
			<Ladder
				DATA={DATA}
				theme={THEME}
				fontFamily={fontFamily}
				FPS_MAIN={TIMINGS.FPS_MAIN}
				FPS_LADDER={TIMINGS.FPS_LADDER}
			/>
		),
	};

	const HasSponsors = () => {
		DATA.VIDEOMETA.Video.includeSponsors;
		if (DATA.VIDEOMETA.Club.Sponsors.length === 0) return 0;
		return DATA.VIDEOMETA.Video.includeSponsors ? DATA.TIMINGS.FPS_OUTRO : 0;
	};
	const CompositionLength = (DATA) => {
		return [
			DATA.TIMINGS.FPS_INTRO,
			HasSponsors(DATA),
			DATA.TIMINGS.FPS_MAIN,
		].reduce((a, b) => a + b, 0);
	};

	return (
		<ThemeProvider theme={THEME}>
			
			<AbsoluteFill style={{backgroundColor:THEME.primary }}>
			<BGImageAnimation
				HeroImage={DATA.VIDEOMETA.Video.HeroImage}
				TIMINGS={(TIMINGS.FPS_MAIN+210)}
				THEME={THEME}
			/>
			<AbsoluteFill style={{ zIndex:1000,}} >
				<Series
					
				>
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
					<Series.Sequence durationInFrames={TIMINGS.FPS_OUTRO}>
						<OutroSequenceFrame
							theme={THEME}
							fontFamily={fontFamily}
							FPS={TIMINGS.FPS_OUTRO}
							DATA={DATA}
						/>
					</Series.Sequence>
				</Series>
				</AbsoluteFill>
			{/* 	<NoiseComp speed={0.01} circleRadius={50} maxOffset={60} /> */}
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
