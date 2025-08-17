import { Center, Paper } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { useMantineTheme } from '@mantine/styles';
import { useEffect, useMemo, useState } from 'react';
import { useGetTemplateOptions } from '../../../../../../Hooks/useGetTemplate';
import { extractDesignOptions } from '../../../templateBuilder/libs/extractDesignOptions';
import SponsorPreviewThumbRow from './SponsorPreviewThumbRow';

export const SponsorsPreviewer = ({ account }) => {
  const theme = useMantineTheme();
  const [templateOptions, isLoading, GetTemplateOptions] =
    useGetTemplateOptions();

  // Extract design options from template
  const initialDesignOptions = useMemo(
    () =>
      extractDesignOptions({
        attributes: { template_option: { data: templateOptions } },
      }),
    [templateOptions]
  );

  // Fetch template options when account changes
  useEffect(() => {
    if (!templateOptions && account?.attributes?.template_option?.data?.id) {
      GetTemplateOptions(account.attributes.template_option.data.id);
    }
  }, [account, GetTemplateOptions, templateOptions]);

  return (
    <Paper shadow='0' pb='sm'>
      <Center>
        <SponsorPreviewThumbRow selectedDesignOptions={initialDesignOptions} />
      </Center>
    </Paper>
  );
};
