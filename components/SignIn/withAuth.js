import { useEffect } from "react";
import Router from "next/router";
import { getAccountFromLocalCookie } from "../../lib/auth";
import Cookies from "js-cookie";
import { fetcher } from "../../lib/api";
function withAuth(WrappedComponent) {

  // eslint-disable-next-line react/display-name
  return function (props) {


    const Redirect=()=>{
      Router.push("/members/setup"); 
      return;
    }

    const FindisSet = async(check)=>{
      const res = await fetcher(
        `${process.env.NEXT_PUBLIC_STRAPI_URL}/accounts/${check}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${Cookies.get("jwt")}`,
          },
        }
      );

      console.log(check, res.data?.attributes.isSetup)
     //return 
     if ( res.data?.attributes.isSetup === false) { 
          Redirect()
        }else{
          return true
        }
    }

    
    useEffect(() => {
      const check = getAccountFromLocalCookie();
      console.log(check);

        if(check === 'undefined'){
          Redirect()
        }else{
          FindisSet(check)
        }
          
          
      
    
    }, []);

    return <WrappedComponent {...props} />; 
  };
}

export default withAuth;
