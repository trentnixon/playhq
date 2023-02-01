// Core
import React from "react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
// UTILS
import { useUser } from "../../lib/authContext";
import { P, SubHeaders } from "../../components/Members/Common/Type";

import { useAccountDetails } from "../../lib/userContext";
// PACK

import { Space, Container } from "@mantine/core";

// Components
import { CreateAccountInit } from "../../components/Members/SetupSteps/CreateAccountInit";

import { SetupStages } from "../../components/Members/SetupSteps/SetupStepper";
import { ReviewSetupData } from "../../components/Members/SetupSteps/ReviewSetupData";
const SETUP = () => {
  /* is User Auth */
  const { account, ReRender } = useAccountDetails();
  const [UserAccount, setAccount] = useState(account);

  const [Accountsetup, setAccountsetup] = useState();

  const [review, setReview] = useState(false);
  const { user, loading } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (account !== null) {
      setAccount(account);
    }
  }, [account]);

  useEffect(() => {
    if (!user) router.push("/SignIn/");
  }, []);

  useEffect(() => {
    if (typeof Accountsetup === "object") {
      ReRender();
    }
  }, [Accountsetup]);
 
  if (review) {
    return <ReviewSetupData DATA={UserAccount} />;
  } 
  return (
    <Container size={`lg`} pt={100} pb={70}>
      <SubHeaders Copy={`Lets setup your account!`} />
      {UserAccount ? (
        <Container size={"lg"}>
          <P Copy={`it's time to set up your account preferences.`} />
          <P
            Copy={`With just a few clicks, you can customize your look and feel, select the assets you want to receive, and set your delivery schedule and frequency. We'll handle the rest.`}
          />
          <Space h={20} />
          <SetupStages DATA={UserAccount} setReview={setReview} />
        </Container>
      ) : (
        <Container size={"lg"}>
          <P Copy={`Welcome to the Fixtura account setup process!`} />
          <P
            Copy={`We are excited to help you enhance your 
                  club's social media presence with our personalized digital assets.`}
          />
          <P
            Copy={`The setup process should only take a few minutes, and will require you to select your club's 
                   logo, brand colors, and any sponsors you may have.`}
          />
          <P
            Copy={`To begin, simply click 'Next' and follow the prompts. We'll guide you through the process of customizing your 
                   look and feel, selecting the assets you want to receive, and setting your delivery schedule 
                   and frequency.`}
          />
          <CreateAccountInit setAccountsetup={setAccountsetup} />
        </Container>
      )}
    </Container>
  );
};
export default SETUP;
