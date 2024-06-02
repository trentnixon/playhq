/* eslint-disable camelcase */
import { ThemeProvider } from 'styled-components';
import { AbsoluteFill, Audio, interpolate, Series } from 'remotion';
import { loadFont } from '@remotion/google-fonts/RobotoCondensed';
import { TitleSequenceFrame } from './Components/Intro';
import { OutroSequenceFrame } from './Components/Outro';
import { BGImageAnimation } from './Components/Common/BGImageAnimation';
import { CompositionLength } from '../../utils/helpers';
import { TEMPLATES_COMPONENTS } from './AssetList';
import { getStyleConfig } from '../../utils/global/getStyleConfig';
import { createTemplateProps } from '../../utils/global/createTemplateProps';
import { getPrimarySponsor } from '../../structural/Sponsors/Utils/utils';
import { AlternativeOutro } from './Components/Outro/AlternativeOutro';

export const Template_QLDC = (props) => {
  const { DATA } = props;
  const { fontFamily } = loadFont();
  const { TIMINGS } = DATA;
  const TEMPLATE = DATA.VIDEOMETA.Video.CompositionID;
  const THEME = DATA.VIDEOMETA.Video.Theme;
  const defaultFontFamily = 'Roboto Condensed';
  const defaultCopyFontFamily = 'Arial';
  //console.log("DATA ", DATA);
  // Create StyleConfig
  const createStyleProps = { 
    THEME,
    defaultFontFamily,
    defaultCopyFontFamily,
  };
  const StyleConfig = getStyleConfig(createStyleProps);
  const Heights = {
    AssetHeight: 1350,
    Header: 170,
    Footer: 130,
  };

  const hasPrimarySponsor = getPrimarySponsor(DATA.VIDEOMETA.Club.Sponsors);

  const RenderTemplate = () => {
    const Component = TEMPLATES_COMPONENTS[TEMPLATE];
    if (!Component) {
      console.error(`No component mapped for template: ${TEMPLATE}`);
      return null;
    }
    const templateProps = {
      ...{StyleConfig},
      ...createTemplateProps(DATA, TIMINGS),
      SectionHeights: {
        Header: Heights.Header,
        Body: Heights.AssetHeight - (Heights.Header + Heights.Footer),
        Footer: Heights.Footer,
      },
      SponsorPositionAndAnimations: {
        animationType: 'FromTop',
        alignSponsors: 'right',
      },
    };
    if (TEMPLATE === 'Top5BattingList') {
      return <Component {...templateProps} TYPE="BATTING" />;
    }
    if (TEMPLATE === 'Top5BowlingList') {
      return <Component {...templateProps} TYPE="BOWLING" />;
    }
    return <Component {...templateProps} />;
  };

  return (
    <ThemeProvider theme={THEME}>
      <AbsoluteFill>
        <BGImageAnimation
          HeroImage={DATA.VIDEOMETA.Video.HeroImage}
          TemplateVariation={DATA.VIDEOMETA.Video.TemplateVariation}
          TIMINGS={TIMINGS.FPS_MAIN + 210}
          FPS_MAIN={TIMINGS.FPS_MAIN}
          StyleConfig={StyleConfig}
        />
        <AbsoluteFill style={{ zIndex: 1000 }}>
          <Series>
            <Series.Sequence durationInFrames={TIMINGS.FPS_INTRO}>
              <TitleSequenceFrame
                StyleConfig={StyleConfig}
                FPS_INTRO={TIMINGS.FPS_INTRO}
                VIDEOMETA={DATA.VIDEOMETA}
              />
            </Series.Sequence>
            <Series.Sequence durationInFrames={TIMINGS.FPS_MAIN}>
              {RenderTemplate(StyleConfig)}
            </Series.Sequence>
            <Series.Sequence
              durationInFrames={hasPrimarySponsor ? TIMINGS.FPS_OUTRO : 30}
            >
              {hasPrimarySponsor ? (
                <OutroSequenceFrame
                  FPS={TIMINGS.FPS_OUTRO}
                  DATA={DATA}
                  StyleConfig={StyleConfig}
                />
              ) : (
                <AlternativeOutro />
              )}
            </Series.Sequence>
          </Series>
        </AbsoluteFill>
        <Audio
          volume={(f) =>
            interpolate(
              f,
              [CompositionLength(DATA) - 30, CompositionLength(DATA)],
              [0.7, 0],
              { extrapolateLeft: 'clamp' }
            )
          }
          src={`${DATA.VIDEOMETA.Video.audio_option}`}
        />
      </AbsoluteFill>
    </ThemeProvider>
  );
};