// DisplayModes.js

import { FixturaCustomSelect } from '../../../../Members/Common/utils/Selects';

export const DisplayModes = props => {
  const { selectedDesignOptions, setSelectedDesignOptions } = props;

  const handleChange = value => {
    const numericValue = Number(value);
    const selectedOption = modeOptions.find(
      option => option.id === numericValue
    );

    setSelectedDesignOptions({
      ...selectedDesignOptions,
      mode: {
        id: numericValue,
        value: selectedOption ? selectedOption.value : '',
      },
    });
    return;
  };

  const modeOptions = [
    { id: 1, value: 'light' },
    { id: 2, value: 'lightAlt' },
    { id: 3, value: 'dark' },
    { id: 4, value: 'darkAlt' },
  ];

  const getModeOptions = () => {
    return modeOptions.map(option => ({
      label: option.value,
      value: option.id,
    }));
  };

  return (
    <>
      <FixturaCustomSelect
        label='Template Mode'
        description='Select a Contrast Mode'
        placeholder='Select a mode'
        data={getModeOptions()}
        value={selectedDesignOptions.mode ? selectedDesignOptions.mode.id : 1}
        onChange={handleChange}
        marginBottom={0}
      />
    </>
  );
};
