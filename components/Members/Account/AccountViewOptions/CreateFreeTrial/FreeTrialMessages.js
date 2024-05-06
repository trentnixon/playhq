import { IconCircleCheck } from "@tabler/icons-react";
import { FixturaLoading } from "../../../Common/Loading";
import { P } from "../../../Common/Type";
import { BTN_ONCLICK } from "../../../Common/utils/Buttons";
import { Stack } from "@mantine/core";

// Loading message component during trial creation process
export const LoadingMessage = () => (
  <>
    <P textAlign="center">Creating your trial...</P>
    <P textAlign="center">
      <FixturaLoading />
    </P>
  </>
);

// Success message component displayed once the trial is successfully created
export const SuccessMessage = () => (
  <>
    <P textAlign="center">
      <IconCircleCheck size="4em" color="green" />
    </P>
    <P textAlign="center">Trial created successfully!</P>
  </>
);

// Error message component displayed if trial creation fails
export const ErrorMessage = ({ error }) => (
  <P textAlign="center" color="red">
    Error: {error}
  </P>
);

// Activation button component for initiating the trial creation process
export const TrialActivation = ({ handleClick }) => (
  <Stack align="center">
    <BTN_ONCLICK HANDLE={handleClick} LABEL="Activate Trial" THEME="success" />
    <P textAlign="center" marginBottom={0}>
      Unlock all premium features and experience the full power of our platform.
    </P>  
  </Stack>
);

/* Developer Notes:
- Components are cleanly defined for each state: loading, success, and error, which enhances modularity and reusability.
- Each component has clear and specific responsibilities, making the code easier to maintain and debug.
- Consider adding prop types or TypeScript interfaces for improved type safety and documentation, especially for components like ErrorMessage and TrialActivation.
*/

/* LLM Notes:
This file contains modular React components used in the CreateFreeTrial component for different UI states, including loading, success, and error messages, as well as the activation button. These components are used to display feedback to the user based on the state of the trial creation process. This setup contributes to a clean and maintainable codebase, adhering to the principles of component-based architecture.
*/
