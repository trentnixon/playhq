import { Center } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { useMantineTheme } from "@mantine/styles";
import { useEffect, useState } from "react";
import { createPreviewObject } from "../../../../../../utils/RemotionUtils";
import { RoundedSectionContainer } from "../../../../../UI/Containers/SectionContainer";
import { Previewer } from "./Previewer";
import { UserPreviewTitle } from "./UserPreviewTitle";
import { useAccountDetails } from "../../../../../../lib/userContext";

export const PreviewGallery = () => {
  const { account } = useAccountDetails();
  const [previewObj, setPreviewObj] = useState({});

  const theme = useMantineTheme();
  const mobile = useMediaQuery(`(max-width: ${theme.breakpoints.sm})`);

  useEffect(() => {
    const updatedPreviewObj = createPreviewObject(account);
    setPreviewObj(updatedPreviewObj);
  }, [account]);

  if (!previewObj.template) {
    return <Center>Loading...</Center>;
  }

  const templateType = previewObj.template.Category;
  //const assetTypes = Object.keys(ASSETS[templateType]);

  return (
    <RoundedSectionContainer 
      headerContent={`Preview`}
      topContent={<UserPreviewTitle />}
      bottomContent={<Previewer account={account} />}
    />
  );
}; 
