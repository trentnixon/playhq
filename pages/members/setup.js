import React, { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/router";
import { useUser } from "../../lib/authContext";
import { useAccountDetails } from "../../lib/userContext";
import { P, PageTitle, SubHeaders } from "../../components/Members/Common/Type";
import { Space, List, Paper } from "@mantine/core";
import { CreateAccountInit } from "../../components/Members/SetupSteps/CreateAccountInit";
import { SetupStages } from "../../components/Members/SetupSteps/SetupStepper";
import { ReviewSetupData } from "../../components/Members/SetupSteps/ReviewSetupData";
import { MembersWrapper } from "../../components/Members/Common/Containers";

import {
  IconMail,
  IconUser,
  IconBuilding,
  IconOrganization,
  IconSportSoccer,
  IconBrand,
  IconPalette,
  IconSettings,
  IconBrandStripe,
  IconShield,
  IconUsers,
} from "@tabler/icons-react";
const SETUP = () => {
  const router = useRouter();
  const { user } = useUser();
  const { account, ReRender } = useAccountDetails();

  const [UserAccount, setUserAccount] = useState(account);
  const [review, setReview] = useState(false);

  // Check if user is authenticated
  const checkUser = useCallback(() => {
    if (!user) router.push("/SignIn/");
  }, [router, user]);

  useEffect(checkUser, []);

  // Update account details on account change
  const updateAccount = useCallback(() => {
    if (account) setUserAccount(account);
  }, [account]);

  useEffect(updateAccount, [account]);

  const setAccountSetup = useCallback(
    (data) => {
      if (typeof data === "object") ReRender();
    },
    [ReRender]
  );

  const Content = UserAccount ? (
    <>
      <Space h={20} />
      <SetupStages DATA={UserAccount} setReview={setReview} />
    </>
  ) : (
    <>
      <SubHeaders Copy={`Let's set up your account!`} />

      <P Weight={600}>Items needed to complete the setup:</P>
      <SetUpItemsRequired />

      <CreateAccountInit setAccountsetup={setAccountSetup} />
    </>
  );

  if (review) return <ReviewSetupData DATA={UserAccount} />;

  return (
    <MembersWrapper>
      <PageTitle Copy={"Account Set up"} ICON={<IconSettings size={40} />} />
      {Content}
    </MembersWrapper>
  );
};

export default SETUP;

const SetUpItemsRequired = () => {
  return (
    <Paper shadow="sm" p="md" withBorder>
      <List spacing="xs" size="sm" center>
        <List.Item
          icon={<IconMail stroke={1.5} size="2rem" color={"#6699CC"} />}
        >
          <P Weight={600} marginBottom={0} color={4}>
            Email Delivery
          </P>
          <P>Email of the person to receive the asset email each week.</P>
        </List.Item>
        <List.Item
          icon={<IconUser stroke={1.5} size="2rem" color={"#6699CC"} />}
        >
          <P Weight={600} marginBottom={0} color={4}>
            Recipient's Name
          </P>
          <P>Name of the person the email should be addressed to.</P>
        </List.Item>
        <List.Item
          icon={<IconBuilding stroke={1.5} size="2rem" color={"#6699CC"} />}
        >
          <P Weight={600} marginBottom={0} color={4}>
            Organization Type
          </P>
          <P>Select the type of organization you represent.</P>
        </List.Item>
        <List.Item
          icon={<IconUsers stroke={1.5} size="2rem" color={"#6699CC"} />}
        >
          <P Weight={600} marginBottom={0} color={4}>
            Association
          </P>
          <P>Choose the appropriate association, if multiple are applicable.</P>
        </List.Item>
        <List.Item
          icon={<IconShield stroke={1.5} size="2rem" color={"#6699CC"} />}
        >
          <P Weight={600} marginBottom={0} color={4}>
            Club Name
          </P>
          <P>Provide the club name if applicable to your organization.</P>
        </List.Item>
        <List.Item
          icon={<IconBrandStripe stroke={1.5} size="2rem" color={"#6699CC"} />}
        >
          <P Weight={600} marginBottom={0} color={4}>
            Organization Logo
          </P>
          <P>Upload the logo that represents your organization.</P>
        </List.Item>
        <List.Item
          icon={<IconPalette stroke={1.5} size="2rem" color={"#6699CC"} />}
        >
          <P Weight={600} marginBottom={0} color={4}>
            Brand Colors
          </P>
          <P>
            Select the color scheme that aligns with your organization's
            branding.
          </P>
        </List.Item>
      </List>
    </Paper>
  );
};
