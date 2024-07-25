import React, { useEffect, useState, useCallback } from "react";
import {
  Stepper,
  Group,
  Space,
  Container,
  Box,
  useMantineTheme,
} from "@mantine/core";
import { useAccountDetails } from "../../../../../../context/userContext";

import { BTN_ONCLICK } from "../../../../../Members/Common/utils/Buttons";
import { P } from "../../../../../Members/Common/Type";
import { LoadingStateWrapper } from "../../../../../Members/Account/HOC/LoadingStateWrapper";

import { useMediaQuery } from "@mantine/hooks";


import StepAboutLogo from "./Steps/AboutLogo";
import { StepAboutUser } from "./Steps/AboutUser";
import { StepAboutTheCricket } from "./Steps/AboutTheCricket";
import { StepAboutBranding } from "./Steps/AboutBranding";

export const SetupStages = ({ setReview }) => {
  const theme = useMantineTheme();
  const mobile = useMediaQuery(`(max-width: ${theme.breakpoints.sm})`);
  const { account, ReRender } = useAccountDetails();
  const [DATA, setDATA] = useState(account);
  const [disabled, setDisabled] = useState(true);
  const [progress, setProgress] = useState({
    step1: {},
    step2: {},
    step3: {},
    step4: {},
  });
  const [active, setActive] = useState(0);

  const updateData = useCallback(() => {
    if (account) setDATA(account);
  }, [account]);

  useEffect(updateData, [account]);

  const nextStep = useCallback(() => {
    setActive((current) => (current < 3 ? current + 1 : current));
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const prevStep = useCallback(() => {
    setActive((current) => (current > 0 ? current - 1 : current));
    // Scroll to the top of the page
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const finished = useCallback(() => {
    setReview(true);
    // Scroll to the top of the page
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const checkProgress = useCallback(() => {

    if (DATA) {
      setProgress({
        ...progress,

        step1: {
          ...progress.step1,
          account_type: DATA.attributes?.account_type?.data?.attributes,
          associations: DATA.attributes?.associations?.data[0]?.attributes,
          clubs:
            DATA.attributes?.account_type?.data?.attributes.Name ===
            "Association"
              ? false
              : DATA.attributes?.clubs?.data[0]?.attributes,
          isRightsHolder: DATA.attributes.isRightsHolder, // add checkbox state here
          isPermissionGiven: DATA.attributes.isPermissionGiven, // add checkbox state here
        },
        step2: {
          // attributes related to About your Brand step
        },

        step3: {
          // attributes related to About your Brand step
        },
        step4: {
          ...progress.step4,
          FirstName: DATA.attributes.FirstName,
          DeliveryAddress: DATA.attributes.DeliveryAddress,
        },
      });
    }
  }, [DATA]);

  useEffect(checkProgress, [DATA]);

  const checkDisabled = useCallback(() => {
    const KEYS = Object.keys(progress);
    const hasNullValue = Object.keys(progress[KEYS[active]]).some(
      (key) =>
        progress[KEYS[active]][key] === null ||
        progress[KEYS[active]][key] === undefined
    );
    setDisabled(hasNullValue);
  }, [progress, active]);

  useEffect(checkDisabled, [progress, active]);

  return (
    <LoadingStateWrapper conditions={[DATA]}>
      <Container size={"xl"} px={0}>
        <Stepper
          active={active}
          breakpoint="0"
          color={theme.colors.members[3]}
          size="sm"
          iconSize={32}
          orientation="horizontal"
          sx={(theme) => ({
            ".mantine-Stepper-steps": {
              background: "transparent",
              padding: "5px 0px",
              borderRadius: "10px 10px 0 0 ",
              borderBottom: `1px solid ${theme.colors.members[3]}`,
            },
          })}
        >
          <Stepper.Step label={mobile ? false : "About the Organisation"}>
            <StepAboutTheCricket user={DATA} setHasUpdated={ReRender} />
          </Stepper.Step>
          <Stepper.Step label={mobile ? false : "Upload your Logo"}>
            <StepAboutLogo user={DATA} setHasUpdated={ReRender} />
          </Stepper.Step>

          <Stepper.Step label={mobile ? false : "About your Brand"}>
            <StepAboutBranding user={DATA} setHasUpdated={ReRender} />
          </Stepper.Step>
          <Stepper.Step
            color="blue"
            label={mobile ? false : "All About the Assets"}
          >
            <StepAboutUser user={DATA} setHasUpdated={ReRender} />
          </Stepper.Step>
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

      {active === 3 ? (
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
            <BTN_ONCLICK
              LABEL={"Review"}
              HANDLE={finished}
              THEME="success"
              idDisabled={disabled}
            />
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
    </LoadingStateWrapper>
  );
};
