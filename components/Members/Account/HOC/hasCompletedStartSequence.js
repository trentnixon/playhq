import React, { useEffect, useContext } from "react";
import Router from "next/router";
import { useAccountDetails } from "../../../../context/userContext";
import { useUser } from "../../../../context/authContext";

const HasCompletedStartSequence = ({ children }) => {
  const { account } = useAccountDetails();
  const { user, loading } = useUser();

  useEffect(() => {
    if (!loading) {
      // Check if setup check has already been performed in this session
      const checkPerformed = sessionStorage.getItem("setupCheckPerformed");

      if (!checkPerformed) {
        if (account === null) return;

        if (!user || account?.attributes?.hasCompletedStartSequence === false) {
          // Setup check has not been performed, redirect to setup page and mark check as performed
          sessionStorage.setItem("setupCheckPerformed", "true");
          Router.push("/members/setup/");
        } else {
          // Setup check has been performed and setup is complete, redirect to account page and mark check as performed
          sessionStorage.setItem("setupCheckPerformed", "true");
          Router.push("/members/");
        }
      }
    }
  }, [user, loading, account]);

  // Render nothing while user details are loading
  if (loading) return null;

  return children;
};

export default HasCompletedStartSequence;
