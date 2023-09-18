import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
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
import { IconBadgeTm, IconPhotoPlus } from "@tabler/icons-react";
import { MediaGalleryFileUpload } from "../../components/Members/gallery/FileUpload";
import { DisplayGallery } from "../../components/Members/gallery/DisplayGallery";
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

  /* is User Auth */
  const { user } = useUser();
  const router = useRouter();
  const currentRoute = router.pathname;
  useEffect(() => {
    if (!user) router.push(`/members/verification/?prev=${currentRoute}`);
  }, []);
  /* End User Check*/

  useEffect(() => {}, [userAccount]);

  return (
    <LoadingStateWrapper conditions={[user, userAccount]}>
      <MembersWrapper>
        <PageTitle Copy={"Media Gallery"} ICON={<IconPhotoPlus size={40} />} />
        <SubHeaders Copy={"Manage Your Club's Media Assets"} />

        <PageCopyWrapper>
          <P
            Copy={`Upload and manage images for your club or association in the Fixtura Media Gallery. These images become the visual elements in your digital assets. Fixtura automatically selects an image from this gallery, based on your tags or at random, to fit into your chosen asset templates.`}
          />
        </PageCopyWrapper>
        <Space h={20} />
        <MediaGalleryFileUpload
          ITEMCOUNT={Response.attributes.account_media_libraries.data.length}
        />
        <DisplayGallery
          DATA={Response.attributes.account_media_libraries.data}
        />
      </MembersWrapper>
    </LoadingStateWrapper>
  );
}

export async function getServerSideProps(ctx) {
  const parsedCookies = cookie.parse(ctx.req.headers.cookie || "");
  const jwt = parsedCookies["jwt"]; // Replace 'jwt' with the actual key you set the JWT cookie with
  const linkedAccount = parsedCookies["LinkedAccount"]; // Same here, replace with the actual key

  // Now you can use these in your fetcher
  const response = await fetcher(
    `${process.env.NEXT_PUBLIC_STRAPI_URL}/accounts/${linkedAccount}?${query}`,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwt}`,
      },
    }
  );

  const Response = response.data;
  return { props: { Response } };
}
