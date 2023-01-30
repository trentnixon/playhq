import React from "react";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useUser } from "../../lib/authContext";
import Cookies from "js-cookie";
import { fetcher } from "../../lib/api";

// COmponents

import { getIdFromLocalCookie } from "../../lib/auth";
import { Box, Container, Group, Paper, Space } from "@mantine/core";
import { DownloadTable } from "../../components/Members/Common/DownLoadTable";
import {
  MembersWrapper,
  ShadowWrapper,
  Wrapper,
} from "../../components/Members/Common/Containers";
import { P, PageTitle, SubHeaders } from "../../components/Members/Common/Type";
import { IconDownload } from "@tabler/icons";

const qs = require("qs");

const OrderHistory = (props) => {
  const { Response } = props;

  /* is User Auth */
  const { user, loading } = useUser();
  const router = useRouter();
  const currentRoute = router.pathname;
  useEffect(() => {
    if (!user) router.push(`/members/verification/?prev=${currentRoute}`);
  }, []);
  /* End User Check*/

  useEffect(() => {
    console.log(Response?.attributes.renders.data);
  }, [Response]);

  function daysUntil(targetDay) {
    // Create an object to map day names to day numbers
    const dayMap = {
      Sunday: 0,
      Monday: 1,
      Tuesday: 2,
      Wednesday: 3,
      Thursday: 4,
      Friday: 5,
      Saturday: 6,
    };

    // Get today's date
    const today = new Date();

    // Get the day of the week as a number (0-6)
    const todayDay = today.getDay();

    // Get the target day as a number (0-6)
    const targetDayNumber = dayMap[targetDay];

    // Calculate the number of days until the target day
    let daysUntil = targetDayNumber - todayDay;

    // If the number of days until the target day is negative, add 7 to make it positive
    if (daysUntil < 0) {
      daysUntil += 7;
    }

    return daysUntil;
  }

  const orderedArray = (array) => {
    const orderedArray = array.sort((a, b) => {
      const dateA = new Date(a.attributes.createdAt);
      const dateB = new Date(b.attributes.createdAt);
      return dateB - dateA;
    });
    return orderedArray;
  };

  function checkDeliveryDate(RENDERS) {
    const Ordered = orderedArray(Response.attributes.renders.data);
    console.log(Ordered[0].attributes.createdAt);
    const currentDate = new Date();
    const createdOnDate = new Date(Ordered[0].attributes.createdAt);

    if (currentDate.toDateString() === createdOnDate.toDateString()) {
      return "delivered today";
    } else {
      return false;
    }
  }

  
  if (Response?.attributes.renders.data === undefined) return <AwaitingFirstDownload />;
  if (user === false) return false;
  if (Response === null) return false;
  return (
    <MembersWrapper>
      <PageTitle Copy={`Downloads`} ICON={<IconDownload size={40} />} />

      <Wrapper>
        <Group position="apart">
          <Box
            sx={(theme) => ({
              width: "60%",
            })}
          >
            <P
              Copy={`The Downloads page is a exclusive feature available to subscribed users of Fixtura. On this page, users can see when the next delivery is scheduled, check the status of the previous delivery, and view past deliveries. This page is a convenient way to stay up to date on your subscription and access the personalized digital assets that have been created for your club.`}
            />
          </Box>
        </Group>
      </Wrapper>

      <Space h={20} />
      <Wrapper>
        <Group position="apart">
          <Box
            sx={(theme) => ({
              width: "60%",
            })}
          >
            <LatestOrderStatus
              Orders={Response.attributes.renders.data}
              Response={Response}
            />
          </Box>
          <Paper
            shadow="lg"
            p="md"
            withBorder
            radius="xs"
            sx={(theme) => ({
              backgroundColor: theme.colors[theme.primaryColor][4],
            })}
          >
            <Box>
              {!checkDeliveryDate(Response.attributes.renders.data) ? (
                <P
                  color={1}
                  marginBottom={0}
                  Copy={`Next Order will be delivered in ${daysUntil(
                    Response.attributes.days_of_the_week.data.attributes.Name
                  )} days`}
                />
              ) : (
                <P
                  color={1}
                  marginBottom={0}
                  Copy={checkDeliveryDate(Response.attributes.renders.data)}
                />
              )}
            </Box>
          </Paper>
        </Group>
      </Wrapper>
      <Space h={20} />

      <SubHeaders
        Copy={`History (${Response.attributes.renders.data.length})`}
      />

      <ShadowWrapper>
        <DownloadTable data={Response.attributes.renders.data} />
      </ShadowWrapper>
    </MembersWrapper>
  );
};

export default OrderHistory;

OrderHistory.getInitialProps = async (ctx) => {
  const ID = await getIdFromLocalCookie();
  console.log("ID", ID);

  const query = qs.stringify(
    {
      populate: ["renders", "renders.downloads", "days_of_the_week"],
      where: {
        account: {
          id: ID,
        },
      },
    },
    {
      encodeValuesOnly: true,
    }
  );
  const response = await fetcher(
    `${process.env.NEXT_PUBLIC_STRAPI_URL}/schedulers/${Cookies.get(
      "id"
    )}?${query}`,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${Cookies.get("jwt")}`,
      },
    }
  );
  let Response = response.data;
  return {
    Response,
  };
};

const LatestOrderStatus = ({ Orders, Response }) => {
  const [Ordered, setOrdered] = useState(null);
  function orderByDate(objects) {
    // Sort the objects by date created
    objects.sort((a, b) => {
      // Get the dates for each object
      const dateA = new Date(a.attributes.createdAt);
      const dateB = new Date(b.attributes.createdAt);

      // If date A is before date B, return 1
      if (dateA < dateB) {
        return 1;
      }
      // If date A is after date B, return -1
      if (dateA > dateB) {
        return -1;
      }
      // If date A and date B are the same, return 0
      return 0;
    });

    setOrdered(objects);
    return true;
  }

  const FormattDate = (formattDate) => {
    const dateString = formattDate;
    const date = new Date(dateString);
    const formattedDate = date.toLocaleDateString("en-GB", {
      day: "numeric",
      month: "numeric",
      year: "numeric",
    });
    return formattedDate;
  };

  useEffect(() => {
    orderByDate(Orders);
  }, []);

  if (Ordered === null) return true;
  return (
    <>
      <P
        color={2}
        marginBottom={0}
        Copy={`Most recent order contained ${
          Ordered[0].attributes.downloads.data.length
        } files and was created on the ${FormattDate(
          Ordered[0].attributes.createdAt
        )}`}
      />
    </>
  );
};


const AwaitingFirstDownload = ()=>{
  return(
    <MembersWrapper>
    <PageTitle Copy={`Downloads`} ICON={<IconDownload size={40} />} />

    <Wrapper>
      <Group position="apart">
        <Box
          sx={(theme) => ({
            width: "60%",
          })}
        >
          <P
            Copy={`Awaiting first download.`}
          />
          <P
            Copy={`To ensure you receive weekly deliveries check the following items`}
          />
          <ul>
  <li>Active Subscription with Fixtura</li>
  <li>Selection of assets (match reports, videos, images)</li>
  <li>Day of the week for delivery</li>
  <li>Club/Association logo and colors</li>
  <li>Any specific information or branding to be included in the assets</li>
  <li>Up-to-date email address for the delivery</li>
</ul>
        </Box>
      </Group>
    </Wrapper></MembersWrapper>
  )
}
/*
Active account with Fixtura
Selection of assets (match reports, videos, images)
Day of the week for delivery
Club/Association logo and colors
Any specific information or branding to be included in the assets
Access to a point of contact for approval and feedback on the assets.
7.Fixture schedule for the upcoming matches
Results for the last completed match
*/