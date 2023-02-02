// CORE
import { useEffect, useRef, useState } from "react";
// UTILS
import { FixturaLoading } from "../Common/Loading";
import { useAccountDetails } from "../../../lib/userContext";
import DATA from "./utils/Data.json";
// PACK
import { Center } from "@mantine/core";
import { Player } from "@remotion/player";
//COMPONENTS
import { Template_Basic_Sqaure, Test_Basic_Sqaure } from "./templates/BasicSqaure/index";


const RemotionPreview = ({ setIsPlaying }) => {
  const { account, ReRender } = useAccountDetails();
  const [userAccount, setUserAccount] = useState(account);

  const ID = "Top5LeadingRunScorers";
  const OBJ = {
    "Basic Sqaure": Test_Basic_Sqaure,
    "Basic Rounded": Test_Basic_Sqaure,
  };

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

  useEffect(() => { console.log(userAccount); }, [userAccount]);
  useEffect(() => {
    setUserAccount(account)
  }, [account]);


  const PlayerOnly = ({ playerRef }) => {
    return <Player 
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
  />;
  };
  const ControlsOnly  = ({ playerRef }) => {
    const [currentTime, setCurrentTime] = useState(0);
   
    useEffect(() => {
      playerRef.current?.addEventListener("timeupdate", (e) => {
        setCurrentTime(e.detail.frame);
      });
    }, []);
   
    return <div>Current time: {currentTime}</div>;
  };

  if (userAccount === null) {
    return <FixturaLoading />;
  }
  return (
    <>
    <Center>
      <PlayerOnly playerRef={playerRef} />
     
      
    </Center>
    <ControlsOnly playerRef={playerRef} />
    </>
  );
};

export default RemotionPreview;

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