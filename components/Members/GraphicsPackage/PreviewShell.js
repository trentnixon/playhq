import { useEffect, useState } from "react";
import { Select, Paper } from "@mantine/core";
import {
  FindAccountLabel,
  FindAccountLogo,
  FindAccountType,
} from "../../../lib/actions";
import { MembersPreviewPlayer } from "./Player";
import { P } from "../Common/Type";

export const MembersPreviewShell = (props) => {
  const { userAccount, selectedAsset, selectedHeroImage } = props;
  //const [selectedAsset, setSelectedAsset] = useState("UpComingFixtures");
  const [previewObj, setPreviewObj] = useState({});

  useEffect(() => {
  
    const updatedPreviewObj = {
      theme: userAccount.attributes.theme.data.attributes.Theme,
      template: userAccount.attributes.template.data.attributes,
      sponsors: userAccount.attributes.sponsors.data,
      account_media_libraries:
        userAccount.attributes.account_media_libraries.data,
      Account: {
        type: FindAccountType(userAccount),
        logo: FindAccountLogo(userAccount),
        name: FindAccountLabel(userAccount),
      },
      HeroImage: selectedHeroImage,
    };

    setPreviewObj(updatedPreviewObj);
  }, [userAccount, selectedHeroImage]); // Dependency array includes userAccount

  if (Object.keys(previewObj).length === 0) {
    return <P>Loading...</P>;
  }
  return (
    <>
      <Paper shadow="md" w={"100%"} p={0} withBorder>
        <MembersPreviewPlayer
          OBJ={previewObj}
          Selected={selectedAsset}
          HeroImage={selectedHeroImage}
        />
      </Paper>
    </>
  );
};
