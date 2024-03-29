// Components
import Meta from "./Meta";
import NavbarOne from "./NavbarOne";
import NavbarTwo from "./NavbarTwo";
import Footer from "./FooterDark";
import { useRouter } from "next/router";
import { useUser } from "../../lib/authContext";
import { useAccountDetails } from "../../lib/userContext";
import { Box, Container, Grid } from "@mantine/core";
import { FixturaHeaderMeta } from "../Members/Account/userFixturaSettings";
import { UserDetailsCard } from "../Members/Account/userAdminDetailsCard";
import HasCompletedStartSequence from "../Members/Account/HOC/hasCompletedStartSequence";
import withUserAuth from "../Members/Account/HOC/withUserAuth";
import { SideBarExtraShell } from "../Members/Account/SideBarExtras";

const Layout = ({ children }) => {
  const { user } = useUser();
  const router = useRouter();

  const AuthenticatedMembersLayout = withUserAuth(MembersLayout); // Wrap the MembersLayout with the HOC
  const isMemberPage = router.pathname.includes("members");
  const SelectedNavbar = user ? <NavbarTwo /> : <NavbarOne />;
  const SelectedLayout = isMemberPage ? (
    <AuthenticatedMembersLayout>{children}</AuthenticatedMembersLayout>
  ) : (
    <StaticLayout>{children}</StaticLayout>
  );

  //console.log("isMemberPage", isMemberPage);
  return (
    <>
      <div className="Container Main">
        {SelectedNavbar}
        {SelectedLayout}
        <Footer />
      </div>
    </>
  );
};

export default Layout;

// Layout Options
const StaticLayout = ({ children }) => {
  return <main>{children}</main>;
};

const MembersLayout = ({ children }) => {
  return (
    <HasCompletedStartSequence>
      <AdminHero />
      <Container size={"xl"}>
        <Grid>
          <Grid.Col span={12} sm={4} md={3}>
            <AdminSideBar />
          </Grid.Col>
          <Grid.Col span={12} sm={8} md={9}>
            <main>{children}</main>
          </Grid.Col>
        </Grid>
      </Container>
    </HasCompletedStartSequence>
  );
};

// Members additional Components
const AdminSideBar = () => {
  const { account } = useAccountDetails();
  if (!account) return null;
  return (
    <Container fluid mx={0} p={0}>
      <UserDetailsCard user={account} />
      <SideBarExtraShell account={account}/>
      

    </Container>
  );
};

const AdminHero = () => {
  const { account } = useAccountDetails();
  return (
    <Container fluid mx={0} p={0}>
      <Box
        pt={40}
        sx={(theme) => ({
          height: "110px",
          backgroundColor: theme.colors.gray[8],
          display: "flex",
          justifyContent: "flex-end",
          alignContent: "baseline",
          flexDirection: "column",
        })}
      >
        <FixturaHeaderMeta user={account} />
      </Box>
    </Container>
  );
};
