import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { useUser } from "../../lib/authContext";
import {
  MembersWrapper,
  Wrapper,
} from "../../components/Members/Common/Containers";
import { P, PageTitle } from "../../components/Members/Common/Type";

const UserVerification = () => {
  const router = useRouter();
  const { user } = useUser();
  const { prev } = router.query;
  let isRedirecting = false; // Moved outside useEffect

  useEffect(() => {
    const handleRedirect = () => {
      if (isRedirecting) return;
      
      if (user === undefined) {
        isRedirecting = true;
        router.push('/').then(() => {
          isRedirecting = false;
        });
        return;
      }

      if (user != null) {
        isRedirecting = true;
        router.push(prev).then(() => {
          isRedirecting = false;
        });
        return;
      }
    };

    handleRedirect();
  }, [router, user]);

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