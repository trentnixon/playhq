import { Box, Container, Loader } from '@mantine/core';
import React, { useEffect, useState } from 'react';
import { useAssociations, useClubs } from '../../Hooks/useExpressionOfInterest';
import { P } from '../Members/Common/Type';
import Link from 'next/link';
import { trackButtonClick, trackCustomEvent } from '../../lib/GA';
import Section from '../UI/DefaultSection';
import { useMediaQuery } from '@mantine/hooks';

const Partner = () => {
  const [clubs, fetchClubs] = useClubs();
  const [associations, fetchAssociations] = useAssociations();
  const [showAutocomplete, setShowAutocomplete] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [storedName, setStoredName] = useState(false);
  const [StoredPlayhqID, setStoredPlayhqID] = useState(false);

  const handleInputClubOrAssociationChange = event => {
    const inputValue = event.target.value;

    if (inputValue.length === 1) {
      trackCustomEvent(
        'Input Interaction',
        'Eligibility Check Started',
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
      /* ...(Array.isArray(associations) ? associations : []), */
    ];

    //console.log("clubs", clubs)
    return options.map(option => (
      <li
        key={option.id}
        className='list-group-item'
        onClick={() => handleAutocompleteClick(option.attributes)}
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

  const handleAutocompleteClick = name => {
    //console.log(name.PlayHQID)
    setStoredName(name.Name);
    setStoredPlayhqID(name.PlayHQID);
    setShowAutocomplete(false);
    trackCustomEvent(
      'Autocomplete Selection',
      'Eligibility Check Selection',
      name
    );
  };

  const SectionData = {
    title: "Preview Your Club's Fixtura Experience",
    paragraphs: [
      `Curious to see how Fixtura can transform your club's digital content? `,
      `Enter your club's name below for an exclusive preview of a custom Fixtura assets tailored for your club.`,
    ],
  };

  return (
    <>
      <Section {...SectionData} color='light'>
        <div className='row align-items-center justify-content-center'>
          <Container>
            <Box
              sx={theme => ({
                backgroundColor: theme.colors.gray[8],
                textAlign: 'center',
                padding: theme.spacing.xl,
                borderRadius: theme.radius.md,
                cursor: 'pointer',
              })}
            >
              <div className='mb-3'>
                <input
                  type='text'
                  className='form-control'
                  id='inputClubOrAssociation'
                  name='clubOrAssociation'
                  onChange={handleInputClubOrAssociationChange}
                  required
                  placeholder='Enter Your Club Name for a Preview'
                />
                {(clubs || associations) && showAutocomplete && (
                  <ul className='list-group'>{renderAutocompleteOptions()}</ul>
                )}
              </div>
              {storedName ? (
                <PositiveResult
                  storedName={storedName}
                  StoredPlayhqID={StoredPlayhqID}
                />
              ) : (
                false
              )}
            </Box>
          </Container>
        </div>
      </Section>
    </>
  );
};

export default Partner;

const PositiveResult = ({ storedName, StoredPlayhqID }) => {
  const isMobile = useMediaQuery('(max-width: 768px)');
  const textAlign = isMobile ? 'left' : 'center';

  useEffect(() => {
    trackCustomEvent(
      'Positive Result Displayed',
      'Eligibility Check Success',
      storedName
    );
  }, [storedName]);

  const handleButtonClick = () => {
    trackButtonClick('View Custom Video Preview');
  };

  return (
    <Box>
      <P
        color={'white'}
        textAlign={textAlign}
        Weight={600}
        size={'xl'}
      >{`Great news! ${storedName} is eligible to join Fixtura's exclusive network of cricket clubs and associations.`}</P>
      <P
        color={'white'}
        textAlign={textAlign}
        Weight={600}
        size={'xl'}
      >{`Here's a glimpse of a custom assets for ${storedName}.`}</P>
      <Link
        legacyBehavior
        href={`/campaign/gettingstartedwithfixtura/${StoredPlayhqID}`}
      >
        <a className='btn btn-primary' onClick={handleButtonClick}>
          See how {storedName} looks with Fixtura
        </a>
      </Link>
    </Box>
  );
};
