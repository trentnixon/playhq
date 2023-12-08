// MembersPreviewShell component file
import { useEffect, useState } from "react";
import { Paper } from "@mantine/core";
import { MembersPreviewPlayer } from "./Player";
import { P } from "../Common/Type";
import { createPreviewObject } from "../../../utils/RemotionUtils";

export const MembersPreviewShell = (props) => {
  const { userAccount, selectedAsset, selectedHeroImage } = props;
  const [previewObj, setPreviewObj] = useState({});

  useEffect(() => {
    const updatedPreviewObj = createPreviewObject(userAccount, selectedAsset, selectedHeroImage);
    setPreviewObj(updatedPreviewObj);
  }, [userAccount, selectedAsset, selectedHeroImage]); // Update the dependency array

  if (Object.keys(previewObj).length === 0) {
    return <P>Loading...</P>;
  }
  
  return (
    <Paper shadow="md" w={"100%"} p={0} withBorder>
      <MembersPreviewPlayer
        OBJ={previewObj}
        Selected={selectedAsset}
        HeroImage={selectedHeroImage}
      />
    </Paper>
  ); 
};
 