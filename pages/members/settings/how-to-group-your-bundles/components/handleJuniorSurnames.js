import { useState } from "react";
import { Group, Switch } from "@mantine/core";
import { P } from "../../../../../components/Members/Common/Type";
//import { FindAccountType } from "../../../../../lib/actions";
import { useSetIncludeJuniorSurnames } from "../../../../../Hooks/useAccountSettings";
import { useAccountDetails } from "../../../../../context/userContext";
import { RoundedSectionContainer } from "../../../../../components/UI/Containers/SectionContainer";

const HandleJuniorSurnames = () => {
  const { account } = useAccountDetails();
  //console.log(account.attributes.include_junior_surnames);
  //const AccType = FindAccountType(account);

  if (!account) return;

  const [GroupAssetsBy, putGroupAssetsBy] = useSetIncludeJuniorSurnames();

  // Updated labels, descriptions, and ON/OFF labels based on AccType
  const settings = {
    label: "Include Junior Players Surnames in Bundles?",
    descriptions: {
      true: "Include Junior Surnames in Bundles",
      false: "Do not include Junior Surnames in Bundles",
    },
    onLabel: "Include Surnames",
    offLabel: "Do not include Surnames",
  };

  const [switchValue, setSwitchValue] = useState(
    GroupAssetsBy || account.attributes.include_junior_surnames
  );

  // create use hook for ass and club data to show the grouped by labels

  const handleSwitchChange = newValue => {
    setSwitchValue(newValue);
    putGroupAssetsBy(newValue);
  };

  return (
    <RoundedSectionContainer
      headerContent="Junior Surnames"
      topContent={
        <ContainerTopSection
          setting={settings}
          handleSwitchChange={handleSwitchChange}
          switchValue={switchValue}
        />
      }
      bottomContent={
        <ContainerBottomSection setting={settings} switchValue={switchValue} />
      }
    />
  );
};
export default HandleJuniorSurnames;

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
        onChange={event => handleSwitchChange(event.currentTarget.checked)}
        onLabel={setting.onLabel}
        offLabel={setting.offLabel}
        size="xl"
        color="indigo"
        labelPosition="left"
      />
    </Group>
  );
};
