import { Container } from '@mantine/core';
import { SectionHeaders } from '../../Members/Common/Type';
import { Wrapper } from '../../Members/Common/Containers';

export const SectionContainer = ({ children, className }) => {
  return (
    <Container fluid pt={100} pb={70} className={className}>
      <Container size={'xl'} p={0}>
        {children}
      </Container>
    </Container>
  );
};

export default SectionContainer;

const sectionStyles = theme => ({
  backgroundColor: theme.colors.gray[1],
  fontFamily: theme.fontFamily,
  borderRadius: '0.5rem',
  borderBottom: `1px solid ${theme.colors.gray[3]}`,
  width: '100%',
});

const innerSectionStyles = theme => ({
  backgroundColor: 'white',
  fontFamily: theme.fontFamily,
  borderRadius: '0.5rem',
  borderBottom: `1px solid ${theme.colors.gray[3]}`,
  width: '100%',
});
export const RoundedSectionContainer = ({
  headerContent,
  topContent,
  bottomContent,
  ICON = null,
  padding = 'xl',
}) => (
  <>
    <SectionHeaders Copy={headerContent} ICON={ICON} />
    <Container p={3} fluid sx={sectionStyles}>
      <Container size='xl' p={0}>
        <Wrapper px={padding}>{topContent}</Wrapper>
        <RoundedBottomSection content={bottomContent} padding={padding} />
      </Container>
    </Container>
  </>
);

// Bottom section within the rounded section container
export const RoundedBottomSection = ({
  content,
  className,
  padding = 'xl',
}) => (
  <Container p={padding} fluid sx={innerSectionStyles} className={className}>
    <Container size='xl' p={0}>
      {content}
    </Container>
  </Container>
);
