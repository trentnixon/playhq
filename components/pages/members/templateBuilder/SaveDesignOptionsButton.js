// components/pages/members/templateBuilder/SaveDesignOptionsButton.js
import { useAssignTemplateOptionsToUserAccount } from '../../../../Hooks/useCustomizer';
import { useAccountDetails } from '../../../../context/userContext';
import { Button, Loader, Notification } from '@mantine/core';
import { useState } from 'react';
import { BTN_ONCLICK } from '../../../Members/Common/utils/Buttons';

export function SaveDesignOptionsButton({ selectedDesignOptions }) {
  const { account, ReRender } = useAccountDetails();
  const { status, error, response, CreateDesignElement } =
    useAssignTemplateOptionsToUserAccount();
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSave = async () => {
    if (!account?.id) return;
    const OBJ = {
      collectionSaveTo: 'template-option/put-template-options',
      accountId: account.id,
      Body: selectedDesignOptions,
    };
    await CreateDesignElement(OBJ);
    if (!error) setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 2000);
  };

  return (
    <div>
      <BTN_ONCLICK
        LABEL={
          status === 'loading' ? (
            <Loader size='xs' color='white' />
          ) : (
            'Save Design Options'
          )
        }
        HANDLE={handleSave}
        idDisabled={status === 'loading'}
        THEME='cta'
      />

      <div
        style={{
          position: 'fixed',
          right: 16,
          bottom: 16,
          zIndex: 9999,
          minWidth: 300,
        }}
      >
        {showSuccess && status === 'success' && (
          <Notification
            color='green'
            title='Success'
            onClose={() => setShowSuccess(false)}
          >
            Design options saved successfully!
          </Notification>
        )}
        {status === 'error' && (
          <Notification color='red' title='Error'>
            {error?.message || 'Failed to save design options.'}
          </Notification>
        )}
      </div>
    </div>
  );
}
