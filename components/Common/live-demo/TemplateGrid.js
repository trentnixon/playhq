import { SimpleGrid } from "@mantine/core";

import { RoundedSectionContainer } from "../../UI/Containers/SectionContainer";
import { P } from "../../Members/Common/Type";

const TemplateGrid = ({ filteredCategoryTemplates }) => (
  <>
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
              <TemplateCardLiveDemo 
                key={i}
                template={item}
                isSelected={false}
                onSelect={(selectedTemplate) => console.log(selectedTemplate)}
                onMoreInfo={(selectedTemplate) =>
                  handleMoreInfoClick(selectedTemplate)
                }
                hasMediaItems={0}
              />
            ))}
          </SimpleGrid>
        }
      />
    ))}
  </>
);

export default TemplateGrid;
