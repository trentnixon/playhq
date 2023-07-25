import { useState, useEffect } from "react";
import { Loader, Group, ActionIcon } from "@mantine/core";
import { useClubs } from "../../../../Hooks/useExpressionOfInterest";
import { BTN_ONCLICK } from "../utils/Buttons";
import { fetcher } from "../../../../lib/api";
import Cookies from "js-cookie";
import { P } from "../Type";
import { IconCheck } from "@tabler/icons-react";
import { useAccountDetails } from "../../../../lib/userContext";
import { FixturaLoading } from "../Loading";

const ConfirmButtons = ({ handleConfirmClick, handleChangeClick }) => (
  <Group position="right">
    <BTN_ONCLICK LABEL={"Change"} HANDLE={handleChangeClick} THEME={"error"} />
    <BTN_ONCLICK LABEL={"Save"} HANDLE={handleConfirmClick} THEME={"success"} />
    
  </Group>
);

const SuccessMessage = ({ name }) => {
    
    return(
        <Group position="apart">
          <P textTransform={`uppercase`} size={`sm`} marginBottom={0} Copy={name} />
          <ActionIcon
            variant="filled"
            sx={(theme) => ({
              backgroundColor: theme.colors.members[6],
            })}
          >
            <IconCheck size={18} />
          </ActionIcon>
        </Group>);
};

const ClubsList = ({ clubs, handleClubClick }) => (
  <ul className="list-group">
    {clubs.map((club) => (
      <li
        key={club.id}
        className="list-group-item"
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
}) => {
  const {  ReRender } = useAccountDetails();
  const [clubs, fetchClubs] = useClubs();
  const [inputValue, setInputValue] = useState("");
  const [selectedClubId, setSelectedClubId] = useState(null);
  const [selectedClubName, setSelectedClubName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showAutocomplete, setShowAutocomplete] = useState(false);
  const [isSelectionMade, setIsSelectionMade] = useState(false);
  const [updateSuccessful, setUpdateSuccessful] = useState(false);

  if (SelectedBaseValueObject?.Name !== undefined) {
    return <SuccessMessage name={SelectedBaseValueObject.Name} />;
  }

  const handleInputChange = (event) => {
    const newInputValue = event.target.value;
    setInputValue(newInputValue);

    if (newInputValue.length >= 3) {
  
      fetchClubs(newInputValue, AssociationID).catch((error) => {
        console.error("An error occurred while fetching clubs:", error);
      });
      setShowAutocomplete(true);
    } else {
      setShowAutocomplete(false);
    }
  };

  const handleClubClick = (club) => {
    setSelectedClubName(club.attributes.Name);
    setSelectedClubId(club.id);
    setIsSelectionMade(true);
    setShowAutocomplete(false);
  };

  const handleConfirmClick = async () => {
    setIsLoading(true);
    try {
      const response = await fetcher(
        `${process.env.NEXT_PUBLIC_STRAPI_URL}/accounts/${COLLECTIONID}`,
        {
          method: "PUT",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${Cookies.get("jwt")}`,
          },
          body: JSON.stringify({
            data: { clubs: selectedClubId },
          }),
        }
      );

      if (response?.errors) {
        console.error("An error occurred:", response.errors);
        return;
      }
      
      
      if (response) {
        setUpdateSuccessful(true);
        setIsLoading(false);
       
      }
      
    } catch (error) {
      console.error("An error occurred:", error);
    }
    finally{}
    ReRender()
  };

  const handleChangeClick = () => {
    setInputValue("");
    setSelectedClubId(null);
    setIsSelectionMade(false);
  };



  if (isLoading) {
    return <FixturaLoading />;
  }
  return (
    <div className="mb-3">

      <Group position="apart">
        {!isSelectionMade ? (
          <input
            type="text"
            className="form-control"
            id="inputClubOrAssociation"
            name="clubOrAssociation"
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
        {updateSuccessful ? (
          <SuccessMessage />
        ) : (
          <P color={8} size="sm">
            An error occurred. Please try again.
          </P>
        )}
        {isSelectionMade && !updateSuccessful && (
          <ConfirmButtons
            handleConfirmClick={handleConfirmClick}
            handleChangeClick={handleChangeClick}
          />
        )}
      </Group>
    </div>
  );
};
