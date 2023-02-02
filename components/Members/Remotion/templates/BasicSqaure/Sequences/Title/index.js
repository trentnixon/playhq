import { Sequence, AbsoluteFill, Series, Video } from "remotion";
import styled from "styled-components";

import { useCurrentFrame } from "remotion";

import { SpringToFrom } from "../../../../Animation/RemotionSpring";
import { interpolateOpacityByFrame } from "../../../../Animation/interpolate";
import {
  EraseToMiddleFromTop,
  FromMiddle,
  FromTopToBottom,
} from "../../../../Animation/ClipWipe";
import {
  getContrastColor,
  lightenColor,
  darkenColor,
} from "../../../../utils/colors";
import { calculateLetterSpacing } from "../../../../utils/copy";

const VIDEO = {
  mixBlendMode: "luminosity",
  opacity: 0.1,
};

export const TitleSequenceFrame = ({ theme, fontFamily }) => {
  const frame = useCurrentFrame();
  return (
    <>
      <Sequence>
        <Series>
          <Series.Sequence durationInFrames={90} layout="none">
            <LogoContainer
              style={{
                fontFamily,
                backgroundColor: getContrastColor(theme.secondary),
                transform: `scale(${SpringToFrom(
                  7,
                  0,
                  1,
                  "Wobbly"
                )}) scale(${SpringToFrom(65, 1, 0, "Slow")})`,
              }}
            />

            <ClubNameContainer>
              <ClubName
                style={{
                  fontFamily,
                  clipPath: FromTopToBottom(15, "Wobbly"),
                  color: getContrastColor(theme.secondary),
                  opacity: interpolateOpacityByFrame(frame, 55, 70, 1, 0),
                }}
              >
                TITLES
              </ClubName>
            </ClubNameContainer>
            <SqareBG
              style={{
                backgroundColor: lightenColor(theme.secondary),
                height: `${SpringToFrom(0, 0, 1661, "Wobbly")}px`,
                transform: `translateY(${SpringToFrom(
                  0,
                  1920,
                  0,
                  "Wobbly"
                )}px)`,
                borderLeft: `5px solid ${lightenColor(theme.secondary)}`,
                borderRight: `5px solid ${lightenColor(theme.secondary)}`,
                clipPath: EraseToMiddleFromTop(65, "Slow"),
              }}
            />
          </Series.Sequence>
        </Series>
      </Sequence>
      <Video
        startFrom={0}
        src="https://fixturaassets.s3.ap-southeast-2.amazonaws.com/introBGsequence.mp4"
        style={VIDEO}
      />
    </>
  );
};

export default TitleSequenceFrame;
const SqareBG = styled.div`
  position: absolute;
  width: 1246px;
  height: 1661px;
  left: 97px;
  top: 130px;
  z-index: 1000;
  background: #00aeef;
`;

const LogoContainer = styled.div`
  position: absolute;
  width: 829px;
  height: 829px;
  left: 317px;
  top: 546px;
  z-index: 2000;
  background: #d9d9d9;
  border-radius: 1000px;
`;

const ClubNameContainer = styled.div`
  position: relative;
  width: 1246px;
  height: 132px;
  left: 97px;
  top: 1410px;
  z-index: 2000;
  display: flex;
`;

const ClubName = styled.h1`
  position: absolute;
  width: 1246px;
  font-weight: 400;
  font-size: 100px;
  margin: 0;
  padding: 0;
  line-height: 1em;
  text-align: center;
  letter-spacing: -0.015em;
  text-transform: uppercase;

  color: #ffffff;
`;
