// CORE
import { useEffect, useRef } from "react";
// PACK
import { Center } from "@mantine/core";
import { Player } from "@remotion/player";
//COMPONENTS
import { Template_Basic_Sqaure } from "./templates/BasicSqaure/index";
import { Template_Basic_Rounded } from "./templates/BasicRounded/index";
import { P } from "../Common/Type";

const RemotionPreview = ({ setIsPlaying, DATA }) => {
  const OBJ = {
    "Basic Sqaure": Template_Basic_Sqaure,
    "Basic Rounded": Template_Basic_Rounded,
  };

  //console.log("RemotionPreview DATA CHECK", DATA.DATA.VIDEOMETA);
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

  const PlayerOnly = ({ playerRef }) => {
    return (
      <Player
        ref={playerRef}
        id={DATA.DATA.VIDEOMETA.Video.CompositionID}
        component={OBJ[DATA.DATA.VIDEOMETA.Video.Template]}
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
  };

  return (
    <>
      <P
        Weight={900}
        size={"xl"}
        textAlign={"left"}
        marginBottom={0}
        Copy={`Preview`}
      />
      <Center>
        <PlayerOnly playerRef={playerRef} />
      </Center>
    </>
  );
};

export default RemotionPreview;

/*  useEffect(() => {
    console.log(userAccount.attributes?.theme?.data?.attributes);
  }, [userAccount]);
  useEffect(() => {
    setUserAccount(account);
  }, [account]);
 */

/*  const ControlsOnly = ({ playerRef }) => {
    const [currentTime, setCurrentTime] = useState(0);

    useEffect(() => {
      playerRef.current?.addEventListener("timeupdate", (e) => {
        setCurrentTime(e.detail.frame);
      });
    }, []);

    return <div>Current time: {currentTime}</div>;
  }; */

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
