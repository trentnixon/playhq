import React, { useEffect, useContext } from 'react';
import Router from "next/router";
import { useAccountDetails } from '../../../../lib/userContext';
import { useUser } from '../../../../lib/authContext';


const HasCompletedStartSequence = ({ children }) => {

  const { account } = useAccountDetails();
  const { user, loading } = useUser();

  useEffect(() => {
    if (!loading) {
      // Check if setup check has already been performed in this session
      const checkPerformed = sessionStorage.getItem('setupCheckPerformed');

      if (!checkPerformed) {
        if (!user ||  account === null || !account?.attributes.hasCompletedStartSequence) {
          // Setup check has not been performed, redirect to setup page and mark check as performed
          sessionStorage.setItem('setupCheckPerformed', 'true');
          Router.push("/members/setup/");
        } else {
          // Setup check has been performed and setup is complete, redirect to account page and mark check as performed
          sessionStorage.setItem('setupCheckPerformed', 'true');
          Router.push("/members/account/");
        }
      }
    }
  }, [user, loading, account]);

  // Render nothing while user details are loading
  if (loading) return null;

  return children;
};

export default HasCompletedStartSequence;
