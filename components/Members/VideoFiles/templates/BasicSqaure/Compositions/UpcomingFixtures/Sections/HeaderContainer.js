import styled from "styled-components";
import {
  getContrastColor,
  darkenColor,
  lightenColor,
} from "../../../../../utils/colors";
import { useCurrentFrame } from "remotion";
import { SpringToFrom } from "../../../../../Animation/RemotionSpring";
import { interpolateOpacityByFrame } from "../../../../../Animation/interpolate";
import {
  EraseToMiddleFromTop,
  FromMiddle,
  FromTopToBottom,
} from "../../../../../Animation/ClipWipe";
import { restrictString } from "../../../../../utils/copy";

const HeaderContainerStyles = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 60px;
  padding: 0 10px;
  margin-bottom: 15px;
  border-bottom: 3px solid ${(props) => lightenColor(props.THEME.secondary)};
  background-color: ${(props) => darkenColor(props.THEME.primary)};
`;

const HeaderCopy = styled.p`
  font-family: ${(props) => props.fontFamily};
  font-style: normal;
  font-weight: 400;
  display: block;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  width: 100%;
  font-size: 1.2em;
  line-height: 1.1em;
  margin: 0;
`;

const GameType = styled(HeaderCopy)`
  width: 15%;
  font-weight: 900;
`;

const Ground = styled(HeaderCopy)`
  text-align: center;
  width: 70%;
  font-weight: 400;
`;

const Round = styled(HeaderCopy)`
  width: 15%;
`;

export const HeaderContainer = (props) => {
  const { type, ground, round, THEME, fontFamily, FPS_SCORECARD, time } = props;
  const frame = useCurrentFrame();
  return (
    <HeaderContainerStyles
      THEME={THEME}
      style={{
        clipPath: FromMiddle(7, "Wobbly"),
        opacity: interpolateOpacityByFrame(
          frame,
          FPS_SCORECARD - 30,
          FPS_SCORECARD,
          1,
          0
        ),
      }}
    >
      <GameType>
        <HeaderCopy
          THEME={THEME}
          fontFamily={fontFamily}
          style={{
            color: getContrastColor(darkenColor(props.THEME.primary)),
            clipPath: FromTopToBottom(30, "Slow"),
            opacity: interpolateOpacityByFrame(
              frame,
              FPS_SCORECARD - 30,
              FPS_SCORECARD,
              1,
              0
            ),
          }}
        >
          {type}
        </HeaderCopy>
      </GameType>

      <Ground>
        <HeaderCopy
          THEME={THEME}
          fontFamily={fontFamily}
          style={{
            color: getContrastColor(darkenColor(props.THEME.primary)),
            clipPath: FromTopToBottom(30, "Slow"),
            opacity: interpolateOpacityByFrame(
              frame,
              FPS_SCORECARD - 30,
              FPS_SCORECARD,
              1,
              0
            ),
          }}
        >
          {restrictString(ground, 35)}
        </HeaderCopy>
      </Ground>
      <Round>
        <HeaderCopy
          THEME={THEME}
          fontFamily={fontFamily}
          style={{
            color: getContrastColor(darkenColor(props.THEME.primary)),
            clipPath: FromTopToBottom(30, "Slow"),
            opacity: interpolateOpacityByFrame(
              frame,
              FPS_SCORECARD - 30,
              FPS_SCORECARD,
              1,
              0
            ),
          }}
        >
          {round}
        </HeaderCopy>
      </Round>
    </HeaderContainerStyles>
  );
};
