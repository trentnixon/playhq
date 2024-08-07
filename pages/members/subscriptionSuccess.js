import { useEffect } from "react";
import { useRouter } from "next/router";
import { useConfirmOrder } from "../../Hooks/useOrder";
import {
  MembersWrapper,
  ShadowWrapper,
  Wrapper,
} from "../../components/Members/Common/Containers";
import { PageTitle, P } from "../../components/Members/Common/Type";
import { Box, Center, Container, Group } from "@mantine/core";
import { IconCheck } from "@tabler/icons";
import {
  BTN_TOEXTLINK,
  BTN_TOINTERALLINK,
} from "../../components/Members/Common/utils/Buttons";
import { useAccountDetails } from "../../context/userContext";
import Meta from "../../components/Layouts/Meta";

const StripeSuccess = () => {
  const router = useRouter();
  const { account, ReRender } = useAccountDetails();
  const { session_id, success } = router.query;
  const [order, confirmOrder] = useConfirmOrder();

  useEffect(() => {
    if (order === null && session_id !== undefined) {
      confirmOrder(session_id);
    }
  }, [session_id]);

  useEffect(() => {
    if (order !== null) {
      ReRender();
    }
  }, [order]);

  return (
    <MembersWrapper>
      <Meta
        title="Subscription Success - Fixtura: Welcome Aboard"
        description="Celebrate your successful subscription to Fixtura. Begin your journey in enhancing your sports club's digital media presence."
        keywords="Subscription success, Fixtura welcome, sports media journey, club content services, digital media access"
      />
      <PageTitle
        Copy={"Thankyou for your Subscription"}
        ICON={<IconCheck size={40} />}
      />

      <Container>
        <Wrapper>
          <Group position="apart">
            <Box>
              <P>Thank you for subscribing to Fixtura!</P>
              <P>
                Your subscription is now active, and you will begin receiving
                personalized digital assets according to your preferences. Thank
                you for choosing Fixtura, and we look forward to helping you
                enhance your club's social media presence.
              </P>
              <P>
                Thank you for choosing Fixtura, and we look forward to helping
                you enhance your club's social media presence.
              </P>
            </Box>
          </Group>
        </Wrapper>

        <ShadowWrapper>
          <Center>
            <BTN_TOEXTLINK
              LABEL="Go To Account"
              URL="/members/account/"
              THEME="cta"
              target="_self"
            />
          </Center>
        </ShadowWrapper>
      </Container>
    </MembersWrapper>
  );
};
export default StripeSuccess;
