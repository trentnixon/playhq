import { createContext, useContext, useEffect, useState } from "react";
import { useAccount } from "../Hooks/useAccount";
import { getTrialStatus } from "../lib/actions";
import { getTrialNotificationStatus } from "../lib/members/getTrialNotificationStatus";

export const AccountDetails = createContext({ account: null });
export const useAccountDetails = () => useContext(AccountDetails);

export const AccountDetailsProvider = ({ children }) => {
  const [account, setAccount] = useState(null);
  const [Accountdata, fetch] = useAccount();
  const [settings, setSettings] = useState(false);

  const ReRender = () => {
    setSettings(!settings);
  };

  useEffect(() => {
    console.log("Fetching data...");
    fetch();
  }, [settings]);

  useEffect(() => {
    if (Accountdata) {
      console.log("Data fetched: ", Accountdata);
      // Determine the trial status
      const trialStatus = getTrialStatus(Accountdata);

      // Add the trialStatus to the account data object
      const updatedAccountData = {
        ...Accountdata,
        attributes: {
          ...Accountdata.attributes,
          trialStatus: trialStatus.status,
          trialNotificationStatus: getTrialNotificationStatus(account),
        },
      };
      setAccount(updatedAccountData);
    }
  }, [Accountdata]);

  return (
    <AccountDetails.Provider value={{ account, ReRender }}>
      {children}
    </AccountDetails.Provider>
  );
};
