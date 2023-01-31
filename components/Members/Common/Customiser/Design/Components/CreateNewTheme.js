import { useEffect, useRef, useState } from "react";

import { Center, Group, Loader, Table, useMantineTheme } from "@mantine/core";
import {
  UserCreateTheme,
  UserUpdateTheme,
} from "../../../../../../Hooks/useCustomizer";
import { BTN_ONCLICK } from "../../../utils/Buttons";

import { P, SubHeaders } from "../../../Type";
import SketchExample from "./ColorPicker";
import { IconCircleCheck } from "@tabler/icons";
import { FixturaLoading } from "../../../../Common/Loading";
import hexRgb from "hex-rgb";
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

  const CTHEME = GetElement.filter(
    (item) => item.attributes.CreatedBy === userAccount.id
  );

  const UseBaseColor = (PATH) => {
    const OBJ = CTHEME[0]?.attributes?.Theme[PATH]
      ? {
          r: hexRgb(CTHEME[0].attributes.Theme[PATH]).red,
          g: hexRgb(CTHEME[0].attributes.Theme[PATH]).green,
          b: hexRgb(CTHEME[0].attributes.Theme[PATH]).blue,
          a: hexRgb(CTHEME[0].attributes.Theme[PATH]).alpha,
        }
      : {
          r: "0",
          g: "0",
          b: "0",
          a: "1",
        };
    return OBJ;
  };

  useEffect(() => {
    if (Primary !== false && Secondary !== false) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [Primary, Secondary]);

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
      accounts: [1],
      Name: `Custom Theme created by ${userAccount.attributes.FirstName}`,
    };

    console.log(CTHEME[0]?.id);
    CTHEME[0]?.attributes?.Theme
      ? UpdateTHEME(OBJ, CTHEME[0].id)
      : CreateTHEME(OBJ);

    setIsLoading(true);
  };

  useEffect(() => {
    //console.log(THEME,UPDATE);
    if (THEME || UPDATE) {
      ReRender();
      setIsLoading(false);
      setCreateNew(false);
    }
  }, [THEME, UPDATE]);

  useEffect(() => {
    
    if(CTHEME[0]?.attributes?.Theme != undefined){
        SetPrimary({
            r: hexRgb(CTHEME[0].attributes.Theme.primary).red,
            g: hexRgb(CTHEME[0].attributes.Theme.primary).green,
            b: hexRgb(CTHEME[0].attributes.Theme.primary).blue,
            a: hexRgb(CTHEME[0].attributes.Theme.primary).alpha,
          })
          SetSecondary({
            r: hexRgb(CTHEME[0].attributes.Theme.secondary).red,
            g: hexRgb(CTHEME[0].attributes.Theme.secondary).green,
            b: hexRgb(CTHEME[0].attributes.Theme.secondary).blue,
            a: hexRgb(CTHEME[0].attributes.Theme.secondary).alpha,
          })
    }
  }, []);

  if (IsLoading) return <FixturaLoading />;
  return (
    <>
      <Group position="right">
        <BTN_ONCLICK
          LABEL={"Back"}
          THEME={"error"}
          HANDLE={() => {
            setCreateNew(false);
          }}
        />
      </Group>
      <SubHeaders Copy={`Create your own Theme`} />
      <P
        Copy={`To create a new theme, simply select your primary and secondary brand colors from the color selector and click the "Create" button. This theme will automatically be assigned as your current theme, and can be updated at any time by clicking the "Update" option.`}
      />

      <Table>
        <tbody>
          <tr>
            <td>
              <Group>
                <Center>
                  <IconCircleCheck
                    color={
                      Primary ? theme.colors.green[6] : theme.colors.gray[1]
                    }
                  />
                </Center>

                <P
                  marginBottom={0}
                  Weight={900}
                  textTransform={"uppercase"}
                  Copy={`Primary Color`}
                />
              </Group>
            </td>
            <td>
              <SketchExample
                SetColor={SetPrimary}
                UsersTheme={UseBaseColor("primary")}
              />
            </td>
          </tr>
          <tr>
            <td>
              <Group>
                <Center>
                  <IconCircleCheck
                    color={
                      Secondary ? theme.colors.green[6] : theme.colors.gray[1]
                    }
                  />
                </Center>

                <P
                  marginBottom={0}
                  Weight={900}
                  textTransform={"uppercase"}
                  Copy={`Secondary Color`}
                />
              </Group>
            </td>
            <td>
              <SketchExample
                SetColor={SetSecondary}
                UsersTheme={UseBaseColor("secondary")}
              />
            </td>
          </tr>
        </tbody>
      </Table>
      <Group position="right" my={20}>
        <BTN_ONCLICK
          LABEL={CTHEME[0]?.attributes ? "Update" : "Create"}
          HANDLE={CreateANewTheme}
          idDisabled={disabled}
        />
      </Group>
    </>
  );
};