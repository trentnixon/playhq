import React, { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/router";
import { useUser } from "../../lib/authContext";
import { useAccountDetails } from "../../lib/userContext";
import { P, PageTitle, SubHeaders } from "../../components/Members/Common/Type";
import { Space } from "@mantine/core";
import { CreateAccountInit } from "../../components/Members/SetupSteps/CreateAccountInit";
import { SetupStages } from "../../components/Members/SetupSteps/SetupStepper";
import { ReviewSetupData } from "../../components/Members/SetupSteps/ReviewSetupData";
import { MembersWrapper } from "../../components/Members/Common/Containers";
import { IconSettings } from "@tabler/icons-react";

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

  const setAccountSetup = useCallback((data) => {
    if (typeof data === "object") ReRender();
  }, [ReRender]);

  const Content = UserAccount ? (
    <>
      <Space h={20} />
      <SetupStages DATA={UserAccount} setReview={setReview} />
    </>
  ) : (
    <>
      <SubHeaders Copy={`Let's set up your account!`} />
      <P>The setup process should only take a few minutes.</P>
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
