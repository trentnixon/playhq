import { Container } from "@mantine/core";
import { SectionHeaders } from "../../Members/Common/Type";
import { Wrapper } from "../../Members/Common/Containers";

export const SectionContainer = ({ children, className }) => {
  return (
    <Container fluid pt={100} pb={70} className={className}>
      <Container size={"xl"} p={0}>
        {children}
      </Container>
    </Container>
  );
};

export default SectionContainer;






const sectionStyles = (theme) => ({
  backgroundColor: theme.colors.gray[1],
  fontFamily: theme.fontFamily,
  borderRadius: '0.5rem',
  borderBottom: `1px solid ${theme.colors.gray[3]}`,
  width: '100%',
});

const innerSectionStyles = (theme) => ({
  backgroundColor: 'white',
  fontFamily: theme.fontFamily,
  borderRadius: '0.5rem',
  borderBottom: `1px solid ${theme.colors.gray[3]}`,
  width: '100%',
});
export const RoundedSectionContainer = ({ headerContent, topContent, bottomContent }) => (
  <>
    <SectionHeaders Copy={headerContent} />
    <Container p={3} fluid sx={sectionStyles}>
      <Container size="xl" p={0}>
        <Wrapper px="xl">{topContent}</Wrapper>
        <RoundedBottomSection content={bottomContent} />
      </Container>
    </Container>
  </>
);

// Bottom section within the rounded section container
export const RoundedBottomSection = ({ content, className }) => (
  <Container p="xl" fluid sx={innerSectionStyles} className={className}>
    <Container size="xl" p={0}>
      {content}
    </Container>
  </Container>
);