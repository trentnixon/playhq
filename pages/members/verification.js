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

  useEffect(() => {
    const handleRedirect = async () => {
      if (isRedirecting.current) return;
    
      if (user === null || user === undefined) {
        console.error("User is null or undefined");
        return;
      }
    
      isRedirecting.current = true;
      try {
        if (prev) {
          await router.push(prev);
        } else {
          await router.push("/members");
        }
      } catch (e) {
        console.error("An error occurred while redirecting:", e);
      }
      isRedirecting.current = false;
    };

    handleRedirect();
  }, [router, user, prev]);

  return (
    <MembersWrapper>
      <PageTitle Copy={"Verifying User"} />
      <Wrapper>
        <P>{`Please Wait here for 2 seconds.`}</P>
      </Wrapper>
    </MembersWrapper>
  );
};

export default UserVerification;
