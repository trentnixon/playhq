import { useEffect, useState } from "react";
import { useCreateTrial } from "../../../Hooks/useTrial";
import { constructTrialInstanceObj } from "../../../lib/actions";
import { P, PageTitle } from "../Common/Type";
import { BTN_ONCLICK } from "../Common/utils/Buttons";
import { IconBrandStripe, IconFreeRights } from "@tabler/icons";
import { Stack } from "@mantine/core";
import { FixturaLoading } from "../Common/Loading";
import { IconCircleCheck } from "@tabler/icons-react";

export const CreateFreeTrial = ({ account }) => {
  const [Trial, CreateTrial, loading, error] = useCreateTrial();
  const [showSuccess, setShowSuccess] = useState(false);

  const handleClick = () => {
    const trialInstanceObj = constructTrialInstanceObj(account);
    // lets add the sub teir to teh account and remove on trial end
    //console.log(trialInstanceObj);
    CreateTrial(trialInstanceObj);
  };

  // If the trial is successfully created, show the success message and then refresh the page after 2 seconds
  useEffect(() => {
    console.log("Checking if Trial is updated:", Trial);
    if (Trial) {
      console.log("Trial created, showing success message...");
      setShowSuccess(true);
      setTimeout(() => {
        console.log("Reloading page...");
        window.location.reload();
      }, 2000);
    }
  }, [Trial]);

  return (
    <>
      <PageTitle
        Copy={"Activate Your Free Trial!"}
        ICON={<IconFreeRights size={40} />}
      />
      {loading && (
        <>
          <P textAlign={"center"}>Creating your trial...</P>
          <P textAlign={"center"}>
            <FixturaLoading />
          </P>
        </>
      )}

      {showSuccess && (
        <>
          <P textAlign={"center"}>
            <IconCircleCheck size={"4em"} color="green" />
          </P>
          <P textAlign={"center"}>Trial created successfully!</P>
        </>
      )}

      {error && (
        <P textAlign={"center"} color="red">
          Error: {error}
        </P>
      )}

      {!loading && !showSuccess && (
        <>
          <Stack align="center">
            <BTN_ONCLICK
              HANDLE={handleClick}
              LABEL={"Activate Trial"}
              THEME={"success"}
            />
            <P textAlign={"center"} marginBottom={0}>
              Unlock all premium features and experience the full power of our
              platform.
            </P>
          </Stack>
        </>
      )}
    </>
  );
};
