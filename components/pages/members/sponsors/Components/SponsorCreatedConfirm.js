import { Avatar, Center, Group } from '@mantine/core';
import { IconCheck } from '@tabler/icons';

import { P } from '../../../../Members/Common/Type';

export const SponsorCreatedConfirm = ({ Sponsor, setIsCreate }) => {
  return (
    <>
      <Center>
        <Group mt={50}>
          <Avatar color={'green'} size={80} radius={80}>
            <IconCheck size={40} />
          </Avatar>
          <P
            marginBottom={0}
            Weight={900}
            textTransform={`uppercase`}
            Copy={`Sponsor ${Sponsor.attributes.Name} Created`}
          />
        </Group>
      </Center>
      {/* <Center>
        <BTN_ONCLICK
          HANDLE={() => {
            setIsCreate(false);
          }}
          LABEL="Back"
          THEME="error"
        />
      </Center> */}
    </>
  );
};
