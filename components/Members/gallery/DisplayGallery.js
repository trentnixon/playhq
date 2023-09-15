import { Group, SimpleGrid } from "@mantine/core";
import { GalleryItemCard } from "./GalleryCard";
import { P } from "../Common/Type";

export const DisplayGallery = ({ DATA }) => {
  return (
    <div>
        <Group position="apart">
        <P Weight={900}>Gallery</P>
        <P Weight={200}>Images: {DATA.length}</P>
        </Group>
     
      <SimpleGrid
        breakpoints={[
          { minWidth: "sm", cols: 2 },
          { minWidth: "md", cols: 3 },
          { minWidth: "xl", cols: 4 },
        ]}
      >
        {DATA.map((item, index) => (
          <GalleryItemCard key={index} item={item} />
        ))}
      </SimpleGrid>
    </div>
  );
};
/* {
    "id": 39,
    "attributes": {
        "title": "fsafsafasfas",
        "isActive": true,
        "tags": [
            "fsaf",
            "fsfsaf",
            "fsafsa"
        ],
        "createdAt": "2023-09-14T09:10:21.527Z",
        "updatedAt": "2023-09-14T09:10:27.260Z",
        "publishedAt": "2023-09-14T09:10:21.525Z",
        "imageId": {
            "data": {
                "id": 216,
                "attributes": {
                    "name": "0D5A0825-2.jpg",
                    "alternativeText": null,
                    "caption": null,
                    "width": 2000,
                    "height": 1333,
                    "formats": {
                        "thumbnail": {
                            "name": "thumbnail_0D5A0825-2.jpg",
                            "hash": "thumbnail_0_D5_A0825_2_c0f0f71cb7",
                            "ext": ".jpg",
                            "mime": "image/jpeg",
                            "path": null,
                            "width": 234,
                            "height": 156,
                            "size": 9.07,
                            "url": "https://fixtura.s3.ap-southeast-2.amazonaws.com/thumbnail_0_D5_A0825_2_c0f0f71cb7.jpg"
                        },
                        "small": {
                            "name": "small_0D5A0825-2.jpg",
                            "hash": "small_0_D5_A0825_2_c0f0f71cb7",
                            "ext": ".jpg",
                            "mime": "image/jpeg",
                            "path": null,
                            "width": 500,
                            "height": 333,
                            "size": 28.59,
                            "url": "https://fixtura.s3.ap-southeast-2.amazonaws.com/small_0_D5_A0825_2_c0f0f71cb7.jpg"
                        },
                        "medium": {
                            "name": "medium_0D5A0825-2.jpg",
                            "hash": "medium_0_D5_A0825_2_c0f0f71cb7",
                            "ext": ".jpg",
                            "mime": "image/jpeg",
                            "path": null,
                            "width": 750,
                            "height": 500,
                            "size": 54.32,
                            "url": "https://fixtura.s3.ap-southeast-2.amazonaws.com/medium_0_D5_A0825_2_c0f0f71cb7.jpg"
                        },
                        "large": {
                            "name": "large_0D5A0825-2.jpg",
                            "hash": "large_0_D5_A0825_2_c0f0f71cb7",
                            "ext": ".jpg",
                            "mime": "image/jpeg",
                            "path": null,
                            "width": 1000,
                            "height": 667,
                            "size": 85.76,
                            "url": "https://fixtura.s3.ap-southeast-2.amazonaws.com/large_0_D5_A0825_2_c0f0f71cb7.jpg"
                        }
                    },
                    "hash": "0_D5_A0825_2_c0f0f71cb7",
                    "ext": ".jpg",
                    "mime": "image/jpeg",
                    "size": 186.86,
                    "url": "https://fixtura.s3.ap-southeast-2.amazonaws.com/0_D5_A0825_2_c0f0f71cb7.jpg",
                    "previewUrl": null,
                    "provider": "aws-s3",
                    "provider_metadata": null,
                    "createdAt": "2023-09-14T09:10:20.550Z",
                    "updatedAt": "2023-09-14T09:10:20.550Z"
                }
            }
        }
    }
} */
