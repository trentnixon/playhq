import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";

///api/orders/confirm
import { useConfirmOrder } from "../../Hooks/useOrder";
import {
  MembersWrapper,
  ShadowWrapper,
  Wrapper,
} from "../../components/Members/Common/Containers";
import { PageTitle, P } from "../../components/Members/Common/Type";
import { Button, Center, Container } from "@mantine/core";
import { BTN_TOINTERALLINK } from "../../components/Members/Common/utils/Buttons";
import { IconError404 } from "@tabler/icons";

const StripeError = () => {
  const router = useRouter();
  const { session_id, success } = router.query;
  const [order, confirmOrder] = useConfirmOrder();

  useEffect(() => {
    console.log("session_id", session_id);
    if (order === null && session_id !== undefined) {
      confirmOrder(session_id);
    }
  }, [session_id]);

  console.log(session_id, success);
  return (
    <MembersWrapper>
      <PageTitle Copy={"Subscription Processing Error"}  ICON={<IconError404 />}/> 
      <Container>
      <Wrapper>
        
        <P
          Copy={`We apologize for the inconvenience, but there was a problem processing your subscription.`}
        />
        <P
          Copy={`Please check the information you provided and try again, or contact us if the issue persists.`}
        />
        <P
          Copy={`Thank you for choosing Fixtura, and we hope to be able to serve you soon.`}
        />
      </Wrapper>
      <ShadowWrapper>
        <Center>
          <BTN_TOINTERALLINK LABEL="Go To Account" URL="/members/account/" THEME="cta" />
        </Center> 
      </ShadowWrapper>
      </Container>
    </MembersWrapper>
  );
};

export default StripeError;
