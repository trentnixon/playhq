// react
import { useEffect, useState } from "react";
/* import { useRouter } from "next/router"; */
import { useUser } from "../../context/authContext";
// UTILS

// PACK
import { Space } from "@mantine/core";
// Components
import { MembersWrapper } from "../../components/Members/Common/Containers";

// HOC
import { LoadingStateWrapper } from "../../components/Members/Account/HOC/LoadingStateWrapper";
import SetupCheck from "../../components/Members/Account/HOC/SetupCheck";
import Adminfetcher from "../../lib/Adminfetcher";

import { useAccountDetails } from "../../context/userContext";
import { FixturaDivider } from "../../components/Members/Common/Divider";
import { getIdFromLocalCookie } from "../../lib/auth";

import { IsFreeTrialFeedback } from "../../components/Members/Account/userIsFreeTrial";
import Meta from "../../components/Layouts/Meta";
import { P, PageTitle } from "../../components/Members/Common/Type";
import { UsersAccountStatusViews } from "../../components/Members/Account/AccountViewOptions/UsersAccountStatusViews";
import { IconFileInvoice } from "@tabler/icons";
const Account = () => {
  const { account } = useAccountDetails();
  const [userAccount, setUserAccount] = useState(account);
  //const { user, loading } = useUser();

  useEffect(() => {
    if (account) {
      setUserAccount(account);
    }
  }, [account]);

  return (
    <MembersWrapper>
      <SetupCheck>
        <LoadingStateWrapper conditions={[userAccount]}>
          <Meta
            title="Member Account - Fixtura: Manage Your Profile"
            description="Access and manage your account settings on Fixtura. Keep your membership details up-to-date for a seamless digital media experience."
            keywords="Member account, Fixtura profile management, sports media account settings, club content customization"
          />

          <UsersAccountStatusViews />
          <IsFreeTrialFeedback />
          <FixturaDivider />
        </LoadingStateWrapper>
      </SetupCheck>
    </MembersWrapper>
  );
};

Account.getInitialProps = async (ctx) => {
  const ID = await getIdFromLocalCookie();

  const fixtureDateRange = await Adminfetcher(
    `/account/fixtureDateRange/${ID}`
  );
  return {
    fixtureDateRange: fixtureDateRange,
  };
};

export default Account;
