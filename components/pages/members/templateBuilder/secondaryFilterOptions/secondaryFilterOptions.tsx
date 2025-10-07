import React from 'react';
import { useEffect, useState, useRef } from 'react';
import { P } from '../../../../Members/Common/Type';
import { ImageOptions } from './DisplayImageOptions';
import { Graphics } from './DisplayGraphicsOptions';
import { Gradient } from './DisplayGradientOptions';
import { Pattern } from './DisplayPatternOptions';
import { Particles } from './DisplayParticlesOptions';
import { TextureOptions } from './DisplayTextureOptions';

// Secondary Filter Options
export default function SecondaryFilterOptions(props) {
  const { selectedDesignOptions, setSelectedDesignOptions } = props;

  const [secondaryFilterOptions, setSecondaryFilterOptions] = useState(
    selectedDesignOptions.selectedSecondaryFilterOptions
  );

  // Track the last parent value to prevent unnecessary updates
  const lastParentValue = useRef(
    JSON.stringify(selectedDesignOptions.selectedSecondaryFilterOptions)
  );

  // Update local state when parent data changes
  useEffect(() => {
    const currentParentString = JSON.stringify(
      selectedDesignOptions.selectedSecondaryFilterOptions
    );

    if (currentParentString !== lastParentValue.current) {
      lastParentValue.current = currentParentString;
      setSecondaryFilterOptions(
        selectedDesignOptions.selectedSecondaryFilterOptions
      );
    }
  }, [selectedDesignOptions.selectedSecondaryFilterOptions]);

  // Update parent when local state changes
  useEffect(() => {
    const currentParentString = JSON.stringify(
      selectedDesignOptions.selectedSecondaryFilterOptions
    );
    const currentLocalString = JSON.stringify(secondaryFilterOptions);

    if (currentLocalString !== currentParentString) {
      lastParentValue.current = currentLocalString;
      setSelectedDesignOptions(prev => ({
        ...prev,
        selectedSecondaryFilterOptions: secondaryFilterOptions,
      }));
    }
  }, [
    secondaryFilterOptions,
    setSelectedDesignOptions,
    selectedDesignOptions.selectedSecondaryFilterOptions,
  ]);

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
    Texture: (
      <TextureOptions
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
