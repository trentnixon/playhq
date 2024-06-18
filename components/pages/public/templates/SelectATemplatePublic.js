// src/Components/Templates/SelectATemplatePublic.js

import { useEffect, useState, useMemo } from "react";
import { SimpleGrid } from "@mantine/core";
import { P } from "../../../Members/Common/Type";
import { RoundedSectionContainer } from "../../../UI/Containers/SectionContainer";
import { TemplateCardPublic } from "./Components/TemplateCardPublic";
import Section from "../../../UI/DefaultSection";
import CategoryFilter from "../../../Common/live-demo/CategoryFilter";
import { generateCategoryOptions } from "../../../../utils/templateUtils";
import { useGETDesignElement } from "../../../../Hooks/useCustomizer";
import { BespokeGraphicsCTA } from "../../../Common/live-demo/BespokeGraphicsCTA";
import { FixturaDivider } from "../../../Members/Common/Divider";

const SectionData = {
  title: "Choose from Our Live Demo Templates",
  paragraphs: [
    `Explore our free template options to see what Fixtura can do for your club. More templates are on the way, and we can also create bespoke designs to match your specific needs.`,
  ],
};

export const SelectATemplatePublic = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [loading, setLoading] = useState(true);
  const [GetElement, FetchElement] = useGETDesignElement();

  const fetchTemplates = async () => {
    await FetchElement({ COLLECTIONID: "templates" });
  };

  useEffect(() => {
    fetchTemplates();
  }, []);

  const filterFn = (template) => template.attributes.public;

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
  }, [GetElement]);

  const categoryOptions = useMemo(() => generateCategoryOptions(templates), [templates]);

  const filteredCategoryTemplates =
    selectedCategory === "All"
      ? templates
      : { [selectedCategory]: templates[selectedCategory] };

  if (loading) {
    return <div>Loading...</div>; // Or any loading spinner/component
  }

  return (
    <Section {...SectionData} color="light">
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
                <TemplateCardPublic
                  key={i}
                  template={item}
                  isSelected={false}
                  onSelect={(selectedTemplate) => console.log(selectedTemplate)}
                  onMoreInfo={(selectedTemplate) =>
                    handleMoreInfoClick(selectedTemplate)
                  }
                  hasMediaItems={1}
                />
              ))}
            </SimpleGrid>
          }
        />
      ))}
      <FixturaDivider />
       <BespokeGraphicsCTA />
    </Section>
  );
};
