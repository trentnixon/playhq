import { useEffect, useState } from "react";
import { FixturaLoading } from "../../Loading";
import { Paper, Space, Table, useMantineTheme } from "@mantine/core";
import {
  useAssignDesignElement,
  useGETDesignElement,
} from "../../../../../Hooks/useCustomizer";
import { BTN_ONCLICK } from "../../utils/Buttons";
import { IconCircleCheck } from "@tabler/icons";
import { useAccountDetails } from "../../../../../lib/userContext";
import { P, SubHeaders } from "../../Type";
import { FixturaDivider } from "../../Divider";

export const SelectATemplate = () => {
  const { account, ReRender } = useAccountDetails();
  const [userAccount, setuserAccount] = useState(account);
  const [loading, setLoading] = useState(true);
  const theme = useMantineTheme();
 
  const [DesignElement, CreateDesignElement] = useAssignDesignElement();
  const [GetElement, FetchElement] = useGETDesignElement();

  useEffect(() => {
    FetchElement({ COLLECTIONID: "templates" });
  }, []);

  useEffect(() => {
    setuserAccount(account);
    setLoading(false);
  }, [account]);

  const StoreUSerChange = (item) => {
    setLoading(true);
    CreateDesignElement({
      CollectionSaveTo: "accounts",
      Body: [item.id],
      COLLECTIONID: userAccount.id,
      RelationProperty: "template",
    });
  };

  useEffect(() => {
    ReRender();
  }, [DesignElement]);

  if (loading || !GetElement || !userAccount) {
    return (
      <>
        <SubHeaders Copy={`Storing New Template`} />

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
      <Space h={10}/>
      <SubHeaders Copy={`Choose Your Theme`} />
      <P>Customize Your Assets with Themed Layout Templates for a cohesive and professional look that complements your brand in the preview video.</P>
      <Paper
        radius="md"
        shadow="md"
        mt={30}
        p="xs"
        sx={(theme) => ({ backgroundColor: theme.white })}
      >
        <Table>
          <tbody>
            {Array.isArray(GetElement) &&
              GetElement.map((item, i) => (
                <tr key={i} style={{ borderRadius: "10px", padding: "10px" }}>
                  <td>
                    <P
                      marginBottom={0}
                      color={
                        userAccount.attributes.template.data.id === item.id
                          ? 6
                          : 2
                      }
                     >{item.attributes.Name}</P>
                  </td>

                  <td style={{ textAlign: "right" }}>
                    {userAccount.attributes.template.data.id === item.id ? (
                      <IconCircleCheck color={theme.colors.green[5]} />
                    ) : (
                      <BTN_ONCLICK
                        HANDLE={() => {
                          StoreUSerChange(item);
                        }}
                        LABEL={`Select`}
                      />
                    )}
                  </td>
                </tr>
              ))}
          </tbody>
        </Table>
      </Paper>
      <FixturaDivider />
    </>
  );
};
