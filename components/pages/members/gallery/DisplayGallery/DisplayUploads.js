import { SimpleGrid } from "@mantine/core";
import { GalleryItemCard } from "./GalleryCard";


export const DisplayUploads = (props) => {
    const { items } = props;
    return (
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
    );
  };