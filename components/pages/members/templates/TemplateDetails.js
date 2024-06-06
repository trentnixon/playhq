import { Group, Box, Image } from "@mantine/core";
import { P } from "../../../Members/Common/Type";

const TemplateDetails = ({ FrontEndName, Description, Poster, Name }) => (
  <Group position="apart">
    <Box w={"80%"}>
      <P size="xl" weight={700}>
        {FrontEndName}
      </P>
      <P marginBottom={0}>{Description}</P>
    </Box>
    {Poster?.data?.attributes?.url && (
      <Image
        radius={"md"}
        src={Poster.data.attributes.url}
        alt={Name}
        width={90}
        height={90}
      />
    )}
  </Group>
);

export default TemplateDetails;
