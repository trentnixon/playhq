// Components
import Meta from "./Meta";
import NavbarOne from "./NavbarOne";
import NavbarTwo from "./NavbarTwo";
import Footer from "./FooterDark";
import { useRouter } from "next/router";
import { useFetchUser, UserProvider } from "../../lib/authContext";
import {
  AccountDetailsProvider,
  useAccountDetails,
} from "../../lib/userContext";
import { Box, Container, Grid } from "@mantine/core";
import { FixturaHeaderMeta } from "../Members/Account/userFixturaSettings";
import { UserDetailsCard } from "../Members/Account/userAdminDetailsCard";
import HasCompletedStartSequence from "../Members/Account/HOC/hasCompletedStartSequence";

const Layout = ({ children }) => {
  const { user, loading } = useFetchUser();
  const router = useRouter();
  const isMemberPage = router.pathname.includes("members");
  const SelectedNavbar = user ? <NavbarTwo /> : <NavbarOne />;
  const SelectedLayout = isMemberPage ? (
    <MembersLayout>{children}</MembersLayout>
  ) : (
    <StaticLayout>{children}</StaticLayout>
  );

  console.log("isMemberPage", isMemberPage);
  return (
    <UserProvider value={{ user, loading }}>
      <AccountDetailsProvider>
        <Meta />
        <div className="Container Main">
          {SelectedNavbar}
          {SelectedLayout}
          <Footer />
        </div> 
      </AccountDetailsProvider>
    </UserProvider>
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
    </Container>
  );
};

const AdminHero = () => {
  const { account } = useAccountDetails();
  //if (!account) return null;
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
