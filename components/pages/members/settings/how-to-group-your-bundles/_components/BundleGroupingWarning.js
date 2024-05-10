import { Card } from "@mantine/core";
import { P } from "../../../../../Members/Common/Type";

export const BundleGroupingWarning = ({ NumItems }) => {
    if (NumItems > 9)
      return (
        <Card
          shadow="md"
          padding="sm"
          radius="md"
          mt={5}
          style={{ backgroundColor: "#f19999" }}
        >
          <P color={0} marginBottom={0}>
            Warning:
          </P>
          <P color={0} marginBottom={0}>
            It is not advised to group more than 10 bundles. As this can created
            an Large number of assets.
          </P>
        </Card>
      );
  };