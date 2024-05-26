import { Text, Group, useMantineTheme, Box, Center } from "@mantine/core";
import { IconCheck, IconAlertTriangle } from "@tabler/icons";
import { useUserStatus } from "./useUserStatus";
import { FixturaDivider } from "../../../../Members/Common/Divider";
import { useEffect } from "react";
import {
  BTN_ONCLICK,
  BTN_TOINTERALLINK,
} from "../../../../Members/Common/utils/Buttons";
import dayjs from "dayjs";

export const IsUserSubscriptionDetails = ({ user }) => {
  useEffect(() => {}, [user]);
  const {
    statusMessage,
    statusColor,
    StatusIcon,
    Title,
    daysLeft,
    includeSponsors,
  } = useUserStatus(user);

  return (
    <Box
      sx={(theme) => ({
        "@media (max-width: 768px)": {
          display: "none",
        },
      })}
    >
      <FixturaDivider />
      <IsSubscribed
        statusColor={statusColor}
        statusMessage={statusMessage}
        StatusIcon={StatusIcon}
      />
      <SelectedPlan Title={Title} statusColor={statusColor} />
      <DaysLeftInPass daysLeft={daysLeft} statusColor={statusColor} />
      <HasSponsorsEnabled
        includeSponsors={includeSponsors}
        statusColor={statusColor}
      />
    </Box>
  );
};

export const SeasonPassRequired = ({ user }) => {
  useEffect(() => {}, [user]);
  const { statusMessage, statusColor, StatusIcon } = useUserStatus(user);

  return (
    <Box
      sx={(theme) => ({
        "@media (max-width: 768px)": {
          display: "none",
        },
      })}
    >
      <FixturaDivider />
      <IsSubscribed
        statusColor={statusColor}
        statusMessage={statusMessage}
        StatusIcon={StatusIcon}
      />
      <Center mt={10}>
        <BTN_TOINTERALLINK LABEL="Account" URL="/members/account/" />
      </Center>
    </Box>
  );
};

export const AwaitingActivation = ({ user }) => {
  useEffect(() => {}, [user]);

  const { statusMessage, statusColor, StatusIcon, Title, startOrderAt } =
    useUserStatus(user);

  //console.log("useUserStatus(user) ", useUserStatus(user));
  return (
    <Box
      sx={(theme) => ({
        "@media (max-width: 768px)": {
          display: "none",
        },
      })}
    >
      <FixturaDivider />
      <IsSubscribed
        statusColor={statusColor}
        statusMessage={statusMessage}
        StatusIcon={StatusIcon}
      />
      <OrderStartDate startOrderAt={startOrderAt} statusColor={statusColor} />
      <SelectedPlan Title={Title} statusColor={statusColor} />
    </Box>
  );
};

const IsSubscribed = (props) => {
  const { statusColor, statusMessage, StatusIcon } = props;

  return (
    <Group position="apart">
      <Text ta="center" fz="sm" c="dimmed">
        Subscription
      </Text>
      <Group position="left" spacing="xs" align="center">
        <StatusIcon size={`1.1em`} color={statusColor} />
        <Text ta="center" fz="sm" c={statusColor} fw={500}>
          {statusMessage}
        </Text>
      </Group>
    </Group>
  );
};

const SelectedPlan = (props) => {
  const { Title, statusColor } = props;
  return (
    <Group position="apart">
      <Text ta="center" fz="sm" c="dimmed">
        Plan
      </Text>
      <Text ta="center" fz="sm" c={statusColor} fw={500}>
        {Title}
      </Text>
    </Group>
  );
};

const DaysLeftInPass = (props) => {
  const { daysLeft, statusColor } = props;
  return (
    <Group position="apart">
      <Text ta="center" fz="sm" c="dimmed">
        Days Left in Pass
      </Text>
      <Text ta="center" fz="sm" c={statusColor} fw={500}>
        {daysLeft}
      </Text>
    </Group>
  );
};

const HasSponsorsEnabled = (props) => {
  const { includeSponsors, statusColor } = props;
  const theme = useMantineTheme();
  return (
    <Group position="apart">
      <Text ta="center" fz="sm" c="dimmed">
        Sponsors enabled
      </Text>
      <Text ta="center" fz="sm" c={statusColor} fw={500}>
        {includeSponsors ? (
          <IconCheck size={`1.1em`} color={theme.colors.green[8]} />
        ) : (
          <IconAlertTriangle size={`1.1em`} color={theme.colors.red[8]} />
        )}
      </Text>
    </Group>
  );
};

const OrderStartDate = (props) => {
  const { statusColor, startOrderAt } = props;
  const formattedDate = dayjs(startOrderAt).format("MMMM DD, YYYY"); // Example format: "June 29, 2024"

  return (
    <Group position="apart">
      <Text ta="center" fz="sm" c="dimmed">
        Activation Date
      </Text>
      <Group position="left" spacing="xs" align="center">
        <Text ta="center" fz="sm" c={statusColor} fw={500}>
          {formattedDate}
        </Text>
      </Group>
    </Group>
  );
};
