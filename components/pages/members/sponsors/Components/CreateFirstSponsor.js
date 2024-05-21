import { Container, Group } from "@mantine/core";
import { P } from "../../../../Members/Common/Type";

export const CreateFirstSponsor = (props) => {
  return (
    <Container size={"md"} p={40}>
      <P
        Weight={400}
        size={"md"}
        textTransform={`uppercase`}
        color={6}
        Copy={`0 Sponsors found...`}
      />
      <Group>
        <P
          Weight={600}
          size={20}
          textTransform={`uppercase`}
          color={6}
          Copy={`Use the Create New button to Create Your First Sponsor`}
          marginBottom={0}
        />
      </Group>
    </Container>
  );
};
