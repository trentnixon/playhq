import { Center } from "@mantine/core";
import { Player } from "@remotion/player";
import { useEffect, useRef, useState } from "react";
import { useAccountDetails } from "../../../lib/userContext";
import { Template_Basic_Sqaure } from "./templates/BasicSqaure/index";
import DATA from "./utils/Data.json";

const RemotionPreview = ({ setIsPlaying }) => {
  const { account, ReRender } = useAccountDetails();
  
  const [userAccount, setUserAccount] = useState(account);

  const ID = "Top5LeadingRunScorers";
  const OBJ = {
    "Basic Sqaure": Template_Basic_Sqaure,
    "Basic Rounded": Template_Basic_Sqaure,
  };

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
  if (userAccount === null) {
    return <FixturaLoading />;
  }
  return (
    <Center>
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
    </Center>
  );
};

export default RemotionPreview;
