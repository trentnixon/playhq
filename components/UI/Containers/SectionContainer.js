import { Container } from "@mantine/core";

export const SectionContainer = ({ children, className }) => {
  return (
    <Container fluid pt={100} pb={70} className={className}>
      <Container size={'xl'} p={0}>{children}</Container>
    </Container>
  );
};

export default SectionContainer;
