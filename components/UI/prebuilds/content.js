import { Container } from '@mantine/core';
import { H, P } from '../../Members/Common/Type';
import { useMediaQuery } from '@mantine/hooks';

export const TitleSection = ({ title, className }) => {
  // Define a media query for screens smaller than 768px (typical breakpoint for tablets and below)
  const isMobile = useMediaQuery('(max-width: 768px)');
  // Adjust the font size based on whether it's a mobile device or not
  const fontSize = isMobile ? '40px' : '45px'; // Assuming 24px for mobile and 45px for desktop
  const padding = isMobile ? 0 : 'sm';
  const textAlign = isMobile ? 'left' : 'center';
  const mb = isMobile ? '20px' : '30px';
  return (
    <Container size={'sm'} p={padding}>
      <H size={fontSize} mb={mb} className={className} align={textAlign}>
        {title}
      </H>
    </Container>
  );
};

export const Paragraphs = ({ paragraphs, className }) => {
  const isMobile = useMediaQuery('(max-width: 768px)');
  // Adjust the font size based on whether it's a mobile device or not
  const textAlign = isMobile ? 'left' : 'center'; // Assuming 24px for mobile and 45px for desktop
  //const padding = isMobile ? 0 : "sm";
  return (
    <>
      {paragraphs.map((paragraph, index) => (
        <P key={index} textAlign={textAlign} className={className} size='lg'>
          {paragraph}
        </P>
      ))}
    </>
  );
};
