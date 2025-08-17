/**
 * BuilderFrame
 * -------------
 * Pure presentation component for the template builder UI.
 * Receives design options and callbacks from parent component.
 *
 * Props:
 * - hasMediaItems: Boolean indicating if user has media items
 * - selectedDesignOptions: Object containing current design configuration
 * - setSelectedDesignOptions: Callback to update design options
 */
import { Container } from '@mantine/core';
import { ExampleGallery } from './ExampleGallery';
import { RoundedSectionContainer } from '../../../UI/Containers/SectionContainer';
import PropTypes from 'prop-types';

export const BuilderFrame = ({
  selectedDesignOptions,
  setSelectedDesignOptions,
}) => {
  return (
    <Container fluid={true} mb={40}>
      <RoundedSectionContainer
        headerContent={``}
        topContent={null}
        bottomContent={
          <ExampleGallery
            selectedDesignOptions={selectedDesignOptions}
            setSelectedDesignOptions={setSelectedDesignOptions}
          />
        }
      />
    </Container>
  );
};

BuilderFrame.propTypes = {
  hasMediaItems: PropTypes.bool,
  selectedDesignOptions: PropTypes.object.isRequired,
  setSelectedDesignOptions: PropTypes.func.isRequired,
};
