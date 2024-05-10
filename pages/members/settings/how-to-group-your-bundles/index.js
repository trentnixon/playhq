import { useState } from "react";
import Meta from "../../../../components/Layouts/Meta";
import { Group, Paper, Switch } from "@mantine/core";
import { P, PageTitle } from "../../../../components/Members/Common/Type";
import { MembersWrapper } from "../../../../components/Members/Common/Containers";
import SetupCheck from "../../../../components/Members/Account/HOC/SetupCheck";
import { LoadingStateWrapper } from "../../../../components/Members/Account/HOC/LoadingStateWrapper";
import { FindAccountType } from "../../../../lib/actions";

import { useSetGroupAssetsBySetting } from "../../../../Hooks/useAccountSettings";
import { useAccountDetails } from "../../../../lib/userContext";

import { DisplayKeys } from "./@components/DisplayKeys";
import { BackToSettings } from "../_components/BackToSettings";
import { IconSettings } from "@tabler/icons";

const GroupBySwitch = () => {
  const { account } = useAccountDetails();
  //console.log(account.attributes.group_assets_by);
  const AccType = FindAccountType(account);

  if (!account) return;

  const [GroupAssetsBy, putGroupAssetsBy] = useSetGroupAssetsBySetting();

  // Updated labels, descriptions, and ON/OFF labels based on AccType
  const settings = {
    Association: {
      label: "How would you like your Competitions Grouped?",
      descriptions: {
        true: "Your assets are currently grouped by Grade, ensuring that each grade within every competition has its own distinct set of assets.",
        false:
          "Your assets are currently grouped by Competition Name, meaning all grades within a specific competition will be consolidated, allowing for a comprehensive assessment of the entire competition as a unified entity.",
      },
      onLabel: "By Grade",
      offLabel: "By Competition Name",
    },
    Club: {
      label: "How would you like your Teams Grouped?",
      descriptions: {
        true: "Your assets are currently grouped by Age Group, distinguishing between Juniors, Seniors, Masters, and others.",
        false:
          "Your assets are currently grouped under Juniors and Seniors, with Masters and Special included in Seniors.",
      },
      onLabel: "By All Age groups",
      offLabel: "By Junior/Senior",
    },
  };

  const [switchValue, setSwitchValue] = useState(
    GroupAssetsBy || account.attributes.group_assets_by
  );

  // create use hook for ass and club data to show the grouped by labels

  const handleSwitchChange = (newValue) => {
    setSwitchValue(newValue);
    putGroupAssetsBy(newValue);
  };

  return (
    <>
      <MembersWrapper>
        <Meta
          title="Member Downloads - Fixtura: Access Your Bundles"
          description="Download your purchased bundles and resources as a Fixtura member. Enhance your club's digital media with our exclusive content."
          keywords="Member downloads, Fixtura bundles, sports media resources, club content download, digital bundles"
        />

        <SetupCheck>
          <LoadingStateWrapper conditions={[account]}>
            <PageTitle
              Copy={`Grouping your Bundles`}
              ICON={<IconSettings size={40} />}
            />
            <BackToSettings />
            <P>
              Adjust your bundle grouping settings to organize account bundles
              by categories: clubs can sort by age, while associations can
              organize by competition or grade, ensuring streamlined access and
              management tailored to your specific needs.
            </P>

            <Paper radius="md" withBorder shadow="md" mt={20} mb={20} p={10}>
              <Group position="apart">
                <P marginBottom={0} Weight={600}>
                  {settings[AccType].label}
                </P>
                <Switch
                  checked={switchValue}
                  onChange={(event) =>
                    handleSwitchChange(event.currentTarget.checked)
                  }
                  onLabel={settings[AccType].onLabel}
                  offLabel={settings[AccType].offLabel}
                  size="xl"
                  color="indigo"
                  labelPosition="left"
                />
              </Group>
            </Paper>
            <P marginBottom={0}>
              {settings[AccType].descriptions[switchValue]}
            </P>

            <DisplayKeys switchValue={switchValue} />
          </LoadingStateWrapper>
        </SetupCheck>
      </MembersWrapper>
    </>
  );
};
export default GroupBySwitch;
