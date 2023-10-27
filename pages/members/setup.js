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
import { SetUpItemsRequired } from "../../components/setup/SetUpItemsRequired";
import Meta from "../../components/Layouts/Meta";

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
    <>
      <Meta
        title="Member Setup - Fixtura: Get Started Effectively"
        description="Start your journey with Fixtura by setting up your member account. Optimize your sports club's digital media from the get-go."
        keywords="Member setup, Fixtura account creation, sports media initiation, club content setup, digital onboarding"
      />
      <Space h={20} />
      <SetupStages DATA={UserAccount} setReview={setReview} />
    </>
  ) : (
    <>
      <Meta
        title="Member Setup - Fixtura: Get Started Effectively"
        description="Start your journey with Fixtura by setting up your member account. Optimize your sports club's digital media from the get-go."
        keywords="Member setup, Fixtura account creation, sports media initiation, club content setup, digital onboarding"
      />
      <SubHeaders Copy={`Let's set up your account!`} />
      <P Weight={600}>Items needed to complete the setup:</P>
      <SetUpItemsRequired />
      <CreateAccountInit setAccountsetup={ReRender} />{" "}
      {/* Assuming ReRender fetches and updates account state */}
    </>
  );

  if (review) return <ReviewSetupData DATA={UserAccount} />;

  return (
    <MembersWrapper>
      <Meta
        title="Member Setup - Fixtura: Get Started Effectively"
        description="Start your journey with Fixtura by setting up your member account. Optimize your sports club's digital media from the get-go."
        keywords="Member setup, Fixtura account creation, sports media initiation, club content setup, digital onboarding"
      />
      <PageTitle Copy={"Account Set up"} ICON={<IconSettings size={40} />} />
      {Content}
    </MembersWrapper>
  );
};
export default SETUP;
