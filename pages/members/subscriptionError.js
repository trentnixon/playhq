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
import { Button, Center } from "@mantine/core";
import { BTN_TOINTERALLINK } from "../../components/Members/Common/utils/Buttons";

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
      <PageTitle Copy={"Subscription Processing Error"} />
      <Wrapper>
        <P
          Copy={`We apologize for the inconvenience, but there was a problem processing your subscription. Please check the information you provided and try again, or contact us if the issue persists. Thank you for choosing Fixtura, and we hope to be able to serve you soon.`}
        />
      </Wrapper>
      <ShadowWrapper>
        <Center>
          <BTN_TOINTERALLINK LABEL="Go To Account" URL="/members/settings/" THEME="cta" />
        </Center>
      </ShadowWrapper>
    </MembersWrapper>
  );
};

export default StripeError;
