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
import { useAccountDetails } from "../../../../../context/userContext";
import { P, SubHeaders } from "../../Type";
import { DisplayCustomTheme } from "./Components/DisplayCustomTheme";
import { CreateNewTheme } from "./Components/CreateNewTheme";
import { useMediaQuery } from "@mantine/hooks";
import { IconColorSwatch, IconFileDownload } from "@tabler/icons-react";
import { RoundedSectionContainer } from "../../../../UI/Containers/SectionContainer";
import { StepHeaderandDescription } from "../../../../pages/members/setup/phases/SetupSteps/Steps/StepHeaderandDescription";

export const SelectATheme = () => {
  const { account, ReRender } = useAccountDetails();
  const [userAccount, setuserAccount] = useState(account);
  const [loading, setLoading] = useState(false);
  const [createNew, setCreateNew] = useState(false);

  const [DesignElement, CreateDesignElement] = useAssignDesignElement();
  const [GetElement, FetchElement] = useGETDesignElement();

  // BUG THAT NEEDS FIXING
  // SELECT ONLY PUBLIC THEMES AND THE CUSTOM ONE!!
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
    return (
      <>
        <SubHeaders
          Copy={`Storing New Theme`}
          ICON={<IconFileDownload size={30} />}
        />
        <Paper
          radius="md"
          shadow="md"
          mb={20}
          p="xs"
          sx={(theme) => ({ backgroundColor: theme.white })}
        >
          <FixturaLoading />
        </Paper>
      </>
    );
  }

  return (
    <>
      <RoundedSectionContainer
        headerContent={""}
        topContent={
          <StepHeaderandDescription
            Header={`Oranisation Branding`}
            Description={`Choose your brand colors to personalize your assets. Select from
                predefined themes or create a custom theme that reflects your
                club's unique personality.`}
          />
        }
        bottomContent={
          createNew ? (
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
          )
        }
      />
    </>
  );
};

const ColorTable = (props) => {
  const { GetElement, userAccount, StoreUSerChange } = props;
  return (
    <Paper
      radius="md"
      p={0}
      sx={(theme) => ({
        backgroundColor: theme.white,
      })}
    >
      <DisplayCustomTheme {...props} />

      <SubHeaders Copy={`Public Themes`} ICON={<IconColorSwatch size={30} />} />

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
      <P
        size="xs"
        textAlign="right"
        color={7}
        Copy={`Brand settings can be changed via your admin panel after setup.`}
      />
    </Paper>
  );
};

const TableRow = ({ item, userAccount, StoreUSerChange }) => {
  const theme = useMantineTheme();
  if (!item.attributes.isPublic) return false;
  const isSelected = userAccount.attributes.theme.data.id === item.id;

  return (
    <tr>
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
      <td>
        <P marginBottom={0} color={isSelected ? 6 : 7}>
          {item.attributes.Name}
        </P>
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

const Swatches = ({ colors }) => {
  const theme = useMantineTheme();
  const mobile = useMediaQuery(`(max-width: ${theme.breakpoints.sm})`);
  return colors.map((color) => (
    <ColorSwatch
      key={color}
      color={color}
      size={mobile ? 14 : 25}
      radius="xl"
    />
  ));
};

const SelectButton = ({ isSelected, onClick, label }) => {
  const theme = useMantineTheme();
  if (isSelected) {
    return <IconCircleCheck color={theme.colors.green[5]} />;
  }

  return <BTN_ONCLICK HANDLE={onClick} LABEL={label} />;
};
