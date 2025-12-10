import { PageTitle } from '../../../../components/Members/Common/Type';
import { useAccountDetails } from '../../../../context/userContext';
import { IconSettings } from '@tabler/icons';
import { BackToSettings } from '../../../../components/pages/members/settings/_components/BackToSettings';
import { RoundedSectionContainer } from '../../../../components/UI/Containers/SectionContainer';
import SecureRouteHOC from '../../../../components/Layouts/members/security/SecureRouteHC';
import { PageMetaData } from '../../../../components/Layouts/members/Meta/pageMetaData';
import { getIdFromLocalCookie } from '../../../../lib/auth';
import Adminfetcher from '../../../../lib/Adminfetcher';
import { Setting_Action } from '../../../../components/pages/members/settings/change-day-bundle-arrives/Setting_Action';
import { Setting_Explainer } from '../../../../components/pages/members/settings/change-day-bundle-arrives/Setting_Explainer';
import { Additional_Information_Title } from '../../../../components/pages/members/settings/change-day-bundle-arrives/Additional_Information_Title';
import { TipsAndWarnings } from '../../../../components/pages/members/settings/change-day-bundle-arrives/Additional_Information';

const ChangeDayBundleArrives = props => {
  const { Renders } = props;
  const { account } = useAccountDetails();
  //console.log(account.attributes.group_assets_by);

  if (!account) return;

  const MetaOBJ = {
    title: 'How to Group your Bundles - Fixtura',
    description: 'How to Group your Bundles',
    keywords: 'How to group your Fixtura Bundles',
  };

  return (
    <SecureRouteHOC conditions={[account, Renders]}>
      <PageMetaData MetaOBJ={MetaOBJ} />

      <PageTitle
        Copy={`Settings - Delivery Day `}
        ICON={<IconSettings size={40} />}
      />
      <BackToSettings />

      <RoundedSectionContainer
        headerContent='Bundle Delivery Day'
        topContent={<Setting_Action renders={Renders.renders} />}
        bottomContent={<Setting_Explainer />}
        className='mb-4'
      />

      <RoundedSectionContainer
        headerContent=''
        topContent={<Additional_Information_Title />}
        bottomContent={<TipsAndWarnings />}
        className='mb-4'
      />
    </SecureRouteHOC>
  );
};
export default ChangeDayBundleArrives;

ChangeDayBundleArrives.getInitialProps = async ctx => {
  const ID = await getIdFromLocalCookie();
  const Renders = await Adminfetcher(`/scheduler/getDownloads/${ID}`);
  return {
    Renders,
  };
};
