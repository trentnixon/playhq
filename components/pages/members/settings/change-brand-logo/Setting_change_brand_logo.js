import { Group } from '@mantine/core';
import { P } from '../../../../Members/Common/Type';
import { BTN_TOINTERALLINK } from '../../../../Members/Common/utils/Buttons';
import { useAccountDetails } from '../../../../../context/userContext';

import { RoundedSectionContainer } from '../../../../UI/Containers/SectionContainer';

export const Setting_change_brand_logo = () => {
  const { account } = useAccountDetails();

  if (!account?.attributes) return;

  return (
    <RoundedSectionContainer
      headerContent='Update your Logo'
      topContent={<ContainerTopSection />}
      bottomContent={<ContainerBottomSection />}
    />
  );
};

const ContainerTopSection = () => {
  return (
    <Group position='apart'>
      <P Weight={600} marginBottom={0}>
        Update Your Logo
      </P>
      <BTN_TOINTERALLINK
        LABEL={'Update Logo'}
        URL={'/members/settings/change-brand-logo/'}
      />
    </Group>
  );
};

const ContainerBottomSection = () => {
  return (
    <>
      <P marginBottom={0}>
        Easily upload and update your club or association's logo to maintain a
        current and professional appearance across all digital assets.
      </P>
    </>
  );
};
