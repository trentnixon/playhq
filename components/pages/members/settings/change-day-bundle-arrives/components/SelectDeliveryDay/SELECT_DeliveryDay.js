import { useEffect, useState } from "react";
import { useAccountDetails } from "../../../../../../../lib/userContext";
import { Group, Tooltip } from "@mantine/core";
import { SelectFixturaSetting } from "../../../../../../Members/Common/formelements/Select_FixturaSettings";
import { IconAlertTriangle } from "@tabler/icons";

export const SELECT_DeliveryDay = () => {
  const { account, ReRender } = useAccountDetails();
  const [userAccount, setUserAccount] = useState(account);
  const [ORDER, setOrder] = useState(userAccount?.attributes?.orders?.data);

  const setHasUpdated = () => {
    //console.log("A DAY HAD CHANGED")
    ReRender();
  };

  return (
    <Group position="apart" m={0}>
      <SelectFixturaSetting
        CollectionFrom={"days-of-the-weeks"}
        CollectionSaveTo={"schedulers"}
        RelationProperty={"days_of_the_week"}
        SelectedBaseValueObject={{ ID: null, Name: null }}
        SelectLabel={`Delivered on : ${account.attributes.scheduler.data.attributes.days_of_the_week.data.attributes.Name}`}
        SelectPlaceholder={"Select a day of the week"}
        user={userAccount}
        setHasUpdated={setHasUpdated}
        COLLECTIONID={userAccount.attributes.scheduler.data.id}
        WithIcon={true}
      />

      {!ORDER.length ? (
        <Tooltip label="An Active Subscription Required">
          <IconAlertTriangle size={25} color="yellow" />
        </Tooltip>
      ) : (
        true
      )}
    </Group>
  );
};
