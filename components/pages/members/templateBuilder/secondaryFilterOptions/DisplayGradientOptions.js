// TODO: Implement Graphics Options
import { useEffect } from 'react';
import { useGetTemplateGradients } from '../../../../../Hooks/useCustomizer';
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

export const Gradient = ({
  setSecondaryFilterOptions,
  secondaryFilterOptions,
}) => {
  const [templateGradients, fetchTemplateGradients] = useGetTemplateGradients();
  useEffect(() => {
    if (fetchTemplateGradients && !templateGradients) {
      fetchTemplateGradients(true);
    }
  }, [fetchTemplateGradients, templateGradients]);

  const handleChange = value => {
    const getItem = templateGradients?.data?.find(item => item.id === value);

    setSecondaryFilterOptions({
      ...secondaryFilterOptions,
      gradient: {
        id: getItem.id,
        type: getItem.attributes.type,
        direction: getItem.attributes.direction,
      },
    });
    return;
  };

  return (
    <FixturaCustomSelect
      label='Gradient Options'
      placeholder='Preview Gradient Options'
      data={getTemplatePaletteOptions(templateGradients)}
      value={secondaryFilterOptions.gradient?.id || 'None'}
      onChange={handleChange}
      marginBottom={0}
    />
  );
};
