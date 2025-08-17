import React, { useEffect, useState } from 'react';
import { useAccountDetails } from '../../../context/userContext';
import { useUser } from '../../../context/authContext';
import cookie from 'cookie'; // Make sure to import the cookie library
import { fetcher } from '../../../lib/api';
import {
  P,
  PageTitle,
  SubHeaders,
} from '../../../components/Members/Common/Type';
import {
  MembersWrapper,
  PageCopyWrapper,
} from '../../../components/Members/Common/Containers';
import { Group, Space } from '@mantine/core';

import { LoadingStateWrapper } from '../../../components/Members/Account/HOC/LoadingStateWrapper';
import { BTN_TOEXTLINK } from '../../../components/Members/Common/utils/Buttons';
import Meta from '../../../components/Layouts/Meta';

import { IconScissors, IconTemplate } from '@tabler/icons-react';
import { SelectATemplateMembers } from '../../../components/pages/members/templates/live-demo/SelectATemplateMembers';
import { BespokeGraphicsCTA } from '../../../components/Common/live-demo/BespokeGraphicsCTA';

const qs = require('qs');

const query = qs.stringify(
  {
    populate: [
      'template',
      'theme',
      'audio_option',
      'account_media_libraries',
      'account_media_libraries.imageId',
    ],
  },
  {
    encodeValuesOnly: true,
  }
);

const Design = ({ Response }) => {
  const { account } = useAccountDetails();
  const [userAccount, setUserAccount] = useState(account);
  const [selectedAsset, setSelectedAsset] = useState('UpComingFixtures');
  const [selectedHeroImage, setHeroImage] = useState(null);
  const [playerKey, setPlayerKey] = useState(Date.now());
  //const [isPlaying, setIsPlaying] = useState(false);
  const { user } = useUser();

  useEffect(() => {}, [userAccount]);
  useEffect(() => {
    setUserAccount(account);
  }, [account]);

  useEffect(() => {
    setPlayerKey(Date.now());
  }, [selectedHeroImage, selectedAsset]);

  return (
    <LoadingStateWrapper conditions={[user, userAccount]}>
      <MembersWrapper>
        <Meta
          title='Fixtura Member Templates - Tailor Your Graphics'
          description="Effortlessly customize your club's graphics with Fixtura's member-exclusive Templates. Choose, design, and showcase with ease."
          keywords='Custom graphics, Fixtura, club branding, design customization, sports visual content'
        />
        <PageTitle Copy={'Templates'} ICON={<IconTemplate size={40} />} />

        <SubHeaders Copy={'Free Templates'} ICON={<IconTemplate size={30} />} />

        <P marginBottom={0}>
          Browse through a diverse range of pre-designed templates. Our
          selection caters to various styles and preferences, offering something
          for every club. New designs are added regularly to keep your content
          fresh and engaging.
        </P>
        <SelectATemplateMembers
          hasMediaItems={
            Response?.attributes.account_media_libraries.data.length
          }
        />
        <BespokeGraphicsCTA />
      </MembersWrapper>
    </LoadingStateWrapper>
  );
};

export async function getServerSideProps(ctx) {
  // Parse cookies from the incoming headers
  const parsedCookies = cookie.parse(ctx.req.headers.cookie || '');
  const jwt = parsedCookies['jwt']; // Use the actual key you set the JWT cookie with
  const linkedAccount = parsedCookies['LinkedAccount']; // Use the actual key

  // Now you can use these in your fetcher
  const response = await fetcher(
    `${process.env.NEXT_PUBLIC_STRAPI_URL}/accounts/${linkedAccount}?${query}`,
    {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${jwt}`,
      },
    }
  );

  const Response = response.data;
  return { props: { Response } }; // Return the response data as props
}

export default Design;
