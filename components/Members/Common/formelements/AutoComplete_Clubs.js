import { useState, useEffect } from 'react';
import { Loader, Group, ActionIcon } from '@mantine/core';
import { useClubs } from '../../../../Hooks/useExpressionOfInterest';
import { BTN_ONCLICK } from '../utils/Buttons';
import { fetcher } from '../../../../lib/api';
import Cookies from 'js-cookie';
import { P } from '../Type';
import { IconCheck } from '@tabler/icons-react';
import { useAccountDetails } from '../../../../context/userContext';
import { FixturaLoading } from '../Loading';

const ConfirmButtons = ({ handleConfirmClick, handleChangeClick, name }) => {
  const [showFinalConfirm, setShowFinalConfirm] = useState(false);
  return (
    <Group position='right' noWrap={true}>
      {showFinalConfirm ? (
        <>
          <P size='xs' marginBottom={0} color={8}>
            *This action cannot be reversed
          </P>
        </>
      ) : (
        false
      )}
      <BTN_ONCLICK
        LABEL={'Change'}
        HANDLE={handleChangeClick}
        THEME={'error'}
      />

      {showFinalConfirm ? (
        <BTN_ONCLICK
          LABEL={`Confirm`}
          HANDLE={handleConfirmClick}
          THEME={'success'}
        />
      ) : (
        <BTN_ONCLICK
          LABEL={'Save'}
          HANDLE={setShowFinalConfirm}
          THEME={'success'}
        />
      )}
    </Group>
  );
};

const SuccessMessage = ({ name }) => {
  return (
    <Group position='apart'>
      <P textTransform={`uppercase`} size={`sm`} marginBottom={0}>
        {name}
      </P>
      <ActionIcon
        variant='filled'
        sx={theme => ({
          backgroundColor: theme.colors.members[6],
        })}
      >
        <IconCheck size={18} />
      </ActionIcon>
    </Group>
  );
};

const ClubsList = ({ clubs, handleClubClick }) => (
  <ul className='list-group'>
    {clubs.map(club => (
      <li
        key={club.id}
        className='list-group-item'
        style={{ cursor: 'pointer' }}
        onClick={() => handleClubClick(club)}
      >
        {club.attributes.Name}
      </li>
    ))}
  </ul>
);

export const AutoCompleteSelectClub = ({
  COLLECTIONID,
  SelectedBaseValueObject,
  AssociationID,
  onSelectionChange,
}) => {
  const { ReRender } = useAccountDetails();
  const [clubs, fetchClubs] = useClubs();
  const [inputValue, setInputValue] = useState('');
  const [selectedClubId, setSelectedClubId] = useState(
    SelectedBaseValueObject?.ID || null
  );
  const [selectedClubName, setSelectedClubName] = useState(
    SelectedBaseValueObject?.Name || ''
  );
  const [isLoading, setIsLoading] = useState(false);
  const [showAutocomplete, setShowAutocomplete] = useState(false);
  const [isSelectionMade, setIsSelectionMade] = useState(
    !!SelectedBaseValueObject?.Name
  );
  const [updateSuccessful, setUpdateSuccessful] = useState(
    !!SelectedBaseValueObject?.Name
  );

  // Update state when SelectedBaseValueObject changes
  useEffect(() => {
    if (SelectedBaseValueObject) {
      setSelectedClubId(SelectedBaseValueObject.ID || null);
      setSelectedClubName(SelectedBaseValueObject.Name || '');
      setIsSelectionMade(!!SelectedBaseValueObject.Name);
      setUpdateSuccessful(!!SelectedBaseValueObject.Name);
    }
  }, [SelectedBaseValueObject]);

  if (SelectedBaseValueObject?.Name !== undefined) {
    return <SuccessMessage name={SelectedBaseValueObject.Name} />;
  }

  const handleInputChange = event => {
    const newInputValue = event.target.value;
    setInputValue(newInputValue);

    if (newInputValue.length >= 3) {
      fetchClubs(newInputValue, AssociationID).catch(error => {
        console.error('An error occurred while fetching clubs:', error);
      });
      setShowAutocomplete(true);
    } else {
      setShowAutocomplete(false);
    }
  };

  const handleClubClick = club => {
    setSelectedClubName(club.attributes.Name);
    setSelectedClubId(club.id);
    setIsSelectionMade(true);
    setShowAutocomplete(false);
  };

  const handleConfirmClick = async () => {
    setIsLoading(true);
    try {
      // Only save to database if we have a real account ID
      if (COLLECTIONID) {
        const response = await fetcher(
          `${process.env.NEXT_PUBLIC_STRAPI_URL}/accounts/${COLLECTIONID}`,
          {
            method: 'PUT',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
              Authorization: `Bearer ${Cookies.get('jwt')}`,
            },
            body: JSON.stringify({
              data: { clubs: selectedClubId },
            }),
          }
        );

        if (response?.errors) {
          console.error('An error occurred:', response.errors);
          return;
        }
      }

      // Update UI state regardless of database save
      setUpdateSuccessful(true);
      setIsLoading(false);

      // Call the onSelectionChange callback if provided
      if (onSelectionChange) {
        onSelectionChange({
          ID: selectedClubId,
          Name: selectedClubName,
        });
      }
    } catch (error) {
      console.error('An error occurred:', error);
      setIsLoading(false);
    } finally {
      // Only call ReRender if we have a real account ID
      if (COLLECTIONID) {
        ReRender();
      }
    }
  };

  const handleChangeClick = () => {
    setInputValue('');
    setSelectedClubId(null);
    setIsSelectionMade(false);
  };

  if (isLoading) {
    return <FixturaLoading />;
  }
  return (
    <div className=''>
      <Group position='apart'>
        {!isSelectionMade ? (
          <input
            type='text'
            className='form-control'
            id='inputClubOrAssociation'
            name='clubOrAssociation'
            value={inputValue}
            onChange={handleInputChange}
            required
          />
        ) : (
          <div>{selectedClubName}</div>
        )}
        {isLoading && false}
        {Array.isArray(clubs) && showAutocomplete && (
          <ClubsList clubs={clubs} handleClubClick={handleClubClick} />
        )}
        {/*  {updateSuccessful ? (
          <SuccessMessage />
        ) : (
          <P color={8} size="sm">
            An error occurred. Please try again.
          </P>
        )} */}
        {isSelectionMade && !updateSuccessful && (
          <ConfirmButtons
            handleConfirmClick={handleConfirmClick}
            handleChangeClick={handleChangeClick}
            name={selectedClubName}
          />
        )}
      </Group>
    </div>
  );
};
