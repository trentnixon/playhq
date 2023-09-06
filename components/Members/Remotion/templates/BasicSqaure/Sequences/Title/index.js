import { Sequence, Series, Img } from "remotion";
import styled from "styled-components";
import { useCurrentFrame } from "remotion";
import { SpringToFrom } from "../../../../Animation/RemotionSpring";
import { interpolateOpacityByFrame } from "../../../../Animation/interpolate";
import {
  EraseToMiddleFromTop,
  FromTopToBottom,
  FromLeftToRight,
} from "../../../../Animation/ClipWipe";
import { getContrastColor } from "../../../../utils/colors";

export const TitleSequenceFrame = ({ theme, FPS, fontFamily, DATA }) => {
  return (
    <Series>
      <Series.Sequence durationInFrames={FPS} >
        <IntroContainer>
          <AccountName
            fontFamily={fontFamily}
            DATA={DATA}
            theme={theme}
            FPS={FPS}
          />
          <AccountLogo fontFamily={fontFamily} DATA={DATA} FPS={FPS} />
          <AssetTitle
            fontFamily={fontFamily}
            DATA={DATA}
            theme={theme}
            FPS={FPS}
          />
        </IntroContainer>

        <PrincipalSponsor
          fontFamily={fontFamily}
          DATA={DATA}
          theme={theme}
          FPS={FPS}
        />
      </Series.Sequence>
    </Series>
  );
};

const AccountName = ({ fontFamily, theme, DATA, FPS }) => {
  const frame = useCurrentFrame();
  return (
    <ClubNameContainer>
      <ClubName
        style={{
          fontFamily,
          clipPath: FromTopToBottom(7, "Wobbly"),
          color: getContrastColor(theme.primary),
          opacity: interpolateOpacityByFrame(frame, FPS - 30, FPS - 15, 1, 0),
        }}
      >
        {DATA.VIDEOMETA.Club.Name}
      </ClubName>
    </ClubNameContainer>
  );
};

const AccountLogo = ({ fontFamily, FPS, DATA }) => {
  return (
    <LogoContainer
      style={{
        fontFamily,
        transform: `scale(${SpringToFrom(
          7,
          0,
          1,
          "Wobbly"
        )}) scale(${SpringToFrom(FPS - 30, 1, 0, "Slow")})`,
      }}
    >
      <Img
        src={DATA.VIDEOMETA.Club.Logo}
        style={{
          width: "auto",
          maxHeight: "400px",
          minHeight: "400px",
          objectFit: "contain",
          borderRadius: "100%",
        }}
      />
    </LogoContainer>
  );
};

const AssetTitle = ({ fontFamily, FPS, DATA, theme }) => {
  const frame = useCurrentFrame();
  return (
    <VideoTitle
      style={{
        fontFamily,
        clipPath: FromLeftToRight(7, "Wobbly"),
        color: getContrastColor(theme.primary),
        opacity: interpolateOpacityByFrame(frame, FPS - 30, FPS - 15, 1, 0),
      }}
    >
      {DATA.VIDEOMETA.Video.Title}
    </VideoTitle>
  );
};

const PrincipalSponsor = ({ fontFamily, FPS, DATA, theme }) => {
  const getPrimarySponsor = (sponsorList) => {
    console.log(sponsorList);
    return sponsorList?.find((sponsor) => sponsor.isPrimary === true);
  };
  const PrincipalSponsorIs = getPrimarySponsor(DATA.VIDEOMETA.Club.Sponsors);

  if (!PrincipalSponsorIs) return false;
  return (
    <PrincipalLogo
      style={{
        transform: `translateY(${SpringToFrom(0, 300, 0, "Wobbly")}px)`,
        clipPath: EraseToMiddleFromTop(FPS - 20, "Slow"),
      }}
    >
      <PrincipalLogoInner>
        <h1
          style={{
            fontFamily,
            textAlign: "right",
            fontSize: "3.5em",
            lineHeight: "1em",
            fontWeight: "400",
            width: "100%",
            margin: "0 30px 0 0",
            padding: 0,
            color: getContrastColor(theme.primary),
          }}
        >
          {getPrimarySponsor(DATA.VIDEOMETA.Club.Sponsors)?.Name}
        </h1>
        <h1
          style={{
            fontFamily,
            textAlign: "right",
            fontSize: "2.9em",
            lineHeight: "1em",
            fontWeight: "400",
            width: "100%",
            margin: "0 30px 0 0",
            padding: 0,
            color: getContrastColor(theme.primary),
          }}
        >
          {getPrimarySponsor(DATA.VIDEOMETA.Club.Sponsors).Tagline}
        </h1>
      </PrincipalLogoInner>
      <PrincipalLogoImg>
        <Img
          src={getPrimarySponsor(DATA.VIDEOMETA.Club.Sponsors).Logo}
          height="180px"
        />
      </PrincipalLogoImg>
    </PrincipalLogo>
  );
};

const IntroContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const LogoContainer = styled.div`
  z-index: 2000;
  border-radius: 1000px;
  margin: 50px 0px;
`;

const ClubNameContainer = styled.div`
  width: 1246px;
  z-index: 2000;
  display: flex;
  align-items: flex-start;
  justify-content: center;
`;

const ClubName = styled.h1`
  font-weight: 900;
  font-size: 7.5em;
  margin: 0px;
  padding: 0;
  line-height: 1em;
  text-align: center;
  letter-spacing: -0.02em;
  text-transform: uppercase;
  color: #ffffff;
`;

const VideoTitle = styled.h1`
  width: 100%;
  font-weight: 900;
  font-size: 12em;
  margin: 0;
  padding: 0;
  line-height: 0.8em;
  text-align: center;
  letter-spacing: -0.02em;
  text-transform: uppercase;

  z-index: 2000;
`;

const PrincipalLogo = styled.div`
  position: absolute;
  height: 200px;
  width: 100%;
  left: 0px;
  bottom: 5px;

  z-index: 2000;
  flex-direction: row;
  justify-content: center;
  display: flex;
  align-items: center;
`;

const PrincipalLogoImg = styled.div`
  flex-direction: column;
  justify-content: start;
  display: flex;
  align-items: start;
  width: auto;
`;

const PrincipalLogoInner = styled.div`
  flex-direction: column;
  justify-content: center;
  display: flex;
  align-items: center;
  width: auto;
`;
