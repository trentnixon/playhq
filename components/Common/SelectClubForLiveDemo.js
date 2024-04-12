import { Box, Center, Container, Loader, useMantineTheme } from "@mantine/core";
import React, { useEffect, useState } from "react";
import { useAssociations, useClubs } from "../../Hooks/useExpressionOfInterest";
import { P } from "../Members/Common/Type";
import Link from "next/link";
import { trackButtonClick, trackCustomEvent } from "../../lib/GA";
import Section from "../UI/DefaultSection";
import { useMediaQuery } from "@mantine/hooks";

const SelectClubForLiveDemo = () => {
  const [clubs, fetchClubs] = useClubs();
  const [associations, fetchAssociations] = useAssociations();
  const [showAutocomplete, setShowAutocomplete] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [storedName, setStoredName] = useState(false);
  const [StoredPlayhqID, setStoredPlayhqID] = useState(false);

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
    const theme = useMantineTheme();
    if (isLoading) {
      return <Loader />; // Show spinner while data is loading
    }

    const options = [
      ...(Array.isArray(clubs) ? clubs : []),
      /* ...(Array.isArray(associations) ? associations : []), */
    ];

    /* console.log("clubs", clubs); */
    return options.map((option) => (
      <li
        key={option.id}
        className="list-group-item"
        onClick={() => handleAutocompleteClick(option.attributes)}
        style={{
          backgroundColor: theme.colors.gray[8],
          color: theme.colors.gray[1],
        }}
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
    //console.log(name.PlayHQID)
    setStoredName(name.Name);
    setStoredPlayhqID(name.PlayHQID);
    setShowAutocomplete(false);
    trackCustomEvent(
      "Autocomplete Selection",
      "Eligibility Check Selection",
      name
    );
  };

  const SectionData = {
    title: "Fixtura's Club Demo",
    paragraphs: [
      `Curious to see how Fixtura can transform your club's digital content? `,
      `Enter your club's name below for an exclusive preview of a custom Fixtura assets tailored for your club.`,
    ],
  };

  const AssoicationActionData = {
    title: "Fixtura for Associations",
    paragraphs: [
      `Currently, our live demo is tailored specifically for  clubs, showcasing how Fixtura seamlessly enhances their digital storytelling. For associations interested in exploring Fixtura's capabilities, we offer detailed information and customized demonstrations to suit your broader needs. `,
      `We invite associations to contact us directly on Facebook for an in-depth understanding of how Fixtura can revolutionize your content creation and fan engagement. Let's discuss the possibilities and tailor a solution that aligns with your association's vision.`,
    ],
  };

  return (
    <>
      <Section {...SectionData} color="light">
        <Container>
          <Box
            sx={(theme) => ({
              backgroundColor: theme.colors.gray[5],
              textAlign: "center",
              padding: theme.spacing.xl,
              borderRadius: theme.radius.md,
              cursor: "pointer",
            })}
          >
            <input
              type="text"
              className="form-control"
              id="inputClubOrAssociation"
              name="clubOrAssociation"
              onChange={handleInputClubOrAssociationChange}
              required
              placeholder="Enter Your Club Name"
            />
            {(clubs || associations) && showAutocomplete && (
              <ul className="list-group">{renderAutocompleteOptions()}</ul>
            )}
          </Box>
          {storedName ? (
            <PositiveResult
              storedName={storedName}
              StoredPlayhqID={StoredPlayhqID}
            />
          ) : (
            false
          )}
        </Container>
      </Section>
      <Section {...AssoicationActionData} color="light">
        <Center>
          <Link
            legacyBehavior
            href="https://www.facebook.com/profile.php?id=100095406210560"
          >
            <a
              className="btn btn-secondary"
              onClick={() => trackButtonClick("Facebook FAQ Chat")} // Track button click
            >
              Contact Us on Facebook
            </a>
          </Link>
        </Center>
      </Section>
    </>
  );
};

export default SelectClubForLiveDemo;

const PositiveResult = ({ storedName, StoredPlayhqID }) => {
  const isMobile = useMediaQuery("(max-width: 768px)");
  const textAlign = "center";

  useEffect(() => {
    trackCustomEvent(
      "Positive Result Displayed",
      "Eligibility Check Success",
      storedName
    );
  }, []);

  const handleButtonClick = () => {
    trackButtonClick("View Custom Video Preview");
  };

  return (
    <Box
      mt={20}
      sx={(theme) => ({
        backgroundColor: theme.colors.gray[2],
        textAlign: "center",
        padding: theme.spacing.xl,
        borderRadius: theme.radius.md,
        cursor: "pointer",
      })}
    >
      <P
        color={"gray.8"}
        textAlign={textAlign}
        Weight={400}
        size={"xl"}
      >{`Great news!`}</P>
      <P
        color={"gray.8"}
        textAlign={textAlign}
        Weight={400}
        size={"xl"}
      >{`${storedName} is eligible to join Fixtura's exclusive network of cricket clubs and associations.`}</P>

      <Link
        legacyBehavior
        href={`/campaign/gettingstartedwithfixtura/${StoredPlayhqID}`}
      >
        <a className="btn btn-secondary" onClick={handleButtonClick}>
          Check out our Live Demo for {storedName}
        </a>
      </Link>
    </Box>
  );
};
