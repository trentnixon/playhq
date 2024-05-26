import { useEffect, useState } from "react";

import { Center, Group, Paper, Table, useMantineTheme } from "@mantine/core";
import {
  UserCreateTheme,
  UserUpdateTheme,
} from "../../../../../../Hooks/useCustomizer";
import { BTN_ONCLICK } from "../../../utils/Buttons";

import { P } from "../../../Type";
import SketchExample from "./ColorPicker";

import { IconCircleCheck } from "@tabler/icons";
import { FixturaLoading } from "../../../../Common/Loading";

import { useMediaQuery } from "@mantine/hooks";
import { UseBaseColor } from "../../../../../pages/members/settings/change-brand-colors/components/createNewTheme/functions";
/* CreateNewTheme * ***************************** */

export const CreateNewTheme = (props) => {
  const { userAccount, setCreateNew, ReRender, GetElement } = props;

  const [Primary, SetPrimary] = useState(false);
  const [Secondary, SetSecondary] = useState(false);
  const [disabled, setDisabled] = useState(true);

  const [THEME, CreateTHEME] = UserCreateTheme();
  const [UPDATE, UpdateTHEME] = UserUpdateTheme();
  const [IsLoading, setIsLoading] = useState(false);
  const theme = useMantineTheme();
  const mobile = useMediaQuery(`(max-width: ${theme.breakpoints.sm})`);
  const CTHEME = GetElement.filter(
    (item) => item.attributes.CreatedBy === userAccount.id
  );

  useEffect(() => {
    if (Primary !== false && Secondary !== false) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [Primary, Secondary]);

  useEffect(() => {
    //console.log(THEME,UPDATE);
    if (THEME || UPDATE) {
      ReRender();
      setIsLoading(false);
      setCreateNew(false);
    }
  }, [THEME, UPDATE]);

  function rgbaToHex({ r, g, b, a }) {
    return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
  }

  const CreateANewTheme = () => {
    const OBJ = {
      Theme: {
        primary: rgbaToHex(Primary),
        secondary: rgbaToHex(Secondary),
        dark: "#111",
        white: "#FFF",
      },
      CreatedBy: userAccount.id,
      isPublic: false,
      accounts: [userAccount.id],
      Name: `Custom Theme created by ${userAccount.attributes.FirstName}`,
    };

    CTHEME[0]?.attributes?.Theme
      ? UpdateTHEME(OBJ, CTHEME[0].id)
      : CreateTHEME(OBJ);

    setIsLoading(true);
  };

  if (IsLoading) return <FixturaLoading />;
  return (
    <>
      <Paper
        radius="md"
        mb={20}
        p="lg"
        sx={(theme) => ({ backgroundColor: theme.white })}
      >
        <P size={"xs"}>
          Tip: To make your assets stand out, set the darker color as the
          primary.
        </P>
        <Table>
          <tbody>
            <tr>
              {mobile ? (
                false
              ) : (
                <td>
                  <SelectLabel Selector={Primary} LABEL={`Primary Color`} />
                </td>
              )}

              <td style={{ textAlign: "right" }}>
                <SketchExample
                  SetColor={SetPrimary}
                  UsersTheme={UseBaseColor("primary")}
                />
              </td>

              {mobile ? (
                <td>
                  <SelectLabel Selector={Primary} LABEL={`Primary Color`} />
                </td>
              ) : (
                false
              )}
            </tr>
            <tr>
              {mobile ? (
                false
              ) : (
                <td>
                  <SelectLabel Selector={Primary} LABEL={`Secondary Color`} />
                </td>
              )}

              <td style={{ textAlign: "right" }}>
                <SketchExample
                  SetColor={SetSecondary}
                  UsersTheme={UseBaseColor("secondary")}
                />
              </td>
              {mobile ? (
                <td>
                  <SelectLabel Selector={Primary} LABEL={`Secondary Color`} />
                </td>
              ) : (
                false
              )}
            </tr>
          </tbody>
        </Table>
        <Group position="apart" mt={20}>
          <BTN_ONCLICK
            LABEL={"Back"}
            THEME={"error"}
            HANDLE={() => {
              setCreateNew(false);
            }}
          />
          <BTN_ONCLICK
            LABEL={CTHEME[0]?.attributes ? "Update" : "Create"}
            HANDLE={CreateANewTheme}
            idDisabled={disabled}
          />
        </Group>
      </Paper>
    </>
  );
};

const SelectLabel = ({ Selector, LABEL }) => {
  const theme = useMantineTheme();
  return (
    <Group>
      <Center>
        <IconCircleCheck
          color={Selector ? theme.colors.green[6] : theme.colors.gray[1]}
        />
      </Center>
      <P marginBottom={0} Weight={900} textTransform={"uppercase"}>
        {LABEL}
      </P>
    </Group>
  );
};
