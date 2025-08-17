import { Center } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { useMantineTheme } from '@mantine/styles';
import { useEffect, useState } from 'react';
import { RoundedSectionContainer } from '../../../../../UI/Containers/SectionContainer';
import { Previewer } from './Previewer';
import { UserPreviewTitle } from './UserPreviewTitle';
import { useAccountDetails } from '../../../../../../context/userContext';
import { createPreviewObject } from '../../../../../../utils/Remotion/RemotionUtils';

export const PreviewGallery = () => {
  const { account } = useAccountDetails();
  const [previewObj, setPreviewObj] = useState(null);

  const theme = useMantineTheme();
  const mobile = useMediaQuery(`(max-width: ${theme.breakpoints.sm})`);

  useEffect(() => {
    const updatedPreviewObj = createPreviewObject(account);
    console.log('[updatedPreviewObj]', updatedPreviewObj);
    setPreviewObj(updatedPreviewObj);
  }, [account]);

  if (!previewObj?.template_option) {
    return <Center>Loading...</Center>;
  }

  return (
    <RoundedSectionContainer
      headerContent={`Preview`}
      topContent={<UserPreviewTitle />}
      bottomContent={<Previewer account={account} />}
    />
  );
};
