import { ColorSwatch } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { useMantineTheme } from '@mantine/styles';

export const Swatches = ({ colors }) => {
  const theme = useMantineTheme();
  const mobile = useMediaQuery(`(max-width: ${theme.breakpoints.sm})`);
  return colors.map(color => (
    <ColorSwatch
      key={color}
      color={color}
      size={mobile ? 14 : 25}
      radius='md'
    />
  ));
};
