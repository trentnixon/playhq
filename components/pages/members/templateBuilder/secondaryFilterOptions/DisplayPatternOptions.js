// TODO: Implement Graphics Options
import { useEffect } from 'react';
import { useGetTemplatePatterns } from '../../../../../Hooks/useCustomizer';
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

export const Pattern = ({
  setSecondaryFilterOptions,
  secondaryFilterOptions,
}) => {
  const [templatePatterns, fetchTemplatePatterns] = useGetTemplatePatterns();

  useEffect(() => {
    if (fetchTemplatePatterns && !templatePatterns) {
      fetchTemplatePatterns(true);
    }
  }, [fetchTemplatePatterns, templatePatterns]);

  const handleChange = value => {
    const getItem = templatePatterns?.data?.find(item => item.id === value);
    setSecondaryFilterOptions({
      ...secondaryFilterOptions,
      pattern: {
        id: getItem.id,
        type: getItem.attributes.patternType,
        animation: getItem.attributes.animation,
        scale: getItem.attributes.scale,
        rotation: getItem.attributes.rotation,
        opacity: getItem.attributes.opacity,
        animationDuration: getItem.attributes.animationDuration,
        animationSpeed: getItem.attributes.animationSpeed,
      },
    });
    return;
  };

  return (
    <FixturaCustomSelect
      label='Pattern Options'
      placeholder='Preview Pattern Options'
      data={getTemplatePaletteOptions(templatePatterns)}
      value={secondaryFilterOptions.pattern?.id || ''}
      onChange={handleChange}
      marginBottom={0}
    />
  );
};
