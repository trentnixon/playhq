import React, { useEffect, useState } from "react";
import { useAccountDetails } from "../../lib/userContext";
import { useUser } from "../../lib/authContext";
import cookie from "cookie";

import { fetcher } from "../../lib/api";
import { P, PageTitle, SubHeaders } from "../../components/Members/Common/Type";
import {
  MembersWrapper,
  PageCopyWrapper,
} from "../../components/Members/Common/Containers";
import { Space } from "@mantine/core";
import { LoadingStateWrapper } from "../../components/Members/Account/HOC/LoadingStateWrapper";
import { IconPhotoPlus } from "@tabler/icons-react";
import { MediaGalleryFileUpload } from "../../components/Members/gallery/FileUpload";
import { DisplayGallery } from "../../components/Members/gallery/DisplayGallery";
import SetupCheck from "../../components/Members/Account/HOC/SetupCheck";
import { FixturaLoading } from "../../components/Members/Common/Loading";
import Meta from "../../components/Layouts/Meta";
const qs = require("qs");

const query = qs.stringify(
  {
    populate: ["account_media_libraries", "account_media_libraries.imageId"],
  },
  {
    encodeValuesOnly: true,
  }
);

export default function MediaGallery({ Response }) {
  const { account } = useAccountDetails();
  const [userAccount, setUserAccount] = useState(account);
  const { user } = useUser();

  const [isLoading, setIsLoading] = useState(true); // New state for loading
  const [error, setError] = useState(null); // New state for error

  useEffect(() => {
    if (Response?.attributes) {
      setIsLoading(false);
    } else {
      setError("Failed to load data");
    }
  }, [Response, userAccount]); // Consolidated useEffect

  if (isLoading) {
    return <FixturaLoading />; // Show a loader while data is loading
  }

  if (error) {
    return <div>Error: {error}</div>; // Show an error message if there's an error
  }
  return (
    <MembersWrapper>
      <SetupCheck>
        <LoadingStateWrapper conditions={[user, userAccount]}>
          <Meta
            title="Member Gallery - Fixtura: Showcase Your Media"
            description="View and manage your club's digital media gallery on Fixtura. Display your sports content creatively and attractively."
            keywords="Member gallery, Fixtura media showcase, sports club gallery, digital content display, club visuals"
          />
          <PageTitle
            Copy={"Media Gallery"}
            ICON={<IconPhotoPlus size={40} />}
          />
          <SubHeaders Copy={"Manage Your Club's Media Assets"} />

          <PageCopyWrapper>
            <P
              Copy={`Upload and manage images for your club or association in the Fixtura Media Gallery. These images become the visual elements in your digital assets. Fixtura automatically selects an image from this gallery, based on your tags or at random, to fit into your chosen asset templates.`}
            />
          </PageCopyWrapper>
          <Space h={20} />
          <MediaGalleryFileUpload
            ITEMCOUNT={Response?.attributes.account_media_libraries.data.length}
          />
          <DisplayGallery
            DATA={Response.attributes.account_media_libraries.data}
          />
        </LoadingStateWrapper>
      </SetupCheck>
    </MembersWrapper>
  );
}

export async function getServerSideProps(ctx) {
  const parsedCookies = cookie.parse(ctx.req.headers.cookie || "");
  const jwt = parsedCookies["jwt"];
  const linkedAccount = parsedCookies["LinkedAccount"];

  if (!jwt || !linkedAccount) {
    // Redirect to login or show a relevant message if cookies are missing
    return { redirect: { destination: "/", permanent: false } };
  }

  try {
    const response = await fetcher(
      `${process.env.NEXT_PUBLIC_STRAPI_URL}/accounts/${linkedAccount}?${query}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${jwt}`,
        },
      }
    );
    return { props: { Response: response.data } };
  } catch (error) {
    console.error("Failed to fetch data:", error);
    return { props: { Response: null } }; // Handle error accordingly
  }
}
