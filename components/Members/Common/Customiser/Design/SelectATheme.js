import { useEffect, useState } from "react";
import { FixturaLoading } from "../../Loading";
import {
  ColorSwatch,
  Group,
  Paper,
  Table,
  useMantineTheme,
} from "@mantine/core";
import {
  useAssignDesignElement,
  useGETDesignElement,
} from "../../../../../Hooks/useCustomizer";
import { BTN_ONCLICK } from "../../utils/Buttons";
import { IconCircleCheck } from "@tabler/icons";
import { useAccountDetails } from "../../../../../lib/userContext";
import { P, SubHeaders } from "../../Type";
import { DisplayCustomTheme } from "./Components/DisplayCustomTheme";
import { CreateNewTheme } from "./Components/CreateNewTheme";
import { FixturaDivider } from "../../Divider";

export const SelectATheme = () => {
  const { account, ReRender } = useAccountDetails();
  const [userAccount, setuserAccount] = useState(account);
  const [loading, setLoading] = useState(false);
  const [createNew, setCreateNew] = useState(false);

  const [DesignElement, CreateDesignElement] = useAssignDesignElement();
  const [GetElement, FetchElement] = useGETDesignElement();

  useEffect(() => {
    FetchElement({ COLLECTIONID: "themes" });
  }, []);

  useEffect(() => {
    FetchElement({ COLLECTIONID: "themes" });
    setuserAccount(account);
    setLoading(false);
  }, [account]);

  const StoreUSerChange = (item) => {
    const OBJ = {
      CollectionSaveTo: "accounts",
      Body: [item.id],
      COLLECTIONID: userAccount.id,
      RelationProperty: "theme",
    };
    setLoading(true);
    CreateDesignElement(OBJ);
  };

  useEffect(() => {
    if (DesignElement != true) {
      ReRender();
    }
  }, [DesignElement]);

  useEffect(() => {}, [userAccount]);

  if (
    loading ||
    GetElement === true ||
    GetElement === null ||
    userAccount === false
  ) {
    return  <>
    <SubHeaders Copy={`Storing New Theme`} />
    <Paper
      radius="md"
      shadow="md"
      withBorder
      mb={20}
      p="lg"
      sx={(theme) => ({ backgroundColor: theme.white })}
    >
      <FixturaLoading />
    </Paper>
    </>;
  }

  return (
    <>
      {createNew ? (
        <CreateNewTheme
          userAccount={userAccount}
          setCreateNew={setCreateNew}
          ReRender={ReRender}
          GetElement={GetElement}
        />
      ) : (
        <ColorTable
          GetElement={GetElement}
          userAccount={userAccount}
          StoreUSerChange={StoreUSerChange}
          setCreateNew={setCreateNew}
        />
      )}
    </>
  );
};

const Swatches = ({ colors }) => {
  return colors.map((color) => (
    <ColorSwatch key={color} color={color} size={15} radius="sm" />
  ));
};

const SelectButton = ({ isSelected, onClick, label }) => {
  const theme = useMantineTheme()
  if (isSelected) {
    return <IconCircleCheck color={theme.colors.green[5]} />;
  }

  return <BTN_ONCLICK HANDLE={onClick} LABEL={label} />;
};

const TableRow = ({ item, userAccount, StoreUSerChange }) => {
  const theme = useMantineTheme()
  if (!item.attributes.isPublic) return false;
  const isSelected = userAccount.attributes.theme.data.id === item.id;

  return (
    <tr>
      <td>
        <Group position="center" spacing="xs">
          <Swatches colors={[item.attributes.Theme.primary, item.attributes.Theme.secondary]} />
        </Group>
      </td>
      <td>
        <P
          marginBottom={0}
          color={isSelected ? 2 : 2}
          Copy={item.attributes.Name}
        />
      </td>
      <td style={{ textAlign: "right" }}>
        <SelectButton isSelected={isSelected} onClick={() => StoreUSerChange(item)} label="Select" />
      </td>
    </tr>
  );
};

const ColorTable = (props) => {
  const { GetElement, userAccount, StoreUSerChange } = props;

  return (
    <>
      <SubHeaders Copy={`Color themes`} />
      <P
          Copy={`Select Your Brand Colors: Customize Your Assets with Your Brand Colors. Choose from a variety of predefined themes or create a custom theme that reflects your club's unique personality. By selecting your brand colors, you'll create visually appealing videos and images that showcase your team's achievements in a style that's true to your brand`}
        />
      <Paper
        radius="md"
        shadow="md"
        withBorder
        p="lg"
        sx={(theme) => ({
          backgroundColor: theme.white,
        })}
      >
        <DisplayCustomTheme {...props} />

        <SubHeaders Copy={`Public Themes`} />

        <Table>
          <tbody>
            {GetElement.map((item, i) => (
              <TableRow key={i} item={item} userAccount={userAccount} StoreUSerChange={StoreUSerChange} />
            ))}
          </tbody>
        </Table>
      </Paper>
      <FixturaDivider />
    </>
  );
};
