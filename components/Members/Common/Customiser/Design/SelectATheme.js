import { useEffect, useState } from "react";
import { FixturaLoading } from "../../Loading";
import {
  Center,
  ColorSwatch,
  Group,
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

/*
This component is called "SelectATheme", it is a functional component that allows the user to select a 
theme from a list of available options. It uses several hooks such as "useAccountDetails", "useState", 
"useAssignDesignElement" and "useGETDesignElement" to manage the state of the component and make API calls.

It also has several useEffect hooks that are used to fetch data and update the state of the component 
when certain conditions are met. The component also renders other functional components such as 
"FixturaLoading", "CreateNewTheme" and "ColorTable" based on certain conditions.
This component is based on the data that is passed from the parent component and it allows the 
user to select a theme from available options and store the selected theme on the user's account.

*/

export const SelectATheme = () => {
  const { account, ReRender } = useAccountDetails();
  const [userAccount, setuserAccount] = useState(account);
  const [loading, setLoading] = useState(false);
  const [createNew, setCreateNew] = useState(false);
  // Assign Hook
  const [DesignElement, CreateDesignElement] = useAssignDesignElement(); 
  const [GetElement, FetchElement] = useGETDesignElement();

  // Fetch Design Element
  useEffect(() => {
    FetchElement({ COLLECTIONID: "themes" });
  }, []);

  // Set SET ACCOUNT DATA
  useEffect(() => {
    console.log("DID THIS FIRE AFTER THEME CREATE?");
    FetchElement({ COLLECTIONID: "themes" });
    setuserAccount(account);
    setLoading(false);
  }, [account]);

  // Fire HOOK to sotre new Design Element to user
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
  // change UI on return Value
  useEffect(() => {
    if(DesignElement != true){
      console.log("NEW THEME", DesignElement)
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
    return <FixturaLoading />;
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



const ColorTable = (props) => {
  const { GetElement, userAccount, StoreUSerChange } = props;
  const theme = useMantineTheme();
  const swatches = (ARR) => {
    return ARR.map((color) => (
      <ColorSwatch key={color} color={color} size={15} radius="sm" />
    ));
  };

  return (
    <>
      <DisplayCustomTheme {...props} />

      <SubHeaders Copy={`Public Themes`} />
      <Table>
        <tbody>
          {GetElement.map((item, i) => {
            if (!item.attributes.isPublic) return false;
            return (
              <tr
                key={i}
                style={{
                  backgroundColor:
                    userAccount.attributes.theme.data.id === item.id
                      ? theme.colors.blue[8]
                      : theme.colors.members[0],
                }}
              >
                <td>
                  <P
                    marginBottom={0}
                    color={
                      userAccount.attributes.theme.data.id === item.id ? 0 : 2
                    }
                    Copy={item.attributes.Name}
                  />
                </td>
                <td>
                  <Group position="center" spacing="xs">
                    {swatches([
                      item.attributes.Theme.primary,
                      item.attributes.Theme.secondary,
                    ])}
                  </Group>
                </td>
                <td>
                  {userAccount.attributes.theme.data.id === item.id ? (
                    <Center>
                      <IconCircleCheck color={theme.colors.gray[2]} />
                    </Center>
                  ) : (
                    <Center>
                      <BTN_ONCLICK
                        HANDLE={() => {
                          StoreUSerChange(item);
                        }}
                        LABEL={`Select Theme`}
                      />
                    </Center>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </>
  );
};
