import { useMantineTheme } from "@mantine/styles";
import { DisplayCustomTheme } from "../../../../../Members/Common/Customiser/Design/Components/DisplayCustomTheme";
import { P } from "../../../../../Members/Common/Type";

import { Group, Table } from "@mantine/core";
import { Swatches } from "./Swatches";
import { SelectButton } from "./SelectButton";

export const ColorTable = (props) => {
  const { GetElement, userAccount, StoreUSerChange } = props;
  const theme = useMantineTheme();
  return (
    <>
      <DisplayCustomTheme {...props} />

      <Table>
        <tbody>
          {GetElement.map((item, i) => (
            <TableRow
              key={i}
              item={item}
              userAccount={userAccount}
              StoreUSerChange={StoreUSerChange}
            />
          ))}
        </tbody>
      </Table>
    </>
  );
};

const TableRow = ({ item, userAccount, StoreUSerChange }) => {
  if (!item.attributes.isPublic) return false;
  const isSelected = userAccount.attributes.theme.data.id === item.id;

  return (
    <tr>
      <td>
        <P
          marginBottom={3}
          color={isSelected ? 9 : 6}
          Weight={isSelected ? 900 : 400}
        >
          {item.attributes.Name}
        </P>
      </td>
      <td>
        <Group position="center" spacing="xs">
          <Swatches
            colors={[
              item.attributes.Theme.primary,
              item.attributes.Theme.secondary,
            ]}
          />
        </Group>
      </td>
      <td style={{ textAlign: "right" }}>
        <SelectButton
          isSelected={isSelected}
          onClick={() => StoreUSerChange(item)}
          label="Select"
        />
      </td>
    </tr>
  );
};
