/* eslint-disable camelcase */
import {ThemeProvider} from 'styled-components';
import {Series, AbsoluteFill, Audio, interpolate} from 'remotion';
import {loadFont} from '@remotion/google-fonts/Heebo';
import {BGImageAnimation} from '../Components/Common/BGImageAnimation';
import {TitleSequenceFrame} from '../Components/Intro';
import {OutroSequenceFrame} from '../Components/Outro';
import {CompositionLength} from '../../../utils/helpers';
import { Top5List } from '../Compositions/Top5List';

export const Example_Video_Top5Runs = (props) => {
	const {DATA} = props;
	const {fontFamily} = loadFont();
	const {TIMINGS} = DATA;

	const THEME = DATA.VIDEOMETA.Video.Theme;

	const commonProps = {
		DATA: DATA.DATA,
		VIDEOMETA: DATA.VIDEOMETA,
		TIMINGS: DATA.TIMINGS,
		THEME: THEME,
		fontFamily,
		FPS_MAIN: TIMINGS.FPS_MAIN,
		FPS_SCORECARD: TIMINGS.FPS_SCORECARD,
		FPS_LADDER: TIMINGS.FPS_LADDER,
		TemplateVariation: DATA.VIDEOMETA.Video.TemplateVariation,
	};

	console.log(commonProps)
	return (<Top5List {...commonProps} TYPE="BATTING" />);
};
