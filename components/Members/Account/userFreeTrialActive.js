import { IconBrandStripe } from "@tabler/icons";
import { getTrialStatus } from "../../../lib/actions";
import { P, PageTitle } from "../Common/Type";
import { IconCircleCheck } from "@tabler/icons-react";
import { Group, Paper } from "@mantine/core";

export const FreeTrialActive = ({ account }) => {
  const endDate = new Date(
    getTrialStatus(account).trialInstancePath.data.attributes.endDate
  );
  const today = new Date();

  // Calculate the difference in milliseconds and then convert to days
  const diffInMilliseconds = endDate - today;
  const diffInDays = Math.ceil(diffInMilliseconds / (1000 * 60 * 60 * 24));

  return (
    <>
      <PageTitle
        Copy={"Your Trial is Active"}
        ICON={<IconCircleCheck size={40} />}
      />

      <P size={"xl"} Weight={600}>
        You have {diffInDays} days remaining. Enjoy all the features!
      </P>
      <P>
        Once your trial ends, subscribing will unlock all the amazing benefits
        and features we have to offer. We're excited for you to continue being a
        part of our community!
      </P>
    </>
  );
};
