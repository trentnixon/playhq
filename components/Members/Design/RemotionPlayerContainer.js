import { Paper } from "@mantine/core";
import DATA from "../Remotion/utils/Data.json";
import RemotionPreview from "../Remotion/ThemePreviewer";
import { useAccountDetails } from "../../../lib/userContext";
import { useState, useEffect } from "react";
import { LoadingStateWrapper } from "../Account/HOC/LoadingStateWrapper";
import { P } from "../Common/Type";
import { FindAccountLabel, FindAccountLogo } from "../../../lib/actions";

const updateVideoMeta = (userAccount) => {
  if (userAccount.attributes) {
    const { theme, template, audio_option } = userAccount.attributes;

    DATA.VIDEOMETA.Video.Theme = theme?.data?.attributes?.Theme;
    DATA.VIDEOMETA.Video.Template = template?.data?.attributes?.Name;
    DATA.VIDEOMETA.Video.audio_option = audio_option?.data?.attributes?.URL;
  }
};

const updateClubMeta = (userAccount) => {
  if (userAccount) {
    const LOGO = FindAccountLogo(userAccount);
    const Name = FindAccountLabel(userAccount);

    DATA.VIDEOMETA.Club.Logo = LOGO;
    DATA.VIDEOMETA.Club.Name = Name;
  }
};

const updateSponsors = (userAccount) => {
  if (userAccount.attributes?.sponsors?.data) {
    const updatedSponsors = userAccount.attributes.sponsors.data.map(
      (sponsor) => ({
        Name: sponsor.attributes.Name,
        URL: sponsor.attributes.URL,
        Logo: sponsor.attributes.Logo.data.attributes.url,
        isPrimary: sponsor.attributes.isPrimary,
      })
    );

    DATA.VIDEOMETA.Club.Sponsors = updatedSponsors;
  }
};

export const RemotionPlayerContainer = (props) => {
  const { setIsPlaying } = props;
  const { account } = useAccountDetails();
  const [userAccount, setUserAccount] = useState(account);

  useEffect(() => {
    setUserAccount(account);
    //console.log("DATA JSON", DATA);
    if (userAccount) {
      updateVideoMeta(userAccount);
      updateClubMeta(userAccount);
      updateSponsors(userAccount);
      console.log("DATA JSON", DATA);
    }
  }, [account]);

  return (
    <LoadingStateWrapper conditions={[account, DATA.VIDEOMETA.Video.Theme]}>
      <Paper mb={20}>
        <RemotionPreview setIsPlaying={setIsPlaying} DATA={{ DATA }} />
      </Paper>
      <P
        textAlign={"left"}
        size={"xs"}
        lineHeight={"1.2em"}
        color={3}
        Copy={`This preview lets you see your weekly assets in action—check colors, audio, and sponsor placements. 
        `}
      />
      <P
        textAlign={"left"}
        size={"xs"}
        lineHeight={"1.2em"}
        color={3}
        Copy={`
        Want to make changes? Head to the Branding page for theme and audio adjustments, or visit the Sponsors page to manage sponsors.`}
      />
    </LoadingStateWrapper>
  );
};
