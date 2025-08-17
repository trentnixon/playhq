// Display Background Options
import { FixturaCustomSelect } from '../../../../Members/Common/utils/Selects';

export const BackgroundOptions = props => {
  const { selectedDesignOptions, setSelectedDesignOptions } = props;

  const backgroundOptions = [
    'Solid',
    'Image',
    'Graphics',
    'Gradient',
    'Pattern',
    'Particle',
  ].map(option => ({ label: option, value: option }));

  const handleChange = value => {
    setSelectedDesignOptions({
      ...selectedDesignOptions,
      selectedBackgroundOptions: value,
    });
  };

  return (
    <FixturaCustomSelect
      label='Background Options'
      description='Cycle our background options to see how they look'
      placeholder='Preview Background Options'
      data={backgroundOptions}
      value={selectedDesignOptions.selectedBackgroundOptions || ''}
      onChange={handleChange}
      marginBottom={0}
    />
  );
};
