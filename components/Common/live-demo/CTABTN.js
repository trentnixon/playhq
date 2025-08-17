// src/Common/components/CTABTN.js

import { BTN_ONCLICK } from '../../Members/Common/utils/Buttons';

const CTABTN = ({ FUNC, isSelected }) => {
  return (
    <BTN_ONCLICK
      HANDLE={FUNC}
      THEME={'white'}
      LABEL={isSelected ? 'Current' : 'Preview'}
    />
  );
};

export default CTABTN;
