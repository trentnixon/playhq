import { useEffect, useState } from "react";
import { FixturaLoading } from "../../Loading";
import { ActionIcon, Center, Table, useMantineTheme } from "@mantine/core";
import {
  useAssignDesignElement,
  useGETDesignElement,
} from "../../../../../Hooks/useCustomizer";
import { BTN_ONCLICK } from "../../utils/Buttons";
import { IconCircleCheck } from "@tabler/icons";
import { useAccountDetails } from "../../../../../lib/userContext";
import { P } from "../../Type";
export const SelectATemplate = () => {
  const { account, ReRender } = useAccountDetails();
  const [userAccount, setuserAccount] = useState(account);
  const [loading, setLoading] = useState(false);
  const theme = useMantineTheme();
  // Assign Hook
  const [DesignElement, CreateDesignElement] = useAssignDesignElement();
  const [GetElement, FetchElement] = useGETDesignElement();

  // Fetch Design Element
  useEffect(() => {
    FetchElement({
      COLLECTIONID: "templates",
    });
  }, []);
  useEffect(() => {}, [GetElement]);

  // Set SET ACCOUNT DATA
  useEffect(() => {
    setuserAccount(account);
    setLoading(false);
  }, [account]);

  // Fire HOOK to sotre new Design Element to user
  const StoreUSerChange = (item) => {
    const OBJ = {
      CollectionSaveTo: "accounts",
      Body: [item.id],
      COLLECTIONID: userAccount.id,
      RelationProperty: "template",
    };

    setLoading(true);
    CreateDesignElement(OBJ);
  };

  // change UI on return Value
  useEffect(() => {
    ReRender();
  }, [DesignElement]);

  if (
    loading ||
    GetElement === true ||
    GetElement === null ||
    userAccount === false
  ) {
    return <FixturaLoading />;
  }

  return (
    <Table>
      <tbody>
        {GetElement.map((item, i) => {
          return (
            <tr
              key={i}
              style={{
                backgroundColor:
                  userAccount.attributes.template.data.id === item.id
                    ? theme.colors.blue[8]
                    : theme.colors.members[0],
              }}
            >
              <td>
                <P
                  marginBottom={0}
                  color={
                    userAccount.attributes.template.data.id === item.id ? 0 : 2
                  }
                  Copy={item.attributes.Name}
                />
              </td>

              <td>
                {userAccount.attributes.template.data.id === item.id ? (
                  <Center>
                    <IconCircleCheck color={theme.colors.gray[2]} />
                  </Center>
                ) : (
                  <Center>
                    <BTN_ONCLICK
                      HANDLE={() => {
                        StoreUSerChange(item);
                      }}
                      LABEL={`Select Template`}
                    />
                  </Center>
                )}
              </td>
            </tr>
          );
        })}
      </tbody>
    </Table>
  );
};
