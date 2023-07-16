import { Box, Group } from "@mantine/core";
import { Wrapper } from "../Members/Common/Containers";
import { P } from "../Members/Common/Type";

export const DownloadCopy = () => {
  return (
    <Wrapper>
      <Group position="apart">
        <Box
          sx={(theme) => ({
            width: "80%",
          })}
        >
          <P
            Copy={`Here, you can access your most recent videos, images, and articles to enhance your club or association's online presence. Share them across social media, newsletters, blogs, websites, and member communications. Simply click "Visit" to access and manage your content securely.`}
          />
        </Box>
      </Group>
    </Wrapper>
  );
};
