import { useEffect, useState } from "react";
import { FixturaLoading } from "../../Loading";
import {
  Container,
  Paper,
  ScrollArea,
  SimpleGrid,
  Space,
  useMantineTheme,
} from "@mantine/core";
import {
  useAssignDesignElement,
  useGETDesignElement,
} from "../../../../../Hooks/useCustomizer";
import { useAccountDetails } from "../../../../../lib/userContext";
import { P, SubHeaders } from "../../Type";
import { FixturaDivider } from "../../Divider";
import { TemplateCard } from "./Components/TemplateCard";
import { TemplateDetail } from "./TemplateDetials";

export const SelectATemplate = ({ hasMediaItems }) => {
  const { account, ReRender } = useAccountDetails();
  const [userAccount, setuserAccount] = useState(account);
  const [loading, setLoading] = useState(true);
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [DesignElement, CreateDesignElement] = useAssignDesignElement();
  const [GetElement, FetchElement] = useGETDesignElement();

  const handleMoreInfoClick = (template) => {
    setSelectedTemplate(template);
  };
  const handleBackClick = () => {
    setSelectedTemplate(null);
  };
  const isUserTemplate = (templateId) => {
    return userAccount.attributes.template.data.id === templateId;
  };
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

  let groupedTemplates = {};
  if (Array.isArray(GetElement)) {
    // Group templates by category
    groupedTemplates = GetElement.reduce((acc, template) => {
      const category = template.attributes.Category;
      if (!acc[category]) acc[category] = [];
      acc[category].push(template);
      return acc;
    }, {});
  }

  if (loading || !GetElement || !userAccount) {
    return (
      <>
        <SubHeaders Copy={`Storing New Graphics Package`} />

        <Paper
          radius="md"
          shadow="md"
          mb={10}
          p="xs"
          sx={(theme) => ({ backgroundColor: theme.white })}
        >
          <FixturaLoading />
        </Paper>
      </>
    );
  }

  if (selectedTemplate) {
    return (
      <TemplateDetail
        onSelect={(selectedTemplate) => StoreUSerChange(selectedTemplate)}
        template={selectedTemplate}
        isSelected={isUserTemplate(selectedTemplate.id)}
        onBack={handleBackClick}
      />
    );
  }
  return (
    <>
      <Paper
        radius="md"
        mt={0}
        p="0"
        sx={(theme) => ({ backgroundColor: theme.white })}
      >
        {Object.keys(groupedTemplates).map((category) => (
          <Container key={category} fluid={true} mb={40}>
            <P size={"xl"} Weight={900} textTransform={"uppercase"}>
              {category}
            </P>
            {/* Display the category name */}
            <SimpleGrid
              breakpoints={[
                { minWidth: "xs", cols: 2 },
                { minWidth: "sm", cols: 2 },
                { minWidth: "md", cols: 3 },
              ]}
            >
              {groupedTemplates[category].map((item, i) => (
                <TemplateCard
                  key={i}
                  template={item}
                  isSelected={
                    userAccount.attributes.template.data.id === item.id
                  }
                  onSelect={(selectedTemplate) =>
                    StoreUSerChange(selectedTemplate)
                  }
                  onMoreInfo={(selectedTemplate) =>
                    handleMoreInfoClick(selectedTemplate)
                  }
                  hasMediaItems={hasMediaItems}
                />
              ))}
            </SimpleGrid> 
          </Container>
        ))}
      </Paper>
      <FixturaDivider />
    </>
  );
};
