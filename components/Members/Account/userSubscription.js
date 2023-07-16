// hooks and context
import { useAccountDetails } from "../../../lib/userContext";
import { UserDetails } from "../UserDetails";
// packages
import { Container, Group, Paper } from "@mantine/core";
import { IconBrandStripe } from "@tabler/icons";
//components
import { P, PageTitle } from "../Common/Type";
import BTN_ManageSubscription from "../stripe/BTN_ManageAccount";
import BTN_ChangePlan from "../stripe/BTN_ChangePlan";
import { useState, useEffect } from "react";
import { SelectAPlan, UpdateYourPlan } from "../stripe/SelectAPlan";

export const UserSubscription = () => {
  const { account, ReRender } = useAccountDetails();
  const [userAccount, setUserAccount] = useState(account);
  const [changePlan, setChangePlan] = useState(false);
  const [ORDER, setOrder] = useState(userAccount?.attributes?.order?.data?.attributes);
  const [subscriptionTier, setSubscriptionTier] = useState(userAccount.attributes.subscription_tier?.data?.attributes);

  useEffect(() => {
    setUserAccount(account);
    setOrder(account?.attributes?.order?.data?.attributes);
    setSubscriptionTier(account.attributes.subscription_tier?.data?.attributes);
  }, [account]);

  return (
    <>
      <PageTitle Copy={"Subscription"} ICON={<IconBrandStripe size={40} />} />
      <Container size={"lg"}>
        <Group position="right" my={10}>
          <SubscriptionActiveFrom ORDER={ORDER} />
          <BTN_ManageSubscription Label="Manage Subscription" />
          <BTN_ChangePlan setChangePlan={setChangePlan} changePlan={changePlan} />
          <BTN_ManageSubscription Label="Cancel Subscription" theme="error" />
        </Group>

        <Paper
          withBorder
          p="lg"
          sx={(theme) => ({
            backgroundColor: theme.white,
          })}
        >
          {ORDER === undefined ? <SelectAPlan /> : false}
          {changePlan ? (
            <UpdateYourPlan user={userAccount} />
          ) : (
            <UserDetails user={userAccount} setHasUpdated={ReRender} />
          )}
        </Paper>
      </Container>
    </>
  );
};

const SubscriptionActiveFrom = ({ ORDER }) => {
  let formattedDate = "Waiting Subscription";
  if (ORDER?.strapi_created) {
    try {
      const date = new Date(ORDER.strapi_created * 1000);
      formattedDate = date.toLocaleDateString("en-AU", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    } catch (err) {
      console.error("Error formatting date: ", err);
    }
  }

  return <P size={`xs`} marginBottom={0} Copy={`Active : ${formattedDate}`} />;
};
