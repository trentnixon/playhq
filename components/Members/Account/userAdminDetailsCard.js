import { createStyles, Card, Avatar, Text, Group } from "@mantine/core";
import { useState } from "react";

const useStyles = createStyles((theme) => ({
  card: {
    backgroundColor:
      theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white,
  },

  avatar: {
    border: `100% solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white
    }`,
  },
}));

import React, { useMemo } from "react";
import { P } from "../Common/Type";
import { FixturaDivider } from "../Common/Divider";

export function UserDetailsCard({ user }) {
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

  const { classes, theme } = useStyles();

  return (
    <Card withBorder padding="xl" radius="md" mt={60} className={classes.card}>
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
        className={classes.avatar}
      />
      <Text ta="center" fz="lg" fw={500} mt="sm">
        {AccountTypeDetails.Name}
      </Text>
      <Text ta="center" fz="sm" c="dimmed">
        {AccountType}
      </Text>

      <FixturaDivider />
      <Group position="apart">
        <Text ta="center" fz="md" fw={500}>
          Subscription
        </Text>
        <Text ta="center" fz="sm" c="dimmed">
          {` ${
            user.attributes.order?.data?.attributes.Status
              ? "Active"
              : "InActive"
          }`}
        </Text>
      </Group>

      <Group position="apart">
        <Text ta="center" fz="md" fw={500}>
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
    </Card>
  );
}
