import React, { useEffect, useRef } from "react";
import { useRouter } from "next/router";
import { useUser } from "../../lib/authContext";
import {
  MembersWrapper,
  Wrapper,
} from "../../components/Members/Common/Containers";
import { P, PageTitle } from "../../components/Members/Common/Type";
import Meta from "../../components/Layouts/Meta";

const UserVerification = () => {
  const router = useRouter();
  const { user } = useUser();
  const isRedirecting = useRef(false);
  const { prev } = router.query;
  //let isRedirecting = false; // Moved outside useEffect

  useEffect(() => {
    const handleRedirect = async () => {
      if (isRedirecting.current) return;

      if (user === undefined) {
        isRedirecting.current = true;
        await router.push("/");
        isRedirecting.current = false;
        return;
      }

      if (user !== null) {
        isRedirecting.current = true;
        await router.push(prev);
        isRedirecting.current = false;
        return;
      }
    };

    handleRedirect();
  }, [router, user]);

  return (
    <MembersWrapper>
      <Meta
        title="Account Verification - Fixtura: Secure Your Membership"
        description="Complete your account verification for secure access to Fixtura's member features. Protect your sports club's digital media."
        keywords="Account verification, Fixtura security, sports media protection, club content verification, digital membership"
      />
      <PageTitle Copy={"Verifying User"} />
      <Wrapper>
        <P>{`Please Wait here for 2 seconds.`}</P>
      </Wrapper>
    </MembersWrapper>
  );
};

export default UserVerification;
