/**
 * TemplateBuilderFilterContainer
 * -------------
 * Pure presentation component for the template builder UI.
 * Receives design options and callbacks from parent component.
 *
 * Props:
 * - hasMediaItems: Boolean indicating if user has media items
 * - selectedDesignOptions: Object containing current design configuration
 * - setSelectedDesignOptions: Callback to update design options
 */
import { ActionIcon, Modal, Text, Button } from '@mantine/core';
import { RoundedSectionContainer } from '../../../UI/Containers/SectionContainer';
import { BackgroundOptions } from './primaryFilters/DisplayBackgroundOptions';
import { DisplayModes } from './primaryFilters/DisplayModes';
import { Templates } from './primaryFilters/DisplayTemplateOptions';
import { TemplatePalettes } from './primaryFilters/DisplayTemplatePalettes';
import { UserGalleryOptions } from './secondaryFilterOptions/DisplayUserGalleryOptions';
import SecondaryFilterOptions from './secondaryFilterOptions/secondaryFilterOptions';
import { IconInfoCircle } from '@tabler/icons-react';
import { P } from '@/components/Members/Common/Type';
import { useState } from 'react';

export const TemplateBuilderFilterContainer = props => {
  const {
    selectedDesignOptions,
    setSelectedDesignOptions,
    templateCategories,
  } = props;

  const [infoDialogOpen, setInfoDialogOpen] = useState(false);
  const [infoDialogContent, setInfoDialogContent] = useState({
    title: '',
    copy: '',
  });

  const openInfoDialog = (title, copy) => {
    setInfoDialogContent({ title, copy });
    setInfoDialogOpen(true);
  };

  return (
    <div>
      {/*  <P marginBottom={0}>
        Customize your Fixtura assets with our template builder
      </P> */}
      <div className='flex flex-col gap-0 justify-between items-center'>
        <RoundedSectionContainer
          padding='xs'
          className=''
          headerContent={null}
          topContent={
            <div className='flex items-center gap-2 justify-between w-full'>
              <P marginBottom={0}>1. Designs</P>
              <InfoDialog
                title='Designs Information'
                copy='Choose from our collection of professional templates designed specifically for sports clubs. Each template is optimized for different content types and layouts.'
                onOpen={() =>
                  openInfoDialog(
                    'Designs Information',
                    'Pick a design style for your assets. Templates control the look and feel, and you can switch anytime. Save your changes and the new design will be used for future assets.'
                  )
                }
              />
            </div>
          }
          bottomContent={
            <div>
              <Templates
                selectedDesignOptions={selectedDesignOptions}
                setSelectedDesignOptions={setSelectedDesignOptions}
                templateCategories={templateCategories}
              />
            </div>
          }
        />

        <RoundedSectionContainer
          className=''
          padding='xs'
          headerContent={null}
          topContent={
            <div className='flex items-center gap-2 justify-between w-full'>
              <P marginBottom={0}>2. Branding</P>
              <InfoDialog
                title='Branding Information'
                copy="Customize your club's colors and display modes. Choose between light and dark themes, and select color palettes that match your brand identity."
                onOpen={() =>
                  openInfoDialog(
                    'Branding Information',
                    "Experiment with color palettes built from your club's chosen colors. Try light or dark modes, plus alternatives, to see what works best. No design skills needed—just choose the style you like."
                  )
                }
              />
            </div>
          }
          bottomContent={
            <div className='flex flex-col gap-4 justify-between items-center w-full'>
              <TemplatePalettes {...props} />

              <DisplayModes
                selectedDesignOptions={selectedDesignOptions}
                setSelectedDesignOptions={setSelectedDesignOptions}
              />
            </div>
          }
        />

        <RoundedSectionContainer
          padding='xs'
          className=''
          headerContent={null}
          topContent={
            <div className='flex items-center gap-2 justify-between w-full'>
              <P marginBottom={0}>3. Backgrounds</P>
              <InfoDialog
                title='Backgrounds Information'
                copy='Select background options for your templates. Choose from solid colors, gradients, or upload your own images from your gallery. You can also use AI-generated backgrounds.'
                onOpen={() =>
                  openInfoDialog(
                    'Backgrounds Information',
                    'Choose from a wide range of backgrounds—solid colors, gradients, patterns, graphics, or images. Preview your selection instantly to see how it looks in your design.'
                  )
                }
              />
            </div>
          }
          bottomContent={
            <div className='flex flex-col gap-4 justify-between items-center w-full'>
              <BackgroundOptions {...props} />
              <UserGalleryOptions {...props} />
              <SecondaryFilterOptions {...props} />
            </div>
          }
        />
      </div>

      {/* Info Dialog Modal */}
      <Modal
        opened={infoDialogOpen}
        onClose={() => setInfoDialogOpen(false)}
        title={infoDialogContent.title}
        size='md'
        centered
      >
        <div className='space-y-4'>
          <Text size='sm' color='dimmed'>
            {infoDialogContent.copy}
          </Text>
          <div className='flex justify-end'>
            <Button
              variant='light'
              onClick={() => setInfoDialogOpen(false)}
              size='sm'
            >
              Got it
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

const InfoDialog = ({ title, copy, onOpen }) => {
  return (
    <ActionIcon onClick={onOpen} variant='subtle' color='blue'>
      <IconInfoCircle size='1.125rem' />
    </ActionIcon>
  );
};
