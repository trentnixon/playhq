import { Paper } from "@mantine/core";
import DATA from "../Remotion/utils/Data.json";
import RemotionPreview from "../Remotion/ThemePreviewer";
import { useAccountDetails } from "../../../lib/userContext";
import { useState, useEffect } from "react";
import { LoadingStateWrapper } from "../Account/HOC/LoadingStateWrapper";
import { P } from "../Common/Type";
import { FindAccountLabel, FindAccountLogo } from "../../../lib/actions";

export const RemotionPlayerContainer = (props) => {
  const { setIsPlaying } = props;
  const { account } = useAccountDetails();
  const [userAccount, setUserAccount] = useState(account);

  useEffect(() => {
    setUserAccount(account);
    if (userAccount) {
      const LOGO = FindAccountLogo(userAccount);
      const Name = FindAccountLabel(userAccount);

      DATA.VIDEOMETA.Video.Theme =
        userAccount.attributes?.theme?.data?.attributes.Theme;
      DATA.VIDEOMETA.Video.Template =
        userAccount.attributes?.template?.data?.attributes.Name;
      DATA.VIDEOMETA.Video.audio_option =
        userAccount.attributes?.audio_option?.data?.attributes.URL;
      DATA.VIDEOMETA.Club.Logo = LOGO;
      DATA.VIDEOMETA.Club.Name = Name;
    }
  }, [account]);

  return (
    <LoadingStateWrapper conditions={[account, DATA.VIDEOMETA.Video.Theme]}>
      <Paper>
        <RemotionPreview setIsPlaying={setIsPlaying} DATA={{ DATA }} />
      </Paper>
      <P
        textAlign={"center"}
        size={"xs"}
        lineHeight={"1.2em"}
        color={3}
        Copy={`Options to modify the theme and logos can be found on the Brand page.`}
      />
    </LoadingStateWrapper>
  );
};
