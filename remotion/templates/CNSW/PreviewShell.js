/* eslint-disable camelcase */
import { ThemeProvider } from "styled-components";
import { AbsoluteFill, Audio, interpolate, Series } from "remotion";
import { loadFont } from "@remotion/google-fonts/Roboto";
import { BGImageAnimation } from "./Components/Common/BGImageAnimation";
import { TitleSequenceFrame } from "./Components/Intro";
import { OutroSequenceFrame } from "./Components/Outro";
import { CompositionLength } from "../../utils/helpers";
import { getStyleConfig } from "../../utils/global/getStyleConfig";
import { getPrimarySponsor } from "../../structural/Sponsors/Utils/utils";
import { AlternativeOutro } from "./Components/Outro/AlternativeOutro";
import { TEMPLATES_COMPONENTS } from "./AssetList"; // Adjust path as necessary
import { createTemplateProps } from "../../utils/global/createTemplateProps";

export const Template_CNSW = (props) => {
  const { DATA } = props;
  const { fontFamily } = loadFont();
  const { TIMINGS } = DATA;
  const TEMPLATE = DATA.VIDEOMETA.Video.CompositionID;
  //console.log("TEMPLATE ", TEMPLATE);
  const THEME = DATA.VIDEOMETA.Video.Theme;

  // Create StyleConfig
  const createStyleProps = {
    THEME,
    defaultFontFamily: "Roboto Condensed",
    defaultCopyFontFamily: "Roboto Condensed",
  };
  const StyleConfig = getStyleConfig(createStyleProps);
  const Heights = {
    AssetHeight: 1350,
    Header: 230,
    Footer: 120,
  };

  const hasPrimarySponsor = getPrimarySponsor(DATA.VIDEOMETA.Club.Sponsors);

  const RenderTemplate = () => {
    const Component = TEMPLATES_COMPONENTS[TEMPLATE];
    if (!Component) {
      console.error(`No component mapped for template: ${TEMPLATE}`);
      return null;
    }
    const templateProps = {
      ...StyleConfig,
      ...createTemplateProps(DATA, TIMINGS),
      SectionHeights: {
        Header: Heights.Header,
        Body: Heights.AssetHeight - (Heights.Header + Heights.Footer),
        Footer: Heights.Footer,
      },
      SponsorPositionAndAnimations: {
        animationType: "FromTop",
        alignSponsors: "left",
      }, 
    };
    if (TEMPLATE === "Top5BattingList") {
      return <Component {...templateProps} TYPE="BATTING" />;
    }
    if (TEMPLATE === "Top5BowlingList") {
      return <Component {...templateProps} TYPE="BOWLING" />;
    }
    return <Component {...templateProps} />;
  };

  const BuildProps = {
    HeroImage: DATA.VIDEOMETA.Video.HeroImage,
    TemplateVariation: DATA.VIDEOMETA.Video.TemplateVariation,
    TIMINGS: TIMINGS.FPS_MAIN + 210,
    THEME,
    fontFamily: { fontFamily },
    Sport: DATA.VIDEOMETA.Club.Sport,
  };

  return (
    <ThemeProvider theme={THEME}>
      <AbsoluteFill>
        <BGImageAnimation BuildProps={BuildProps} />
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
                  fontFamily={fontFamily}
                  FPS={TIMINGS.FPS_OUTRO}
                  DATA={DATA}
                  BuildProps={BuildProps}
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
              { extrapolateLeft: "clamp" }
            )
          }
          src={`${DATA.VIDEOMETA.Video.audio_option}`}
        />
      </AbsoluteFill>
    </ThemeProvider>
  );
};