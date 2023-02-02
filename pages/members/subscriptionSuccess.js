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
import { Box, Button, Center, Container, Group } from "@mantine/core";
import { IconCheck } from "@tabler/icons";
import { BTN_TOINTERALLINK } from "../../components/Members/Common/utils/Buttons";

const StripeSuccess = () => {
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
      <PageTitle
        Copy={"Thankyou for your Subscription"}
        ICON={<IconCheck size={40} />}
      />

      <Container>
      <Wrapper>
        <Group position="apart">
          <Box
           
          >
            <P
              Copy={`Thank you for subscribing to Fixtura!`}
            />
            <P
              Copy={`Your subscription is now active, and you will begin receiving personalized digital assets according to your preferences. Thank you for choosing Fixtura, and we look forward to helping you enhance your club's social media presence.`}
            />
            <P
              Copy={`Thank you for choosing Fixtura, and we look forward to helping you enhance your club's social media presence.`}
            />
            
          </Box>
        </Group>
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

export default StripeSuccess;
