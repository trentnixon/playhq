import React from "react";

import { useEffect, useState } from "react";
// UTILS
import { useAccountDetails } from "../../../lib/userContext";

// PACK

import {
  Stepper,
  Group,
  Space,
  Container,
  Box,
  useMantineTheme,
} from "@mantine/core";

// Steps
import { StepAboutUser } from "./Steps/AboutUser";
import { StepAboutTheCricket } from "./Steps/AboutTheCricket";
import { StepAboutBranding } from "./Steps/AboutBranding";
import { StepAboutAISettings } from "./Steps/AboutAIsettings";
import { StepAboutAssets } from "./Steps/AboutAssets";
import { FixturaLoading } from "../Common/Loading";
import { BTN_ONCLICK } from "../Common/utils/Buttons";
import { P } from "../Common/Type";

export const SetupStages = ({ setReview }) => {
  const [active, setActive] = useState(0);
  const theme = useMantineTheme();
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
      <Container size={"md"}>
        <Stepper
          active={active}
          breakpoint="sm"
          color={theme.colors.members[3]}
          sx={(theme) => ({
            ".mantine-Stepper-steps": {
              backgroundColor: theme.colors.members[1],
              padding: "10px 20px",
              borderRadius: "10px 10px 0 0 ",
              borderBottom: `1px solid ${theme.colors.members[3]}`,
            },
          })}
        >
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
            <P
              textAlign={`center`}
              textTransform={`uppercase`}
              Weight={600}
              Copy={`Setup Complete, Review your data to complete the process`}
            />
          </Stepper.Completed>
        </Stepper>
      </Container>
      <Space h={10} />
      {active === 5 ? (
        <Box
          sx={(theme) => ({
            padding: theme.spacing.md,
            border: `1px solid ${theme.colors.members[1]}`,
            backgroundColor: theme.colors.members[1],
            borderRadius: "5px",
            textAlign: "right",
          })}
        >
          <Group position="right">
            <BTN_ONCLICK LABEL={"Review"} HANDLE={finished} THEME="success" />
          </Group>
        </Box>
      ) : (
        <Group
          position="right"
          mt="xl"
          sx={(theme) => ({
            padding: theme.spacing.md,
            border: `1px solid ${theme.colors.members[1]}`,
            backgroundColor: theme.colors.members[1],
            borderRadius: "5px",
            textAlign: "right",
          })}
        >
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
};
