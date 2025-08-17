// TODO: Implement Graphics Options
import { useEffect } from 'react';
import { useGetTemplateParticles } from '../../../../../Hooks/useCustomizer';
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

export const Particles = ({
  setSecondaryFilterOptions,
  secondaryFilterOptions,
}) => {
  const [templateParticles, fetchTemplateParticles] = useGetTemplateParticles();

  useEffect(() => {
    if (fetchTemplateParticles && !templateParticles) {
      fetchTemplateParticles(true);
    }
  }, [fetchTemplateParticles, templateParticles]);

  const handleChange = value => {
    const getItem = templateParticles?.data?.find(item => item.id === value);
    console.log('getItem', getItem);
    setSecondaryFilterOptions({
      ...secondaryFilterOptions,
      particle: {
        id: getItem.id,
        type: getItem.attributes.particleType,
        particleCount: getItem.attributes.particleCount,
        speed: getItem.attributes.speed,
        direction: getItem.attributes.direction,
        animation: getItem.attributes.animationType,
      },
    });
    return;
  };

  return (
    <FixturaCustomSelect
      label='Particles Options'
      placeholder='Preview Particles Options'
      data={getTemplatePaletteOptions(templateParticles)}
      value={secondaryFilterOptions.particle?.id || ''}
      onChange={handleChange}
      marginBottom={0}
    />
  );
};
