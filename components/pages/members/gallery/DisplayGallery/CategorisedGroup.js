import { Paper, useMantineTheme } from '@mantine/core';
import { P } from '../../../../Members/Common/Type';

export const CategorisedGroup = props => {
  const { ageGroup } = props;
  const theme = useMantineTheme();
  return (
    <>
      <P Weight={400} size={18} marginBottom={0}>
        Images assigned to {ageGroup}
      </P>
      {ageGroup === 'Unknown' && (
        <Paper
          shadow='md'
          mb={15}
          p='sm'
          withBorder
          style={{ backgroundColor: theme.colors.red[8] }}
        >
          <P color={'white'} marginBottom={0} textAlign='cenleftter'>
            Some of your images are not categorized. To enhance the selection
            process for your digital assets, please update these images with
            appropriate Age Group and Asset Type tags. Navigate to each image
            and select 'Edit' to assign tags.
          </P>
        </Paper>
      )}
    </>
  );
};
