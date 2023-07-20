import { useEffect, useState } from "react";
import { useAccountDetails } from "../../../../lib/userContext";
import { P, PageTitle } from "../../Common/Type";
import { Wrapper } from "../../Common/Containers";
import { Box, Group } from "@mantine/core";
import { FixturaLoading } from "../../Common/Loading";

const SetupCheck = ({ children }) => {
  const { account, ReRender } = useAccountDetails();
  const [isSetup, setIsSetup] = useState(account?.attributes?.isSetup);

  useEffect(() => {
    if (!isSetup) {
      const interval = setInterval(() => {
        ReRender(); // Trigger a re-fetch of the account details
      }, 10000); // Poll every 10 seconds

      // Clear interval on component unmount
      return () => clearInterval(interval);
    }
  }, [isSetup, ReRender]);

  useEffect(() => {
    setIsSetup(account?.attributes?.isSetup); // Update isSetup when the account details change
  }, [account]);

  if (isSetup) {
    return children;
  } else {
    return (
      <div>
        <PageTitle Copy={`Setting up your account`} ICON={<FixturaLoading />} />
        <Wrapper>
          <Group position="apart">
            <Box
              sx={(theme) => ({
                width: "80%",
              })}
            >
              <P
                Copy={`Fixtura is currently setting up your account details. This process should take between 3-5 minutes. There is no need to reload this page as your account will display when it is ready.`}
              />
            </Box>
          </Group>
        </Wrapper>
      </div>
    );
  }
};

export default SetupCheck;
