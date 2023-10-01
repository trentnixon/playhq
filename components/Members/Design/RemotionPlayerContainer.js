import { Paper } from "@mantine/core";
import { useState, useEffect } from "react";
import { LoadingStateWrapper } from "../Account/HOC/LoadingStateWrapper";
import { P } from "../Common/Type";
import { useAccountDetails } from "../../../lib/userContext";
import RemotionPreview from "./ThemePreviewer";
import { useGetAssets } from "../../../Hooks/useGetAssets";

export const RemotionPlayerContainer = (props) => {
  const { setIsPlaying } = props;
  const { account } = useAccountDetails();
  const [Assets, GetAssets] = useGetAssets();
  const [userAccount, setUserAccount] = useState(account);

  useEffect(() => {
    setUserAccount(account);
    GetAssets();
  }, [account]);

  return (
    <LoadingStateWrapper conditions={[account, Assets]}>
      <>
        <Paper mb={10}>
          <RemotionPreview
            setIsPlaying={setIsPlaying}
            userAccount={userAccount}
            Assets={Assets}
          />
        </Paper>
        <Paper mx={15}>
          <P
            textAlign={"left"}
            size={"xs"}
            lineHeight={"1.2em"}
            color={3}
            Copy={`This preview lets you see your weekly assets in action—check colors, audio, and sponsor placements.`}
          />
          <P
            textAlign={"left"}
            size={"xs"}
            lineHeight={"1.2em"}
            color={3}
            Copy={`Want to make changes? Head to the Branding page for theme and audio adjustments, or visit the Sponsors page to manage sponsors.`}
          />
        </Paper>
      </>
    </LoadingStateWrapper>
  );
};
