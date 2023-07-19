import React from "react";
import { useState } from "react";
import { BTN_ONCLICK } from "../Common/utils/Buttons";
import { useAccountDetails } from "../../../lib/userContext";

export const BTN_ChangePlan = ({ setChangePlan, changePlan }) => {
  const { account, ReRender } = useAccountDetails();
  const [userAccount, setUserAccount] = useState(account);
  const [ORDER, setOrder] = useState(
    userAccount?.attributes?.order?.data?.attributes
  );

  // Check if the subscription is active
  const isActive = ORDER?.isActive && ORDER?.Status && !ORDER?.cancel_at_period_end;

  return ORDER === undefined || !isActive ? (
    false
  ) : (
    <BTN_ONCLICK
      LABEL={changePlan ? 'Close Plans' : "Change Plan"}
      HANDLE={() => {
        setChangePlan(!changePlan);
      }}
      THEME="cta"
    />
  );
};
export default BTN_ChangePlan;
