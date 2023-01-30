import { createContext, useContext, useEffect, useState } from "react";
import { useAccount } from "../Hooks/useAccount";

export const AccountDetails = createContext({account:null});
export const useAccountDetails= () => useContext(AccountDetails);

export const AccountDetailsProvider = ({ children }) => {
  const [account, setAccount] = useState(null);
  const [Accountdata, fetch] = useAccount();
  const [settings, setSettings] = useState(false);

    const ReRender=()=>{
      console.log("ReRender Rendering NOW")
        setSettings(!settings)
    }


  useEffect(() => {
    fetch();
  }, [settings]);
  useEffect(() => {
    setAccount(Accountdata);
  }, [Accountdata]);

  return (
    <AccountDetails.Provider value={{ account,ReRender }}>
      {children}
    </AccountDetails.Provider>
  );
};
