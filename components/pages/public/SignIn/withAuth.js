import { useEffect, useState } from "react";
import Router from "next/router";
import { getAccountFromLocalCookie } from "../../../../lib/auth";
import Cookies from "js-cookie";
import { fetcher } from "../../../../lib/api";
import { useUser } from "../../../../context/authContext";
import { SignInLoading } from "./SignInLoading";
//import { useAccountDetails } from "../../context/userContext";
function withAuth(WrappedComponent) {
  return function (props) {

    const [loading, setLoading] = useState(true);
    const { user: userFromProps } = props;
    const { user: userFromHook } = useUser();
    const actualUser = userFromProps || userFromHook;


    const Redirect = () => {
      Router.push("/members/setup");
    };

    const FindisSet = async (check) => {
      try {
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
          console.log("Account not found or other error:", res.error);
          Redirect();
          return;
        }

        if (res.data?.attributes.isSetup === false) {
          console.log("isSetup is explicitly false");
          Redirect();
          return;
        }
        if (typeof res.data?.attributes.isSetup === "undefined") {
          console.log("isSetup is undefined");
        }
        return true;
      } catch (error) {
        console.error("Network or other error:", error);
        // Decide whether to redirect or not based on the nature of the error
      }
    };

    useEffect(() => {
      setLoading(true);
      const check = getAccountFromLocalCookie();

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
