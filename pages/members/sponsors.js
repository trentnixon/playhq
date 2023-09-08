import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { MembersWrapper } from "../../components/Members/Common/Containers";
import { PageTitle } from "../../components/Members/Common/Type";
import { IconCheck } from "@tabler/icons";
import { useAccountDetails } from "../../lib/userContext";
import { useUser } from "../../lib/authContext";

// Existing Component Imports
import { DescriptionSection } from "../../components/Members/Sponsors/Sections/DescriptionSection";
import { StatusSection } from "../../components/Members/Sponsors/Sections/StatusSection";
import { HeaderSection } from "../../components/Members/Sponsors/Sections/HeaderSection";
import { ContentSection } from "../../components/Members/Sponsors/Sections/ContentSection";
import { SponsorLimitMessage } from "../../components/Members/Sponsors/Sections/SponsorLimitMessage";

const SPONSORS = () => {
  const SPONSORLIMIT = 5; 
  const { account } = useAccountDetails();
  const [userAccount, setUserAccount] = useState(account);
  const [isCreate, setIsCreate] = useState(false);
  const [Sponsors, setSponsors] = useState(
    userAccount?.attributes?.sponsors?.data
  );
  const { user, loading } = useUser();
  const router = useRouter();
  const currentRoute = router.pathname;

  useEffect(() => {
    if (!user) router.push(`/members/verification/?prev=${currentRoute}`);
  }, []);

  useEffect(() => {
    setUserAccount(account);
    setSponsors(account?.attributes?.sponsors?.data);
  }, [account]);

  if (!user || !userAccount || !Sponsors) return false;

  return (
    <MembersWrapper>
      <PageTitle Copy={"SPONSORS"} ICON={<IconCheck size={40} />} />
      <DescriptionSection />
      <StatusSection
        account={account}
        Sponsors={Sponsors}
        SPONSORLIMIT={SPONSORLIMIT}
      />
      <HeaderSection
        Sponsors={Sponsors}
        SPONSORLIMIT={SPONSORLIMIT}
        setIsCreate={setIsCreate}
        isCreate={isCreate}
      />
      <ContentSection
        Sponsors={Sponsors}
        SPONSORLIMIT={SPONSORLIMIT}
        isCreate={isCreate}
        setIsCreate={setIsCreate}
        userAccount={userAccount}
      />
      <SponsorLimitMessage
        Sponsors={Sponsors}
        SPONSORLIMIT={SPONSORLIMIT}
        isCreate={isCreate}
      />
    </MembersWrapper>
  );
};

export default SPONSORS;
