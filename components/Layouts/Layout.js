// Components

import NavbarMain from "./NavbarMain";
import NavbarMembers from "./NavbarMembers";
import Footer from "./Fixtura_Footer";
import { useRouter } from "next/router";
import { useUser } from "../../context/authContext";

import withUserAuth from "../Members/Account/HOC/withUserAuth";
import { MembersLayout } from "./members/MembersLayout";
import { PublicLayout } from "./public/PublicLayout";

const Layout = ({ children }) => {
  const { user } = useUser();
  const router = useRouter();

  const AuthenticatedMembersLayout = withUserAuth(MembersLayout); // Wrap the MembersLayout with the HOC
  const isMemberPage = router.pathname.includes("members");
  const SelectedNavbar = user ? <NavbarMembers /> : <NavbarMain />;
  const SelectedLayout = isMemberPage ? (
    <AuthenticatedMembersLayout>{children}</AuthenticatedMembersLayout>
  ) : (
    <PublicLayout>{children}</PublicLayout>
  );

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
