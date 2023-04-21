// Components
import Meta from "./Meta";
import Footer from "./FooterDark";
import { useFetchUser, UserProvider } from "../../lib/authContext";
import { AccountDetailsProvider } from "../../lib/userContext";

const LayoutNoNavbar = ({ children }) => {
  const { user, loading } = useFetchUser();

  return (
    <UserProvider value={{ user, loading }}>
      <AccountDetailsProvider>
        <Meta />
        <div className="Container Main">
          <main>{children}</main>
          <Footer />
        </div>
      </AccountDetailsProvider>
    </UserProvider>
  );
};

export default LayoutNoNavbar;
