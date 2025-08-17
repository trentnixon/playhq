import { useState, useEffect } from 'react';
import { useAccountDetails } from '../../../../context/userContext';
import { IconCheck } from '@tabler/icons';
import { P, PageTitle } from '../../../../components/Members/Common/Type';
import { PageMetaData } from '../../../../components/Layouts/members/Meta/pageMetaData';
import SecureRouteHOC from '../../../../components/Layouts/members/security/SecureRouteHC';
import { useGetOrganizationDetails } from '../../../../Hooks/useGetOrganizationDetails';
import { FindAccountType, FindAccountTypeOBJ } from '../../../../lib/actions';
import { Container, Stack, Loader, Text } from '@mantine/core';
import {
  defaultSponsorshipLevels,
  accountSpecificSponsorshipLevels,
} from '../../../../components/pages/members/sponsors/allocation/sponsorshipLevels';
import SponsorshipGroup from '../../../../components/pages/members/sponsors/allocation/SponsorshipGroup';
import { FixturaLoading } from '../../../../components/Members/Common/Loading';

const SponsorAllocation = () => {
  const { account } = useAccountDetails();
  const [userAccount, setUserAccount] = useState(account);
  const accountTypeOBJ = FindAccountTypeOBJ(account);
  const accountType = FindAccountType(account);

  const [Sponsors, setSponsors] = useState(
    userAccount?.attributes?.sponsors?.data || []
  );
  const { data, loading, error } = useGetOrganizationDetails(
    accountType,
    accountTypeOBJ?.id
  );

  const [sponsorshipLevels, setSponsorshipLevels] = useState([]);
  const [dynamicEntities, setDynamicEntities] = useState({
    leagues: [],
    grades: [],
    teams: [],
  });

  useEffect(() => {
    setUserAccount(account);
    setSponsors(account?.attributes?.sponsors?.data || []);

    const accountSpecificLevels =
      accountSpecificSponsorshipLevels[accountType.toLowerCase()] || [];
    setSponsorshipLevels([
      ...defaultSponsorshipLevels,
      ...accountSpecificLevels,
    ]);

    if (data) {
      if (accountType === 'Association') {
        const leagues = (data.data.attributes?.competitions?.data || []).filter(
          league => {
            const endDate = new Date(league.attributes.endDate);
            return endDate >= new Date();
          }
        );
        const grades = leagues.reduce(
          (acc, comp) => [...acc, ...comp.attributes.grades.data],
          []
        );
        setDynamicEntities({
          leagues: account.attributes.group_assets_by ? [] : leagues,
          grades: account.attributes.group_assets_by ? grades : [],
          teams: [],
        });
      } else if (accountType === 'Club') {
        const teams = data.data.attributes.teams?.data || [];
        setDynamicEntities({ leagues: [], grades: [], teams });
      }
    }
  }, [account, accountType, data]);

  if (loading) return <FixturaLoading />;
  if (!userAccount || !Sponsors.length) return null;

  const MetaOBJ = {
    title: 'Member Sponsors - Fixtura: Manage Your Partnerships',
    description:
      "Manage your sports club's sponsorships with ease on Fixtura. Enhance your partnerships and digital media collaborations.",
    keywords:
      'Member sponsors, Fixtura partnerships, sports media sponsors, club content management, digital collaborations.',
  };

  const sponsorshipGroups = [
    {
      title: 'Default',
      description: 'General sponsorship categories that apply to all assets.',
      levels: defaultSponsorshipLevels,
    },
    {
      title: 'Leagues',
      description: 'Sponsorship options specific to different leagues.',
      levels: dynamicEntities.leagues.map(league => ({
        category: 'league',
        level: `league_${league.id}`,
        id: league.id,
        name: league.attributes.competitionName,
        description:
          'This sponsor will appear whenever this league is mentioned on a video or a graphic.',
      })),
    },
    {
      title: 'Grades',
      description: 'Sponsorship options specific to different grades.',
      levels: dynamicEntities.grades.map(grade => ({
        category: 'grade',
        level: `grade_${grade.id}`,
        id: grade.id,
        name: grade.attributes.gradeName,
        description:
          'This sponsor will appear whenever this grade is mentioned on a video or a graphic.',
      })),
    },
    {
      title: 'Teams',
      description: 'Sponsorship options specific to different teams.',
      levels: dynamicEntities.teams.map(team => ({
        category: 'team',
        level: `team_${team.id}`,
        name: team.attributes.teamName,
        id: team.id,
        description:
          'This sponsor will appear whenever this team is mentioned on a video or a graphic.',
      })),
    },
  ];

  return (
    <SecureRouteHOC conditions={[account]}>
      <PageMetaData MetaOBJ={MetaOBJ} />
      <PageTitle Copy={'Sponsor Allocation'} ICON={<IconCheck size={40} />} />
      <Container>
        <P size='xl' weight={700}>
          SPONSOR ALLOCATION
        </P>
        <P size='md'>
          Assign sponsors from your Sponsor Pool to specific categories, levels,
          or teams within your account.
        </P>
        <P size='md'>
          Customize your assets by showcasing the right sponsors in the right
          places, enhancing your club&apos;s visibility and support from
          sponsors.
        </P>

        <Stack spacing='md'>
          {sponsorshipGroups.map((group, groupIndex) => (
            <SponsorshipGroup
              key={groupIndex}
              title={group.title}
              description={group.description}
              levels={group.levels}
              sponsors={Sponsors}
              accountType={accountType}
            />
          ))}
        </Stack>
      </Container>
    </SecureRouteHOC>
  );
};

export default SponsorAllocation;
