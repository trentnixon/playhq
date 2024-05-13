import { Avatar, Text } from "@mantine/core";
import { useMemo } from "react";
import { CTAIconBundle } from "./IconBundle";

export const UserDetailsDisplay = ({ user }) => {
  const AccountTypeDetails = useMemo(() => {
    const type = user.attributes?.account_type?.data?.attributes.Name;
    return type === "Club"
      ? user.attributes?.clubs?.data[0]?.attributes
      : user.attributes?.associations.data[0]?.attributes;
  }, [user]);
  const AccountType = useMemo(
    () => user.attributes?.account_type?.data?.attributes.Name,
    [user]
  );
  return (
    <>
      <Avatar
        src={AccountTypeDetails?.Logo?.data?.attributes?.url}
        size={100}
        radius={100}
        mx="auto"
        mt={-30}
      />
      <CTAIconBundle />
      <Text ta="center" fz="lg" fw={500} mt={0}>
        {AccountTypeDetails?.Name}
      </Text>
      <Text ta="center" fz="sm" c="dimmed">
        {AccountType}
      </Text>
    </>
  );
};
