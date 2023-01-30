// Components
import Meta from "./Meta";
import Navbar from "./NavbarTwo";
import Footer from "./FooterDark";
import { useRouter } from "next/router";
import { useFetchUser, UserProvider } from "../../lib/authContext";
import { AccountDetailsProvider } from "../../lib/userContext";

const Layout = ({ children }) => {
  const { user, loading } = useFetchUser();


  const router = useRouter();
  const path = router.pathname;
  const className = path.includes("members")
    ? "navbar-style-3"
    : "navbar-style-2";

  return (
    <UserProvider value={{ user, loading }}>
      <AccountDetailsProvider>
        <Meta />
        <div className="Container">
          <Navbar navBarClass={className} />
          <main>{children}</main>
          <Footer />
        </div>
      </AccountDetailsProvider>
    </UserProvider>
  );
};

export default Layout;

/* const LoadingPage = ()=>{
        return(
            <div className={StructureStyles.Outer}>
                <ContentContainer>
                <H2>Fetching ...</H2> 
                <LoadingAnimation />
                </ContentContainer>
            </div>
        ) 
}
 */
