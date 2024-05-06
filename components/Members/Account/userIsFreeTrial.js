import {
  Card,
  Group,
  useMantineTheme,
  Tooltip,
  Paper,
  Container,
} from "@mantine/core";
import { IconAlertTriangleFilled } from "@tabler/icons-react";
import { P } from "../Common/Type";
import { BTN_TOEXTLINK } from "../Common/utils/Buttons";

export const IsFreeTrial = ({ user }) => {
  const theme = useMantineTheme();

  if (user.attributes.trialStatus === true) {
    // Free trial is active
    return (
      <Tooltip label="Free trial is Active" position="top">
        <Card
          withBorder
          padding="sm"
          radius="md"
          mt={5}
          style={{ backgroundColor: theme.colors.yellow[5] }}
        >
          <Group position="center">
            <IconAlertTriangleFilled
              style={{ marginRight: theme.spacing.sm }}
            />
            <P marginBottom={0}>Trial Version</P>
          </Group>
        </Card>
      </Tooltip>
    );
  } else if (user.attributes.trialStatus === false) {
    // Free trial has completed
    return (
      <Tooltip
        label="Your trial has ended. Please subscribe to continue using all features."
        position="top"
      >
        <Card
          withBorder
          padding="sm"
          radius="md"
          mt={5}
          style={{ backgroundColor: theme.colors.red[5] }}
        >
          <Group position="center">
            <IconAlertTriangleFilled
              style={{ marginRight: theme.spacing.sm }}
            />
            <P marginBottom={0}>Trial Ended</P>
          </Group>
        </Card>
      </Tooltip>
    );
  } else if (user.attributes.trialStatus === null) {
    // Free trial is available but hasn't been activated
    return (
      <Tooltip
        label="You have a free trial available. Activate now to access all features for two weeks!"
        position="top"
      >
        <Card
          withBorder
          padding="sm"
          radius="md"
          mt={5}
          style={{ backgroundColor: theme.colors.green[5] }}
        >
          <Group position="center">
            <IconAlertTriangleFilled
              style={{ marginRight: theme.spacing.sm }}
            />
            <P marginBottom={0}>Activate Free Trial</P>
          </Group>
        </Card>
      </Tooltip>
    );
  }
};

export const IsFreeTrialFeedback = () => {
  const theme = useMantineTheme();
  return (
    <Container fluid={true} mt={40}>
      <Paper
        p="md"
        mt={5}
        shadow="xs"
        style={{ backgroundColor: theme.colors.gray[0] }}
      >
        <Group position="right">
          <P marginBottom={0}>
            We would greatly appreciate it if you could take a moment to message
            us on our Facebook channel with any issues or feedback you might
            have. We are committed to refining and enhancing our product, and
            your valuable insights play a pivotal role in ensuring we offer the
            best possible experience for your organization. Your feedback truly
            matters to us.
          </P>
        </Group>
      </Paper>
      <Group position="apart" mt={20}>
        <P marginBottom={0} Weight={900}>
          Do you have any suggestions or thoughts to share?
        </P>
        <BTN_TOEXTLINK
          LABEL="Contact Us"
          URL="https://www.facebook.com/profile.php?id=100095406210560"
        />
      </Group>
    </Container>
  );
};
