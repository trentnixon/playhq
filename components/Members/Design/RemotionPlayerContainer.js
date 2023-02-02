import { Paper } from "@mantine/core";
import RemotionPreview from "../Remotion/ThemePreviewer";

export const RemotionPlayerContainer = (props) => {
  const { isPlaying, userAccount, setIsPlaying } = props;
  return (
    <Paper>
      <RemotionPreview
        THEME={userAccount.attributes?.theme?.data?.attributes}
        TEMPLATE={userAccount.attributes?.template?.data?.attributes}
        AUDIO={userAccount.attributes?.audio_option?.data?.attributes}
        setIsPlaying={setIsPlaying}
      /> 
    </Paper>
  );
};
 