import { useEffect, useState } from "react";
import hexRgb from "hex-rgb";
import { Table, useMantineTheme } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import {
  UserCreateTheme,
  UserUpdateTheme,
} from "../../../../../../../Hooks/useCustomizer";
import SketchExample from "../../../../../../Members/Common/Customiser/Design/Components/ColorPicker";
import { FixturaLoading } from "../../../../../../Members/Common/Loading";
import { CreateANewTheme, UseBaseColor } from "./functions";
import { CTA_BTNS } from "./CTA_BTNS";
import { SelectColorLabel } from "./SelectColorLabel";
import { BTN_ReverseColors } from "./BTN_ReverseColors";
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

  useEffect(() => {
    if (CTHEME[0]?.attributes?.Theme != undefined) {
      SetPrimary({
        r: hexRgb(CTHEME[0].attributes.Theme.primary).red,
        g: hexRgb(CTHEME[0].attributes.Theme.primary).green,
        b: hexRgb(CTHEME[0].attributes.Theme.primary).blue,
        a: hexRgb(CTHEME[0].attributes.Theme.primary).alpha,
      });
      SetSecondary({
        r: hexRgb(CTHEME[0].attributes.Theme.secondary).red,
        g: hexRgb(CTHEME[0].attributes.Theme.secondary).green,
        b: hexRgb(CTHEME[0].attributes.Theme.secondary).blue,
        a: hexRgb(CTHEME[0].attributes.Theme.secondary).alpha,
      });
    }
  }, []);

  const handleReverseColors = () => {
    const currentPrimary = { ...Primary };
    const currentSecondary = { ...Secondary };
    SetPrimary(currentSecondary);
    SetSecondary(currentPrimary);
  };

  const handleCreateNewTheme = () => {
    setIsLoading(true);
    const ThemeID = CTHEME[0]?.id;
    const userInfo = {
      id: userAccount.id,
      FirstName: userAccount.attributes.FirstName,
    };
    const CreatedOBJ = CreateANewTheme(userInfo, { Primary, Secondary });

    ThemeID
      ? UpdateTHEME(CreatedOBJ.Theme, ThemeID)
      : CreateTHEME(CreatedOBJ.Theme);
  };

  if (IsLoading) return <FixturaLoading />;
  return (
    <>
      <BTN_ReverseColors handleReverseColors={handleReverseColors} />

      <Table verticalSpacing="md">
        <tbody>
          <tr>
            {mobile ? (
              false
            ) : (
              <td>
                <SelectColorLabel Selector={Primary} LABEL={`Primary Color`} />
              </td>
            )}

            <td style={{ textAlign: "right" }}>
              <SketchExample
                key={Primary + Secondary}
                SetColor={SetPrimary}
                UsersTheme={UseBaseColor(Primary)}
              />
            </td>

            {mobile ? (
              <td>
                <SelectColorLabel Selector={Primary} LABEL={`Primary Color`} />
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
                <SelectColorLabel
                  Selector={Primary}
                  LABEL={`Secondary Color`}
                />
              </td>
            )}

            <td style={{ textAlign: "right" }}>
              <SketchExample
                key={Secondary + Primary}
                SetColor={SetSecondary}
                UsersTheme={UseBaseColor(Secondary)}
              />
            </td>
            {mobile ? (
              <td>
                <SelectColorLabel
                  Selector={Primary}
                  LABEL={`Secondary Color`}
                />
              </td>
            ) : (
              false
            )}
          </tr>
        </tbody>
      </Table>
      <CTA_BTNS
        setCreateNew={setCreateNew}
        handleCreateNewTheme={handleCreateNewTheme}
        processing={CTHEME[0]?.attributes}
        idDisabled={disabled}
      />
    </>
  );
};
