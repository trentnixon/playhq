import { Container, Grid } from "@mantine/core";
import { MembersHero } from "./Members_Hero";
import { MembersSidebar } from "./Members_Sidebar";
import HasCompletedStartSequence from "../../Members/Account/HOC/hasCompletedStartSequence";
export const MembersLayout = ({ children }) => {
  return (
    <HasCompletedStartSequence>
      <MembersHero />
      <Container size={"xl"}>
        <Grid>
          <Grid.Col span={12} sm={4} md={3}>
            <MembersSidebar />
          </Grid.Col>
          <Grid.Col span={12} sm={8} md={9}>
            <main>{children}</main>
          </Grid.Col>
        </Grid>
      </Container>
    </HasCompletedStartSequence>
  );
};
``;
