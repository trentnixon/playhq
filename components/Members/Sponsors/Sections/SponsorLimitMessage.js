import { Box } from "@mantine/core";
import { P } from "../../Common/Type";

export const SponsorLimitMessage = ({ Sponsors, SPONSORLIMIT, isCreate }) => {
    if (isCreate) return null;
  
    const message =
      Sponsors.length >= SPONSORLIMIT
        ? "You have reached the limit of your sponsors. Please edit or archive a sponsor to add a new one."
        : ``;
  
    return (
      <Box
        sx={(theme) => ({
          padding: "10px 20px",
          marginTop: "10px", // Space between this message and previous components
        })}
      >
        <P color={6} size={'xs'}  Weight={400} textAlign={"right"}>
          {message}
        </P>
      </Box>
    );
  };