// CORE
import { useEffect, useRef, useState } from "react";
// UTILS
import { FixturaLoading } from "../Common/Loading";
import { useAccountDetails } from "../../../lib/userContext";
import DATA from "./utils/Data.json";
// PACK
import { Center, Paper } from "@mantine/core";
import { Player } from "@remotion/player";
//COMPONENTS
import {
  Template_Basic_Sqaure,
  Test_Basic_Sqaure,
} from "./templates/BasicSqaure/index";
import { LoadingStateWrapper } from "../Account/HOC/LoadingStateWrapper";
import { P, SubHeaders } from "../Common/Type";

const RemotionPreview = ({ setIsPlaying }) => {
  const { account, ReRender } = useAccountDetails();
  const [userAccount, setUserAccount] = useState(account);

  const ID = "Top5LeadingRunScorers";
  const OBJ = {
    "Basic Sqaure": Test_Basic_Sqaure,
    "Basic Rounded": Test_Basic_Sqaure,
  };

  const FPS_INTRO = 120;
  const FPS_OUTRO = 180;
  const FPS_MAIN = 300;

  //console.log(DATA)
  const playerRef = useRef(null);

  useEffect(() => {
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
  }, []);

  useEffect(() => {
    console.log(userAccount);
  }, [userAccount]);
  useEffect(() => {
    setUserAccount(account);
  }, [account]);

  const PlayerOnly = ({ playerRef }) => {
    return (
      <Player
        ref={playerRef}
        id={ID}
        component={OBJ[userAccount.attributes?.template?.data?.attributes.Name]}
        durationInFrames={550}
        compositionWidth={1440}
        compositionHeight={1920}
        fps={30}
        numberOfSharedAudioTags={0}
        inputProps={{
          THEME: userAccount.attributes?.theme?.data?.attributes,
          AUDIO: userAccount.attributes?.audio_option?.data?.attributes,
          DATA: DATA,
          ID: ID,
          TIMINGS: {
            FPS_INTRO,
            FPS_OUTRO,
            FPS_MAIN,
          },
        }}
        controls
        style={{
          width: parseInt(1440) * 0.25,
          height: parseInt(1920) * 0.25,
        }}
      />
    );
  };
  /*  const ControlsOnly = ({ playerRef }) => {
    const [currentTime, setCurrentTime] = useState(0);

    useEffect(() => {
      playerRef.current?.addEventListener("timeupdate", (e) => {
        setCurrentTime(e.detail.frame);
      });
    }, []);

    return <div>Current time: {currentTime}</div>;
  }; */

  return (
    <LoadingStateWrapper conditions={[userAccount]}>
      <P Weight={900} size={'xl'} textAlign={'right'} marginBottom={0} Copy={`Preview`} />
      <Center>
        <PlayerOnly playerRef={playerRef} />
      </Center>
      
      <P textAlign={'center'} size={'xs'} lineHeight={'1.2em'} color={3} Copy={`Options to modify the theme and logos can be found on the Brand page.`} />
    </LoadingStateWrapper>
  );
};

export default RemotionPreview;

{
  /*  <Center>
      <ControlsOnly playerRef={playerRef} />
      </Center> */
}
// 271B4D
// ED9206
/*
<Player 
        ref={playerRef} 
        id={ID}
        component={OBJ[userAccount.attributes?.template?.data?.attributes.Name]}
        durationInFrames={460}
        compositionWidth={1440}
        compositionHeight={1920}
        fps={30}
        numberOfSharedAudioTags={0}
        inputProps={{
          THEME: userAccount.attributes?.theme?.data?.attributes,
          AUDIO: userAccount.attributes?.audio_option?.data?.attributes,
          DATA: DATA,
          ID: ID,
        }}
        controls
        style={{
          width: parseInt(1440) * 0.25,
          height: parseInt(1920) * 0.25,
        }}
      />
*/
