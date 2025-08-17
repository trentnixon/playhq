// Display Template Palettes

import { useEffect } from 'react';
import { useGetTemplatePalettes } from '../../../../../Hooks/useCustomizer';
import { FixturaCustomSelect } from '../../../../Members/Common/utils/Selects';

const getTemplatePaletteOptions = templatePalettes => {
  if (!templatePalettes || !templatePalettes.data)
    return [{ label: 'None', value: '' }];
  return templatePalettes.data.map(palette => ({
    label: palette.attributes.name,
    value: palette.id, // Use id for value
    id: palette.id,
  }));
};

export const TemplatePalettes = props => {
  const { selectedDesignOptions, setSelectedDesignOptions } = props;

  const [templatePalettes, fetchTemplatePalettes] = useGetTemplatePalettes();

  useEffect(() => {
    if (!templatePalettes) fetchTemplatePalettes();
  }, [fetchTemplatePalettes, templatePalettes]);

  const handleChange = value => {
    const getItem = templatePalettes?.data?.find(item => item.id === value);
    setSelectedDesignOptions({
      ...selectedDesignOptions,
      selectedTemplatePalette: {
        id: getItem.id,
        value: getItem.attributes.value,
      },
    });
    return;
  };

  if (!templatePalettes) return null;
  return (
    <FixturaCustomSelect
      label='Color Palettes'
      description='Preview the color palettes based on your brand colors'
      placeholder='Preview Color Options'
      data={getTemplatePaletteOptions(templatePalettes)}
      value={selectedDesignOptions.selectedTemplatePalette.id || ''}
      onChange={handleChange}
      marginBottom={0}
    />
  );
};
