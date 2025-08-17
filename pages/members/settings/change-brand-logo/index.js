/*   */

import { PageTitle } from '../../../../components/Members/Common/Type';
import { useAccountDetails } from '../../../../context/userContext';
import { IconSettings } from '@tabler/icons';
import { BackToSettings } from '../../../../components/pages/members/settings/_components/BackToSettings';
import { RoundedSectionContainer } from '../../../../components/UI/Containers/SectionContainer';
import SecureRouteHOC from '../../../../components/Layouts/members/security/SecureRouteHC';
import { PageMetaData } from '../../../../components/Layouts/members/Meta/pageMetaData';
import { Divider } from '@mantine/core';
import { UpdateBrandLogo } from '../../../../components/pages/members/settings/change-brand-logo/components/UpdateLogoContainer';
import { Previewer } from '../../../../components/pages/members/index/Dashboard/userPreview/Previewer';
import { useEffect } from 'react';

const ChangeBrandLogo = () => {
  const { account } = useAccountDetails();
  //console.log(account.attributes.group_assets_by);

  useEffect(() => {}, [account]);

  if (!account) return;

  const MetaOBJ = {
    title: 'How to Group your Bundles - Fixtura',
    description: 'How to Group your Bundles',
    keywords: 'How to group your Fixtura Bundles',
  };

  return (
    <SecureRouteHOC conditions={[account]}>
      <PageMetaData MetaOBJ={MetaOBJ} />

      <PageTitle Copy={`Settings - LOGO `} ICON={<IconSettings size={40} />} />
      <BackToSettings />

      <RoundedSectionContainer
        headerContent='How to Customize'
        topContent={`Upload a high-resolution image of your logo to ensure the best quality representation in your Assets.`}
        bottomContent={<UpdateBrandLogo />}
      />

      <Divider my={50} />

      <RoundedSectionContainer
        headerContent='Test your Logo'
        topContent={
          'Preview your logo against your template and Brand colors to ensure the best results.'
        }
        bottomContent={<Previewer account={account} />}
      />
    </SecureRouteHOC>
  );
};
export default ChangeBrandLogo;
