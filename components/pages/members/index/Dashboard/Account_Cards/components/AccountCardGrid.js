import { SimpleGrid } from "@mantine/core";

import { DashBoardSubscriptionItems } from "../cards/SubscriptionItems";
import { DashBoardRenders } from "../cards/Renders";
import { DashBoardSponsoredItems } from "../cards/SponsorItems";
import { DashBoardTrackingItems } from "../cards/TrackingItems";
import { IconCurrencyDollar, IconDownload } from "@tabler/icons";
import { useAccountDetails } from "../../../../../../../lib/userContext";



export const AccountCardGrid= ({commonProps}) => {
    const { account } = useAccountDetails();

    const dashboardConfig = [
        {
          title: "Subscriptions",
          component: DashBoardSubscriptionItems,
          icon: IconCurrencyDollar,
          extraProps: { user: account },
        },
        {
          title: "Downloads",
          component: DashBoardRenders,
          icon: IconDownload,
          extraProps: { schedulerID: account.attributes.scheduler.data.id },
        },
        {
          title: "Sponsors",
          component: DashBoardSponsoredItems,
          icon: IconCurrencyDollar,
          extraProps: { sponsors: account.attributes.sponsors.data },
        },
        {
          title: "Tracking",
          component: DashBoardTrackingItems,
          icon: IconCurrencyDollar,
          extraProps: {},
        },
      ];


  return (
    <SimpleGrid
        cols={4}
        spacing="xs"
        breakpoints={[
          { maxWidth: "62rem", cols: 3, spacing: "md" },
          { maxWidth: "48rem", cols: 2, spacing: "sm" },
          { maxWidth: "36rem", cols: 1, spacing: "sm" },
        ]}
      >
        {dashboardConfig.map((item, index) => {
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
