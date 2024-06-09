import { useState, useEffect } from "react";
import { useAccountDetails } from "../../../lib/userContext";
import { Grid } from "@mantine/core";
import { MembersPreviewShell } from "./PreviewShell";
import { PreviewControls } from "./PreviewControls";
import { useTemplate } from "../../../lib/TemplateContext";
import { updateUserAccountWithTemplate } from "../../../utils/actions";
import { Previewer } from "../../pages/members/index/Dashboard/userPreview/Previewer";
import { P } from "../Common/Type";

const assetOptions = {
  Cricket: [
    { value: "UpComingFixtures", label: "Upcoming Fixtures" },
    { value: "WeekendResults", label: "Weekend Results" },
    { value: "Top5BattingList", label: "Top 5 Batting" },
    { value: "Top5BowlingList", label: "Top 5 Bowling" },
    { value: "Ladder", label: "Ladder" },
  ],
  AFL: [
    { value: "UpComingAFLFixtures", label: "Upcoming AFL Fixtures" },
    { value: "WeekendResultsAFL", label: "Weekend AFL Results" },

    { value: "Top5AFLScorers", label: "Top 5 AFL Scorers" },
    { value: "AFLLadder", label: "AFL Ladder" },
  ],
  Netball: [
    { value: "UpComingNetBallFixtures", label: "Upcoming Netball Fixtures" },
    { value: "WeekendResultsNetball", label: "Weekend Netball Results" },
    { value: "NetballLadder", label: "Netball Ladder" },
  ],
};

export const PrefabPlayerGrid = () => {
  const { account } = useAccountDetails();
  const { template, setTemplate } = useTemplate();
  const [userAccount, setUserAccount] = useState(null);
  const [selectedAsset, setSelectedAsset] = useState(null);
  const [selectedHeroImage, setHeroImage] = useState(null);
  const [playerKey, setPlayerKey] = useState(Date.now());
  const [updatedUserAccount, setUpdatedUserAccount] = useState(null);

  useEffect(() => {
    if (account) {
      setUserAccount(account);
    }
  }, [account]);

  useEffect(() => {
    if (userAccount && !selectedAsset) {
      const sport = userAccount.attributes.Sport;
      if (sport && assetOptions[sport] && assetOptions[sport].length > 0) {
        setSelectedAsset(assetOptions[sport][0].value);
      }
    }
  }, [userAccount]);

  useEffect(() => {
    if (!template && userAccount) {
      const userTemplateId = userAccount.attributes.template.data.id;
      const userTemplate = userAccount.attributes.templates.find(
        (template) => template.id === userTemplateId
      );
      setTemplate(userTemplate);
    }
  }, [template, userAccount, setTemplate]);

  useEffect(() => {
    if (template && userAccount) {
      const updatedAccount = updateUserAccountWithTemplate(
        userAccount,
        template
      );
      setUpdatedUserAccount(updatedAccount);
    }
  }, [template, userAccount]);

  if (!userAccount) {
    return <P>Loading...</P>;
  }

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
          assetOptions={assetOptions}
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
