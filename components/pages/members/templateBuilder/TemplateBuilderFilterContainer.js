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
import { RoundedSectionContainer } from '../../../UI/Containers/SectionContainer';
import { BackgroundOptions } from './primaryFilters/DisplayBackgroundOptions';
import { DisplayModes } from './primaryFilters/DisplayModes';
import { Templates } from './primaryFilters/DisplayTemplateOptions';
import { TemplatePalettes } from './primaryFilters/DisplayTemplatePalettes';
import { UserGalleryOptions } from './secondaryFilterOptions/DisplayUserGalleryOptions';
import SecondaryFilterOptions from './secondaryFilterOptions/secondaryFilterOptions';

export const TemplateBuilderFilterContainer = props => {
  const {
    selectedDesignOptions,
    setSelectedDesignOptions,
    templateCategories,
  } = props;

  return (
    <div>
      {/*  <P marginBottom={0}>
        Customize your Fixtura assets with our template builder
      </P> */}
      <div className='flex flex-col gap-0 justify-between items-center'>
        <RoundedSectionContainer
          padding='xs'
          headerContent={null}
          topContent={'1. Designs'}
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
          padding='xs'
          headerContent={null}
          topContent={'2. Branding'}
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
          headerContent={null}
          topContent={'3. Backgrounds'}
          bottomContent={
            <div className='flex flex-col gap-4 justify-between items-center w-full'>
              <BackgroundOptions {...props} />
              <UserGalleryOptions {...props} />
              <SecondaryFilterOptions {...props} />
            </div>
          }
        />
      </div>
    </div>
  );
};
