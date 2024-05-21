import React from "react";
import { Image, Group } from "@mantine/core";
import { P } from "../../../../Members/Common/Type";

const SponsorDisplay = ({ sponsorObj }) => {
  if (!sponsorObj || !sponsorObj.attributes || !sponsorObj.attributes.Logo || !sponsorObj.attributes.Logo.data || !sponsorObj.attributes.Logo.data.attributes) {
    // Handle null pointer references or missing attributes here
    return null;
  }

  return (
    <Group mt="0" align="center">
      <Image
        src={sponsorObj.attributes.Logo.data.attributes.url}
        alt={sponsorObj.attributes.Name}
        width={50}
        height={50}
        radius="md"
      />
     {/*  <P>{sponsorObj.attributes.Name}</P> */}
    </Group>
  );
}

export default SponsorDisplay;
