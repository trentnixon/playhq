import { Group } from '@mantine/core';
import { BTN_ONCLICK } from '../../../../../Members/Common/utils/Buttons';

export const BTN_Upload_CLose = props => {
  const { uploadLogo, setUploadLogo } = props;
  return (
    <Group position='right' mb={20}>
      <BTN_ONCLICK
        LABEL={uploadLogo ? `Close` : `Upload a Logo`}
        THEME={`cta`}
        HANDLE={() => {
          setUploadLogo(!uploadLogo);
        }}
      />
    </Group>
  );
};
