import { Group } from '@mantine/core';
import { useAccountDetails } from '../../../../../../context/userContext';
import { P } from '../../../../../Members/Common/Type';
import { RoundedSectionContainer } from '../../../../../UI/Containers/SectionContainer';
import { SetUpItemsRequired } from './SetUpItemsRequired';
import { CreateAccountInit } from '../SetupSteps/CreateAccountInit';

export const InitialSetupScreen = () => {
  return (
    <RoundedSectionContainer
      headerContent={''}
      topContent={<TopContent />}
      bottomContent={<SetUpItemsRequired />}
    />
  );
};

const TopContent = () => {
  const { ReRender } = useAccountDetails();
  return (
    <Group position='apart'>
      <P Weight={600} marginBottom={0}>
        Items needed to complete the setup:
      </P>
      <CreateAccountInit setAccountsetup={ReRender} />
    </Group>
  );
};
