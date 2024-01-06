import { useState } from "react";
import { Group, Paper, Switch } from "@mantine/core";
import { FindAccountType } from "../../../../../lib/actions";
import { P } from "../../../Common/Type";
import { useSetGroupAssetsBySetting } from "../../../../../Hooks/useAccountSettings";

export const GroupBySwitch = ({ account }) => {
  //console.log(account.attributes.group_assets_by);
  const AccType = FindAccountType(account);
  const [GroupAssetsBy, putGroupAssetsBy] = useSetGroupAssetsBySetting();

  // Updated labels, descriptions, and ON/OFF labels based on AccType
  const settings = {
    Association: {
      label: "How would you like your Competitions Grouped?",
      descriptions: {
        true: "Your assets are currently grouped by Grade, ensuring that each grade within every competition has its own distinct set of assets.",
        false: "Your assets are currently grouped by Competition Name, meaning all grades within a specific competition will be consolidated, allowing for a comprehensive assessment of the entire competition as a unified entity.",
      },
      onLabel: "By Grade",
      offLabel: "By Competition Name",
    },
    Club: {
      label: "How would you like your Teams Grouped?",
      descriptions: {
        true: "Your assets are currently grouped by Age Group, distinguishing between Juniors, Seniors, Masters, and others.",
        false: "Your assets are currently grouped under Juniors and Seniors, with Masters and Special included in Seniors.",
      },
      onLabel: "By All Age groups",
      offLabel: "By Junior/Senior",
    },
  };

  const [switchValue, setSwitchValue] = useState(GroupAssetsBy || account.attributes.group_assets_by);

  const handleSwitchChange = (newValue) => {
    setSwitchValue(newValue);
    putGroupAssetsBy(newValue);
  };

  return (
    <Paper radius="md" withBorder shadow="md" mt={20} p={10}>
      <Group position="apart">
        <P marginBottom={0} Weight={600}>{settings[AccType].label}</P>
        <Switch
          checked={switchValue}
          onChange={(event) => handleSwitchChange(event.currentTarget.checked)}
          onLabel={settings[AccType].onLabel}
          offLabel={settings[AccType].offLabel}
          size="xl"
          color="indigo"
          labelPosition="left"
        />
      </Group>
      <P marginBottom={0}>{settings[AccType].descriptions[switchValue]}</P>
    </Paper>
  );
};
