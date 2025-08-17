import React, { useEffect, useState, useCallback, useMemo } from 'react';
import { useAccountDetails } from '../../../context/userContext';
import { useUser } from '../../../context/authContext';
import cookie from 'cookie';
import { fetcher } from '../../../lib/api';
import { PageTitle } from '../../../components/Members/Common/Type';
import { MembersWrapper } from '../../../components/Members/Common/Containers';
import { LoadingStateWrapper } from '../../../components/Members/Account/HOC/LoadingStateWrapper';
import Meta from '../../../components/Layouts/Meta';
import { IconTemplate } from '@tabler/icons-react';
import { BespokeGraphicsCTA } from '../../../components/Common/live-demo/BespokeGraphicsCTA';
import { BuilderFrame } from '../../../components/pages/members/templateBuilder/builderFrame';
import { useGetTemplateOptions } from '../../../Hooks/useGetTemplate';
import { useGetTemplateCategories } from '../../../Hooks/useCustomizer';
import { Grid } from '@mantine/core';
import { SaveDesignOptionsButton } from '../../../components/pages/members/templateBuilder/SaveDesignOptionsButton';
import { P, SubHeaders } from '../../../components/Members/Common/Type';
import { TemplateBuilderFilterContainer } from '../../../components/pages/members/templateBuilder/TemplateBuilderFilterContainer';
import { extractDesignOptions } from '../../../components/pages/members/templateBuilder/libs/extractDesignOptions';

const qs = require('qs');

const query = qs.stringify(
  {
    populate: [
      'template',
      'theme',
      'audio_option',
      'account_media_libraries',
      'account_media_libraries.imageId',
      'template_option',
    ],
  },
  {
    encodeValuesOnly: true,
  }
);

const Design = ({ Response }) => {
  const { account } = useAccountDetails();
  const { user } = useUser();
  const [templateOptions, isLoading, GetTemplateOptions] =
    useGetTemplateOptions();
  const [templateCategories, fetchTemplateCategories] =
    useGetTemplateCategories();

  // Memoize initial state to avoid unnecessary recalculations
  const initialDesignOptions = useMemo(
    () =>
      extractDesignOptions({
        attributes: { template_option: { data: templateOptions } },
      }),
    [templateOptions]
  );

  const [selectedDesignOptions, setSelectedDesignOptions] =
    useState(initialDesignOptions);

  // Update state if templateOptions changes
  useEffect(() => {
    setSelectedDesignOptions(
      extractDesignOptions({
        attributes: { template_option: { data: templateOptions } },
      })
    );
  }, [templateOptions]);

  // Fetch template options
  useEffect(() => {
    if (!templateOptions) {
      if (Response?.attributes.template_option.data.id) {
        GetTemplateOptions(Response?.attributes.template_option.data.id);
      }
    }
  }, [Response, GetTemplateOptions, templateOptions]);

  // Fetch template categories
  useEffect(() => {
    if (fetchTemplateCategories && !templateCategories) {
      fetchTemplateCategories(true);
    }
  }, [fetchTemplateCategories, templateCategories]);

  const setSelectedDesignOptionsCallback = useCallback(options => {
    setSelectedDesignOptions(options);
  }, []);

  if (isLoading) {
    return (
      <LoadingStateWrapper conditions={[user, account]}>
        <MembersWrapper>
          <Meta
            title='Fixtura Member Templates - Tailor Your Graphics'
            description="Effortlessly customize your club's graphics with Fixtura's member-exclusive Templates. Choose, design, and showcase with ease."
            keywords='Custom graphics, Fixtura, club branding, design customization, sports visual content'
          />
          <PageTitle
            Copy={'LOADING TEMPLATE OPTIONS'}
            ICON={<IconTemplate size={40} />}
          />
        </MembersWrapper>
      </LoadingStateWrapper>
    );
  }

  return (
    <LoadingStateWrapper conditions={[user, account]}>
      <MembersWrapper>
        <Meta
          title='Fixtura Member Templates - Tailor Your Graphics'
          description="Effortlessly customize your club's graphics with Fixtura's member-exclusive Templates. Choose, design, and showcase with ease."
          keywords='Custom graphics, Fixtura, club branding, design customization, sports visual content'
        />
        <Grid>
          <Grid.Col span={12} sm={4} md={3}>
            {/* Sidebar content can be added here */}

            <TemplateBuilderFilterContainer
              selectedDesignOptions={selectedDesignOptions}
              setSelectedDesignOptions={setSelectedDesignOptions}
              templateCategories={templateCategories}
            />
            <div className='flex flex-col gap-4 justify-between items-center px-2 mt-2'>
              <SaveDesignOptionsButton
                selectedDesignOptions={selectedDesignOptions}
              />
            </div>
          </Grid.Col>
          <Grid.Col span={12} sm={8} md={9}>
            <PageTitle Copy={'Templates'} ICON={<IconTemplate size={40} />} />

            {/* Filter Components */}
            <SubHeaders
              Copy={'Customize Your Assets'}
              ICON={<IconTemplate size={30} />}
            />

            {/* Builder Frame - Now simplified */}
            <BuilderFrame
              selectedDesignOptions={selectedDesignOptions}
              setSelectedDesignOptions={setSelectedDesignOptionsCallback}
            />

            <BespokeGraphicsCTA />
          </Grid.Col>
        </Grid>
      </MembersWrapper>
    </LoadingStateWrapper>
  );
};

export async function getServerSideProps(ctx) {
  // Parse cookies from the incoming headers
  const parsedCookies = cookie.parse(ctx.req.headers.cookie || '');
  const jwt = parsedCookies['jwt'];
  const linkedAccount = parsedCookies['LinkedAccount'];

  try {
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
    return { props: { Response } };
  } catch (error) {
    console.error('Error fetching account data:', error);
    return {
      props: {
        Response: null,
        error: error.message,
      },
    };
  }
}

export default Design;
