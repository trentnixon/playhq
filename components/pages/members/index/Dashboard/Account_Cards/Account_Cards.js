import { IconUserCircle } from "@tabler/icons-react";
import { useAccountDetails } from "../../../../../../lib/userContext";
import { AccountCardGrid } from "./components/AccountCardGrid";
import { SubHeaders } from "../../../../../Members/Common/Type";

export const Cards_Account = ({ commonProps }) => {
  const { account } = useAccountDetails();

  return (
    <>
      <SubHeaders Copy="Account" ICON={<IconUserCircle size={30} />} />
      <AccountCardGrid account={account} commonProps={commonProps} />
    </>
  );
};
