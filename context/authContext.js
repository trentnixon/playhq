import React, { createContext, useContext, useEffect, useState } from "react";
import { getUserFromLocalCookie } from "../lib/auth";

// Create a User context
const UserContext = createContext({ user: null, loading: false });
// Hook to use the User context
export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
  const [userState, setUserState] = useState(null); // State to hold the user
  const [loading, setLoading] = useState(true); // State to indicate if user fetch is still happening
  const [shouldReFetch, setShouldReFetch] = useState(false); // State to trigger re-fetching user

  const ReRender = () => {
    setShouldReFetch((prev) => !prev); // Toggle the state to trigger re-fetch
  };

  useEffect(() => {
    console.log("Attempting to fetch user...");

    const fetchUser = async () => {
      // Attempt to get the user from a local cookie
      const fetchedUser = await getUserFromLocalCookie();

      // Set the fetched user into state
      setUserState(fetchedUser);
      setLoading(false);
    };

    fetchUser(); // Fetch the user
  }, [shouldReFetch]); // useEffect will re-run when shouldReFetch changes

  return (
    <UserContext.Provider value={{ user: userState, loading, ReRender }}>
      {children}
    </UserContext.Provider>
  );
};

/* import { createContext, useContext, useEffect, useState } from "react";
import { getUserFromLocalCookie } from "../lib/auth";

let userState;

const User = createContext({ user: null, loading: false });

export const UserProvider = ({ value, children }) => {
  const { user } = value;

  useEffect(() => {
    if (!userState && user) {
      userState = user;
    }
  }, []);

  return <User.Provider value={value}>{children}</User.Provider>;
};

export const useUser = () => useContext(User); 

export const useFetchUser = () => {
  const [data, setUser] = useState({
    user: userState || null,
    loading: userState === undefined,
  });

  useEffect(() => {
    if (userState !== undefined) {
      return;
    }

    let isMounted = true;
    const resolveUser = async () => {
      const user = await getUserFromLocalCookie();

      if (isMounted) {
        setUser({ user, loading: false });
      }
    };
    resolveUser();

    return () => {
      isMounted = false;
    };
  }, []);

  return data;
};
 */
