// Components
import Meta from "./Meta";
import Footer from "./Fixtura_Footer";
import {  UserProvider } from "../../context/authContext";
import { AccountDetailsProvider } from "../../context/userContext";

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
