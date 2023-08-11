import React from "react";
import { useEffect } from "react";

import { useRouter } from "next/router";
import { useUser } from "../../lib/authContext";

import {
  MembersWrapper,
  Wrapper,
} from "../../components/Members/Common/Containers";
import { P, PageTitle } from "../../components/Members/Common/Type";

const UserVerification = () => {
  const router = useRouter();
  const { user, loading } = useUser();
  const { prev } = router.query;

  useEffect(() => {
    //console.log(user);
    user === undefined ? router.push('/') : "WAITING...";
    user != null ? router.push(prev) : "WAITING...";
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
