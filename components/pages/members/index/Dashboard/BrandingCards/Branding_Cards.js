import { IconColorSwatch, IconUserCircle } from '@tabler/icons-react';
import { useAccountDetails } from '../../../../../../context/userContext';
import { SubHeaders } from '../../../../../Members/Common/Type';
import { BrandingCardGrid } from './components/BrandingCardGrid';

export const Cards_Branding = ({ commonProps }) => {
  return (
    <>
      <SubHeaders Copy='Branding' ICON={<IconColorSwatch size={30} />} />
      <BrandingCardGrid commonProps={commonProps} />
    </>
  );
};
