import { SimpleGrid } from "@mantine/core";

import { IconBrush } from "@tabler/icons";
import { useAccountDetails } from "../../../../../../../lib/userContext";
import { DashBoardGalleryItems } from "../cards/GalleryItems";
import { IconPhotoPlus } from "@tabler/icons-react";
import { DashBoardTheme } from "../cards/Theme";
import { DashBoardAssets } from "../cards/Assets";

export const BrandingCardGrid = ({ commonProps }) => {
  const { account } = useAccountDetails();

  const brandingConfig = [
    {
      title: "Gallery",
      component: DashBoardGalleryItems,
      icon: IconPhotoPlus,
      extraProps: {},
    },
    {
      title: "Theme",
      component: DashBoardTheme,
      icon: IconBrush,
      extraProps: {
        theme: account.attributes.theme.data.attributes.Theme,
      },
    },
    {
      title: "Assets",
      component: DashBoardAssets,
      icon: IconBrush,
      extraProps: {
        template: account.attributes.template.data,
      },
    },
  ];

  return (
    <SimpleGrid
      cols={3}
      spacing="xs"
      breakpoints={[
        { maxWidth: "62rem", cols: 3, spacing: "md" },
        { maxWidth: "48rem", cols: 2, spacing: "sm" },
        { maxWidth: "36rem", cols: 1, spacing: "sm" },
      ]}
    >
      {brandingConfig.map((item, index) => {
        const Component = item.component;
        return (
          <div key={index}>
            <Component
              IconComponent={item.icon}
              {...commonProps}
              {...item.extraProps}
            />
          </div>
        );
      })}
    </SimpleGrid>
  );
};
