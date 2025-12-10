import { PageTitle } from '../../../../components/Members/Common/Type';
import { useAccountDetails } from '../../../../context/userContext';
import { IconSettings } from '@tabler/icons';
import { BackToSettings } from '../../../../components/pages/members/settings/_components/BackToSettings';
import { RoundedSectionContainer } from '../../../../components/UI/Containers/SectionContainer';
import SecureRouteHOC from '../../../../components/Layouts/members/security/SecureRouteHC';
import { PageMetaData } from '../../../../components/Layouts/members/Meta/pageMetaData';
import { Divider } from '@mantine/core';
import { Previewer } from '../../../../components/pages/members/index/Dashboard/userPreview/Previewer';
import { UpdateYourTheme } from '../../../../components/pages/members/settings/change-brand-colors/components/UpdateYourTheme';

const ChangeBrandColors = () => {
  const { account } = useAccountDetails();
  //console.log(account.attributes.group_assets_by);

  if (!account) return;

  const MetaOBJ = {
    title: 'Settings - Brand Colors - Fixtura',
    description: 'Settings - Brand Colors',
    keywords: 'Fixtura Settings - Brand Colors',
  };

  return (
    <SecureRouteHOC conditions={[account]}>
      <PageMetaData MetaOBJ={MetaOBJ} />

      <PageTitle
        Copy={`Settings - Brand Colors `}
        ICON={<IconSettings size={40} />}
      />
      <BackToSettings />

      <RoundedSectionContainer
        headerContent='How to Customize'
        topContent={`Select from a pre-made palette or click 'Edit' to customize the hex codes in your personal palette on the Settings page, ensuring a unified brand presence across all your content.`}
        bottomContent={<UpdateYourTheme />}
        className='mb-4'
      />

      <Divider my={50} />

      <RoundedSectionContainer
        headerContent='Preview Your Colors'
        topContent={
          'Check the preview carousel to see how your assets look with the new colors.'
        }
        bottomContent={<Previewer account={account} />}
        className='mb-4'
      />
    </SecureRouteHOC>
  );
};
export default ChangeBrandColors;
