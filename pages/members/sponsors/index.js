import { useState, useEffect } from 'react';

import { MembersWrapper } from '../../../components/Members/Common/Containers';
import { PageTitle } from '../../../components/Members/Common/Type';
import { IconCheck } from '@tabler/icons';
import { useAccountDetails } from '../../../context/userContext';
import { useUser } from '../../../context/authContext';
import Meta from '../../../components/Layouts/Meta';
// Existing Component Imports
import { StatusSection } from '../../../components/pages/members/sponsors/Sections/StatusSection';
import { HeaderSection } from '../../../components/pages/members/sponsors/Sections/HeaderSection';
import { ContentSection } from '../../../components/pages/members/sponsors/Sections/ContentSection';
import { SponsorLimitMessage } from '../../../components/pages/members/sponsors/Sections/SponsorLimitMessage';

import { DescriptionSection } from '../../../components/pages/members/sponsors/Sections/DescriptionSection';
import { RoundedSectionContainer } from '../../../components/UI/Containers/SectionContainer';
import { PreviewSponsorsGallery } from '../../../components/pages/members/index/Dashboard/userPreview/PreviewSponsorsGallery';

const SPONSORS = () => {
  const SPONSORLIMIT = 30;
  const { account } = useAccountDetails();
  const [userAccount, setUserAccount] = useState(account);
  const [isCreate, setIsCreate] = useState(false);
  const [Sponsors, setSponsors] = useState(
    userAccount?.attributes?.sponsors?.data
  );
  const { user, loading } = useUser();

  useEffect(() => {
    setUserAccount(account);
    setSponsors(account?.attributes?.sponsors?.data);
  }, [account]);

  if (!user || !userAccount || !Sponsors) return false;

  return (
    <MembersWrapper>
      <Meta
        title='Member Sponsors - Fixtura: Manage Your Partnerships'
        description="Manage your sports club's sponsorships with ease on Fixtura. Enhance your partnerships and digital media collaborations."
        keywords='Member sponsors, Fixtura partnerships, sports media sponsors, club content management, digital collaborations'
      />
      <PageTitle Copy={'SPONSOR POOl'} ICON={<IconCheck size={40} />} />
      <DescriptionSection />
      <StatusSection
        account={account}
        Sponsors={Sponsors}
        SPONSORLIMIT={SPONSORLIMIT}
      />

      <RoundedSectionContainer
        headerContent={''}
        topContent={
          <HeaderSection
            Sponsors={Sponsors}
            SPONSORLIMIT={SPONSORLIMIT}
            setIsCreate={setIsCreate}
            isCreate={isCreate}
          />
        }
        bottomContent={
          <>
            <SponsorLimitMessage
              Sponsors={Sponsors}
              SPONSORLIMIT={SPONSORLIMIT}
              isCreate={isCreate}
            />
            <ContentSection
              Sponsors={Sponsors}
              SPONSORLIMIT={SPONSORLIMIT}
              isCreate={isCreate}
              setIsCreate={setIsCreate}
              userAccount={userAccount}
            />
          </>
        }
      />
      {/* <PreviewSponsorsGallery /> */}
    </MembersWrapper>
  );
};

export default SPONSORS;
