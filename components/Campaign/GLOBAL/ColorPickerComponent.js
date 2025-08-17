import React, { useState } from 'react';

import SketchExample from '../../Members/Common/Customiser/Design/Components/ColorPicker';
import { Box, Center, Group, Stack } from '@mantine/core';
import { P } from '../../Members/Common/Type';

const rgbaToHex = rgba => {
  // Check if rgba is an object and has r, g, b, a properties
  if (
    rgba &&
    typeof rgba === 'object' &&
    rgba.r !== undefined &&
    rgba.g !== undefined &&
    rgba.b !== undefined &&
    rgba.a !== undefined
  ) {
    // Convert each part into a hex string
    const r = parseInt(rgba.r, 10).toString(16).padStart(2, '0');
    const g = parseInt(rgba.g, 10).toString(16).padStart(2, '0');
    const b = parseInt(rgba.b, 10).toString(16).padStart(2, '0');
    const a = Math.round(parseFloat(rgba.a) * 255)
      .toString(16)
      .padStart(2, '0');

    return `#${r}${g}${b}${a}`;
  } else {
    // Handle unexpected input format
    console.error('Invalid RGBA format:', rgba);
    return null;
  }
};

const ColorPickerComponent = ({ onColorChange }) => {
  const [Primary, SetPrimary] = useState(false);
  const [Secondary, SetSecondary] = useState(false);

  const handlePrimaryColorChange = color => {
    //console.log("handlePrimaryColorChange ", color);
    SetPrimary(color);
    onColorChange({
      Primary: rgbaToHex(color),
      Secondary: Secondary ? rgbaToHex(Secondary) : null,
    });
  };

  const handleSecondaryColorChange = color => {
    SetSecondary(color);
    onColorChange({
      Primary: Primary ? rgbaToHex(Primary) : null,
      Secondary: rgbaToHex(color),
    });
  };

  return (
    <div>
      <Group position='apart' p={10}>
        <Stack spacing='xs'>
          <Center>
            <P size={'xs'} marginBottom={0} color='#343a40'>
              Primary Color
            </P>{' '}
            &nbsp;
            <SketchExample
              SetColor={handlePrimaryColorChange}
              UsersTheme={{
                r: '255',
                g: '255',
                b: '255',
                a: '1',
              }}
            />
          </Center>
          {/* <Center>
           
          </Center> */}
        </Stack>

        <Stack spacing='xs'>
          <Center>
            <P size={'xs'} marginBottom={0} color='#343a40'>
              Secondary Color
            </P>{' '}
            &nbsp;
            <SketchExample
              SetColor={handleSecondaryColorChange}
              UsersTheme={{
                r: '0',
                g: '0',
                b: '0',
                a: '1',
              }}
            />
          </Center>
          {/* <Center>
            <P size={"xs"} marginBottom={0} color="#343a40">
              Secondary Color
            </P>
          </Center> */}
        </Stack>
      </Group>
    </div>
  );
};

export default ColorPickerComponent;
