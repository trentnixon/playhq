import { useEffect, useState } from "react";
import { Container, SimpleGrid, Select, Group } from "@mantine/core";
import {
  useAssignDesignElement,
  useGETDesignElement,
} from "../../../../../Hooks/useCustomizer";
import { useAccountDetails } from "../../../../../lib/userContext";
import { P } from "../../Type";
import { FixturaDivider } from "../../Divider";
import { TemplateCard } from "./Components/TemplateCard";
import { RoundedSectionContainer } from "../../../../UI/Containers/SectionContainer";
import { FixturaCustomSelect } from "../../utils/Selects";

export const SelectATemplate = ({ hasMediaItems }) => {
  const { account, ReRender } = useAccountDetails();
  const [userAccount, setuserAccount] = useState(account);
  const [loading, setLoading] = useState(true);
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [DesignElement, CreateDesignElement] = useAssignDesignElement();
  const [GetElement, FetchElement] = useGETDesignElement();

  const handleMoreInfoClick = (template) => {
    setSelectedTemplate(template);
  };

  const handleBackClick = () => {
    setSelectedTemplate(null);
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

  const isUserTemplate = (templateId) => {
    return userAccount.attributes.template.data.id === templateId;
  };

  let groupedTemplates = {};
  if (Array.isArray(GetElement)) {
    // Filter and group templates by category
    const filteredTemplates = GetElement.filter((template) => {
      const isPublic = template.attributes.public;
      const isTemplateUserTemplate = isUserTemplate(template.id);

      if (userAccount.attributes.hasCustomTemplate) {
        return isTemplateUserTemplate;
      } else {
        return isPublic;
      }
    });

    groupedTemplates = filteredTemplates.reduce((acc, template) => {
      const category = template.attributes.Category;
      if (!acc[category]) acc[category] = [];
      acc[category].push(template);
      return acc;
    }, {});
  }

  const categoryOptions = ["All", ...Object.keys(groupedTemplates)];

  const filteredCategoryTemplates =
    selectedCategory === "All"
      ? groupedTemplates
      : {
          [selectedCategory]: groupedTemplates[selectedCategory],
        };

  return (
    <>
      <Container fluid={true} mb={40}>
        <Group position="right">
          <FixturaCustomSelect
            label="Filter by Category"
            placeholder="All/Clear"
            data={categoryOptions}
            value={selectedCategory}
            onChange={(value) => setSelectedCategory(value)}
          />
        </Group>

        {Object.keys(filteredCategoryTemplates).map((category) => (
          <RoundedSectionContainer
            key={category}
            headerContent={""}
            topContent={
              <P size={"xl"} Weight={900} textTransform={"uppercase"}>
                {category}
              </P>
            }
            bottomContent={
              <SimpleGrid
                breakpoints={[
                  { minWidth: "xs", cols: 2 },
                  { minWidth: "sm", cols: 2 },
                  { minWidth: "md", cols: 3 },
                ]}
              >
                {filteredCategoryTemplates[category].map((item, i) => (
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
            }
          />
        ))}
      </Container>
      <FixturaDivider />
    </>
  );
};
