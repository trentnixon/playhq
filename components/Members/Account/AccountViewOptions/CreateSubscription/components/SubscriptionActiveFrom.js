// SubscriptionActiveFrom.js
import {
  IconAccessible,
  IconCheck,
  IconClock,
  IconClockPause,
  IconX,
} from "@tabler/icons-react";
import { useMantineTheme, Group} from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { P } from "../../../../Common/Type";

const SubscriptionActiveFrom = ({ ORDER }) => {
  const theme = useMantineTheme();
  const mobile = useMediaQuery(`(max-width: ${theme.breakpoints.sm})`);
  let formattedDate = "Waiting Subscription";
  let statusMessage = "Unknown status";
  let statusColor = theme.colors.blue[4];
  let StatusIcon = IconCheck;

  // Handle various states
  if (ORDER?.strapi_created) {
    try {
      const date = new Date(ORDER.strapi_created * 1000);
      formattedDate = date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    } catch (err) {
      console.error("Error formatting date: ", err);
    }
  }

  // Define status properties based on subscription state
  if (ORDER?.isActive) {
    statusMessage = "Subscription is active";
    statusColor = theme.colors.green[5];
    StatusIcon = IconCheck;
  } else if (ORDER?.isPaused) {
    statusMessage = "Subscription is paused";
    statusColor = theme.colors.yellow[9];
    StatusIcon = IconClockPause;
  } else if (ORDER?.cancel_at_period_end) {
    const cancelDate = new Date(ORDER.cancel_at * 1000);
    statusMessage = `Subscription will be cancelled after ${cancelDate.toLocaleDateString(
      "en-US"
    )}`;
    statusColor = theme.colors.red[9];
    StatusIcon = IconClock;
  } else {
    statusMessage = "Subscription is cancelled";
    statusColor = theme.colors.red[9];
    StatusIcon = IconX;
  }

  return (
    <Group position={mobile ? "center" : "apart"}>
      <P size="sm" color="dark" style={{ fontWeight: 600 }}>
        <StatusIcon size="1.4em" color={statusColor} /> {statusMessage}
      </P>
      <P size="xs" color="gray">
        Active since: {formattedDate}
      </P>
    </Group>
  );
};

export default SubscriptionActiveFrom;

/* const SubscriptionActiveFrom = ({ ORDER }) => {
  const theme = useMantineTheme();
  const mobile = useMediaQuery(`(max-width: ${theme.breakpoints.sm})`);
  let formattedDate = "Waiting Subscription";
  let statusMessage = "Unknown status";
  let statusColor = theme.colors.blue[4]; // default color
  let PColor = 8;
  let StatusIcon = IconCheck; // default icon
  const isPaused = ORDER?.isPaused;
  const isCancelling =
    ORDER?.cancel_at_period_end && ORDER?.isActive && ORDER?.Status;
  const isActive =
    ORDER?.isActive && ORDER?.Status && !ORDER?.cancel_at_period_end;
  const isCancelled = !ORDER?.isActive || !ORDER?.Status;

  if (ORDER?.strapi_created) {
    try {
      const date = new Date(ORDER.strapi_created * 1000);
      formattedDate = date.toLocaleDateString("en-AU", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    } catch (err) {
      console.error("Error formatting date: ", err);
    }
  }

  if (isCancelling) {
    const cancelDate = new Date(ORDER.cancel_at * 1000);
    statusMessage = `Subscription will be cancelled after ${cancelDate.toLocaleDateString(
      "en-AU",
      {
        year: "numeric",
        month: "long",
        day: "numeric",
      }
    )}`;
    statusColor = theme.colors.red[9];
    PColor = 8;
    StatusIcon = IconClock;
  } else if (isPaused) {
    statusMessage = "Subscription is paused";
    statusColor = theme.colors.yellow[9];
    PColor = 8;
    StatusIcon = IconClockPause;
  } else if (isActive) {
    statusMessage = "Subscription is active";
    statusColor = theme.colors.green[5];
    PColor = 6;
    StatusIcon = IconCheck;
  } else if (isCancelled) {
    statusMessage = "Subscription is cancelled";
    statusColor = theme.colors.red[9];
    PColor = 8;
    StatusIcon = IconX;
  }

  return (
    <Group position={mobile ? "center" : "apart"}>
      <Group position="left" spacing="xs" align="center">
        <StatusIcon size={`1.4em`} color={statusColor} />
        <P
          size={`sm`}
          color={PColor}
          Weight={600}
          marginBottom={0}
          Copy={`${statusMessage}. `}
        />
      </Group>

      <Group position="left" spacing="xs" align="center">
        <P
          size={`xs`}
          color={4}
          marginBottom={0}
        >{`Active since: ${formattedDate}`}</P>
        <IconAccessible size={`1.4em`} color={theme.colors.blue[5]} />
      </Group>
    </Group>
  );
}; */
