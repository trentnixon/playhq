//  ImageRow.js
import { useState, useMemo } from 'react';
import { Carousel } from '@mantine/carousel';
import { useMediaQuery } from '@mantine/hooks';
import { useMantineTheme } from '@mantine/styles';
import { Thumbnail } from '@remotion/player';

import { useAccountDetails } from '../../../../../../context/userContext';
import { testDatasets } from '../../../../../../remotionV2/testData/index';
import { templateRegistry } from '../../../../../../remotionV2/templates/registry';
import { mutateDataSet } from '../../../templateBuilder/libs/mutateDataSet';
import {
  formatSponsors,
  getSponsorCount,
} from '../../../templateBuilder/libs/formatSponsors';

// Constants
const VIDEO_RATIO = {
  width: 1080,
  height: 1350,
  ratio: 1080 / 1350,
  fps: 30,
};

const DEFAULT_ASSET_TYPE = {
  name: 'Cricket Results',
  slug: 'CricketResults',
};

const SponsorPreviewThumbRow = ({ selectedDesignOptions }) => {
  const { account } = useAccountDetails();
  const theme = useMantineTheme();
  const mobile = useMediaQuery(`(max-width: ${theme.breakpoints.sm})`);

  const [selectedAssetType] = useState(DEFAULT_ASSET_TYPE);

  // Memoized account settings
  const userAccountSettings = useMemo(
    () => ({
      theme: account.attributes.theme.data.attributes.Theme,
    }),
    [account.attributes.theme.data.attributes.Theme]
  );

  // Memoized formatted sponsors
  const formattedSponsors = useMemo(() => {
    return formatSponsors(account.attributes.sponsors.data);
  }, [account.attributes.sponsors.data]);

  // Memoized account type details
  const accountTypeDetails = useMemo(() => {
    const type = account.attributes?.account_type?.data?.attributes.Name;
    return type === 'Club'
      ? account.attributes?.clubs?.data[0]?.attributes
      : account.attributes?.associations.data[0]?.attributes;
  }, [account]);

  // Memoized dataset with applied mutations
  const selectedDataset = useMemo(() => {
    return mutateDataSet(
      testDatasets[selectedAssetType.slug],
      selectedDesignOptions,
      userAccountSettings,
      accountTypeDetails,
      formattedSponsors
    );
  }, [
    selectedAssetType.slug,
    selectedDesignOptions,
    userAccountSettings,
    accountTypeDetails,
    formattedSponsors,
  ]);

  // Memoized template selection
  const selectedTemplate = useMemo(() => {
    const templateKey =
      selectedDesignOptions?.selectedCategory?.value || 'Basic';
    return templateRegistry[templateKey]?.component;
  }, [selectedDesignOptions?.selectedCategory?.value]);

  // Calculate sponsor frames and timing
  const sponsorCount = getSponsorCount(account.attributes.sponsors.data);
  const sponsorFrames = Math.ceil(sponsorCount / 6);
  const sponsorsScreenTime = 90;

  // Update dataset timing for sponsors
  selectedDataset.timings.FPS_OUTRO = sponsorsScreenTime * sponsorFrames;

  // Calculate composition length
  const compositionLength =
    selectedDataset.timings.FPS_INTRO +
    selectedDataset.timings.FPS_MAIN +
    selectedDataset.timings.FPS_OUTRO;

  const sponsorMidPoint = 45;
  const preSponsorCompositionLength =
    selectedDataset.timings.FPS_INTRO +
    selectedDataset.timings.FPS_MAIN +
    sponsorMidPoint;

  // Render thumbnail slides
  const renderThumbnail = () => {
    const slides = [];

    for (let i = 0; i < sponsorFrames; i++) {
      const frameToDisplay =
        preSponsorCompositionLength + i * sponsorsScreenTime;

      slides.push(
        <Carousel.Slide key={`sponsor-frame-${i}-${sponsorCount}`}>
          <div
            style={{
              position: 'relative',
              aspectRatio: `${VIDEO_RATIO.width} / ${VIDEO_RATIO.height}`,
              background: '#111',
            }}
          >
            {selectedTemplate ? (
              <Thumbnail
                component={selectedTemplate}
                durationInFrames={compositionLength}
                compositionHeight={VIDEO_RATIO.height}
                compositionWidth={VIDEO_RATIO.width}
                fps={VIDEO_RATIO.fps}
                frameToDisplay={frameToDisplay}
                inputProps={{ data: selectedDataset }}
                style={{ width: '100%' }}
              />
            ) : (
              <div
                style={{
                  width: '100%',
                  height: '100%',
                  background: '#222',
                  color: '#fff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                No template selected
              </div>
            )}
          </div>
        </Carousel.Slide>
      );
    }

    return slides;
  };

  return (
    <div className='flex flex-col gap-0 w-full'>
      <div className='w-full'>
        <Carousel
          key={`sponsor-carousel-${sponsorCount}`}
          maw='100%'
          slideSize='33%'
          breakpoints={[{ maxWidth: 'xs', slideSize: '100%', slideGap: 0 }]}
          slideGap='xs'
          align='start'
          loop
          sx={{ flex: 1 }}
          slidesToScroll={mobile ? 1 : 2}
          withIndicators
        >
          {renderThumbnail()}
        </Carousel>
      </div>
    </div>
  );
};

export default SponsorPreviewThumbRow;
