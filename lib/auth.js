import Router from 'next/router';
import Cookies from 'js-cookie';
import { fetcher } from './api';
const qs = require('qs');

export const setToken = async data => {
  try {
    if (typeof window === 'undefined') {
      return;
    }
    //console.log("setToken ", data);
    Cookies.set('id', data.user.id);
    Cookies.set('username', data.user.username);
    Cookies.set('jwt', data.jwt);

    const ACCOUNT = await getAccountIDFromServer();
    Cookies.set('LinkedAccount', ACCOUNT?.account?.id);

    if (!Cookies.get('username')) {
      console.error('Username cookie not set.');
    }
    if (Cookies.get('username')) {
      //Router.reload("/");
    }
  } catch (error) {
    console.error('An error occurred in setToken:', error);
  }
};

export const unsetToken = async () => {
  try {
    if (typeof window === 'undefined') {
      return;
    }
    Cookies.remove('id');
    Cookies.remove('jwt');
    Cookies.remove('username');
    Cookies.remove('LinkedAccount');
  } catch (error) {
    console.error('An error occurred in unsetToken:', error);
  }
};

export const getUserFromLocalCookie = async () => {
  try {
    if (Cookies.get('username')) {
      return Cookies.get('username');
    }
    const jwt = getTokenFromLocalCookie();
    if (!jwt) {
      console.log('JWT not found in local cookie.');
      return;
    }
    const data = await fetcher(
      `${process.env.NEXT_PUBLIC_STRAPI_URL}/users/me`,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${jwt}`,
        },
      }
    );
    return data.username;
  } catch (error) {
    console.error('An error occurred in getUserFromLocalCookie:', error);
    return null;
  }
};

export const getIdFromLocalCookie = async () => {
  try {
    const jwt = getTokenFromLocalCookie();
    if (!jwt) {
      console.log('JWT not found in local cookie.');
      return;
    }
    const data = await fetcher(
      `${process.env.NEXT_PUBLIC_STRAPI_URL}/users/me`,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${jwt}`,
        },
      }
    );
    return data.id;
  } catch (error) {
    console.error('An error occurred in getIdFromLocalCookie:', error);
    return null;
  }
};

export const getAccountIDFromServer = async () => {
  try {
    const jwt = getTokenFromLocalCookie();

    if (!jwt) {
      return null;
    }

    const query = qs.stringify(
      {
        populate: ['account'],
      },
      {
        encodeValuesOnly: true,
      }
    );

    const data = await fetcher(
      `${process.env.NEXT_PUBLIC_STRAPI_URL}/users/me/?${query}`,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${jwt}`,
        },
      }
    );

    return data;
  } catch (error) {
    console.error('💥 getAccountIDFromServer - Error:', error);
    return null;
  }
};

export const setAccountFromLocalCookie = ID => {
  try {
    return Cookies.set('LinkedAccount', ID);
  } catch (error) {
    console.error('An error occurred in setAccountFromLocalCookie:', error);
    return null;
  }
};

export const getAccountFromLocalCookie = () => {
  try {
    return Cookies.get('LinkedAccount');
  } catch (error) {
    console.error('An error occurred in getAccountFromLocalCookie:', error);
    return null;
  }
};

export const getTokenFromLocalCookie = () => {
  try {
    return Cookies.get('jwt');
  } catch (error) {
    console.error('An error occurred in getTokenFromLocalCookie:', error);
    return null;
  }
};

export const getTokenFromServerCookie = req => {
  try {
    if (!req.headers.cookie || '') {
      return undefined;
    }
    const jwtCookie = req.headers.cookie
      .split(';')
      .find(c => c.trim().startsWith('jwt='));
    if (!jwtCookie) {
      return undefined;
    }
    const jwt = jwtCookie.split('=')[1];
    return jwt;
  } catch (error) {
    console.error('An error occurred in getTokenFromServerCookie:', error);
    return null;
  }
};

export const getIdFromServerCookie = req => {
  try {
    if (!req.headers.cookie || '') {
      return undefined;
    }
    const idCookie = req.headers.cookie
      .split(';')
      .find(c => c.trim().startsWith('id='));
    if (!idCookie) {
      return undefined;
    }
    const id = idCookie.split('=')[1];
    return id;
  } catch (error) {
    console.error('An error occurred in getIdFromServerCookie:', error);
    return null;
  }
};
