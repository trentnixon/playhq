import { Center, Paper } from '@mantine/core';
import { useEffect, useMemo, useState } from 'react';
import ImageRow from './ImageRow';
import { extractDesignOptions } from '../../../templateBuilder/libs/extractDesignOptions';
import { useGetTemplateOptions } from '../../../../../../Hooks/useGetTemplate';
import { useGetTemplateTextures } from '../../../../../../Hooks/useCustomizer';

export const Previewer = ({ account }) => {
  const [templateOptions, isLoading, GetTemplateOptions] =
    useGetTemplateOptions();
  const [templateTextures, fetchTemplateTextures] = useGetTemplateTextures();
  const [resolvedDesignOptions, setResolvedDesignOptions] = useState(null);

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

  // Fetch template textures when component mounts
  useEffect(() => {
    if (fetchTemplateTextures && !templateTextures) {
      fetchTemplateTextures(true);
    }
  }, [fetchTemplateTextures, templateTextures]);

  // Resolve texture URLs
  useEffect(() => {
    if (
      initialDesignOptions &&
      templateTextures &&
      initialDesignOptions.selectedSecondaryFilterOptions?.texture?.id &&
      !initialDesignOptions.selectedSecondaryFilterOptions.texture.url
    ) {
      const savedTexture = templateTextures.data?.find(
        item =>
          item.id ===
          initialDesignOptions.selectedSecondaryFilterOptions.texture.id
      );

      if (savedTexture) {
        const updatedTextureData = {
          ...initialDesignOptions.selectedSecondaryFilterOptions.texture,
          url: savedTexture.attributes.texture?.data?.attributes?.url || null,
        };

        setResolvedDesignOptions({
          ...initialDesignOptions,
          selectedSecondaryFilterOptions: {
            ...initialDesignOptions.selectedSecondaryFilterOptions,
            texture: updatedTextureData,
          },
        });
      }
    } else if (initialDesignOptions) {
      setResolvedDesignOptions(initialDesignOptions);
    }
  }, [initialDesignOptions, templateTextures]);

  if (isLoading) {
    return (
      <Paper shadow='0' pb='sm'>
        <Center>Loading template options...</Center>
      </Paper>
    );
  }

  const designOptionsToUse = resolvedDesignOptions || initialDesignOptions;

  return (
    <Paper shadow='0' pb='sm'>
      <Center>
        <ImageRow selectedDesignOptions={designOptionsToUse} />
      </Center>
    </Paper>
  );
};
