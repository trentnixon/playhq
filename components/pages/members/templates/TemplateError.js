import { useRouter } from 'next/router';
import { Box } from '@mantine/core';
import { P } from '../../../Members/Common/Type';
import { BTN_ONCLICK } from '../../../Members/Common/utils/Buttons';

const TemplateError = () => {
  const router = useRouter();

  const handleBackClick = () => {
    router.push('/members/templates');
  };

  return (
    <Box>
      <P size='xl' weight={700}>
        Error: Template not found.
      </P>
      <BTN_ONCLICK
        LABEL='Back to Templates'
        HANDLE={handleBackClick}
        THEME='error'
      />
    </Box>
  );
};

export default TemplateError;
