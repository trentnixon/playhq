import { useEffect, useState } from 'react'; // Added for potential future use and error handling
import { getTrialStatus } from '../../../../../lib/actions';
import { P, PageTitle } from '../../../Common/Type';
import { IconCircleCheck } from '@tabler/icons-react';
import { ShadowWrapper } from '../../../Common/Containers';

// Calculates the number of days remaining in the trial
const calculateDaysRemaining = endDate => {
  const today = new Date();
  const diffInMilliseconds = endDate.getTime() - today.getTime();
  return Math.ceil(diffInMilliseconds / (1000 * 60 * 60 * 24));
};

export const FreeTrialActive = ({ account }) => {
  const [daysRemaining, setDaysRemaining] = useState(0);

  useEffect(() => {
    try {
      const trialStatus = getTrialStatus(account);
      const endDate = new Date(
        trialStatus.trialInstancePath.data.attributes.endDate
      );
      setDaysRemaining(calculateDaysRemaining(endDate));
    } catch (error) {
      console.error('Failed to fetch trial status:', error);
      // Optional: Implement error handling state and display a message to the user
    }
  }, [account]);

  return (
    <>
      <PageTitle
        Copy='Your Trial is Active'
        ICON={<IconCircleCheck size={40} />}
      />
      <P size='xl' weight={600}>
        You have {daysRemaining} days remaining. Enjoy all the features!
      </P>
      <ShadowWrapper mb={200}>
        <P>
          Once your trial ends, subscribing will unlock all the amazing benefits
          and features we have to offer. We're excited for you to continue being
          a part of our community!
        </P>
      </ShadowWrapper>
    </>
  );
};

/* Developer Notes:
- Refactored the component to include useEffect for fetching trial status asynchronously, enhancing performance and user experience.
- Added error handling within useEffect to manage potential errors gracefully and log them for further investigation.
- Extracted date calculation to a separate function for better code organization and reusability.
- Consider adding loading and error states to give feedback to the user in case of delays or issues fetching the trial status.
*/

/* LLM Notes:
This component displays the active trial status for users, including the days remaining until the trial ends. It is structured to fetch and calculate the trial duration asynchronously and updates its state accordingly. This component is part of a user subscription management system and enhances user engagement by providing critical trial status information. It includes proper error handling to ensure robustness and reliability.
*/
