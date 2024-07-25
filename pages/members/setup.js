import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useUser } from "../../context/authContext";
import { useAccountDetails } from "../../context/userContext";
import { PageTitle } from "../../components/Members/Common/Type";
import { Space } from "@mantine/core";

import { SetupStages } from "../../components/pages/members/setup/phases/SetupSteps/SetupStepper";
import { ReviewSetupData } from "../../components/pages/members/setup/phases/SetupSteps/ReviewSetupData";
import { MembersWrapper } from "../../components/Members/Common/Containers";
import { IconSettings } from "@tabler/icons-react";
import Meta from "../../components/Layouts/Meta";
import { InitialSetupScreen } from "../../components/pages/members/setup/phases/init";

const SETUP = () => {
  const router = useRouter();
  const { user } = useUser();
  const { account, ReRender } = useAccountDetails();

  const [UserAccount, setUserAccount] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [review, setReview] = useState(false);

  // Check if user is authenticated
  useEffect(() => {
    if (!user) router.push("/login/");
  }, [router, user]);

  // Initialize ReRender and account data
  useEffect(() => {
    ReRender();
  }, []); // Empty dependency array means this effect runs once on mount

  // Update account details on account change
  useEffect(() => {
    setUserAccount(account);
    setIsLoading(false); // Set isLoading to false whether account exists or not
  }, [account]);

  if (isLoading) {
    return <div>Fetching your account...</div>;
  }

  const Content = UserAccount ? (
    <SetupStages DATA={UserAccount} setReview={setReview} />
  ) : (
    <InitialSetupScreen />
  );

  if (review) return <ReviewSetupData DATA={UserAccount} />;

  return (
    <MembersWrapper>
      <SetupMetaData />
      <PageTitle Copy={"Account Set up"} ICON={<IconSettings size={40} />} />
      <Space h={20} />
      {Content}
    </MembersWrapper>
  );
};
export default SETUP;

const SetupMetaData = () => {
  return (
    <>
      <Meta
        title="Member Setup - Fixtura: Get Started Effectively"
        description="Start your journey with Fixtura by setting up your member account. Optimize your sports club's digital media from the get-go."
        keywords="Member setup, Fixtura account creation, sports media initiation, club content setup, digital onboarding"
      />
    </>
  );
};
