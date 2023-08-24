import { Group } from "@mantine/core";
import { PageCopyWrapper } from "../../Common/Containers";
import { P } from "../../Common/Type";

export const DescriptionSection = () => (
  <Group position="apart">
    <PageCopyWrapper>
      <P>
        Sponsors are a great way to add a personal touch to your assets and show
        your appreciation for your club's supporters. To create a sponsor,
        simply click the create button, upload an image of the sponsor's logo,
        add their name and website.
      </P>
      <P>
        You can add multiple sponsors and easily update or remove them as
        needed. With Fixtura, it's easy to give your sponsors the recognition
        they deserve while keeping your assets looking professional and
        cohesive.
      </P>
    </PageCopyWrapper>
  </Group>
);
