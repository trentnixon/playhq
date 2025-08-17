import { useMantineTheme } from '@mantine/styles';
import { IconCircleCheck } from '@tabler/icons-react';
import { BTN_ONCLICK } from '../../../../../Members/Common/utils/Buttons';

export const SelectButton = ({ isSelected, onClick, label }) => {
  const theme = useMantineTheme();
  if (isSelected) {
    return <IconCircleCheck color={theme.colors.green[5]} />;
  }

  return <BTN_ONCLICK HANDLE={onClick} LABEL={label} />;
};
