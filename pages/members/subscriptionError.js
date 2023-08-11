import { useEffect } from "react";
import { useRouter } from "next/router";

import { useCancelCreateOrder } from "../../Hooks/useOrder";
import {
  MembersWrapper,
  ShadowWrapper,
  Wrapper,
} from "../../components/Members/Common/Containers";
import { PageTitle, P } from "../../components/Members/Common/Type";
import { Box, Center, Container, Loader, Stack } from "@mantine/core";
import { BTN_TOINTERALLINK } from "../../components/Members/Common/utils/Buttons";
import { IconError404 } from "@tabler/icons";
import { FixturaLoading } from "../../components/Members/Common/Loading";
import { useAccountDetails } from "../../lib/userContext";

const StripeError = () => {
  const router = useRouter();
  const { account, ReRender } = useAccountDetails();
  const { session_id, canceled, OrderSetup } = router.query;
  const [order, requestOrderCancellation, error, isLoading] =
    useCancelCreateOrder();

 
  useEffect(() => {
    if (order === null && session_id) {
      requestOrderCancellation(session_id, OrderSetup);
    }
  }, [session_id, order, requestOrderCancellation, OrderSetup]);

  useEffect(() => {
    if (order !== null) {
      ReRender(); // call the ReRender function when the order is cancelled
    }
  }, [order]);


  if (isLoading) {
    return (
      <MembersWrapper>
        <Stack align="center">
          <FixturaLoading />
          <P >"Processing..."</P>
        </Stack>
      </MembersWrapper>
    ); // replace with your actual loading component
  }

  if (error) {
    return (
      <MembersWrapper>
        <Stack align="center">
          <P color={8} Weight={900}>Error</P>
          <P>{error}</P>
        </Stack>
      </MembersWrapper>
    );
  }

  return (
    <MembersWrapper>
      <PageTitle
        Copy={"SUBSCRIPTION CANCELLATION CONFIRMED"}
        ICON={<IconError404 />}
      />
      <Container>
        <Wrapper>
          <P>We noticed you've cancelled the subscription process. No worries - whenever you're ready, we'll be here to assist you in setting up your subscription.</P>
          <P>If you encountered any issues during the process or need help, please don't hesitate to contact our support team.</P>
          <P>The Fixtura Team.</P>
        </Wrapper>
        <ShadowWrapper>
          <Center>
            <BTN_TOINTERALLINK
              LABEL="Go To Account"
              URL="/members/account/"
              THEME="cta"
            />
          </Center>
        </ShadowWrapper>
      </Container>
    </MembersWrapper>
  );
};

export default StripeError;
