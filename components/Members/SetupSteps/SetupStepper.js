import React, { useEffect, useState, useCallback } from "react";
import {
  Stepper,
  Group,
  Space,
  Container,
  Box,
  useMantineTheme,
} from "@mantine/core";
import { useAccountDetails } from "../../../lib/userContext";
import { StepAboutUser } from "./Steps/AboutUser";
import { StepAboutTheCricket } from "./Steps/AboutTheCricket";
import { BTN_ONCLICK } from "../Common/utils/Buttons";
import { P } from "../Common/Type";
import { LoadingStateWrapper } from "../Account/HOC/LoadingStateWrapper";

export const SetupStages = ({ setReview }) => {
  const theme = useMantineTheme();
  const { account, ReRender } = useAccountDetails();
  const [DATA, setDATA] = useState(account);
  const [disabled, setDisabled] = useState(true);
  const [progress, setProgress] = useState({
    step1: {},
    step2: {},
  });
  const [active, setActive] = useState(0);

  const updateData = useCallback(() => {
    if (account) setDATA(account);
  }, [account]);

  useEffect(updateData, [account]);

  const nextStep = useCallback(() =>
    setActive((current) => (current < 3 ? current + 1 : current))
  , []);

  const prevStep = useCallback(() =>
    setActive((current) => (current > 0 ? current - 1 : current))
  , []);

  const finished = useCallback(() => setReview(true), []);

  const checkProgress = useCallback(() => {
    if (DATA) {
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
      <Container size={"md"}>
        <Stepper
          active={active}
          breakpoint="sm"
          color={theme.colors.members[3]}
          sx={(theme) => ({
            ".mantine-Stepper-steps": {
              background: 'transparent',
              padding: "10px 20px",
              borderRadius: "10px 10px 0 0 ",
              borderBottom: `1px solid ${theme.colors.members[3]}`,
            },
          })}
        >
           <Stepper.Step color="blue" label="All About the Assets">
            <StepAboutUser user={DATA} setHasUpdated={ReRender} />
          </Stepper.Step>
          <Stepper.Step label="About the Cricket">
            <StepAboutTheCricket user={DATA} setHasUpdated={ReRender} />
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

      {active === 1 ? (
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
