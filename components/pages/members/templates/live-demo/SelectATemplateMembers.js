// src/Components/Templates/SelectATemplateMembers.js

import { useEffect, useState, useMemo } from "react";
import { Container, SimpleGrid } from "@mantine/core";
import { useAssignDesignElement } from "../../../../../Hooks/useCustomizer";
import { useAccountDetails } from "../../../../../context/userContext";
import { P } from "../../../../Members/Common/Type";
import { FixturaDivider } from "../../../../Members/Common/Divider";
import { RoundedSectionContainer } from "../../../../UI/Containers/SectionContainer";
import CategoryFilter from "../../../../Common/live-demo/CategoryFilter";
import { TemplateCardMembers } from "./Components/TemplateCardMembers";
import { generateCategoryOptions } from "../../../../../utils/templateUtils";
import { useGETDesignElement } from "../../../../../Hooks/useCustomizer";

export const SelectATemplateMembers = ({ hasMediaItems }) => {
  const { account, ReRender } = useAccountDetails();
  const [userAccount, setUserAccount] = useState(account);
  const [loading, setLoading] = useState(true);
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [DesignElement, CreateDesignElement] = useAssignDesignElement();
  const [GetElement, FetchElement] = useGETDesignElement();

  useEffect(() => {
    setUserAccount(account);
  }, [account]);

  useEffect(() => {
    ReRender();
  }, [DesignElement]);

  const fetchTemplates = async () => {
    await FetchElement({ COLLECTIONID: "templates" });
  };

  useEffect(() => {
    fetchTemplates();
  }, []);

  const filterFn = (template) => {
    const isPublic = template.attributes.public;
    const isTemplateUserTemplate =
      userAccount.attributes.template.data.id === template.id;
    return userAccount.attributes.hasCustomTemplate
      ? isTemplateUserTemplate
      : isPublic;
  };

  const templates = useMemo(() => {
    if (Array.isArray(GetElement)) {
      const filteredTemplates = GetElement.filter(filterFn);
      const grouped = filteredTemplates.reduce((acc, template) => {
        const category = template.attributes?.Category;
        if (!category) {
          console.error("Template has no category:", template);
          return acc;
        }
        if (!acc[category]) {
          acc[category] = [];
        }
        acc[category].push(template);
        return acc;
      }, {});
      setLoading(false);
      return grouped;
    }
    return {};
  }, [GetElement, userAccount]);

  const categoryOptions = useMemo(() => generateCategoryOptions(templates), [templates]);

  const handleMoreInfoClick = (template) => {
    setSelectedTemplate(template);
  };

  const StoreUserChange = (item) => {
    setLoading(true);
    CreateDesignElement({
      CollectionSaveTo: "accounts",
      Body: [item.id],
      COLLECTIONID: userAccount.id,
      RelationProperty: "template",
    }).finally(() => setLoading(false));
  };

  const filteredCategoryTemplates =
    selectedCategory === "All"
      ? templates
      : { [selectedCategory]: templates[selectedCategory] };

  if (loading) {
    return <div>Loading...</div>; // Or any loading spinner/component
  }

  return (
    <>
      <Container fluid={true} mb={40}>
        <CategoryFilter
          categoryOptions={categoryOptions}
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
        />
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
                  <TemplateCardMembers
                    key={i}
                    template={item}
                    isSelected={
                      userAccount.attributes.template.data.id === item.id
                    }
                    onSelect={(selectedTemplate) =>
                      StoreUserChange(selectedTemplate)
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
