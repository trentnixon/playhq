import React, { useEffect, useState } from "react";
import { P, PageTitle, SubHeaders } from "../../components/Members/Common/Type";
import {
  IconLayoutDashboard,
  IconDownload,
  IconBrush,
  IconPhotoPlus,
  IconCurrencyDollar,
} from "@tabler/icons-react";
import {
  MembersWrapper,
  PageCopyWrapper,
} from "../../components/Members/Common/Containers";
import { Progress, SimpleGrid, Space } from "@mantine/core";
import { LoadingStateWrapper } from "../../components/Members/Account/HOC/LoadingStateWrapper";

import { useAccountDetails } from "../../lib/userContext";
import { DashBoardRenders } from "../../components/Members/Dashboard/Renders";
import { DashBoardTheme } from "../../components/Members/Dashboard/Theme";
import { DashBoardGalleryItems } from "../../components/Members/Dashboard/GalleryItems";
import { DashBoardSponsoredItems } from "../../components/Members/Dashboard/SponsorItems";
import { DashBoardTrackingItems } from "../../components/Members/Dashboard/TrackingItems";
import { DashBoardSubscriptionItems } from "../../components/Members/Dashboard/SubscriptionItems";
import SetupCheck from "../../components/Members/Account/HOC/SetupCheck";
import { useUser } from "../../lib/authContext";

const DashBoard = () => {
  const { account } = useAccountDetails();
  const { user, loading } = useUser();
  const [progress, setProgress] = useState(0); // New state variable

  useEffect(() => {
    console.log("Account details:", account);
  }, [account]);

  useEffect(() => {
    console.log(account);
  }, [account, user]);

  if (!account || !account.attributes) {
    return (
      <MembersWrapper>
        <SetupCheck>
          <LoadingStateWrapper conditions={[user, account]}>
            <PageTitle
              Copy="Fetching Details"
              ICON={<IconLayoutDashboard size={40} />}
            />
            <PageCopyWrapper>
              <P>Please wait whilst we build your dashboard</P>
            </PageCopyWrapper>
          </LoadingStateWrapper>
        </SetupCheck>
      </MembersWrapper>
    );
  }

  const commonProps = {
    Theme: account.attributes.theme.data.attributes.Theme,
    AccountID: account.id,
  };

  console.log(account.attributes.FirstName);

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
        template: account.attributes.template.data.attributes,
        audio_option: account.attributes.audio_option.data.attributes,
        theme: account.attributes.theme.data.attributes.Theme,
      },
    },
  ];

  return (
    <MembersWrapper>
      <SetupCheck>
        <LoadingStateWrapper conditions={[user, account]}>
          <PageTitle
            Copy="DashBoard"
            ICON={<IconLayoutDashboard size={40} />}
          />
          <SubHeaders Copy={`Hi ${account.attributes.FirstName}`} />
          <PageCopyWrapper>
            <P>
              Manage subscriptions, downloads, sponsors, tracking, gallery, and
              themes—all from one place. Click "View" on each card to explore
              more.
            </P>
          </PageCopyWrapper>
          <Space h={20} />

          <SimpleGrid
            cols={3}
            spacing="lg"
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
        </LoadingStateWrapper>
      </SetupCheck>
    </MembersWrapper>
  );
};

export default DashBoard;

function AccountProgress({ progress }) {
  return (
    <Progress value={progress} label="Set up progress" size="xl" radius="xl" />
  );
}
