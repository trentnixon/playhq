import { Center } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { useMantineTheme } from '@mantine/styles';
import { useEffect, useState } from 'react';
import { RoundedSectionContainer } from '../../../../../UI/Containers/SectionContainer';
import { Previewer } from './Previewer';
import { UserPreviewTitle } from './UserPreviewTitle';
import { useAccountDetails } from '../../../../../../context/userContext';
import { createPreviewObject } from '../../../../../../utils/Remotion/RemotionUtils';
import { SponsorsPreviewer } from './SponsorsPreviewer';

export const PreviewSponsorsGallery = () => {
  const { account } = useAccountDetails();
  const [previewObj, setPreviewObj] = useState(null);

  const theme = useMantineTheme();
  const mobile = useMediaQuery(`(max-width: ${theme.breakpoints.sm})`);

  useEffect(() => {
    const updatedPreviewObj = createPreviewObject(account);
    setPreviewObj(updatedPreviewObj);
  }, [account]);

  if (!previewObj?.template_option) {
    return <Center>Loading...</Center>;
  }

  //const templateType = previewObj.template_option?.template_category?.data?.attributes?.slug;
  //const assetTypes = Object.keys(ASSETS[templateType]);

  return (
    <RoundedSectionContainer
      headerContent={`Sponsorship Positioning Preview`}
      topContent={``}
      bottomContent={<SponsorsPreviewer account={account} />}
    />
  );
};

//<UserPreviewTitle />
