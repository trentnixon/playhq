import { useEffect, useState } from 'react';
import { Checkbox } from '@mantine/core';
import Cookies from 'js-cookie';
import { fetcher } from '../../../../lib/api';

const DBCheckbox = ({
  label,
  name,
  CollectionSaveTo,
  collectionId,
  setHasUpdated,
  onSelectionChange,
  currentValue,
}) => {
  const [isChecked, setIsChecked] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Update isChecked when currentValue changes
  useEffect(() => {
    setIsChecked(currentValue === true);
  }, [currentValue]);

  // Handle checkbox changes
  const handleChange = async event => {
    // Mantine Checkbox passes an event object, we need to extract the checked value
    const checked = event.currentTarget.checked;
    setLoading(true);
    setError(null);
    setIsChecked(checked);

    try {
      // Only save to database if we have a real account ID
      if (collectionId) {
        const response = await fetcher(
          `${process.env.NEXT_PUBLIC_STRAPI_URL}/${CollectionSaveTo}/${collectionId}`,
          {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${Cookies.get('jwt')}`,
            },
            body: JSON.stringify({
              data: {
                [name]: checked,
              },
            }),
          }
        );

        if (!response) {
          throw new Error('Failed to save checkbox value');
        }
      }

      // Update UI state regardless of database save
      setHasUpdated();

      if (onSelectionChange) {
        onSelectionChange(checked);
      }
    } catch (error) {
      setError(error.message);
      console.error(`Failed to update checkbox ${name}:`, error);
      // Revert the checkbox state on error
      setIsChecked(!checked);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Checkbox
        label={label}
        checked={isChecked}
        disabled={loading}
        onChange={handleChange}
      />
      {error && (
        <div style={{ color: 'red', fontSize: '12px', marginTop: '4px' }}>
          {error}
        </div>
      )}
    </div>
  );
};

export default DBCheckbox;
