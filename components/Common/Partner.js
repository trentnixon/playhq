import { Box, Container, Loader } from "@mantine/core";
import React, { useEffect, useState } from "react";
import { useAssociations, useClubs } from "../../Hooks/useExpressionOfInterest";
import { P } from "../Members/Common/Type";
import Link from "next/link";
import { trackButtonClick, trackCustomEvent } from "../../lib/GA";
import Section from "../UI/DefaultSection";
import { useMediaQuery } from "@mantine/hooks";

const Partner = () => {
  const [clubs, fetchClubs] = useClubs();
  const [associations, fetchAssociations] = useAssociations();
  const [showAutocomplete, setShowAutocomplete] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [storedName, setStoredName] = useState(false);

  const handleInputClubOrAssociationChange = (event) => {
    const inputValue = event.target.value;

    if (inputValue.length === 1) {
      trackCustomEvent(
        "Input Interaction",
        "Eligibility Check Started",
        inputValue
      );
    }

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
    trackCustomEvent(
      "Autocomplete Selection",
      "Eligibility Check Selection",
      name
    );
  };

  const SectionData = {
    title: "Check Your Club's Integration with Fixtura",
    paragraphs: [
      `Wonder if your club or association is compatible with Fixtura? Enter its name below to see if you're listed on PlayHQ and ready to harness the power of Fixtura's automated content.`,
    ],
  };

  return (
    <>
      <Section {...SectionData} color="light">
        <div className="row align-items-center justify-content-center">
          <Container>
            <Box
              sx={(theme) => ({
                backgroundColor: theme.colors.gray[8],
                textAlign: "center",
                padding: theme.spacing.xl,
                borderRadius: theme.radius.md,
                cursor: "pointer",
              })}
            >
              <div className="mb-3">
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
                  placeholder="Find You Club or Association"
                />
                {(clubs || associations) && showAutocomplete && (
                  <ul className="list-group">{renderAutocompleteOptions()}</ul>
                )}
              </div>
              {storedName ? <PositiveResult storedName={storedName} /> : false}
            </Box>
          </Container>
        </div>
      </Section>
    </>
  );
};

export default Partner;

const PositiveResult = ({ storedName }) => {
  const isMobile = useMediaQuery("(max-width: 768px)");
  const textAlign = isMobile ? "left" : "center";

  useEffect(() => {
    trackCustomEvent(
      "Positive Result Displayed",
      "Eligibility Check Success",
      storedName
    );
  }, []);

  const handleButtonClick = () => {
    trackButtonClick("Sign Up from Eligibility Check");
  };

  return (
    <Box>
      <P
        color={"white"}
        textAlign={textAlign}
        Weight={600}
        size={"xl"}
      >{`Great news! ${storedName} is eligible to join Fixtura's exclusive network of cricket clubs and associations.`}</P>
      <P color={"white"} size={"lg"} textAlign={textAlign} Weight={400}>
        Join now to experience the ease and efficiency of Fixtura's content
        creation services and take your club's online presence to the next
        level!
      </P>
      <Link href="/SignUp/">
        <a className="btn btn-primary" onClick={handleButtonClick}>
          Sign up
        </a>
      </Link>
    </Box>
  );
};
