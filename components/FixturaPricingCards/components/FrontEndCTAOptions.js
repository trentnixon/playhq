import Link from "next/link";
import { trackButtonClick } from "../../../lib/GA";
import { Center, Group } from "@mantine/core";

export const PricingCTAOptions = (props) => {
  const { signUp, BTN } = props;
  return (
    <div className="pricing-footer ">
      <Center mt={20}>
        {signUp ? <FrontEndCTAOptions {...props} /> : BTN}
      </Center>
    </div>
  );
};

const FrontEndCTAOptions = (props) => {
  return (
    <Group position="apart">
      <BTNViewSubscriptionOptions {...props} />
      <BTNViewSignUp {...props} />
    </Group>
  );
};

const BTNViewSubscriptionOptions = (props) => {
  const { Name } = props;
  return (
    <Link
      href="/subscriptions/"
      className="btn btn-secondary"
      onClick={() => trackButtonClick(`Product Card - Learn More - ${Name}`)}
    >
      learn more
    </Link>
  );
};

const BTNViewSignUp = (props) => {
  const { Name } = props;
  return (
    <Link
      className="btn btn-primary"
      onClick={() => trackButtonClick(`Product Card - Sign up - ${Name}`)}
      href="/SignUp/"
    >
      Sign up
    </Link>
  );
};
