/* eslint-disable camelcase */
import { ThemeProvider } from "styled-components";
import { Series, AbsoluteFill, Audio, Sequence } from "remotion";
// Import {RemotionThemes} from '../../theme/themes'
import { loadFont } from "@remotion/google-fonts/Heebo";

// Import Design Templates for MATCHDAYRESULT.
// Add new design patterns below
// Componnets
import { TitleSequenceFrame } from "./Sequences/Title";
import { OutroSequenceFrame } from "./Sequences/Outro/index";
// Assets
import Top5LeaderRunScorers from "./Compositions/Top5LeaderRunScorers/index";

// END

export const Template_Basic_Sqaure = (props) => {
  const { THEME, DATA, ID, AUDIO } = props;
  const { fontFamily } = loadFont();

  //console.log(THEME, DATA, ID,AUDIO)

  const TEMPLATES = {
    Top5LeadingRunScorers: (
      <Top5LeaderRunScorers
        DATA={DATA}
        theme={THEME.Theme}
        fontFamily={fontFamily}
      />
    ),
  };
  return (
    <ThemeProvider theme={THEME.Theme}>
      <AbsoluteFill style={{ backgroundColor: THEME.Theme.primary }}>
        <Series>
          <Series.Sequence durationInFrames={90}>
            <TitleSequenceFrame theme={THEME.Theme} fontFamily={fontFamily} />
          </Series.Sequence>
          <Series.Sequence durationInFrames={300}>
            {TEMPLATES[ID]}
          </Series.Sequence>
          <Series.Sequence durationInFrames={90}>
            <OutroSequenceFrame theme={THEME.Theme} fontFamily={fontFamily} />
          </Series.Sequence>
        </Series>

        <Audio volume={0.5} src={AUDIO.URL} />
      </AbsoluteFill>
    </ThemeProvider>
  );
};

export const Test_Basic_Sqaure = (props) => {
  const { THEME, DATA, ID, AUDIO } = props;
  const { fontFamily } = loadFont();

  //console.log(THEME, DATA, ID,AUDIO)

  const TEMPLATES = {
    Top5LeadingRunScorers: (
      <Top5LeaderRunScorers
        DATA={DATA}
        theme={THEME.Theme}
        fontFamily={fontFamily}
      />
    ),
  };
  return (
    <ThemeProvider theme={THEME.Theme}>
      <AbsoluteFill style={{ backgroundColor: THEME.Theme.primary }}>
        <Sequence durationInFrames={90}>
          <TitleSequenceFrame theme={THEME.Theme} fontFamily={fontFamily} />
        </Sequence>
        <Sequence durationInFrames={300} from={90}>
          {TEMPLATES[ID]}
        </Sequence>
        <Sequence durationInFrames={180} from={390}>
          <OutroSequenceFrame
            theme={THEME.Theme}
            fontFamily={fontFamily}
            durationInFrames={180}
          />
        </Sequence>
      </AbsoluteFill>
      <Audio volume={0.5} src={AUDIO.URL} />
    </ThemeProvider>
  );
};
export default Test_Basic_Sqaure;

/*
<AbsoluteFill style={{ backgroundColor: THEME.Theme.primary }}>
        <Series>
          <Series.Sequence durationInFrames={90}>
            <TitleSequenceFrame theme={THEME.Theme} fontFamily={fontFamily} />
          </Series.Sequence>
          <Series.Sequence durationInFrames={300}>
            {TEMPLATES[ID]}
          </Series.Sequence>
          <Series.Sequence durationInFrames={90}>
            <OutroSequenceFrame theme={THEME.Theme} fontFamily={fontFamily} />
          </Series.Sequence>
        </Series>

        
      </AbsoluteFill>
*/
