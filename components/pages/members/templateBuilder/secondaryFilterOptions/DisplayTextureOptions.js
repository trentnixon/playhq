// Display Texture Options
import { useEffect } from 'react';
import { useGetTemplateTextures } from '../../../../../Hooks/useCustomizer';
import { FixturaCustomSelect } from '../../../../Members/Common/utils/Selects';
import { Gradient } from '@/components/pages/members/templateBuilder/secondaryFilterOptions/DisplayGradientOptions';

const getTemplateTextureOptions = templateTextures => {
  if (!templateTextures || !templateTextures.data)
    return [{ label: 'None', value: 2 }];
  return [
    ...templateTextures.data.map(texture => ({
      label: texture.attributes.Name,
      value: texture.id,
    })),
  ];
};

export const TextureOptions = ({
  setSecondaryFilterOptions,
  secondaryFilterOptions,
}) => {
  const [templateTextures, fetchTemplateTextures] = useGetTemplateTextures();

  useEffect(() => {
    if (fetchTemplateTextures && !templateTextures) {
      fetchTemplateTextures(true);
    }
  }, [fetchTemplateTextures, templateTextures]);

  // Update texture data when templateTextures are loaded and we have a saved texture
  useEffect(() => {
    if (
      templateTextures &&
      secondaryFilterOptions.texture?.id &&
      !secondaryFilterOptions.texture.url
    ) {
      const savedTexture = templateTextures.data?.find(
        item => item.id === secondaryFilterOptions.texture.id
      );
      if (savedTexture) {
        console.log(
          '[TextureOptions] Processing saved texture:',
          secondaryFilterOptions.texture.id
        );

        const updatedTextureData = {
          ...secondaryFilterOptions.texture,
          url: savedTexture.attributes.texture?.data?.attributes?.url || null,
        };

        const updatedOptions = {
          ...secondaryFilterOptions,
          texture: updatedTextureData,
        };

        setSecondaryFilterOptions(updatedOptions);
      }
    }
  }, [templateTextures, secondaryFilterOptions, setSecondaryFilterOptions]);

  const handleChange = value => {
    const getItem = templateTextures?.data?.find(item => item.id === value);

    const newTextureData = {
      id: getItem.id,
      name: getItem.attributes.Name,
      opacity: getItem.attributes.opacity,
      blendMode: getItem.attributes.blendMode,
      url: getItem.attributes.texture?.data?.attributes?.url || null,
    };

    const updatedOptions = {
      ...secondaryFilterOptions,
      texture: newTextureData,
    };

    setSecondaryFilterOptions(updatedOptions);
    return;
  };

  return (
    <>
      <FixturaCustomSelect
        label='Texture Options'
        description='Select a texture style for your template'
        placeholder='Preview Texture Options'
        data={getTemplateTextureOptions(templateTextures)}
        value={secondaryFilterOptions.texture?.id || ''}
        onChange={handleChange}
        marginBottom={0}
      />
      <Gradient
        setSecondaryFilterOptions={setSecondaryFilterOptions}
        secondaryFilterOptions={secondaryFilterOptions}
      />
    </>
  );
};
