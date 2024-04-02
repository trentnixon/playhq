import { Group, useMantineTheme, Paper, Container } from "@mantine/core";
import { IconAlertTriangleFilled } from "@tabler/icons-react";

import { P } from "../../../Common/Type";
import { getTrialNotificationStatus } from "../../../../../lib/actions";

export const IsFreeTrialWelcome = ({ user }) => {
  const theme = useMantineTheme();
  const trialNotificationStatus = getTrialNotificationStatus(user);

  if (trialNotificationStatus === "subscribed") {
    return null; // If the user has an active subscription, no need to show the welcome message.
  }

  const welcomeConfig = {
    active_trial: {
      headerText: "Free Trial Active!",
      message:
        "The trial gives full access and lasts for 14 days. After which, you'll need to SUBSCRIBE to continue receiving weekly digital assets to your inbox.",
      bgColor: theme.colors.green[0],
      iconColor: theme.colors.green[5],
      textColor:1,
    },
    ended_trial: {
      headerText: "Trial Ended!",
      message:
        "Your trial has ended. Go to your account page to subscribe and continue receiving weekly assets to your inbox.",
      bgColor: theme.colors.red[0],
      iconColor: theme.colors.red[5],
      textColor: 8,
    },
    available_trial: {
      headerText: "Free Trial Available!",
      message:
        "You have a free trial available! To activate, visit your account page and click the activate button.",
      bgColor: theme.colors.blue[0],
      iconColor: theme.colors.blue[5],
      textColor: 4,
    },
  };

  const config = welcomeConfig[trialNotificationStatus];

 if(!config)
 return false 
 return (
    <Container fluid={true}>
      <Group position="right">
        
        <IconAlertTriangleFilled  style={{ color:config?.iconColor }}/>
        <P Weight={400} marginBottom={0} color={'5'}>
          {config?.headerText}
        </P>
      </Group>
    </Container>
  );
};

/* <Paper
        p="md"
        mb={10}
        shadow="xs"
        style={{ backgroundColor: config.bgColor }}
      >
        <Group position="apart" noWrap={true}>
          <IconAlertTriangleFilled style={{ color:config.iconColor }} />
          <P marginBottom={0}>{config.message}</P>
        </Group>
      </Paper> */