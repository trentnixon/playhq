import { Card, Avatar, Text, Group, useMantineTheme } from "@mantine/core";
import { useState, useMemo } from "react";
import { FixturaDivider } from "../Common/Divider";
import { IconCheck, IconAlertTriangle, IconX, IconClock } from "@tabler/icons";

export function UserDetailsCard({ user }) {
  const ORDER = user.attributes.order?.data;
  const UserTheme = useMemo(
    () => user.attributes.theme.data.attributes.Theme,
    [user]
  );
  const AccountType = useMemo(
    () => user.attributes.account_type.data.attributes.Name,
    [user]
  );
  const AccountTypeDetails = useMemo(() => {
    if (AccountType === "Club") {
      return user.attributes?.clubs?.data[0]?.attributes;
    }
    return user.attributes.associations.data[0].attributes;
  }, [AccountType, user]);

  const [subscriptionTier, setSubscriptionTier] = useState(
    user.attributes.subscription_tier?.data?.attributes
  );

  const theme = useMantineTheme();

  const { isActive, Status, cancel_at_period_end, cancel_at } =
    ORDER.attributes;

  let statusMessage = "Unknown status";
  let statusColor = theme.colors.blue[4]; // default color
  let StatusIcon = IconCheck; // default icon

  if (isActive) {
    if (Status) {
      if (cancel_at_period_end) {
        //const cancelDate = new Date(cancel_at * 1000);
        statusMessage = `Cancelling`;
        statusColor = theme.colors.red[8];
        StatusIcon = IconClock;
      } else {
        statusMessage = "Active";
        statusColor = theme.colors.green[6];
        StatusIcon = IconCheck;
      }
    } else {
      statusMessage = "Not Active on Stripe";
      statusColor = theme.colors.red[8];
      StatusIcon = IconAlertTriangle;
    }
  } else {
    statusMessage = "Not Active";
    statusColor = theme.colors.red[8];
    StatusIcon = IconX;
  }

  return (
    <Card withBorder padding="xl" radius="md" mt={60}>
      <Card.Section
        sx={{
          background: theme.fn.linearGradient(
            45,
            UserTheme.primary,
            UserTheme.secondary
          ),
          height: 70,
        }}
      />

      <Avatar
        src={AccountTypeDetails?.Logo?.data?.attributes?.url}
        size={100}
        radius={100}
        mx="auto"
        mt={-30}
      />
      <Text ta="center" fz="lg" fw={500} mt="sm">
        {AccountTypeDetails.Name}
      </Text>
      <Text ta="center" fz="sm" c="dimmed">
        {AccountType}
      </Text>

      <FixturaDivider />

      <Group position="apart">
        <Text ta="center" fz="sm" c={statusColor} fw={500}>
          {` ${
            subscriptionTier?.Name === undefined
              ? "Awaiting Selection"
              : subscriptionTier?.Name
          }`}
        </Text>
        <Text ta="center" fz="sm" c="dimmed">
          Plan
        </Text>
      </Group>

      <Group position="apart">
        <Group position="left" spacing="xs" align="center">
          <StatusIcon size={`1.1em`} color={statusColor} />
          <Text ta="center" fz="sm" c={statusColor} fw={500}>
            {statusMessage}
          </Text>
        </Group>
        <Text ta="center" fz="sm" c="dimmed">
          Subscription
        </Text>
      </Group>
    </Card>
  );
};
