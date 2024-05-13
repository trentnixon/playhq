import { useAccountDetails } from "../../../../../../lib/userContext";
import { FixturaLoading } from "../../../../../Members/Common/Loading";
import { SELECT_DeliveryDay } from "./SelectDeliveryDay/SELECT_DeliveryDay";
import { SelectDayPaperWrapper } from "./SelectDeliveryDay/SelectDayPaperWrapper";

export const SelectDeliveryDayClean = () => {
  const { account } = useAccountDetails();

  if (account === null) {
    return <FixturaLoading />;
  }
  return <SELECT_DeliveryDay />;
};

export const SelectDeliveryDayWithWrapper = () => {
  const { account } = useAccountDetails();

  if (account === null) {
    return <FixturaLoading />;
  }
  return (
    <SelectDayPaperWrapper>
      <SELECT_DeliveryDay />
    </SelectDayPaperWrapper>
  );
};
