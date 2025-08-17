import { Center, Paper } from '@mantine/core';
import { useEffect, useMemo, useState } from 'react';
import ImageRow from './ImageRow';
import { extractDesignOptions } from '../../../templateBuilder/libs/extractDesignOptions';
import { useGetTemplateOptions } from '../../../../../../Hooks/useGetTemplate';

export const Previewer = ({ account }) => {
  const [templateOptions, isLoading, GetTemplateOptions] =
    useGetTemplateOptions();

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

  if (isLoading) {
    return (
      <Paper shadow='0' pb='sm'>
        <Center>Loading template options...</Center>
      </Paper>
    );
  }

  return (
    <Paper shadow='0' pb='sm'>
      <Center>
        <ImageRow selectedDesignOptions={initialDesignOptions} />
      </Center>
    </Paper>
  );
};
