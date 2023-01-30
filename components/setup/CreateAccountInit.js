import { useEffect, useState } from "react";
import { getIdFromLocalCookie } from "../../lib/auth";
import { fetcher } from "../../lib/api";
import Cookies from "js-cookie";

import { useCreateScheduler } from "../../Hooks/useScheduler";
import { BTN_ONCLICK } from "../Members/Common/utils/Buttons";
export const CreateAccountInit = ({ setAccountsetup }) => {
  const [ACCOUNTID, setACCOUNTID] = useState(false);
  const [data, CreateData] = useCreateScheduler();
  const CreateAccount = (ID) => {
    if (!ACCOUNTID) {
      fetcher(`${process.env.NEXT_PUBLIC_STRAPI_URL}/accounts`, {
        method: "POST",
        body: JSON.stringify({
          data: {
            user: [ID],
          },
        }),
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${Cookies.get("jwt")}`,
        },
      })
        .then((data) => {
          console.log(data.data.id);
          setAccountsetup(data);
          setACCOUNTID(true);
          CreateData(data.data.id);
        })
        .catch((error) => console.error(error));
    }
  };

  async function fetchData() {
    const ID = await getIdFromLocalCookie();
    CreateAccount(ID);
  }

  return <BTN_ONCLICK LABEL={"Next"} HANDLE={fetchData} THEME="success"/>;
  
};
