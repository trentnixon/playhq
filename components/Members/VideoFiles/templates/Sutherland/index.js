/* eslint-disable camelcase */
import {ThemeProvider} from 'styled-components';
import {
	Series,
	AbsoluteFill,
	Audio,
	interpolate,
	useCurrentFrame,
	Img,
} from 'remotion';

//import * as Anton from '@remotion/google-fonts/Anton';
import * as Oswald from '@remotion/google-fonts/Oswald';
import * as Hurricane from '@remotion/google-fonts/Hurricane';
// Import Design Templates for MATCHDAYRESULT.
// Add new deisng patterns below
// Componnets

// Assets
import {Top5List} from './Compositions/Top5List/index';
import {WeekendResults} from './Compositions/WeekendResults/index';
import {Fixtures} from './Compositions/UpcomingFixtures/index';
import {Ladder} from './Compositions/Ladder/index';
import {TitleSequenceFrame} from './Components/Intro';
import {OutroSequenceFrame} from './Components/Outro';
import {WeekendSingleGameResult} from './Compositions/WeekendSingleGameResult';
import {interpolateValueByFrame} from '../../Animation/interpolate';
import { useEffect, useState } from 'react';
import { BGImageAnimation } from './Components/Common/BGImageAnimation';

// END

export const Template_Sutherland = (props) => {
	const {DATA} = props;
	const {HurricaneFamily} = Hurricane.loadFont();
	//const {AntonFamily} = Anton.loadFont();
	const {OswaldFamily} = Oswald.loadFont();

	const {TIMINGS} = DATA;
	const TEMPLATE = DATA.VIDEOMETA.Video.CompositionID;
	const THEME = DATA.VIDEOMETA.Video.Theme;

	const TEMPLATES = {
		Top5BattingList: (
			<Top5List 
				DATA={DATA}
				theme={THEME}
				TYPE="BATTING"
				FPS_MAIN={TIMINGS.FPS_MAIN}
			/>
		),
		Top5BowlingList: (
			<Top5List
				DATA={DATA}
				TYPE="BOWLING"
				theme={THEME}
				FPS_MAIN={TIMINGS.FPS_MAIN}
			/>
		),
		WeekendResults: (
			<WeekendResults
				DATA={DATA}
				theme={THEME}
				FPS_MAIN={TIMINGS.FPS_MAIN}
				FPS_SCORECARD={TIMINGS.FPS_SCORECARD}
			/>
		),
		UpComingFixtures: (
			<Fixtures
				DATA={DATA}
				theme={THEME}
				FPS_MAIN={TIMINGS.FPS_MAIN}
				FPS_SCORECARD={TIMINGS.FPS_SCORECARD}
			/>
		),
		Ladder: (
			<Ladder
				DATA={DATA}
				theme={THEME}
				FPS_MAIN={TIMINGS.FPS_MAIN}
				FPS_LADDER={TIMINGS.FPS_LADDER}
			/>
		),
		WeekendSingleGameResult: (
			<WeekendSingleGameResult
				DATA={DATA}
				theme={THEME}
				FPS_MAIN={TIMINGS.FPS_MAIN}
				FPS_SCORECARD={TIMINGS.FPS_SCORECARD}
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
			<BGImageAnimation
				HeroImage={DATA.VIDEOMETA.Video.HeroImage}
				TIMINGS={(TIMINGS.FPS_MAIN+210)}
				THEME={THEME}
			/>
			<AbsoluteFill
				style={{
					left:'-4px',
					background: `linear-gradient(90deg, ${THEME.primary} 45%, rgba(157, 203, 236, 0.00) 100%)`,
				}}
			>
				<div>
					<Series>
						<Series.Sequence durationInFrames={TIMINGS.FPS_INTRO}>
							<TitleSequenceFrame
								theme={THEME}
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
								FPS={TIMINGS.FPS_OUTRO}
								DATA={DATA}
							/>
						</Series.Sequence>
					</Series>

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
				</div>
			</AbsoluteFill>
		</ThemeProvider>
	);
};
