// Components
import Meta from "./Meta";
import Footer from "./FooterDark";
import {  UserProvider } from "../../lib/authContext";
import { AccountDetailsProvider } from "../../lib/userContext";

const LayoutNoNavbar = ({ children }) => {
   return (
    <UserProvider> 
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
