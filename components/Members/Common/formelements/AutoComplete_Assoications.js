import { useState, useEffect } from "react";
import { Loader, Group, ActionIcon, Tooltip } from "@mantine/core";
import { useAssociations } from "../../../../Hooks/useExpressionOfInterest";
import { BTN_ONCLICK } from "../utils/Buttons";
import { fetcher } from "../../../../lib/api";
import Cookies from "js-cookie";
import { P } from "../Type";
import { IconCheck } from "@tabler/icons-react";
import { FixturaLoading } from "../Loading";
import { useAccountDetails } from "../../../../context/userContext";

const ConfirmButtons = ({ handleConfirmClick, handleChangeClick, name }) => {
  const [showFinalConfirm, setShowFinalConfirm] = useState(false);
  return (
    <>

      <Group position="right" noWrap={true}>
        {showFinalConfirm ? (
        <>
          <P size="xs" marginBottom={0} color={8}>
            *This action cannot be reversed
          </P>
        </>
      ) : (
        false
      )}
        <BTN_ONCLICK
          LABEL={"Change"}
          HANDLE={handleChangeClick}
          THEME={"error"}
        />

        {showFinalConfirm ? (
          <>
            <BTN_ONCLICK
              LABEL={`Confirm`}
              HANDLE={handleConfirmClick}
              THEME={"success"}
            />
          </>
        ) : (
          <BTN_ONCLICK
            LABEL={"Save"}
            HANDLE={setShowFinalConfirm}
            THEME={"success"}
          />
        )}
      </Group>


    </>
  );
};

const SuccessMessage = ({ name }) => (
  <Group position="apart">
    <P textTransform={`uppercase`} size={`sm`} marginBottom={0}>
      {name}
    </P>
    <ActionIcon
      variant="filled"
      sx={(theme) => ({
        backgroundColor: theme.colors.members[6],
      })}
    >
      <IconCheck size={18} />
    </ActionIcon>
  </Group>
);

const AssociationsList = ({ associations, handleAssociationClick }) => (
  <ul className="list-group">
    {associations.map((association) => (
      <li
        key={association.id}
        className="list-group-item"
        style={{ cursor: "pointer" }}
        onClick={() => handleAssociationClick(association)}
      >
        {association.attributes.Name} | {association.attributes.Sport}
      </li>
    ))}
  </ul>
);

export const AutoCompleteSelectAssociation = ({
  COLLECTIONID,
  SelectedBaseValueObject,
  setAssociationID,
}) => {
  const { ReRender } = useAccountDetails();
  const [associations, fetchAssociations] = useAssociations();
  const [inputValue, setInputValue] = useState("");
  const [selectedAssociationId, setSelectedAssociationId] = useState(null);
  const [selectedAssociationName, setSelectedAssociationName] = useState("");
  const [selectedAssociationSport, setSelectedAssociationSport] = useState("");
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
      fetchAssociations(newInputValue).catch((error) => {
        // Handle any errors that occur during the fetch
        console.error("An error occurred while fetching associations:", error);
      });
      setShowAutocomplete(true);
    } else {
      setShowAutocomplete(false);
    }
  };

  const handleAssociationClick = (association) => {

    setSelectedAssociationName(association.attributes.Name);
    setSelectedAssociationId(association.id);
    setSelectedAssociationSport(association.attributes.Sport)
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
            data: { associations: selectedAssociationId,Sport:selectedAssociationSport },
          }),
        }
      );

      if (response?.errors) {
        // Handle error messages from the response here
        console.error("An error occurred:", response.errors);
        return;
      }

      if (response) {
        setAssociationID(selectedAssociationId);
        setUpdateSuccessful(true);
        setIsLoading(false);
        ReRender();
      }
    } catch (error) {
      // Handle any other errors that may occur during the fetch
      console.error("An error occurred:", error);
    }
  };

  const handleChangeClick = () => {
    setInputValue("");
    setSelectedAssociationId(null);
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
          <div>{selectedAssociationName}</div>
        )}
        {isLoading && false}
        {Array.isArray(associations) && showAutocomplete && (
          <AssociationsList
            associations={associations}
            handleAssociationClick={handleAssociationClick}
          />
        )}
        {/* {updateSuccessful ? (
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
            name={selectedAssociationName}
          />
        )}
      </Group>
    </div>
  );
};
