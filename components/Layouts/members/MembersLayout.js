import { Container, Grid } from '@mantine/core';
import { MembersHero } from './Members_Hero';
import { MembersSidebar } from './Members_Sidebar';
import HasCompletedStartSequence from '../../Members/Account/HOC/hasCompletedStartSequence';
import { useRouter } from 'next/router';
export const MembersLayout = ({ children }) => {
  const router = useRouter();
  const isMemberPage = router.pathname.includes('members');
  const isTemplateBuilderPage = router.pathname.includes('templateBuilder');

  if (isTemplateBuilderPage) {
    return (
      <HasCompletedStartSequence>
        <MembersHero />
        <Container size={'xl'}>
          <main>{children}</main>
        </Container>
      </HasCompletedStartSequence>
    );
  }

  return (
    <HasCompletedStartSequence>
      <MembersHero />
      <Container size={'xl'}>
        <Grid>
          <Grid.Col span={12} sm={0} md={3}>
            <MembersSidebar />
          </Grid.Col>
          <Grid.Col span={12} sm={12} md={9}>
            <main>{children}</main>
          </Grid.Col>
        </Grid>
      </Container>
    </HasCompletedStartSequence>
  );
};
