import { useEffect, useState } from "react";
import { FixturaLoading } from "../../Loading";
import { Paper, SimpleGrid, Space, useMantineTheme } from "@mantine/core";
import {
  useAssignDesignElement,
  useGETDesignElement,
} from "../../../../../Hooks/useCustomizer";
import { useAccountDetails } from "../../../../../lib/userContext";
import { P, SubHeaders } from "../../Type";
import { FixturaDivider } from "../../Divider";
import { TemplateCard } from "./Components/TemplateCard";

export const SelectATemplate = () => {
  const { account, ReRender } = useAccountDetails();
  const [userAccount, setuserAccount] = useState(account);
  const [loading, setLoading] = useState(true);
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
      <Space h={10} />
      <SubHeaders Copy={`Choose Your Theme`} />
      <P>
        Customize Your Assets with Themed Layout Templates for a cohesive and
        professional look that complements your brand in the preview video.
      </P>
      <Paper
        radius="md"
        shadow="md"
        mt={30}
        p="xs"
        sx={(theme) => ({ backgroundColor: theme.white })}
      >
        <SimpleGrid
          breakpoints={[
            { minWidth: "sm", cols: 2 },
            { minWidth: "md", cols: 3 },
          ]}
        >
          {Array.isArray(GetElement) &&
            GetElement.map((item, i) => (
              <TemplateCard
                key={i}
                template={item}
                isSelected={userAccount.attributes.template.data.id === item.id}
                onSelect={(selectedTemplate) =>
                  StoreUSerChange(selectedTemplate)
                }
              />
            ))}
        </SimpleGrid>
      </Paper>
      <FixturaDivider />
    </>
  );
};