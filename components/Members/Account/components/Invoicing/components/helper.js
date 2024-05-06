import { P } from "../../../../Common/Type";
import { Group, Paper } from "@mantine/core";

export const DisplayItem = (props) => {
  const { icon, label, position = "left" } = props;
  return (
    <Group position={position}>
      <P marginBottom={0} color={7}>
        {label}
      </P>
      {icon}
    </Group>
  );
};

export const StyledPaper = ({ children }) => (
  <Paper
    sx={{
      backgroundColor: "#fbfbfb",
    }}
    shadow="md"
    my={30}
    mx={100}
  >
    {children}
  </Paper>
);
