import { Container } from "@mantine/core";

export const HOC_MembersWrapper = (props) => {
  return (
    <Container fluid pt={40} pb={100} px={0}>
      {props.children}
    </Container>
  );
};