import { Group, Paper, SimpleGrid, useMantineTheme } from "@mantine/core";
import { GalleryItemCard } from "./GalleryCard";
import { P } from "../Common/Type";

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
  const theme = useMantineTheme()
  return (
    <>
      <Group position="apart" mt={20}>
        <P Weight={900}>Gallery Pool</P>
        <P Weight={400}>Images: {DATA.length}</P>
      </Group>

      {DATA.length === 0 ? (
        <Paper shadow="xs" py="md" px={"15%"} withBorder>
          <P textAlign="center" size={"xl"} Weight={900}>
            Upload your Media Items!
          </P>
          <P textAlign="center">
            Fixtura's Media Gallery, where you can upload and manage images that
            represent your club or association. Whether it's photos of players,
            teams, grounds, or clubhouses, your uploads serve as the visual
            backbone for your digital assets.
          </P>
          <P textAlign="center">
            When Fixtura creates an asset for you, the system intelligently
            selects an image from this gallery—either at random or based on tags
            you assign. This is your opportunity to infuse your club's unique
            personality into every asset
          </P>
          <P textAlign="center">Click "Upload Item" to begin.</P>
        </Paper>
      ) : (
        Object.entries(groupedData).map(([ageGroup, items]) => (
          <Paper key={ageGroup} py={10}>
            <P Weight={400} size={18}>
              Images assigned to {ageGroup}
            </P>
            {ageGroup === "Unknown" && (
              <Paper shadow="md" mb={15} p="sm" withBorder style={{ backgroundColor: theme.colors.red[8]}}>
                <P color={'white'} marginBottom={0} textAlign="cenleftter">
                  Some of your images are not categorized. To enhance the
                  selection process for your digital assets, please update these
                  images with appropriate Age Group and Asset Type tags. Navigate
                  to each image and select 'Edit' to assign tags.
                </P>
              </Paper>
            )}
            <Paper shadow="md" p="md" withBorder key={ageGroup} mb={20}>
              <SimpleGrid
                breakpoints={[
                  { minWidth: "sm", cols: 2 },
                  { minWidth: "md", cols: 3 },
                  { minWidth: "xl", cols: 4 },
                ]}
              >
                {items.map((item, index) => (
                  <GalleryItemCard key={index} item={item} />
                ))}
              </SimpleGrid>
            </Paper>
          </Paper>
        ))
      )}
    </>
  );
};
