import { PageTitle } from '../../../../components/Members/Common/Type';
import { useAccountDetails } from '../../../../context/userContext';
import { IconArrowsSort } from '@tabler/icons-react';
import { BackToSettings } from '../../../../components/pages/members/settings/_components/BackToSettings';
import { RoundedSectionContainer } from '../../../../components/UI/Containers/SectionContainer';
import SecureRouteHOC from '../../../../components/Layouts/members/security/SecureRouteHC';
import { PageMetaData } from '../../../../components/Layouts/members/Meta/pageMetaData';
import { LoadingOverlay, Button, Box } from '@mantine/core';
import { FindAccountType, FindAccountTypeOBJ } from '../../../../lib/actions';
import { useGetOrganizationDetails } from '../../../../Hooks/useGetOrganizationDetails';
import { useTeamGradeOrdering } from '../../../../Hooks/useTeamGradeOrdering';
import { OrderingList } from '../../../../components/pages/members/settings/team-grade-ordering/OrderingList';

const TeamGradeOrdering = () => {
  const { account } = useAccountDetails();
  const AccType = FindAccountType(account);
  const accountId = FindAccountTypeOBJ(account)?.id;

  const {
    data: organizationDetails,
    loading: loadingOrgDetails,
    refetch: refetchOrganizationDetails,
  } = useGetOrganizationDetails(AccType, accountId);

  const groupAssetsByAllAgeGroups = account?.attributes?.group_assets_by;

  const {
    orderedGroups,
    hasUnsavedChanges,
    isSaving,
    handleDragEnd,
    handleSaveOrdering: saveOrdering,
  } = useTeamGradeOrdering(
    organizationDetails,
    AccType,
    accountId,
    groupAssetsByAllAgeGroups,
    refetchOrganizationDetails
  );

  const handleSaveOrdering = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    saveOrdering();
  };

  if (!account) return;

  // Content based on account type
  const settings = {
    Association: {
      title: 'Settings - Grade Ordering',
      header: 'Drag and drop to reorder your grades.',
      description:
        'This ordering will affect how your grades appear in upcoming matches, ladders, and weekend results. Arrange your grades in the order you want them displayed across assets.',
      impactText:
        'The order you set here will be reflected in your asset bundles, galleries, and anywhere grades are displayed.',
    },
    Club: {
      title: 'Settings - Grade Ordering',
      header: 'Drag and drop to reorder your grades. ',
      description:
        'This ordering will affect how your grades appear in upcoming matches, ladders, and weekend results. Arrange your grades in the order you want them displayed across assets.',
      impactText:
        'The order you set here will be reflected in your asset bundles, galleries, and anywhere grades are displayed.',
    },
  };

  const currentSettings = settings[AccType] || settings.Club;

  const MetaOBJ = {
    title: `${currentSettings.title} - Fixtura`,
    description:
      'Adjust the sort order for your teams or grades to organize your content delivery.',
    keywords:
      'Fixtura Settings - Team Ordering, Grade Ordering, Team Management',
  };

  return (
    <SecureRouteHOC conditions={[account]}>
      <PageMetaData MetaOBJ={MetaOBJ} />

      <PageTitle
        Copy={currentSettings.title}
        ICON={<IconArrowsSort size={40} />}
      />
      <BackToSettings />

      <LoadingOverlay visible={loadingOrgDetails || isSaving} />

      <RoundedSectionContainer
        headerContent={currentSettings.header}
        topContent={currentSettings.description}
        bottomContent={
          <OrderingList
            orderedGroups={orderedGroups}
            handleDragEnd={handleDragEnd}
            AccType={AccType}
            loadingOrgDetails={loadingOrgDetails}
          />
        }
        className='mb-20'
      />

      {/* Floating Save Button */}
      {hasUnsavedChanges && !isSaving && (
        <Box
          sx={{
            position: 'fixed',
            bottom: 30,
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: 1000,
            display: 'flex',
            justifyContent: 'center',
            animation: 'slideUp 0.3s ease-out',
            '@keyframes slideUp': {
              from: {
                opacity: 0,
                transform: 'translateX(-50%) translateY(20px)',
              },
              to: {
                opacity: 1,
                transform: 'translateX(-50%) translateY(0)',
              },
            },
          }}
        >
          <Button
            onClick={handleSaveOrdering}
            color='green'
            size='lg'
            loading={isSaving}
            disabled={isSaving}
            sx={{
              boxShadow: '0 4px 20px rgba(0, 0, 0, 0.15)',
              '&:hover': {
                boxShadow: '0 6px 24px rgba(0, 0, 0, 0.2)',
              },
            }}
          >
            Save Ordering Changes
          </Button>
        </Box>
      )}
    </SecureRouteHOC>
  );
};

export default TeamGradeOrdering;
