import { createContext, useContext, useEffect, useState } from "react";
import { useAccount } from "../Hooks/useAccount";

export const AccountDetails = createContext({account:null});
export const useAccountDetails= () => useContext(AccountDetails);

export const AccountDetailsProvider = ({ children }) => {
  const [account, setAccount] = useState(null);
  const [Accountdata, fetch] = useAccount();
  const [settings, setSettings] = useState(false);

    const ReRender=()=>{
        console.log("Run ReRender")
        setSettings(!settings)
    }


  useEffect(() => {
    console.log("Fetching data...");
    fetch();
  }, [settings]);

  useEffect(() => {
    console.log("Data fetched: ", Accountdata);
    setAccount(Accountdata);
  }, [Accountdata]);

  return (
    <AccountDetails.Provider value={{ account,ReRender }}>
      {children}
    </AccountDetails.Provider>
  );
};
