import { useState } from "react";

import { Group, Switch } from "@mantine/core";
import { P, PageTitle } from "../../../../components/Members/Common/Type";
import { FindAccountType } from "../../../../lib/actions";
import { useSetGroupAssetsBySetting } from "../../../../Hooks/useAccountSettings";
import { useAccountDetails } from "../../../../lib/userContext";
import { DisplayKeys } from "../../../../components/pages/members/settings/how-to-group-your-bundles/_components/DisplayKeys";
import { IconSettings } from "@tabler/icons";
import { BackToSettings } from "../../../../components/pages/members/settings/_components/BackToSettings";
import { RoundedSectionContainer } from "../../../../components/UI/Containers/SectionContainer";
import SecureRouteHOC from "../../../../components/Layouts/members/security/SecureRouteHC";
import { PageMetaData } from "../../../../components/Layouts/members/Meta/pageMetaData";

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

  const MetaOBJ = {
    title: "How to Group your Bundles - Fixtura",
    description: "How to Group your Bundles",
    keywords: "How to group your Fixtura Bundles",
  };

  return (
    <SecureRouteHOC conditions={[account]}>
      <PageMetaData MetaOBJ={MetaOBJ} />

      <PageTitle
        Copy={`Settings - Bundle Grouping `}
        ICON={<IconSettings size={40} />}
      />
      <BackToSettings />

      <RoundedSectionContainer
        headerContent="Bundle Groupings"
        topContent={
          <ContainerTopSection
            setting={settings[AccType]}
            handleSwitchChange={handleSwitchChange}
            switchValue={switchValue}
          />
        }
        bottomContent={
          <ContainerBottomSection
            setting={settings[AccType]}
            handleSwitchChange={handleSwitchChange}
            switchValue={switchValue}
          />
        }
      />

      <DisplayKeys switchValue={switchValue} />
    </SecureRouteHOC>
  );
};
export default GroupBySwitch;

const ContainerBottomSection = ({ setting, switchValue }) => {
  return (
    <>
      <P marginBottom={0}>{setting.descriptions[switchValue]}</P>
    </>
  );
};

const ContainerTopSection = ({ setting, handleSwitchChange, switchValue }) => {
  return (
    <Group position="apart">
      <P marginBottom={0} Weight={600}>
        {setting.label}
      </P>
      <Switch
        checked={switchValue}
        onChange={(event) => handleSwitchChange(event.currentTarget.checked)}
        onLabel={setting.onLabel}
        offLabel={setting.offLabel}
        size="xl"
        color="indigo"
        labelPosition="left"
      />
    </Group>
  );
};
