import React from 'react';
import { BTN_TOEXTLINK } from '../../../../../Members/Common/utils/Buttons';

export const RecentRenderButton = ({ renders, account, token }) => {
  if (renders.length === 0) {
    return null;
  }
  if (!token) {
    return null;
  }
  const mostRecentRender = renders.reduce((latest, current) => {
    return new Date(latest.createdAt) > new Date(current.createdAt)
      ? latest
      : current;
  });

  const renderUrl = `https://contentv2.fixtura.com.au/${
    account.id
  }/${account.attributes.Sport.toLowerCase()}/${
    mostRecentRender.id
  }?token=${token}`;

  return <BTN_TOEXTLINK LABEL={`Latest Bundle`} URL={renderUrl} THEME='cta' />;
};
