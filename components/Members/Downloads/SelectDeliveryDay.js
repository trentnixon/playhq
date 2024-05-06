import { Box, Group, Paper, Tooltip } from "@mantine/core";
import { Wrapper } from "../Common/Containers";
import { SelectFixturaSetting } from "../Common/formelements/Select_FixturaSettings";
import { IconAlertTriangle } from "@tabler/icons";
import { useAccountDetails } from "../../../lib/userContext";
import { useEffect, useState } from "react";
import { FixturaLoading } from "../Common/Loading";

export const SelectDeliveryDay = () => {
  const { account, ReRender } = useAccountDetails();
  const [userAccount, setUserAccount] = useState(account);
  const [ORDER, setOrder] = useState(
    userAccount?.attributes?.orders?.data?.attributes
  );

  const setHasUpdated = () => {
    //console.log("A DAY HAD CHANGED")
    ReRender();
  };
  useEffect(() => {
    //console.log("Account data changed: ", account.attributes.scheduler.data.attributes.days_of_the_week.data.attributes.Name);
  }, [userAccount,account]);

  if (userAccount === null) {
    return <FixturaLoading />;
  }
  return (
    <>
      <Group position="apart">
        <Paper
          shadow="lg"
          p="md"
         
          withBorder
          radius="md"
          sx={(theme) => ({
            backgroundColor: theme.colors.gray[8],
          })}
        >
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

            {!ORDER?.Status ? (
              <Tooltip label="An Active Subscription Required">
                <IconAlertTriangle size={25} color="yellow" />
              </Tooltip>
            ) : (
              true
            )}
          </Group>
        </Paper>
      </Group>
    </>
  );
};
