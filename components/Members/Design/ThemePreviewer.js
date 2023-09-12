// CORE
//import { useCallback, useEffect, useRef } from "react";
// PACK
import { Center } from "@mantine/core";
import { Player, Thumbnail } from "@remotion/player";
//COMPONENTS
import { Template_Basic_Sqaure } from "../VideoFiles/templates/BasicSqaure/index";
import { Template_Basic_Rounded } from "../VideoFiles/templates/BasicRounded/index";
import { useCallback } from "react";
//import { P } from "../Common/Type";
//import { AbsoluteFill, delayRender } from "remotion";

const RemotionPreview = ({ setIsPlaying, DATA }) => {
  const OBJ = {
    "Basic Sqaure": Template_Basic_Sqaure,
    "Basic Rounded": Template_Basic_Rounded,
  };

  const ASSETDATA = DATA.DATA;

  if (typeof OBJ[ASSETDATA.VIDEOMETA.Video.Template] === "undefined") {
    console.error("Template component is undefined");
  }
  const HasSponsors = () => {
    ASSETDATA.VIDEOMETA.Video.includeSponsors;
    if (ASSETDATA.VIDEOMETA.Club.Sponsors.length === 0) return 0;
    return ASSETDATA.VIDEOMETA.Video.includeSponsors
      ? ASSETDATA.VIDEOMETA.Video.TIMINGS.FPS_OUTRO
      : 0;
  };

  const Create = {
    ratio: { width: 1080, height: 1350 },
    fps: 30,
    CompositionID: ASSETDATA.VIDEOMETA.Video.CompositionID,
    Template: OBJ[ASSETDATA.VIDEOMETA.Video.Template],
    durationInFrames: [
      ASSETDATA.VIDEOMETA.Video.TIMINGS.FPS_INTRO,
      HasSponsors(),
      ASSETDATA.VIDEOMETA.Video.TIMINGS.FPS_MAIN,
    ].reduce((a, b) => a + b, 0),
  };

  console.log("ASSETDATA", ASSETDATA);

  return (
    <Center>
      {/* <Thumbnail
        id={Create.CompositionID}
        component={Create.Template}
        compositionWidth={Create.ratio.width}
        compositionHeight={Create.ratio.height}
        frameToDisplay={600}
        durationInFrames={Create.durationInFrames}
        fps={30}
        inputProps={DATA}
        style={{
          width: parseInt(Create.ratio.width) * 0.25,
          height: parseInt(Create.ratio.height) * 0.25,
        }}
      /> */}
      <Player
        id={Create.CompositionID}
        component={Create.Template}
        durationInFrames={Create.durationInFrames}
        compositionWidth={Create.ratio.width}
        compositionHeight={Create.ratio.height}
        fps={Create.fps}
        numberOfSharedAudioTags={0}
        inputProps={DATA}
        controls
        style={{
          width: parseInt(Create.ratio.width) * 0.25,
          height: parseInt(Create.ratio.height) * 0.25,
        }}
      />
    </Center>
  );
};

export default RemotionPreview;

//console.log("RemotionPreview DATA CHECK", ASSETDATA.VIDEOMETA);
/* const playerRef = useRef(null); */

/* useEffect(() => {
    const { current } = playerRef;
    if (!current) {
      return;
    }

    const listener = () => {
      console.log("paused");
      setIsPlaying(false);
    };

    const Playlistener = () => {
      console.log("playing");
      setIsPlaying(true);
    };

    current.addEventListener("play", Playlistener);
    current.addEventListener("pause", listener);
    return () => {
      current.removeEventListener("pause", listener);
      current.removeEventListener("play", listener);
    };
  }, []); */

/*   const PlayerOnly = ({ playerRef }) => {
    return (
      <Player
        ref={playerRef}
        id={ASSETDATA.VIDEOMETA.Video.CompositionID}
        component={OBJ[ASSETDATA.VIDEOMETA.Video.Template]}
        durationInFrames={550}
        compositionWidth={1440}
        compositionHeight={1920}
        fps={30}
        numberOfSharedAudioTags={0}
        inputProps={DATA}
        controls
        style={{
          width: parseInt(1440) * 0.25,
          height: parseInt(1920) * 0.25,
        }}
      />
    );
  }; */
