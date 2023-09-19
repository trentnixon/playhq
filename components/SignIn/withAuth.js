import { useEffect, useState } from "react";
import Router from "next/router";
import { getAccountFromLocalCookie } from "../../lib/auth";
import Cookies from "js-cookie";
import { fetcher } from "../../lib/api";
import { useUser } from "../../lib/authContext";
import { SignInLoading } from "./SignInLoading";
//import { useAccountDetails } from "../../lib/userContext";
function withAuth(WrappedComponent) { 

  return function (props) {
    console.log("withAuth PROPS", props)
    const [loading, setLoading] = useState(true);
    const { user: userFromProps } = props;
    const { user: userFromHook } = useUser();
    const actualUser = userFromProps || userFromHook;
    console.log("userFromHook", userFromHook)
    
    const Redirect = () => {
      Router.push("/members/setup");
    }; 

    const FindisSet = async (check) => {
      const res = await fetcher(
        `${process.env.NEXT_PUBLIC_STRAPI_URL}/accounts/${check}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${Cookies.get("jwt")}`,
          },
        }
      );

      if (!res.data || res.error?.status === 404) {
        Redirect();
        return;
      }

      if (res.data?.attributes.isSetup === false) {
        Redirect();
        return;
      }

      return true;
    }; 

    useEffect(() => {
      setLoading(true);
      const check = getAccountFromLocalCookie();
      console.log("HOC", check)
      if (check === "undefined") {
        Redirect(); 
      } else {
        FindisSet(check).finally(() => {
          setLoading(false);
        });
      }
    }, []);

    if (loading) {
      return <SignInLoading />;
    }

    return <WrappedComponent {...props} user={actualUser} />;
  };
}

export default withAuth;
