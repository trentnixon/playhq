import { useState } from "react";
import { getIdFromLocalCookie } from "../../../lib/auth";
import { fetcher } from "../../../lib/api";
import Cookies from "js-cookie";

import { useCreateScheduler } from "../../../Hooks/useScheduler";
import { BTN_ONCLICK } from "../Common/utils/Buttons";
import { Box } from "@mantine/core";
import { FixturaLoading } from "../Common/Loading";

export const CreateAccountInit = ({ setAccountsetup }) => {
  const [ACCOUNTID, setACCOUNTID] = useState(false);
  const [data, CreateData] = useCreateScheduler();
  const [loading, setLoading] = useState(false);

  const createAccount = async (ID) => {
    if (!ACCOUNTID) {
      try {
        const data = await postAccountData(ID);
        setAccountsetup(data);
        setACCOUNTID(true);
        CreateData(data.data.id); 
      } catch (error) {
        console.error(error);
      } finally {
        //setLoading(false);
      }
    }
  };

  const postAccountData = (ID) => {
    return fetcher(`${process.env.NEXT_PUBLIC_STRAPI_URL}/accounts`, {
      method: "POST",
      body: JSON.stringify({
        data: {
          user: [ID],
          theme: [7],
          template: [1],
          audio_option: [1],
        },
      }),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${Cookies.get("jwt")}`,
      },
    });
  };

  const fetchData = async () => {
    setLoading(true);
    const ID = await getIdFromLocalCookie();
    createAccount(ID);
  };

  return (
    <Box
      sx={(theme) => ({
        padding: theme.spacing.md,
        border: `1px solid ${theme.colors.members[1]}`,
        backgroundColor: theme.colors.members[1],
        borderRadius: "5px",
        textAlign: "center",
      })}
    >
      {loading ? (
        <FixturaLoading />
      ) : (
        <BTN_ONCLICK
          LABEL={"Let's Get Started"}
          HANDLE={fetchData}
          THEME="success"
        />
      )}
    </Box>
  );
};
