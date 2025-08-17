import React, { useEffect } from 'react';
import { useGetTemplateImageOptions } from '../../../../../Hooks/useCustomizer';
import { FixturaCustomSelect } from '../../../../Members/Common/utils/Selects';

const getTemplatePaletteOptions = templatePalettes => {
  if (!templatePalettes || !templatePalettes.data)
    return [{ label: 'None', value: 2 }];
  return [
    ...templatePalettes.data.map(palette => ({
      label: palette.attributes.name,
      value: palette.id,
    })),
  ];
};

export const ImageOptions = ({
  setSecondaryFilterOptions,
  secondaryFilterOptions,
}) => {
  const [templateImageOptions, fetchTemplateImageOptions] =
    useGetTemplateImageOptions();

  useEffect(() => {
    if (fetchTemplateImageOptions && !templateImageOptions) {
      console.log('[fetching template image options]');
      fetchTemplateImageOptions(true);
    }
  }, [fetchTemplateImageOptions, templateImageOptions]);

  const handleChange = value => {
    const getItem = templateImageOptions?.data?.find(item => item.id === value);

    setSecondaryFilterOptions({
      ...secondaryFilterOptions,
      image: {
        id: getItem.id,
        type: getItem.attributes.animationType,
        direction: getItem.attributes.animationDirection,
        overlayStyle: getItem.attributes.overlayStyle,
        gradientType: getItem.attributes.gradientType,
        overlayOpacity: getItem.attributes.overlayOpacity,
      },
    });
    return;
  };

  return (
    <FixturaCustomSelect
      label='Image Options'
      placeholder='Preview Image Options'
      data={getTemplatePaletteOptions(templateImageOptions)}
      value={secondaryFilterOptions.image?.id || 'None'}
      onChange={handleChange}
      marginBottom={0}
    />
  );
};
