import React from "react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { Stepper, Group, Space, Paper, SimpleGrid } from "@mantine/core";

import { useUser } from "../../lib/authContext";
import { CreateAccountInit } from "../../components/setup/CreateAccountInit";
import { P } from "../../components/Members/Common/Type";

// Steps
import { StepAboutUser } from "../../components/Members/SetupSteps/AboutUser";
import { StepAboutTheCricket } from "../../components/Members/SetupSteps/AboutTheCricket";
import { StepAboutBranding } from "../../components/Members/SetupSteps/AboutBranding";
import { StepAboutAISettings } from "../../components/Members/SetupSteps/AboutAIsettings";
import { StepAboutAssets } from "../../components/Members/SetupSteps/AboutAssets";
import { FixturaLoading } from "../../components/Members/Common/Loading";
import { BTN_ONCLICK } from "../../components/Members/Common/utils/Buttons";
import { fetcher } from "../../lib/api";
import { useAccountDetails } from "../../lib/userContext";

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
    return <ReviewData DATA={UserAccount} />;
  }
  return (
    <>
      <div className="bg-fcfbfb pt-100 pb-70">
        <div className="container">
          <div className="row justify-content-center">
            <h1>Lets setup your account!</h1>

            {UserAccount ? (
              <>
                <P Copy={`it's time to set up your account preferences.`} />
                <P
                  Copy={`With just a few clicks, you can customize your look and feel, select the assets you want to receive, and set your delivery schedule and frequency. We'll handle the rest.`}
                />
                <Space h={20} />
                <SetupStages DATA={UserAccount} setReview={setReview} />
              </>
            ) : (
              <>
                <P
                  Copy={`Welcome to the Fixtura account setup process! We are excited to help you enhance your 
                  club's social media presence with our personalized digital assets.
                   `}
                />
                <P
                  Copy={`The setup process should only take a few minutes, and will require you to select your club's 
                   logo, brand colors, and any sponsors you may have. To begin, simply click 
                   'Next' and follow the prompts. We'll guide you through the process of customizing your 
                   look and feel, selecting the assets you want to receive, and setting your delivery schedule 
                   and frequency.`}
                />
                <CreateAccountInit setAccountsetup={setAccountsetup} />
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default SETUP;

function SetupStages({ setReview }) {
  const [active, setActive] = useState(0);

  const { account, ReRender } = useAccountDetails();
  const [DATA, setDATA] = useState(account);

  const [disabled, setDisabled] = useState(true);
  const [progress, setProgress] = useState({
    step1: {},
    step2: {},
    step3: {},
    step4: {},
    step5: {},
    step6: {},
  });

  const finished = () => {
    setReview(true);
  };

  const nextStep = () =>
    setActive((current) => (current < 6 ? current + 1 : current));
  const prevStep = () =>
    setActive((current) => (current > 0 ? current - 1 : current));

  useEffect(() => {
    if (account !== null) {
      setDATA(account);
    }
  }, [account]);

  useEffect(() => {
    if (DATA !== null) {
      console.log(DATA);
      setProgress({
        ...progress,
        step1: {
          ...progress.step1,
          FirstName: DATA.attributes.FirstName,
          DeliveryAddress: DATA.attributes.DeliveryAddress,
        },
        step2: {
          ...progress.step2,
          account_type: DATA.attributes?.account_type?.data?.attributes,
          associations: DATA.attributes?.associations?.data[0]?.attributes,
          clubs:
            DATA.attributes?.account_type?.data?.attributes.Name ===
            "Association"
              ? false
              : DATA.attributes?.clubs?.data[0]?.attributes,
        },
        step3: {
          ...progress.step3,
          template: DATA.attributes?.template?.data?.attributes,
          theme: DATA.attributes?.theme?.data?.attributes,
          audio_option: DATA.attributes?.audio_option?.data?.attributes,
        },
        step4: {
          ...progress.step4,
          days_of_the_week:
            DATA.attributes?.scheduler?.data?.attributes?.days_of_the_week?.data
              ?.attributes?.Name,
          ai_publication: DATA.attributes?.ai_publication?.data?.attributes,
          ai_writting_style:
            DATA.attributes?.ai_writting_style?.data?.attributes,
          ai_writting_tone: DATA.attributes?.ai_writting_tone?.data?.attributes,
        },
        step5: {
          ...progress.step5,
          assets: DATA.attributes.assets.data[0]?.attributes?.Name,
        },
      });
    }
  }, [DATA]);

  useEffect(() => {
    console.log(progress, active);
    const KEYS = Object.keys(progress);
    const hasNullValue = Object.keys(progress[KEYS[active]]).some(
      (key) =>
        progress[KEYS[active]][key] === null ||
        progress[KEYS[active]][key] === undefined
    );
    console.log(progress[KEYS[active]], active, hasNullValue);
    setDisabled(hasNullValue);
  }, [progress, active]);

  if (DATA === null) {
    return <FixturaLoading />;
  }

  return (
    <>
      <Stepper active={active} breakpoint="sm" color="blue">
        <Stepper.Step label="" description="About the Owner">
          <StepAboutUser user={DATA} setHasUpdated={ReRender} />
        </Stepper.Step>
        <Stepper.Step label="" description="About the Cricket">
          <StepAboutTheCricket user={DATA} setHasUpdated={ReRender} />
        </Stepper.Step>
        <Stepper.Step label="" description="Branding">
          <StepAboutBranding user={DATA} setHasUpdated={ReRender} />
        </Stepper.Step>
        <Stepper.Step label="" description="Personal Assistant">
          <StepAboutAISettings user={DATA} setHasUpdated={ReRender} />
        </Stepper.Step>
        <Stepper.Step label="" description="Assets">
          <StepAboutAssets user={DATA} setHasUpdated={ReRender} />
        </Stepper.Step>
        {/* <Stepper.Step label="" description="Subscription">
          6. up to stripe!
        </Stepper.Step> */}

        <Stepper.Completed>
          <p>Setup Complete, Review your data to complete the process</p>
        </Stepper.Completed>
      </Stepper>

      <Space h={30} />
      {active === 5 ? (
        <Group position="center" mt="xl">
          <BTN_ONCLICK LABEL={"Review"} HANDLE={finished} THEME="success" />
        </Group>
      ) : (
        <Group position="center" mt="xl">
          <BTN_ONCLICK LABEL={"Back"} HANDLE={prevStep} THEME="error" />
          <BTN_ONCLICK
            LABEL={"Next step"}
            HANDLE={nextStep}
            THEME="success"
            idDisabled={disabled}
          />
        </Group>
      )}
    </>
  );
}

//<ReviewData  user={DATA} />
const ReviewData = ({ DATA }) => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const CompleteRegistration = async () => {
    console.log("CompleteRegistration", DATA.id);

    try {
      setLoading(true);
      const response = await fetcher(
        `${process.env.NEXT_PUBLIC_STRAPI_URL}/accounts/${DATA.id}`,
        {
          method: "PUT",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${Cookies.get("jwt")}`,
          },
          body: JSON.stringify({
            data: {
              isSetup: true,
            },
          }),
        }
      );

      if (response) {
        setLoading(false);
        router.push("/members/settings/");
      }
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };
  if (loading) {
    return <FixturaLoading />;
  }
  return (
    <>
      <div className="bg-fcfbfb pt-100 pb-70">
        <div className="container">
          <div className="row justify-content-center">
            <h1>Setup Review</h1>

            <SimpleGrid cols={2}>
              <ReviewContainer
                Title="User"
                OBJ={[
                  { key: "Name", value: DATA.attributes.FirstName },
                  { key: "Email", value: DATA.attributes.DeliveryAddress },
                ]}
              />

              <ReviewContainer
                Title="Cricket"
                OBJ={[
                  {
                    key: "Account Type",
                    value: DATA.attributes.account_type.data.attributes.Name,
                  },
                  {
                    key: "Association",
                    value: DATA.attributes.associations.data[0].attributes.Name,
                  },
                  {
                    key: "Club",
                    value: DATA.attributes.clubs.data[0].attributes.Name,
                  },
                ]}
              />

              <ReviewContainer
                Title="Design"
                OBJ={[
                  {
                    key: "Template",
                    value: DATA.attributes.template.data.attributes.Name,
                  },
                  {
                    key: "Theme",
                    value: DATA.attributes.theme.data.attributes.Name,
                  },
                  {
                    key: "Audio",
                    value: DATA.attributes.audio_option.data.attributes.Name,
                  },
                ]}
              />

              <ReviewContainer
                Title="AI"
                OBJ={[
                  {
                    key: "Publication",
                    value: DATA.attributes.ai_publication.data.attributes.Name,
                  },
                  {
                    key: "Style",
                    value:
                      DATA.attributes.ai_writting_style.data.attributes.Name,
                  },
                  {
                    key: "Tone",
                    value:
                      DATA.attributes.ai_writting_tone.data.attributes.Name,
                  },
                ]}
              />
            </SimpleGrid>
            <Space h={30} />
            <BTN_ONCLICK LABEL="Complete Setup" HANDLE={CompleteRegistration} />
          </div>
        </div>
      </div>
    </>
  );
};

const ReviewContainer = ({ OBJ, Title }) => {
  return (
    <Paper shadow="sm" p="md" withBorder>
      <h2>{Title}</h2>
      {OBJ.map((item, i) => {
        return (
          <Group position="apart" key={i}>
            <h5>{item.key}</h5>
            <h5>{item.value}</h5>
          </Group>
        );
      })}
    </Paper>
  );
};
