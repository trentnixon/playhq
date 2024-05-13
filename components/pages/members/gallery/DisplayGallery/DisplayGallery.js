import { Paper } from "@mantine/core";

import { RoundedSectionContainer } from "../../../../UI/Containers/SectionContainer";
import { CategorisedGroup } from "./CategorisedGroup";
import { DisplayUploads } from "./DisplayUploads";
import { UploadFirstImageTitle } from "./uploadFirstImage/UploadFirstImageTitle";
import { UploadFirstImageInstructions } from "./uploadFirstImage/UploadFirstImageInstructions";

const groupByAgeGroup = (items) => {
  return items.reduce((groups, item) => {
    const ageGroup = item.attributes.AgeGroup || "Unknown";
    if (!groups[ageGroup]) {
      groups[ageGroup] = [];
    }
    groups[ageGroup].push(item);
    return groups;
  }, {});
};
export const DisplayGallery = ({ DATA }) => {
  const groupedData = groupByAgeGroup(DATA);
  return (
    <>
      {DATA.length === 0 ? (
        <RoundedSectionContainer
          headerContent={`Gallery Pool`}
          topContent={<UploadFirstImageTitle />}
          bottomContent={<UploadFirstImageInstructions />}
        />
      ) : (
        Object.entries(groupedData).map(([ageGroup, items]) => (
          <Paper key={ageGroup} py={10}>
            <RoundedSectionContainer
              headerContent={`Gallery Pool (${DATA.length})`}
              topContent={<CategorisedGroup ageGroup={ageGroup} />}
              bottomContent={
                <DisplayUploads items={items} ageGroup={ageGroup} />
              }
            />
          </Paper>
        ))
      )}
    </>
  );
};
