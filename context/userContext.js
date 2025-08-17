import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  useRef,
} from 'react';
import { useAccount } from '../Hooks/useAccount';
import { getTrialStatus } from '../lib/actions';
import { getTrialNotificationStatus } from '../lib/members/getTrialNotificationStatus';

export const AccountDetails = createContext({
  account: null,
  ReRender: () => {},
  forceRefresh: () => {},
});
export const useAccountDetails = () => useContext(AccountDetails);

export const AccountDetailsProvider = ({ children }) => {
  const [account, setAccount] = useState(null);
  const [Accountdata, fetch] = useAccount();
  const processedDataRef = useRef(null);

  const ReRender = useCallback(() => {
    // Clear processed data to force fresh processing
    processedDataRef.current = null;
    // Force a fresh fetch by calling fetch directly
    fetch();
  }, [fetch]);

  // Force refresh function that clears processed data and fetches new data
  const forceRefresh = useCallback(() => {
    processedDataRef.current = null;
    fetch();
  }, [fetch]);

  useEffect(() => {
    fetch();
  }, [fetch]);

  useEffect(() => {
    if (Accountdata && processedDataRef.current !== Accountdata.id) {
      processedDataRef.current = Accountdata.id;

      // Determine the trial status
      const trialStatus = getTrialStatus(Accountdata);

      // Add the trialStatus to the account data object
      const updatedAccountData = {
        ...Accountdata,
        attributes: {
          ...Accountdata.attributes,
          trialStatus:
            trialStatus && typeof trialStatus === 'object'
              ? trialStatus.status
              : false,
          trialNotificationStatus: getTrialNotificationStatus(Accountdata),
        },
      };
      setAccount(updatedAccountData);
    }
  }, [Accountdata]);

  return (
    <AccountDetails.Provider value={{ account, ReRender, forceRefresh }}>
      {children}
    </AccountDetails.Provider>
  );
};
