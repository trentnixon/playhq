// Importing necessary libraries and components
import { useEffect, useState } from "react";
import { useCreateTrial } from "../../../../../Hooks/useTrial";
import { constructTrialInstanceObj } from "../../../../../lib/actions";
import { PageTitle } from "../../../Common/Type";
import { IconFreeRights } from "@tabler/icons";
import {
  ErrorMessage,
  LoadingMessage,
  SuccessMessage,
  TrialActivation,
} from "./FreeTrialMessages";

// Main component definition
export const CreateFreeTrial = ({ account }) => {
  const [trial, createTrial, loading, error] = useCreateTrial();
  const [showSuccess, setShowSuccess] = useState(false);

  // Function to handle the trial creation process
  const handleClick = () => {
    const trialInstanceObj = constructTrialInstanceObj(account);

    createTrial(trialInstanceObj); 
  };

  // Effect to handle side effects post-trial creation
  useEffect(() => {
    if (trial) {
      setShowSuccess(true);
      setTimeout(() => {
        window.location.reload(); // Future improvement: Replace with React Router for better SPA behavior
      }, 500); // Reduced timeout to 900ms for a quicker response
    }
  }, [trial]);

  // Conditional rendering to manage different states of the trial activation process
  return (
    <>
      <PageTitle
        Copy="Activate Your Free Trial!"
        ICON={<IconFreeRights size={40} />}
      />
      {loading ? (
        <LoadingMessage />
      ) : showSuccess ? (
        <SuccessMessage />
      ) : error ? (
        <ErrorMessage error={error} />
      ) : (
        <TrialActivation handleClick={handleClick} />
      )}
    </>
  );
};

/* Developer Notes:
- Code has been further refined by implementing a clear separation of concerns and modularization of rendering logic.
- The use of separate components for loading, success, and error states enhances readability and maintainability.
- Recommended exploration of React Query to manage server state and side effects more efficiently.
- Suggested future improvement to replace `window.location.reload()` with navigation control provided by React Router for enhanced SPA functionality.
*/

/* LLM Notes:
This React component, part of a Next.js application, facilitates the activation of a free trial for users. It employs custom hooks for state management and reacts appropriately to the lifecycle of a trial creation request. Located within the 'components' directory, it effectively leverages modular components to handle various UI states, such as loading, success, and error scenarios. This structured approach enhances code maintainability and readability.
*/
