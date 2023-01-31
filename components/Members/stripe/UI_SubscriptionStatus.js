import { ColorSwatch, useMantineTheme, Tooltip } from "@mantine/core";
import { useState, useEffect } from "react";
import { FixturaLoading } from "../../../components/Members/Common/Loading";
import { P } from "../../../components/Members/Common/Type";
import { useAccountDetails } from "../../../lib/userContext";

export const UI_SubscriptionStatus_TEXT = () => {
  const { account } = useAccountDetails();
  const [userAccount, setUserAccount] = useState(account);

  useEffect(() => {
    if (account !== null) {
      setUserAccount(account);
    }
  }, [account]);

  if (userAccount === null) {
    return <FixturaLoading />;
  }
  return (
    <>
      <P
        textTransform="uppercase"
        color={userAccount.attributes.order?.data?.attributes.Status ? 6 : 8}
        Copy={`Subscription : ${
          userAccount.attributes.order?.data?.attributes.Status
            ? "Active"
            : "InActive"
        }`}
      />
    </>
  );
};

export const UI_SubscriptionStatus_Light = () => {
  const { account } = useAccountDetails();
  const [userAccount, setUserAccount] = useState(account);

  const theme = useMantineTheme();

  useEffect(() => {
    if (account !== null) {
      setUserAccount(account);
    }
  }, [account]);

  if (userAccount === null) {
    return <FixturaLoading />;
  }

  const CreateSwatch = (COLOR, STATUS) => {
    return (
      <Tooltip label={`Subscription Status : ${STATUS}`}>
        <ColorSwatch size={15} color={COLOR} />
      </Tooltip>
    );
  };

  return (
    <>
      {userAccount.attributes.order?.data?.attributes.Status
        ? CreateSwatch(theme.colors.members[6], "Active")
        : CreateSwatch(theme.colors.members[8], "InActive")}
    </>
  );
};
export default UI_SubscriptionStatus_TEXT