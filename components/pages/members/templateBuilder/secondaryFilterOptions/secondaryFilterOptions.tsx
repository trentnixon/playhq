import React from 'react';
import { useEffect, useState } from 'react';
import { P } from '../../../../Members/Common/Type';
import { ImageOptions } from './DisplayImageOptions';
import { Graphics } from './DisplayGraphicsOptions';
import { Gradient } from './DisplayGradientOptions';
import { Pattern } from './DisplayPatternOptions';
import { Particles } from './DisplayParticlesOptions';

// Secondary Filter Options
export default function SecondaryFilterOptions(props) {
  const { selectedDesignOptions, setSelectedDesignOptions } = props;
  const [secondaryFilterOptions, setSecondaryFilterOptions] = useState(
    selectedDesignOptions.selectedSecondaryFilterOptions
  );

  useEffect(() => {
    setSelectedDesignOptions(prev => ({
      ...prev,
      selectedSecondaryFilterOptions: secondaryFilterOptions,
    }));
  }, [secondaryFilterOptions, setSelectedDesignOptions]);

  const components = {
    ALL: null,
    Solid: null,
    Image: (
      <ImageOptions
        setSecondaryFilterOptions={setSecondaryFilterOptions}
        secondaryFilterOptions={secondaryFilterOptions}
      />
    ),
    Video: <Video />,
    Graphics: (
      <Graphics
        setSecondaryFilterOptions={setSecondaryFilterOptions}
        secondaryFilterOptions={secondaryFilterOptions}
      />
    ),
    Gradient: (
      <Gradient
        setSecondaryFilterOptions={setSecondaryFilterOptions}
        secondaryFilterOptions={secondaryFilterOptions}
      />
    ),
    Pattern: (
      <Pattern
        setSecondaryFilterOptions={setSecondaryFilterOptions}
        secondaryFilterOptions={secondaryFilterOptions}
      />
    ),
    Particle: (
      <Particles
        setSecondaryFilterOptions={setSecondaryFilterOptions}
        secondaryFilterOptions={secondaryFilterOptions}
      />
    ),
  };

  return <>{components[selectedDesignOptions.selectedBackgroundOptions]}</>;
}

const Video = () => {
  return (
    <div>
      <P size='sm' marginBottom={0}>
        Video Component
      </P>
    </div>
  );
};
