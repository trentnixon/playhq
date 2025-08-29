import { IconUserCircle } from '@tabler/icons-react';
import { AccountCardGrid } from './components/AccountCardGrid';
import { SubHeaders } from '../../../../../Members/Common/Type';

export const Cards_Account = ({ commonProps }) => {
  return (
    <>
      <SubHeaders Copy='Account' ICON={<IconUserCircle size={30} />} />
      <AccountCardGrid commonProps={commonProps} />
    </>
  );
};
