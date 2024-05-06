import { FixturaDivider } from "../../../Common/Divider";
import { H } from "../../../Common/Type";
import { Invoicing } from "../../../stripe/Invoicing";
import { Space } from "@mantine/core";
export const UserSubscriptionActive = () => {
  return (
    <>
      <FixturaDivider />
      <H>Account Active</H>
      <Invoicing />
      <Space h="lg" />
    </>
  );
};
