import { useAccountDetails } from "../../../../../../../lib/userContext";
import { checkDeliveryDate, daysUntil } from "../../../../../../../utils/helpers";
import { P } from "../../../../../../Members/Common/Type";

export const DisplayDaysTillDelivery = ({ renders, color = 2 }) => {
  const { account } = useAccountDetails();
  const days_of_the_week =
    account.attributes.scheduler.data.attributes.days_of_the_week.data
      .attributes.Name;
  return (
    <>
      {!checkDeliveryDate(renders) ? (
        <P
          color={color}
          marginBottom={0}
        >{`Next Order will be delivered in ${daysUntil(
          days_of_the_week
        )} days`}</P>
      ) : (
        <P color={2} marginBottom={0}>
          {checkDeliveryDate(renders)}
        </P>
      )}
    </>
  );
};
