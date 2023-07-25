import React, { useEffect, useContext } from 'react';
import Router from "next/router";
import { useAccountDetails } from '../../../../lib/userContext';
import { useUser } from '../../../../lib/authContext';


const HasCompletedStartSequence = ({ children }) => {

  const { account } = useAccountDetails();
  const { user, loading } = useUser();

  useEffect(() => {
    if (!loading) {
      
      if (!user ||  account === null || !account?.attributes.hasCompletedStartSequence) {
        Router.push("/members/setup/");
      }else{
        Router.push("/members/account/");
      }
    }
  }, [user, loading, account]);

  // Render nothing while user details are loading
  if (loading) return null;

  return children;
};

export default HasCompletedStartSequence;
