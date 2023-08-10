import { Box, Container, Loader } from "@mantine/core";
import React, { useEffect, useState } from "react";
import { useAssociations, useClubs } from "../../Hooks/useExpressionOfInterest";
import { P } from "../Members/Common/Type";
import Link from "next/link";

const Partner = () => {
  const [clubs, fetchClubs] = useClubs();
  const [associations, fetchAssociations] = useAssociations();
  const [showAutocomplete, setShowAutocomplete] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [storedName, setStoredName] = useState(false);

  const handleInputClubOrAssociationChange = (event) => {
    const inputValue = event.target.value;

    if (inputValue.length >= 3) {
      setShowAutocomplete(true);
      setIsLoading(true);
      fetchClubs(inputValue);
      fetchAssociations(inputValue);
    } else {
      setShowAutocomplete(false);
    }
  };

  const renderAutocompleteOptions = () => {
    if (isLoading) {
      return <Loader />; // Show spinner while data is loading
    }

    const options = [
      ...(Array.isArray(clubs) ? clubs : []),
      ...(Array.isArray(associations) ? associations : []),
    ];

    return options.map((option) => (
      <li
        key={option.id}
        className="list-group-item"
        onClick={() => handleAutocompleteClick(option.attributes.Name)}
      >
        {option.attributes.Name}
      </li>
    ));
  };

  useEffect(() => {
    if (clubs !== true || associations !== true) {
      setIsLoading(false);
    }
  }, [clubs, associations]);

  const handleAutocompleteClick = (name) => {
    setStoredName(name);
    setShowAutocomplete(false);
  };

  return (
    <>
      <div className="partner-area pt-100 pb-60">
        <div className="container">
          <div className="section-title">
            <h2>Eligibility Check:</h2>
            <p>
            Wondering if Fixtura is the right fit for your club or association? It’s easy to find out! Simply enter your name below, and let's discover how we can be teammates in success.
            </p>
          </div>
          <div className="row align-items-center justify-content-center">
            <Container>
              <Box
                sx={(theme) => ({
                  backgroundColor:theme.colors.gray[8],
                  textAlign: "center",
                  padding: theme.spacing.xl,
                  borderRadius: theme.radius.md,
                  cursor: "pointer",

                
                })}
              >
                <div className="mb-3">
                  <label
                    htmlFor="inputClubOrAssociation"
                    className="form-label"
                  >
                    <P color={0} Copy={`Name of Club or Association`} />
                    
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="inputClubOrAssociation"
                    name="clubOrAssociation"
                    /* value={formData.clubOrAssociation} */
                    minLength="3"
                    onChange={handleInputClubOrAssociationChange}
                    /*  disabled={!registerAs} */
                    required
                  />
                  {(clubs || associations) && showAutocomplete && (
                    <ul className="list-group">
                      {renderAutocompleteOptions()}
                    </ul>
                  )}
                </div>
                {storedName ? (
                  <PositiveResult storedName={storedName} />
                ) : (
                  false
                )}
              </Box>
            </Container>
          </div>
        </div>
      </div>
    </>
  );
};

export default Partner;

const PositiveResult = ({ storedName }) => {
  return (
    <Box>
      <P
      color={0}
        textAlign={`center`}
        Weight={`bold`}
        Copy={`Great news! ${storedName} is eligible to join Fixtura's exclusive network of cricket clubs and associations.`}
      />
      <P
      color={0}
        textAlign={`center`}
        Weight={400}
        Copy={`Join now to experience the ease and efficiency of Fixtura's content creation services and take your club's online presence to the next level!`}
      />
      <Link href="/SignUp/">
        <a className="btn btn-primary">Sign up</a>
      </Link>
    </Box>
  );
};
