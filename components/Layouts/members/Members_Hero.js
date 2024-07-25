import { Box, Container } from "@mantine/core";
import { useAccountDetails } from "../../../context/userContext";
import { FixturaHeaderMeta } from "../../Members/Account/userFixturaSettings";

export const MembersHero = () => {
    const { account } = useAccountDetails();
    return (
      <Container fluid mx={0} p={0}>
        <Box
          pt={40}
          sx={(theme) => ({
            height: "110px",
            backgroundColor: theme.colors.gray[8],
            display: "flex",
            justifyContent: "flex-end",
            alignContent: "baseline",
            flexDirection: "column",
          })}
        >
          <FixturaHeaderMeta user={account} />
        </Box>
      </Container>
    );
  };