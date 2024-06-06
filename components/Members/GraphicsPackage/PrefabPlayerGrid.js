import { useState, useEffect } from "react";
import { useAccountDetails } from "../../../lib/userContext";
import { Grid } from "@mantine/core";
import { MembersPreviewShell } from "./PreviewShell";
import { PreviewControls } from "./PreviewControls";
import { useTemplate } from "../../../lib/TemplateContext";
import { updateUserAccountWithTemplate } from "../../../utils/actions";
import { Previewer } from "../../pages/members/index/Dashboard/userPreview/Previewer";
import { P } from "../Common/Type";

export const PrefabPlayerGrid = () => {
  const { account } = useAccountDetails();
  const { template, setTemplate } = useTemplate();
  const [userAccount, setUserAccount] = useState(account);
  const [selectedAsset, setSelectedAsset] = useState("UpComingFixtures");
  const [selectedHeroImage, setHeroImage] = useState(null);
  const [playerKey, setPlayerKey] = useState(Date.now());
  const [updatedUserAccount, setUpdatedUserAccount] = useState(null);

  useEffect(() => {
    if (!template && userAccount) {
      const userTemplateId = userAccount.attributes.template.data.id;
      const userTemplate = account.attributes.templates.find(
        (template) => template.id === userTemplateId
      );
      setTemplate(userTemplate);
    }
  }, [template, userAccount, setTemplate]);

  useEffect(() => {
    if (template) {
      const updatedAccount = updateUserAccountWithTemplate(
        userAccount,
        template
      );
      setUpdatedUserAccount(updatedAccount);
    }
  }, [template, userAccount]);

  return (
    <Grid>
      <Grid.Col sm={12} md={6}>
        {updatedUserAccount && (
          <>
            <P Weight="900" marginBottom={0} color={6}>
              Video Preview
            </P>
            <MembersPreviewShell
              key={playerKey}
              userAccount={updatedUserAccount}
              selectedAsset={selectedAsset}
              selectedHeroImage={selectedHeroImage}
            />
          </>
        )}
      </Grid.Col>
      <Grid.Col sm={12} md={6}>
        <P Weight="900" marginBottom={0} color={6}>
          Filters
        </P>
        <PreviewControls
          setSelectedAsset={setSelectedAsset}
          selectedAsset={selectedAsset}
          userAccount={userAccount}
          selectedHeroImage={selectedHeroImage}
          setHeroImage={setHeroImage}
        />
      </Grid.Col>
      <Grid.Col sm={12} md={12} mt={50}>
        <P Weight="900" marginBottom={0} color={6}>
          Image Preview
        </P>
        <Previewer account={updatedUserAccount} />
      </Grid.Col>
    </Grid>
  );
};
