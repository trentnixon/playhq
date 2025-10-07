// TODO: Implement Graphics Options
import { useEffect } from 'react';
import { useGetTemplateNoises } from '../../../../../Hooks/useCustomizer';
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

export const Graphics = ({
  setSecondaryFilterOptions,
  secondaryFilterOptions,
}) => {
  const [templateNoises, fetchTemplateNoises] = useGetTemplateNoises();

  useEffect(() => {
    if (fetchTemplateNoises && !templateNoises) {
      fetchTemplateNoises(true);
    }
  }, [fetchTemplateNoises, templateNoises]);

  const handleChange = value => {
    const getItem = templateNoises?.data?.find(item => item.id === value);

    setSecondaryFilterOptions({
      ...secondaryFilterOptions,
      noise: {
        id: getItem.id,
        type: getItem.attributes.noiseType,
      },
    });
    return;
  };

  return (
    <FixturaCustomSelect
      label='Graphics Options'
      placeholder='Preview Graphics Options'
      data={getTemplatePaletteOptions(templateNoises)}
      value={secondaryFilterOptions.noise?.id || ''}
      onChange={handleChange}
      marginBottom={0}
      description=''
    />
  );
};
